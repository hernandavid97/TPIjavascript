//Declaración de funciones----------------------------------
function cargaImagenes(){
  for(let i = 1; i<6; i++){
    // console.log(i)
    imagenes.push("img/bar("+i+").jpg");    
  }
}
function cambiaImagenes(){
  document.getElementById("contPrim").style.backgroundImage = `url("${imagenes[cont]}")`
  cont++
  if(cont>=imagenes.length){
    cont=0
  }
}

function precargaImagenes(){ 
  if(cont<=imagenes.length){
  document.getElementById("invisible").style.backgroundImage = `url("${imagenes[cont]}")`
  contpre++
  }  
}

function cargarDtosDisp(){
  //Carga descuentos disponibles del local storage o en su defecto carga inicialmente los dtos disponibles
  if(localStorage.getItem("dtosdisp")){
    dtosdisp=JSON.parse(localStorage.getItem("dtosdisp"))
  }else{
    dtosdisp.push(new Descuento("pizzaoff",0.20, 1, 10))
    dtosdisp.push(new Descuento("papasoff",0.25, 2, 15))
    dtosdisp.push(new Descuento("pintasoff",0.50, 3, 50))
    dtosdisp.push(new Descuento("HHpizza",0.50, 1, 1))
  }
}

function guardaDtosDisp(){
  //Guarda el estado de los descuentos disponibles, cuando se consumen se va, restando la cantidad
  localStorage.setItem("dtosdisp", JSON.stringify(dtosdisp))
}

function selecDto(ind){
  //Selecciona el producto adquirido seleccionado para aplicar en la cuenta
  dtoAplicado = misDescuentos[ind]  
  //console.log(dtoAplicado)
  muestraCuenta()
}

function selectDesc(misdesc, cod){
//esta función permite al usuario adquirir los descuentos que luego podrá usar al pagar la cuenta, los descuentos se adquieren ingresando un codigo de descuento detallado en el html.
  let filtrado = []  
  let estado
  if((misdesc.filter(e => e.codigo == cod)).length == 0){
    filtrado = dtosdisp.filter(d => d.codigo == cod)
    if(filtrado.length > 0){
      if (filtrado[0].cantidad > 0){
        misdesc.push(filtrado[0])
      }else {estado = ('El descuento seleccionado no se encuentra disponible')}
    }else{estado = ("Codigo de descuento invalido")}
    for(item of dtosdisp){
      if(item.codigo == cod){
        item.cantidad = item.cantidad-1
        guardaMisDesc()
        guardaDtosDisp()
      }
    }
  }else{
    estado = ("Descuento ya reclamado")
  }    
  muestraMisDesc()
  muestraDtos();
  return estado
}

function ingresarCuenta(prodsel, cant) {
  //Esta función permite al usuario cargar que productos consumió    
  function Prod(producto, cantidad){this.producto = producto, this.cantidad=cantidad}      
  if(cant > 0){
    cuenta.push(new Prod(prodsel, cant))       
    muestraCuenta()        
  }    
}

function quitarProd(indice) {
  //Quita un producto de la cuenta
  cuenta.splice(indice,1)
  muestraCuenta()
}

function aplicarDesc(){
  //Esta función aplica el descuento seleccionado al monto total    
  if(montoTotal > 0){    
    let cant = 0
    filtrado = listaprod.filter((e)=>e.id == dtoAplicado.producto)  
    if(filtrado.length>0){
      for(item of cuenta){          
        if(item.producto == filtrado[0].id){
          cant = cant + parseInt(item.cantidad)
          //console.log("cantidad: " + cant)
        }
      }
      if(!cant){
        cant = 0
      }
      montoDescuento = (filtrado[0].precio*cant*dtoAplicado.porcentaje)
      //console.log("monto descuento: " + montoDescuento)
    }else{montoDescuento=0}
    // misDescuentos.splice(misDescuentos.indexOf(dtoAplicado),1)
    muestraMisDesc()
    // muestraCuenta()  
  }
}

function quitarDto(){
  //quita el descuento aplicado a la cuenta (Usado cuando se paga o se desea usar otro descuento)
  dtoAplicado = new Descuento("", 0, 0,0)  
  muestraCuenta()
}

function cargaMisDesc(){
  //Carga del local storage los descuentos adquiridos
  if(localStorage.getItem("misDescuentos")){
    let old = JSON.parse(localStorage.getItem("misDescuentos"))
    for(item of old){
      misDescuentos.push(item)
    }
  }
}

function guardaMisDesc(){
  //Guarda los descuentos adquiridos en local storage, para mantenerlos en la proxima sesion
  localStorage.setItem("misDescuentos", JSON.stringify(misDescuentos)) 
}