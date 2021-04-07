using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemberMicroservice.Models;

namespace MemberMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly MemberContext _context;

        public AddressesController(MemberContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("AddAddress")]
        public  IActionResult PostAddress(Address address)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

          
                _context.Address.Add(new Address()
                {
                    UserId = address.UserId,
                    Country = address.Country,
                    Region = address.Region,
                    City= address.City,
                    Reciever_First_Name=address.Reciever_First_Name,
                    Reciever_Last_Name= address.Reciever_Last_Name,
                    Phone_Number= address.Phone_Number,
                    Additional_Info= address.Additional_Info
                });

                _context.SaveChanges();
            

            return Ok();
        }
    }
    
}
