using Microsoft.EntityFrameworkCore;
using portal_api.Model;

namespace portal_api.Context
{
    public class PictureContext : DbContext
    {
        public PictureContext(DbContextOptions<PictureContext> options) : base(options) { }

        public DbSet<PictureEntry> Pictures { set; get; }
        public DbSet<PortalUser> PortalUsers { set; get; }
        public DbSet<RequestItem> RequestItems { set; get; }
    }
}
