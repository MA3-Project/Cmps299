using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class Language
    {
        [Key]
        public int Language_Id { get; set; }
        public string Language_Name { get; set; }

    }
}
