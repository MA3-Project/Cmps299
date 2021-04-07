using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class ApplicationUser : IdentityUser
    {
  
        [Column(TypeName = "nvarchar(200)")]
        public string Last_Name { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        public string First_Name { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date_Of_Birth { get; set; }
        public int Currency { get; set; }

        public int Language { get; set; }

        public int Gender { get; set; }

        public int Country { get; set; }

        public int Region { get; set; }

        public int City { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string Company_Name { get; set; }

    }
}
