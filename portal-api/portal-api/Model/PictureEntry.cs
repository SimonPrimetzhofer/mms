using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Model
{
    public class PictureEntry
    { 
        [Key]
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PictureId { set; get; }

        [Required]
        public string Title { set; get; }
        
        public string Tag { set; get; }

        [Required]
        public DateTime CreationDate { set; get; }

        public PortalUser Creator { set; get; }

        [Required]
        public byte[] Image { set; get; }
    }
}
