using portal_api.Context;
using portal_api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace portal_api
{
    /// <summary>
    /// Provides a common utility for all controllers.
    /// </summary>
    public static class UserHelper
    {
        /// <summary>
        /// Allows all controllers to easily retreive the current PortalUser using <code>await this.User.get(_context)</code>
        /// </summary>
        /// <param name="principal"></param>
        /// <param name="context"></param>
        /// <returns></returns>
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
