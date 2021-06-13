using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace portal_api.Model
{
    public class PictureEntryDTO
    {
        public int PictureId { set; get; }

        public string Title { set; get; }

        public string Tag { set; get; }

        public DateTime CreationDate { set; get; }

        public int CreatorId { set; get; }
        
        public string Image { set; get; }
    }
}
