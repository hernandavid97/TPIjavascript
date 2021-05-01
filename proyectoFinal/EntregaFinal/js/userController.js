class UserController {
  constructor(usuarioModel, usuarioView) {
    this.userModel = usuarioModel;
    this.userView = usuarioView;    
  }

  registrar(){
    // console.log(this.userView)
    this.userView.registrarUsuario('#estadoRegistro', () => {
      if($("#Ruser").val().length>=5 && $("#Rpass").val().length>=5 && $("#RInNombre").val().length>0 && $("#RInApellido").val().length>0){
        if(this.userModel.agregarUsuario($("#Ruser").val(), $("#Rpass").val(), $("#RInNombre").val(),$("#RInApellido").val())){          
          return "Usuario Creado correctamente"
        }else{
          return "Usuario ya existe"
        }
      }else{
        return "Complete todos los campos, usuario y contraseña minimo 5 caracteres"
      }
    })
  }

  login(){
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

  actualizarUsuarios(users){
    this.userModel.actualiza(users)
  }

  getAllUsuarios(){
    return this.userModel.getUsuarios()
  }

  getUsuarioActual(){
    return this.userModel.getUserActual()
  }
}  
const app = new UserController(new UserModel(), new UserView());

