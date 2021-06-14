using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using portal_api.Context;
using portal_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Controllers
{
    /// <summary>
    /// The controller responsible for managing reports submitted by users.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly PictureContext _context;

        public RequestController(PictureContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retreives a list of a requests from the database. This action is only allowed for admins.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<RequestItem>>> GetRequests()
        {
            PortalUser user = await this.User.Get(_context);
            if (!user.IsAdmin)
            {
                return Forbid();
            }

            return await _context.RequestItems.ToListAsync();
        }

        /// <summary>
        /// Create a new report.
        /// </summary>
        /// <param name="request">The details of the report. RelatedPicture must be a valid image id.</param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PictureEntry>> PostRequest(RequestItemDTO request)
        {
            RequestItem requestItem = new();
            requestItem.Title = request.Title;
            requestItem.Description = request.Description;

            requestItem.RelatedPicture = await _context.Pictures.FindAsync(request.RelatedPicture);
            requestItem.RelatedPerson = await this.User.Get(_context);

            if (requestItem.RelatedPicture == null)
            {
                return NotFound();
            }

            _context.RequestItems.Add(requestItem);

            await _context.SaveChangesAsync();

            return CreatedAtAction("PostRequest", new { id = requestItem.RequestId }, requestItem);
        }
    }
}
