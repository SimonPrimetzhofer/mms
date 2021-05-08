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
                //.Include(p => p.Tags)
                .ToListAsync();
        }

        // GET: api/Pictures/ByLabel/:label
        [HttpGet("ByLabel/{label}")]
        public async Task<ActionResult<IEnumerable<PictureEntry>>> GetPicturesByLabel(string label)
        {
            return await _context.Pictures
                //.Where(p => p.Tags.Contains(label))
                //.Include(p => p.Tags)
                .ToListAsync();
        }

        // GET: api/Orders/5
       /* [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }*/

        // PUT: api/Orders/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        /*[HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // POST: api/Orders
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        /*[HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {

            //Get managed object from context, otherwise EF wants to insert a new customer
            var c = await _context.Customers.FindAsync(order.CustomerId);
            order.Customer = c;

            _context.Orders.Add(order);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }*/
    }
}
