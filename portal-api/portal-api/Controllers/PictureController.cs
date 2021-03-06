using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using portal_api.Model;
using portal_api.Context;
using System.IO;

namespace portal_api.Controllers
{
    /// <summary>
    /// The controller responsible for managing images.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly PictureContext _context; 

        public PictureController(PictureContext context)
        {
            _context = context;
        }

        // GET: api/Pictures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PictureEntry>>> GetPictures()
        {

            //Include for joining foreign key relation-objects
            return await _context.Pictures
                .Include(p => p.Creator)
                .ToListAsync();
        }

        // GET: api/Pictures/ByUserId/:userId
        [HttpGet("ByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<PictureEntry>>> GetPicturesByUserId(string userId)
        {
            return await _context.Pictures
                .Where(p => p.CreatorUserId == Convert.ToInt32(userId))
                .Include(p => p.Creator)
                .ToListAsync();
        }

        // GET: api/Pictures/ByTag/:tag
        [HttpGet("ByTag/{tag}")]
        public async Task<ActionResult<IEnumerable<PictureEntry>>> GetPicturesByLabel(string tag)
        {
            return await _context.Pictures
                .Where(p => p.Tag.Contains(tag))
                .Include(p => p.Creator)
                .ToListAsync();
        }

        // GET: api/Pictures/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<PictureEntry>> GetPictureEntry(int id)
        {
            var picture = await _context.Pictures.FindAsync(id);

            if (picture == null)
            {
                return NotFound();
            }

            return picture;
        }

        // PUT: api/Pictures/:id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPictureEntry(int id, PictureEntryDTO picture)
        {
            if (id != picture.PictureId)
            {
                return BadRequest();
            }
            var pic = await _context.Pictures.FindAsync(id);
            pic.Tag = picture.Tag;
            pic.Title = picture.Title;

            _context.Entry(pic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PictureEntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pictures
        [HttpPost]
        public async Task<ActionResult<PictureEntry>> PostPictureEntry(PictureEntryDTO picture)
        {

            PictureEntry pictureEntry = new ();
            pictureEntry.Title = picture.Title;
            pictureEntry.Tag = picture.Tag;
            pictureEntry.CreationDate = picture.CreationDate;

            //Get managed object from context, otherwise EF wants to insert a new customer
            var creator = await _context.PortalUsers.FindAsync(picture.CreatorId);
            pictureEntry.CreatorUserId = creator.UserId;

            pictureEntry.Image = Convert.FromBase64String(picture.Image);

            _context.Pictures.Add(pictureEntry);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostPictureEntry", new { id = pictureEntry.PictureId }, pictureEntry);
        }

        // DELETE: api/Pictures/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult<PictureEntry>> DeletePicture(int id)
        {
            var picture = await _context.Pictures.FindAsync(id);
            if (picture == null)
            {
                return NotFound();
            }

            _context.Pictures.Remove(picture);
            await _context.SaveChangesAsync();

            return picture;
        }

        private bool PictureEntryExists(int id)
        {
            return _context.Pictures.Any(e => e.PictureId == id);
        }
    }
}
