class UserController {
  constructor(usuarioModel, usuarioView) {
    this.userModel = usuarioModel;
    this.userView = usuarioView;    
  }

  registrar(){ //valida los campos y envia los datos al modelo para el registro de un usuario, finalmente retorna el estado de el registro para ser escrito en el DOM por la vista
    this.userView.registrarUsuario('#estadoRegistro', () => {
      if($("#Ruser").val().length>=5 && $("#Rpass").val().length>=5 && $("#RInNombre").val().length>0 && $("#RInApellido").val().length>0){
        if(this.userModel.agregarUsuario($("#Ruser").val(), $("#Rpass").val(), $("#RInNombre").val(),$("#RInApellido").val())){   
          $("#estadoRegistro").attr("class", "text-center success")     
          $("#Ruser").attr("class", "")
          $("#Rpass").attr("class", "")
          $("#RInNombre").attr("class", "")
          $("#RInApellido").attr("class", "")  
          return "Usuario Creado correctamente"
        }else{
          $("#estadoRegistro").attr("class", "text-center error")
          return "Usuario ya existe"
        }
      }else{
        $("#estadoRegistro").attr("class", "text-center error")
        if($("#Ruser").val().length<5){
          $("#Ruser").attr("class", "border-red")
        }else{
          $("#Ruser").attr("class", "")
        }
        if($("#Rpass").val().length<5){
          $("#Rpass").attr("class", "border-red")
        }else{
          $("#Rpass").attr("class", "")
        }
        if($("#RInNombre").val().length<1){
          $("#RInNombre").attr("class", "border-red")
        }else{
          $("#RInNombre").attr("class", "")
        }
        if($("#RInApellido").val().length<1){
          $("#RInApellido").attr("class", "border-red")
        }else{
          $("#RInApellido").attr("class", "")
        }
        return "Complete todos los campos, usuario y contraseña minimo 5 caracteres"
      }
    })
  }

  login(){ //envia los datos al modelo para que valide el inicio de session, si está bien logueado guarda el usuario actual en el sesion storage
    this.userView.iniciarSesion('#estadoLogin', () => {
      let userActual
      if((userActual = this.userModel.validaUsuario($("#user").val(), $("#pass").val()))!=undefined){      
        this.userModel.setUserActual(userActual)
        return true
      }
      else{
        return false
      }
    })
  }

  actualizarUsuarios(users){ //actualiza los usuarios registrados en el local storage
    this.userModel.actualiza(users)
  }

  getAllUsuarios(){ // retorna todos los usuarios registrados (con los datos manejados por el modelo)
    return this.userModel.getUsuarios()
  }

  getUsuarioActual(){ //devuelve el usuario actual logueado desde el session storage (con los datos manejados por el modelo)
    return this.userModel.getUserActual()
  }
}  
const app = new UserController(new UserModel(), new UserView());

