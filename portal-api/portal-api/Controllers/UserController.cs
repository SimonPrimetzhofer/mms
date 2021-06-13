using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using portal_api.Context;
using portal_api.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace portal_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static readonly PasswordHasher<PortalUser> hasher = new();

        private readonly IConfiguration _config;
        private readonly PictureContext _context;

        public UserController(PictureContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        [HttpGet]
        [Authorize]
        public Task<PortalUser> Get()
        {
            return User.Get(_context);
        }

        [Authorize]
        [HttpPost]
        public async Task<PortalUser> Update([FromBody] UpdateUserDTO data)
        {
            PortalUser user = await this.User.Get(_context);

            user.Username = data.Username;
            user.Mail = data.Mail;

            await _context.SaveChangesAsync();

            return user;
        }

        [Authorize]
        [HttpPost("Password")]
        public async Task<ActionResult<PortalUser>> UpdatePassword([FromBody] UpdatePasswordDTO data)
        {
            PortalUser user = await this.User.Get(_context);

            PasswordVerificationResult result = hasher.VerifyHashedPassword(user, user.Password, data.OldPassword);
            if (result == PasswordVerificationResult.Failed)
            {
                return Forbid();
            }

            user.Password = hasher.HashPassword(user, data.NewPassword);

            await _context.SaveChangesAsync();

            return user;
        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            PortalUser user = await this.User.Get(_context);

            _context.PortalUsers.Remove(user);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost(nameof(Login))]
        public async Task<ActionResult<LoggedInDTO>> Login([FromBody] LoginDTO data)
        {
            PortalUser user = await AuthenticateUser(data);
            if (user == null)
            {
                return Unauthorized();
            }

            string tokenString = GenerateJSONWebToken(user);
            return new LoggedInDTO() { User = user, Token = tokenString };
        }

        [AllowAnonymous]
        [HttpPost(nameof(Signup))]
        public async Task<ActionResult<LoggedInDTO>> Signup([FromBody] SignupDTO data)
        {
            if(await _context.PortalUsers.AnyAsync(u => u.Username == data.Username))
            {
                return Unauthorized();
            }

            PortalUser result = new()
            {
                Username = data.Username,
                Mail = data.Mail,
                IsAdmin = false,
                PictureEntries = Array.Empty<PictureEntry>()
            };

            result.Password = hasher.HashPassword(result, data.Password);

            await _context.PortalUsers.AddAsync(result);
            try
            {
                await _context.SaveChangesAsync();
            } 
            catch
            {
                return Unauthorized();
            }

            string tokenString = GenerateJSONWebToken(result);

            return new LoggedInDTO() { User = result, Token = tokenString };
        }

        private async Task<PortalUser> AuthenticateUser(LoginDTO login)
        {
            PortalUser user = await _context.PortalUsers.SingleOrDefaultAsync(u => u.Username == login.UserName);
            if (user == null || user.Password == null)
            {
                return null;
            }

            PasswordVerificationResult result = hasher.VerifyHashedPassword(user, user.Password, login.Password);

            switch (result)
            {
                case PasswordVerificationResult.SuccessRehashNeeded:
                    user.Password = hasher.HashPassword(user, login.Password);
                    await _context.SaveChangesAsync();
                    return user;
                case PasswordVerificationResult.Success:
                    return user;
                case PasswordVerificationResult.Failed:
                default:
                    return null;
            }
        }

        private string GenerateJSONWebToken(PortalUser userInfo)
        {
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new(_config["Jwt:Issuer"], _config["Jwt:Issuer"], new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userInfo.UserId.ToString())
            }, null, DateTime.Now.AddDays(1), credentials); 

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
