class UserModel {
  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; //recibe los usuarios de localstorage    
    
  }
  
  guardarUsuarios() { // guarda en el local storage el arreglo de usuarios registrados
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios)); //guarda los usuarios en localstorage
  }

  agregarUsuario(usuario,pass, nombre, apellido) { //agrega un usuario a usuarios
    // console.log("entra agregar usuario", this.validaUsuario(usuario,pass))
    if(this.getUsuario(usuario)==undefined){
      this.usuarios.push(new Usuario(usuario, pass,nombre,apellido));
      this.guardarUsuarios();
      return true
    }else{
      return false
    }    
  }

  getUsuarios(){//devuelve todos los usuarios
    return this.usuarios;
  }

  validaUsuario(us, passwd){ //valida el login de un usuario
    // console.log("valida usuario")
    return (this.usuarios.find((item)=>{if(item.user == us && item.pass==passwd){return item}}))
  }

  getUsuario(us){ //valida el login de un usuario
    // console.log("get usuario")
    return (this.usuarios.find((item)=>{if(item.user == us){return item}}))
  }

  actualiza(users){ // actualiza el local storage con un nuevo arreglo de usuarios registrados
    this.usuarios = users
    this.guardarUsuarios()
  }

  setUserActual(user){ // setea en el session storage el usuario logueado actual
    sessionStorage.setItem("userActual", JSON.stringify(user))  
  }

  getUserActual(){ // devuelve del session storage el usuario logueado actual
    return JSON.parse(sessionStorage.getItem("userActual")) 
  }
}
