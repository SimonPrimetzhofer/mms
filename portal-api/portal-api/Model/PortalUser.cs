using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Model
{
    public class PortalUser
    {
        [Key]
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { set;  get; }

        [Required]
        public string Username { set; get; }

        [Required]
        public string Mail { set; get; }

        [Required]
        public string Password { set; get; }

        [Required]
        public ICollection<PictureEntry> PictureEntries { set; get; }
    }
}
