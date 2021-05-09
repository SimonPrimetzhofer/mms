using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using portal_api.Model;
using portal_api.Context;

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
                .Where(p => p.Tag.Equals(tag))
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
        public async Task<ActionResult<PictureEntry>> PostPictureEntry(PictureEntry picture)
        {

            //Get managed object from context, otherwise EF wants to insert a new customer
            var creator = await _context.PortalUsers.FindAsync(picture.Creator.UserId);
            picture.Creator = creator;

            _context.Pictures.Add(picture);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostPictures", new { id = picture.PictureId }, picture);
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
