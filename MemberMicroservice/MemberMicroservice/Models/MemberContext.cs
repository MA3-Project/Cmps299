using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MemberMicroservice.Models;

namespace MemberMicroservice.Models
{
    public partial class MemberContext : DbContext
    {
        public MemberContext()
        {
        }
        public MemberContext(DbContextOptions<MemberContext> options)
            : base(options)
        {
        }

        public DbSet<MemberMicroservice.Models.Country> Country { get; set; }

        public DbSet<MemberMicroservice.Models.Region> Region { get; set; }

        public DbSet<MemberMicroservice.Models.City> City { get; set; }

        public DbSet<MemberMicroservice.Models.Language> Language { get; set; }

        public DbSet<MemberMicroservice.Models.Gender> Gender { get; set; }

        public DbSet<MemberMicroservice.Models.Currency> Currency { get; set; }
        public DbSet<MemberMicroservice.Models.Address> Address { get; set; }

    }
}