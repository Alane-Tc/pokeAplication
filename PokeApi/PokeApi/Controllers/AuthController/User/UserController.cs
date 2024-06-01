using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PokeApi.Dtos.AuthController.User;

namespace PokeApi.Controllers.AuthController.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// GetUserInformation.
        /// </summary>
        /// <returns>An enumerable of weather forecasts.</returns>
        [HttpGet("{email}")]
        public async Task<UserDto> GetInformationUser(string email)
        {
            //https://localhost:44320/api/User/homelander%40mail.com'

            UserDto userDto = new UserDto();

            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                userDto.UserName = user.UserName;
                userDto.Email = user.Email;
            }
          
            return userDto;
        }


        [HttpPost]
        public async Task<IActionResult> Register(UserDto model)
        {
                var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // Puedes agregar roles o realizar otras acciones aquí
                    //return RedirectToAction("Index", "Home");
                    return Ok(new { message = "Usuario creado correctamente" });
            }

            //foreach (var error in result.Errors)
            //{
            //    ModelState.AddModelError(string.Empty, error.Description);
            //}

            var errors = result.Errors.Select(e => e.Description).ToList();
            return BadRequest(new { message = "Algo salió mal", errors });
        }

    }
}
