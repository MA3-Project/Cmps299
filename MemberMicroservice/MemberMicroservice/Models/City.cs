using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class City
    {
        [Key]
        public int City_Id { get; set; }
        public int Region_Id { get; set; }
        public string City_NameEN { get; set; }
        public string City_NameAR { get; set; }
    }
}
