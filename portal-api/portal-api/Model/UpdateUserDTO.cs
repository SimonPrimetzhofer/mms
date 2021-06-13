using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Model
{
    public class UpdateUserDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Mail { get; set; }
    }
}
