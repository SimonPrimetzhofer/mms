using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace portal_api.Model
{
    public class RequestItemDTO
    {
        [Required]
        public string Title { set; get; }

        [Required]
        public string Description { set; get; }

        [Required]
        public int RelatedPicture { set; get; }
    }
}
