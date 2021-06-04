using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public int? CreatorUserId { set; get; }
        [Required]
        public PortalUser Creator { set; get; }

        [Required]
        public byte[] Image { set; get; }
    }
}
