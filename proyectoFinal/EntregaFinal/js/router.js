function domHome(home, login, register){
  $(home).fadeIn()
  $(login).css("display", "none")
  $(register).css("display", "none")
  $("#bienvenido").text(`Bienvenido ${app.getUsuarioActual().nombre} ${app.getUsuarioActual().apellido}`)
  $("#cerrarSesion").fadeIn()
  $("#404").css("display", "none")
}

function domLogin(home, login, register){  
  $(home).css("display", "none")
  $(login).fadeIn()
  $(register).css("display", "none")
  $("#bienvenido").text(``)
  $("#cerrarSesion").css("display", "none")
  $("#404").css("display", "none")
}

function domRegister(home, login, register){
  $(home).css("display", "none")
  $(login).css("display", "none")
  $(register).fadeIn()
  $("#bienvenido").text(``)
  $("#cerrarSesion").fadeIn().attr("value", "ir al login")
  $("#404").css("display", "none")
}

const routes=[
  {path:'/home', action:"home"},
  {path:'/', action:"login"},
  {path:'/register', action:"register"}
]

const ErrorRouter = (domError) => {
  $(domError).append('<div id="404" class="align-items-center" style="display:none;"><h2 style="width:100%" class="error">Error 404</h2> <a href="#/"><input type="button" class="boton" value="ir a login"></input></a></div>');
  
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

//BUSCAMOS LA ACCIÓN EN EL ARRAY routes QUE CORRESPONDE A LA RUTA CON FIND 
const findActionByPath = (path, routes) => routes.find(r => r.path == path || undefined);

const router = () => {
  //OBTENER RUTA ACTUAL
  const path    = parseLocation(); 
  const { action = 'error' } = findActionByPath(path, routes) || {}; 
  // LLAMAMOS AL MÈTODO CORRESPONDIENTE PARA LA ACCIÒN ENCONTRADA
  switch (action) {
    case 'home':      
      if(app.getUsuarioActual()==null){
        window.location= "#/"
      }
      domHome("#home", "#login", "#register")      
      ejecutar()
      break;
    case 'login':  
      if(app.getUsuarioActual()!=null){
        window.location= "#/home"
      }
      domLogin("#home", "#login", "#register")
      break;
    case 'register':
      domRegister("#home", "#login", "#register")
      break;
    default:
      $(home).css("display", "none")
      $(login).css("display", "none")
      $(register).css("display", "none")
      ErrorRouter('#contsec')
      $("#404").fadeIn()
      break;
  }
}

//CADA VEZ QUE SE DETECTA LA CARGA DE LA VENTANA SE LLAMA A LA FUNCION ROUTER
$( window ).on( 'load', function()  {
  router();
});
//CADA VEZ QUE SE DETECTA UN CAMBIO EN EL HASH (EJEMPLO la URL CAMBIA DE #/pagina1 a #/pagina2) SE LLAMA A LA FUNCION ROUTER
$( window ).on( 'hashchange', function() {
    router();
} );


