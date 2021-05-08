using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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

        public bool IsAdmin { set; get; }
    }
}
