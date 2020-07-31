
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication6.Models;

namespace WebApplication6.Controllers
{
    public class CategoryController : Controller
    {
        
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }
        public string conString = "Data Source=DESKTOP-9DOEPLG\\MSSQLSERVER1;Initial Catalog=blog;Integrated Security=True";
        [HttpGet]
        public IEnumerable GetCategory()
        {
            List<Category> ListCategory = new List<Category>();
            SqlConnection db = new SqlConnection(conString);
            db.Open();
  
            SqlCommand cmd = new SqlCommand("dbo.Read_category", db);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();
            while (sqlDataReader.Read())
                {
                    Category Category = new Category();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        var name = sqlDataReader.GetName(i);
                        var value = sqlDataReader.GetValue(i);
                        var property = Category.GetType().GetProperty(name);
                        if (property != null && value != DBNull.Value)
                        {
                            property.SetValue(Category, value);
                        }
                    }
                    ListCategory.Add(Category);
                }
            db.Close();
            return JsonConvert.SerializeObject(ListCategory);

           
        }
        [HttpPost]
        public void Create(Category model)
        {
            try
            {

                SqlConnection db = new SqlConnection(conString);
                db.Open();



              
               


                SqlCommand cmd = new SqlCommand("dbo.Create_category", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", model.Name);
                cmd.Parameters.AddWithValue("@Slug", model.Slug);
                cmd.Parameters.AddWithValue("@ParentId", model.ParentId);
                cmd.Parameters.AddWithValue("@Active", model.Active);
                cmd.Parameters.AddWithValue("@CreateDate", model.CreateDate);
                cmd.ExecuteNonQuery();



            }
            catch (Exception ex)
            {

                throw ex;
            }

          
        }
        public IEnumerable GetById( int Id)
        {

            try
            {


               


                List<Category> ListCategory = new List<Category>();
               

                SqlConnection db = new SqlConnection(conString);
                db.Open();

                SqlCommand cmd = new SqlCommand("dbo.ListCategory", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                SqlDataReader sqlDataReader = cmd.ExecuteReader();
               

                while (sqlDataReader.Read())
                {
                    Category Category = new Category();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        var name = sqlDataReader.GetName(i);
                        var value = sqlDataReader.GetValue(i);
                        var property = Category.GetType().GetProperty(name);
                        if (property != null && value != DBNull.Value)
                        {
                            property.SetValue(Category, value);
                        }
                    }
                    ListCategory.Add(Category);
                }
                db.Close();
                return JsonConvert.SerializeObject(ListCategory);






            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
        [HttpPost]
        public void Update(Category model)
        {
            try
            {

                SqlConnection db = new SqlConnection(conString);
                db.Open();



             


                SqlCommand cmd = new SqlCommand("Update_category", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", model.Id);
                cmd.Parameters.AddWithValue("@Name", model.Name);
                cmd.Parameters.AddWithValue("@Slug", model.Slug);
                cmd.Parameters.AddWithValue("@ParentId", model.ParentId);
                cmd.Parameters.AddWithValue("@Active", model.Active);
               
                cmd.ExecuteNonQuery();



            }
            catch (Exception ex)
            {

                throw ex;
            }

           
        }
        [HttpPost]
        public IEnumerable Delete (int Id)
        {
            try
            {


                SqlConnection db = new SqlConnection(conString);
                db.Open();

                SqlCommand cmd = new SqlCommand("Delete_category", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                

                return cmd.ExecuteReader();
            


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
    }
}