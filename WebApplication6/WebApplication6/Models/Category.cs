using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication6.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Slug { get; set; }


        public int ParentId { get; set; }

        public bool? Active { get; set; }

        public DateTime? CreateDate { get; set; }

    }
}