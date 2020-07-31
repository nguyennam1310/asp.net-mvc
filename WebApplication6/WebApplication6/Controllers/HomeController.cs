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
   
    public class HomeController : Controller
    {
        public string conString = "Data Source=DESKTOP-9DOEPLG\\MSSQLSERVER1;Initial Catalog=blog;Integrated Security=True";
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpGet]
        public IEnumerable LoadData1(int Id)
        {
            List<News> ListNews = new List<News>();
            SqlConnection db = new SqlConnection(conString);
            db.Open();

            SqlCommand cmd = new SqlCommand("dbo.FirstNews", db);
            cmd.Parameters.AddWithValue("@PageIndex", Convert.ToInt32(Id));
            cmd.Parameters.AddWithValue("@PageSize", 15);
            cmd.CommandType = CommandType.StoredProcedure;
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
        public IEnumerable LoadData2(int Id)
        {
            List<News> ListNews = new List<News>();
            SqlConnection db = new SqlConnection(conString);
            db.Open();

            SqlCommand cmd = new SqlCommand("dbo.SecondNews", db);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", Convert.ToInt32(Id));
            cmd.Parameters.AddWithValue("@PageSize", 15);
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
        public IEnumerable LoadData3(int Id)
        {
            List<News> ListNews = new List<News>();
            SqlConnection db = new SqlConnection(conString);
            db.Open();

            SqlCommand cmd = new SqlCommand("dbo.BlogNews", db);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PageIndex", Convert.ToInt32(Id));
            cmd.Parameters.AddWithValue("@PageSize", 15);
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
    }
}