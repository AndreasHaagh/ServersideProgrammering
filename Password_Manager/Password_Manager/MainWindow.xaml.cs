using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Password_Manager
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            List<Users> userList = GetUsers();
            foreach (var item in userList)
            {
                Debug.WriteLine(item.id);
                Debug.WriteLine(item.name);
                Debug.WriteLine(item.email);
                Debug.WriteLine(item.master_password);
                Debug.WriteLine(item.token);
                Debug.WriteLine(item.created);
                Debug.WriteLine(item.modified);
            }            
        }

        private List<Users> GetUsers()
        {
            string json = new WebClient().DownloadString("http://127.0.0.1:3001/");
            List<Users> users = JsonConvert.DeserializeObject<List<Users>>(json);
            return users;
        }
    }

    class Users
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string master_password { get; set; }
        public string token { get; set; }
        public DateTime created { get; set; }
        public DateTime modified { get; set; }
    }
}
