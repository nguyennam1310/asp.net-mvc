using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication6.Models;

namespace WebApplication6.Controllers
{
    public class NewsController : Controller
    {

        public string conString = "Data Source=DESKTOP-9DOEPLG\\MSSQLSERVER1;Initial Catalog=blog;Integrated Security=True";
        // GET: News
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IEnumerable GetNews(int Id)
        {
            List<News> ListNews = new List<News>();
            SqlConnection db = new SqlConnection(conString);
            db.Open();

            SqlCommand cmd = new SqlCommand("dbo.Read_news", db);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", Convert.ToInt32(Id));
            cmd.Parameters.AddWithValue("@PageSize", 3);
            SqlDataReader sqlDataReader = cmd.ExecuteReader();
            while (sqlDataReader.Read())
            {
                News News = new News();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var name = sqlDataReader.GetName(i);
                    var value = sqlDataReader.GetValue(i);
                    var property = News.GetType().GetProperty(name);
                    if (property != null && value != DBNull.Value)
                    {
                        property.SetValue(News, value);
                    }
                }
                ListNews.Add(News);
            }
            db.Close();
            return JsonConvert.SerializeObject(ListNews);


        }
      
        [HttpPost]
        public void Create(News model )
        {
            try
            {
              

                SqlConnection db = new SqlConnection(conString);
                db.Open();



                string _FileName = Path.GetFileName(model.file.FileName);
                string _path = Path.Combine(Server.MapPath("~/Img"), _FileName);
                model.file.SaveAs(_path);



                SqlCommand cmd = new SqlCommand("dbo.Create_news", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Title", model.Title);
                cmd.Parameters.AddWithValue("@Sapo", model.Sapo);
                cmd.Parameters.AddWithValue("@CategoryId", model.CategoryId);
                cmd.Parameters.AddWithValue("@Avatar", _FileName);
                cmd.Parameters.AddWithValue("@Description", model.Description);
                cmd.Parameters.AddWithValue("@Active", model.Active);
                cmd.Parameters.AddWithValue("@ModifyDate", model.ModifyDate);
                cmd.Parameters.AddWithValue("@CreateDate", model.CreateDate);
                cmd.ExecuteNonQuery();



            }
            catch (Exception ex)
            {

                throw ex;
            }

            
        }
        [HttpPost]
        public void Create1(News model)
        {
            try
            {


                SqlConnection db = new SqlConnection(conString);
                db.Open();






                SqlCommand cmd = new SqlCommand("dbo.Create_news1", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Title", model.Title);
                cmd.Parameters.AddWithValue("@Sapo", model.Sapo);
                cmd.Parameters.AddWithValue("@CategoryId", model.CategoryId);
               
                cmd.Parameters.AddWithValue("@Description", model.Description);
                cmd.Parameters.AddWithValue("@Active", model.Active);
                cmd.Parameters.AddWithValue("@ModifyDate", model.ModifyDate);
                cmd.Parameters.AddWithValue("@CreateDate", model.CreateDate);
                cmd.ExecuteNonQuery();



            }
            catch (Exception ex)
            {

                throw ex;
            }

            
        }

        public IEnumerable GetById(int Id)
        {

            try
            {





                List<News> ListNews = new List<News>();


                SqlConnection db = new SqlConnection(conString);
                db.Open();

                SqlCommand cmd = new SqlCommand("dbo.ListNews", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                SqlDataReader sqlDataReader = cmd.ExecuteReader();


                while (sqlDataReader.Read())
                {
                    News News = new News();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        var name = sqlDataReader.GetName(i);
                        var value = sqlDataReader.GetValue(i);
                        var property = News.GetType().GetProperty(name);
                        if (property != null && value != DBNull.Value)
                        {
                            property.SetValue(News, value);
                        }
                    }
                    ListNews.Add(News);
                }
                db.Close();
                return JsonConvert.SerializeObject(ListNews);






            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        [HttpPost]
        public void Update(News model)
        {
            try
            {

                SqlConnection db = new SqlConnection(conString);
                db.Open();

                    string _FileName = Path.GetFileName(model.file.FileName);
                    string _path = Path.Combine(Server.MapPath("~/Img"), _FileName);
                    model.file.SaveAs(_path);


            
                SqlCommand cmd = new SqlCommand("Update_news", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", model.Id);
             
                cmd.Parameters.AddWithValue("@Title", model.Title);
                cmd.Parameters.AddWithValue("@Sapo", model.Sapo);
                cmd.Parameters.AddWithValue("@CategoryId", model.CategoryId);
           

                  cmd.Parameters.AddWithValue("@Avatar", _FileName);



                cmd.Parameters.AddWithValue("@Description", model.Description);
                cmd.Parameters.AddWithValue("@Active", model.Active);
                cmd.Parameters.AddWithValue("@ModifyDate", model.ModifyDate);
                

                cmd.ExecuteNonQuery();



            }
            catch (Exception ex)
            {

                throw ex;
            }

            
        }
        public void Update1(News model)
        {
            try
            {

                SqlConnection db = new SqlConnection(conString);
                db.Open();

     



                SqlCommand cmd = new SqlCommand("Update_news1", db);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", model.Id);

                cmd.Parameters.AddWithValue("@Title", model.Title);
                cmd.Parameters.AddWithValue("@Sapo", model.Sapo);
                cmd.Parameters.AddWithValue("@CategoryId", model.CategoryId);


      



                cmd.Parameters.AddWithValue("@Description", model.Description);
                cmd.Parameters.AddWithValue("@Active", model.Active);
                cmd.Parameters.AddWithValue("@ModifyDate", model.ModifyDate);


                cmd.ExecuteNonQuery();



            }
            catch (Exception ex)
            {

                throw ex;
            }

          
        }
        public IEnumerable GetCount()
        {

            SqlConnection db = new SqlConnection(conString);
            db.Open();

            SqlCommand cmd = new SqlCommand("dbo.countnew", db);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@TotalRecord", SqlDbType.Int).Direction = ParameterDirection.Output;


            cmd.ExecuteReader();

            db.Close();
            return JsonConvert.SerializeObject(Convert.ToInt32(cmd.Parameters["@TotalRecord"].Value));


        }
    
        [HttpPost]
        public IEnumerable Delete(int Id)
        {
            try
            {


                SqlConnection db = new SqlConnection(conString);
                db.Open();

                SqlCommand cmd = new SqlCommand("Delete_news", db);
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