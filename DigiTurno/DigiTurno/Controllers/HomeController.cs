using DigiTurno.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;



namespace DigiTurno.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
       

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        

        [HttpGet("/{id}")]
        public IActionResult Index(string? id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewData["id"] = id;
            }
            else
            {
                ViewData["id"] = "";
            }
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

    [HttpGet("AsignarCita/{id}")]
    public IActionResult AsignarCita(string? id)
    {
        if (!string.IsNullOrEmpty(id))
        {
            ViewData["id"] = id;
        }
        else
        {
            ViewData["id"] = "";
        }
        return View();
    }

    [HttpGet("ConfirmarCita/{id}")]
    public IActionResult ConfirmarCita(string? id)
    {
        if (!string.IsNullOrEmpty(id))
        {
            ViewData["id"] = id;
        }
        else
        {
            ViewData["id"] = "";
        }
        return View();
    }

        [HttpGet("turno/{id}")]
        public IActionResult ScreenTurno(string? id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewData["id"] = id;
            }
            else
            {
                ViewData["id"] = "";
            }
            return View();
        }

        [HttpGet("login/{id}")]
        public IActionResult Login(string? id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewData["id"] = id;
            }
            else
            {
                ViewData["id"] = "";
            }
            return View();
        }

        [HttpGet("dassboard/{id}")]
        public IActionResult Dasssboard(string? id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                ViewData["id"] = id;
            }
            else
            {
                ViewData["id"] = "";
            }
            // Obtener la hora actual en Colombia
            TimeZoneInfo colombiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
            DateTime colombiaTime = TimeZoneInfo.ConvertTime(DateTime.Now, colombiaTimeZone);

            string greeting;

            if (colombiaTime.Hour < 12)
            {
                greeting = "Buenos días";
            }
            else if (colombiaTime.Hour < 18)
            {
                greeting = "Buenas tardes";
            }
            else
            {
                greeting = "Buenas noches";
            }

            ViewData["Greeting"] = greeting;

            return View();
        }
       
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
