class UserView {
  constructor(){

  }
  iniciarSesion(domEstado,callback){
    if(callback()){      
      window.location="#/home";
    }else{
      $(domEstado).html("Usuario o contraseña incorrectos")
    }
  }
  registrarUsuario(domEstado, callback){    
      $(domEstado).html(callback())
      //ir a login
  }
}
