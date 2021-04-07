using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class Gender
    {

        [Key]
        public int Gender_Id { get; set; }
        public string GenderTypeEN { get; set; }
        public string GenderTypeAR { get; set; }
    }
}
