using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class Region
    {
        [Key]
        public int Region_Id { get; set; }
        public int Country_Id { get; set; }
        public string Region_NameEN { get; set; }
        public string Region_NameAR { get; set; }
    }
}
