﻿using Microsoft.AspNetCore.Authorization;
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
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly PictureContext _context;

        public RequestController(PictureContext context)
        {
            _context = context;
        }

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


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PictureEntry>> PostRequest(RequestItemDTO request)
        {
            RequestItem requestItem = new();
            requestItem.Title = request.Title;
            requestItem.Description = request.Description;

            requestItem.RelatedPicturePictureId = request.RelatedPicture;
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