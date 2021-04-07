using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class ApplicationCustomerModel
    {
        public string First_Name { get; set; }

        public string Last_Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }
        public string UserName { get; set; }

        public DateTime Date_Of_Birth { get; set; }

        public int Country { get; set; }

        public int Region { get; set; }

        public int City { get; set; }
        public int Gender { get; set; }
        public string ClientURI { get; set; }
        public string Role { get; set; }
    }
}
