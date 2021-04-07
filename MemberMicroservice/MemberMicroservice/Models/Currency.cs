using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class Currency
    {
        [Key]
        public int Currency_Id { get; set; }
        public string Currency_NameEN { get; set; }
        public string Currency_NameAR { get; set; }
    }
}
