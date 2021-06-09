using portal_api.Context;
using portal_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace portal_api
{
    public static class UserHelper
    {
        public static async Task<PortalUser> Get(this ClaimsPrincipal principal, PictureContext context)
        {
            string idText = principal?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(idText, out int id))
            {
                return null;
            }

            return await context.PortalUsers.FindAsync(id);
        }
    }
}
