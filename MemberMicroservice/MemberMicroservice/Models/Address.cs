using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MemberMicroservice.Models
{
    public class Address
    {
        [Key]
        public int Address_ID { get; set; }
        public string UserId { get; set; }
        public int Country { get; set; }
        public int Region { get; set; }
        public int City { get; set; }
        public string Reciever_Last_Name { get; set; }
        public string Reciever_First_Name { get; set; }
        public string Phone_Number { get; set; }
        public string Additional_Info { get; set; }
        
    }
}
