using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Model
{
    public class LoggedInDTO
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public PortalUser User { get; set; }
    }
}
