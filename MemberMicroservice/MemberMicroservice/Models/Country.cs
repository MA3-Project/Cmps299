using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class Country
    {
        [Key]
        public int Country_Id { get; set; }
        public string Country_NameEN { get; set; }
        public string Country_NameAR { get; set; }
    }
}
