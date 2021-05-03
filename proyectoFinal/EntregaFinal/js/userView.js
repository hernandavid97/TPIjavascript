class UserView {
  constructor(){

  }
  iniciarSesion(domEstado,callback){ //inicia sesion del usuario o escribe el error de logueo
    if(callback()){      
      window.location="#/home";
    }else{
      $(domEstado).html("Usuario o contraseña incorrectos")
    }
  }
  registrarUsuario(domEstado, callback){     // registra un nuevo usuario y muestra el estado del registro en el dom
      $(domEstado).html(callback())
  }
}
