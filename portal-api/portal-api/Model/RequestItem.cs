using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace portal_api.Model
{
    public class RequestItem
    {
        [Key]
        [ScaffoldColumn(false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestId { set; get; }

        [Required]
        public string Title { set; get; }

        [Required]
        public string Description { set; get; }

        public int? RelatedPicturePictureId { set; get; }

        [Required]
        public PictureEntry RelatedPicture { set; get; }

        public int? RelatedPersonUserId { set; get; }

        [Required]
        public PortalUser RelatedPerson { set; get; }

        
    }
}
