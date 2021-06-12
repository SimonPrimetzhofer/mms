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
                .ToListAsync();
        }

        // GET: api/Pictures/ByTag/:tag
        [HttpGet("ByTag/{tag}")]
        public async Task<ActionResult<IEnumerable<PictureEntry>>> GetPicturesByLabel(string tag)
        {
            return await _context.Pictures
                .Where(p => p.Tag.Contains(tag))
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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPictureEntry(int id, PictureEntry picture)
        {
            if (id != picture.PictureId)
            {
                return BadRequest();
            }

            _context.Entry(picture).State = EntityState.Modified;

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
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PictureEntry>> PostPictureEntry(PictureEntryDTO picture)
        {

            PictureEntry pictureEntry = new ();
            pictureEntry.Title = picture.Title;
            pictureEntry.Tag = picture.Tag;
            pictureEntry.CreationDate = picture.CreationDate;

            //Get managed object from context, otherwise EF wants to insert a new customer
            if (picture.Creator != null)
            {
                var creator = await _context.PortalUsers.FindAsync(picture.Creator.UserId);
                pictureEntry.Creator = creator;
            }

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

            _context.RequestItems.RemoveRange(_context.RequestItems.Where(x => x.RelatedPicture == picture));
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
