using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Model
{
    public class SignupDTO
    {
        [Required]
        public string Username { set; get; }

        [Required]
        public string Mail { set; get; }

        [Required]
        public string Password { set; get; }
    }
}
