
const routes=[
  {path:'/home', action:"home"},
  {path:'/', action:"login"},
  {path:'/register', action:"register"}
]

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
      if(app.getUsuarioActual()==null){ //redirecciona al login si no hay un usuario logueado
        window.location= "#/"
      }
      domHome("#home", "#login", "#register") //dibuja el DOM de home     
      ejecutar() //ejecuta las funciones inicializadoras del home
      break;
    case 'login':  
      if(app.getUsuarioActual()!=null){ //si el usuario esta logueado lo redirige al home, para llegar al loguin debe cerrar sesion
        window.location= "#/home"
      }
      domLogin("#home", "#login", "#register") // dibuja el DOM de login
      break;
    case 'register':
      domRegister("#home", "#login", "#register") //dibuja el DOM de register
      break;
    default: //dibuja en el DOM el error y oculta el resto de elementos      
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


