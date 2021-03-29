// Proyecto integrador Javascript. Alumno: Hernán Arcari. Profesor: Andrés Kouvach.

// Idea del proyecto: La idea del proyecto es hacer un sitio donde el usuario (cliente) adquiera descuentos en un bar (o en algun momento descuentos de varios bares, los cuales cargaran sus descuentos) y pueda aplicarlos luego a la hora de pagar la cuenta, la cual tambien se calculará en el mismo sitio aplicando los descuentos seleccionados por el cliente y dando el monto final a pagar, para evitar que los bares cobren cargos indebidos ya que el cliente contara con el detalle del monto final que debe pagar por los productos que ha consumido, el subtotal sin descuentos y el descuento aplicado.


//-------------------------------------------------------------------------------------------

//Declaración de Objetos y clases-------------------------------------
class Producto {
  constructor(id, nombre, precio, detalle){
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.detalle = detalle
  }
}

class Descuento {
  constructor(codigo, porcentaje, producto, cantidad){
    this.producto = producto
    this.codigo = codigo
    this.porcentaje = porcentaje
    this.cantidad = cantidad
  }
}

//Declaración de arreglos y variables-------------------------------------
let listaprod=[]
listaprod.push(new Producto(1,"pizzas",400, "Pizza de  8 porciones"))
listaprod.push(new Producto(2,"papas",310, "Papas con cheddar y panzeta"))
listaprod.push(new Producto(3,"pintas",160, "Pintas cualquier variedad"))

let dtosdisp=[]

let misDescuentos=[]

let cuenta = []
let montoTotal = 0
let montoDescuento = 0
let dtoAplicado = new Descuento("", 0, 0,0)
//Declaración de funciones----------------------------------

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
//funciones del DOM------------------------------------------------------
function muestraDtos() {
  //Escribe en el DOM los Descuentos disponibles para adquirir
  let cont = document.getElementById("descuentos")
  let filtrado
  cont.innerHTML=""
  cont.innerHTML="<h2 style='margin:0px !important;'>Descuentos disponibles</h2>"
  cont.innerHTML= cont.innerHTML + "<h3 style='margin:5px !important;'>Adquirí los codigos y usalos cuando quieras</h3>"
  for(item of dtosdisp){
    filtrado = listaprod.filter((e)=>e.id == item.producto) 
    if(item.cantidad > 0){
      cont.innerHTML= cont.innerHTML+`<p>· ${item.porcentaje*100}% de descuento en <u>${filtrado[0].nombre}</u> con el codigo <b>${item.codigo}</b> | Disponibles: ${item.cantidad}</p>`
    }
  }
}

function muestraProds() {
  //Escribe en el DOM los productos del bar
  let cont = document.createElement("div");  
  let select = document.getElementById("selectProductos")
  cont.id="productos"
  cont.className="tarjDescProd" 
  cont.innerHTML=cont.innerHTML + "<h2 style='margin:0;' >Nuestros productos:</h2>"
  for(item of listaprod){
    cont.innerHTML= cont.innerHTML+`
    <ul> <li> <b style="text-transform:capitalize;">${item.detalle}</b> - Precio: $${item.precio} | Codigo: ${item.id}</li>
    </ul>
    `
    let opc = document.createElement("option")
    opc.value=`${item.id}`
    opc.innerText=`${item.detalle}`
    select.appendChild(opc)  
  }
  let doc = document.getElementById("contterc")  
  doc.appendChild(cont)
}

function muestraMisDesc() {
  //escribe en el DOM los descuentos adquiridos
  if(misDescuentos.length > 0){
    let doc = document.getElementById("tablaMisDesc")
    doc.innerHTML=""    
    for(item of misDescuentos){
      let cont = document.createElement("div")
      cont.className="descuento"  
      let filtrado = listaprod.filter((e)=>e.id == item.producto)  
      cont.innerHTML= cont.innerHTML +
      `   <span><b>${item.porcentaje*100}%</b> de descuento en </span>
          <span><b>${filtrado[0].nombre}</b></span>
          <span>| codigo ${item.codigo}</span>
          <input type="button" value="Usar" class="boton" onclick="selecDto(${misDescuentos.indexOf(item)})">       
      `     
      doc.appendChild(cont)
    }    
  }else{
    let doc = document.getElementById("tablaMisDesc")
    doc.innerHTML=""    
  }
}



function setEstadoDesc() {
  //muestra el estado de error al agregar un descuento
  let domEstado = document.getElementById("estadoDesc")
  if(estadoDesc!=undefined){
    domEstado.innerText=estadoDesc
  }else{domEstado.innerText=""}
}

function setEstadoProd() {
  //muestra el estado de error al agregar un descuento
  let domEstado = document.getElementById("estadoProd")
  if(estadoProd!=undefined){
    domEstado.innerText=estadoProd
  }else{domEstado.innerText=""}
}

function muestraCuenta() {
  //escribe en el DOM los productos agregados a la cuenta, costos y descuentos aplicados  
  montoTotal = 0    
  //console.log("paso aplicar" + montoDescuento)
  if(dtoAplicado.codigo!=""){
    let divDto = document.createElement("div")
    divDto.className="descuento"
    divDto.style="background-color:#02d071;"
    let filtrado = listaprod.filter((e)=>e.id == dtoAplicado.producto)
    divDto.innerHTML= divDto.innerHTML +
    ` 
    <span><b>Aplicando: </b></span><br>
      <span><b>${dtoAplicado.porcentaje*100}%</b> de descuento en </span>
      <span><b>${filtrado[0].nombre}</b></span>
      <span>| codigo ${dtoAplicado.codigo}</span>
      <input type="button" class="boton-neg" value="Quitar" onclick="quitarDto()">       
    `  
    document.getElementById("divDescAplicado").innerHTML=""
    document.getElementById("divDescAplicado").appendChild(divDto)
  }else{
    document.getElementById("divDescAplicado").innerHTML=""
  }
  if(cuenta.length > 0){    
    let totCuenta = document.getElementById("totalCuenta")
    totCuenta.innerHTML = 0
    let doc = document.getElementById("divCuenta")
    doc.innerHTML=""  
    for(item of cuenta){
      let cont = document.createElement("div")
      cont.className="descuento"
      let filtrado = listaprod.filter((e)=>e.id == item.producto)  
      montoTotal = montoTotal + (parseInt(filtrado[0].precio)*parseInt(item.cantidad))
      cont.innerHTML= cont.innerHTML +
      `   <span><b>${filtrado[0].detalle}</b>: </span>
          <span>$${filtrado[0].precio} x</span>
          <span>${item.cantidad} = </span>
          <span>$${(filtrado[0].precio*item.cantidad)}</span>          
          <input type="button" class="boton" value="Quitar" onclick="quitarProd(${cuenta.indexOf(item)})">       
      `     
      doc.appendChild(cont)     
    }    
    aplicarDesc()
    if(montoTotal > 0){        
      montoTotal = parseInt(montoTotal) - parseInt(montoDescuento)
      document.getElementById("subTotalCuenta").innerHTML= parseInt(montoTotal) + parseInt(montoDescuento)
      document.getElementById("descuentoCuenta").innerHTML = parseInt(montoDescuento)
      totCuenta.innerHTML=parseInt(montoTotal)
    }
  }else{
    montoTotal = 0
    let doc = document.getElementById("divCuenta")
    doc.innerHTML = ""
    let totCuenta = document.getElementById("totalCuenta") 
    totCuenta.innerText= montoTotal    
    document.getElementById("subTotalCuenta").innerHTML= 0
    document.getElementById("descuentoCuenta").innerHTML = 0
  }
}
function pagar() {
  //calcula el vuelto y borra descuentos usados de los adquiridos, deshabilita botones que afectan al calculo de la cuenta
  let montoPagado = document.getElementById("inMontoPago").value
  let vuelto = montoPagado - montoTotal
  let spanVuelto = document.getElementById("vuelto")
  if(vuelto >= 0){
    spanVuelto.innerText=("Su vuelto:" +  vuelto)   
    if(misDescuentos.indexOf(dtoAplicado) >= 0){
      misDescuentos.splice(misDescuentos.indexOf(dtoAplicado),1)
      guardaMisDesc()
    }
    dtoAplicado = new Descuento("", 0, 0,0)    
    if(document.getElementById("divDescAplicado").childNodes){
      document.getElementById("divDescAplicado").childNodes[0].getElementsByTagName("input")[0].disabled=true
    }
    document.getElementById("btnAgregar").disabled=true
    document.getElementById("btnPagar").disabled=true    
    for(item of document.getElementById("divCuenta").childNodes){
      item.getElementsByTagName("input")[0].disabled=true
    }
    muestraMisDesc()
  }else{
    spanVuelto.innerText=("Debe pagar la totalidad de la cuenta")
  }
}
function reiniciarCuenta(){
  montoTotal = 0;
  montoDescuento = 0;
  document.getElementById("inMontoPago").value=""
  document.getElementById("vuelto").innerText=""
  document.getElementById("inCantProd").value=""
  dtoAplicado = new Descuento("", 0, 0,0)
  cuenta.splice(0,cuenta.length)
  document.getElementById("btnAgregar").disabled=false
  document.getElementById("btnPagar").disabled=false
  muestraCuenta()
}
//EVENTOS-------------------------------------------------
//Evento adquirir descuento -----------
let btnAdquirir = document.getElementById("btnAdquirir")
let inCodigo = document.getElementById("inCodigoDesc")
let estadoDesc
btnAdquirir.addEventListener("click", () => {estadoDesc = selectDesc(misDescuentos, inCodigo.value);
setEstadoDesc()})
//Evento agregar producto a cuenta-------------
let btnAgregar = document.getElementById("btnAgregar")
let inCodigoProd = document.getElementById("selectProductos")
let inCantProd = document.getElementById("inCantProd")
let estadoProd
btnAgregar.addEventListener("click", ()=>{if(inCodigoProd.value!=-1){estadoProd = ingresarCuenta(inCodigoProd.value, inCantProd.value); setEstadoProd()}})
//Evento Pagar
let btnPagar= document.getElementById("btnPagar")
btnPagar.addEventListener("click",() => {pagar()})
//Evento reiniciar
let btnReiniciar = document.getElementById("btnReiniciar")
btnReiniciar.addEventListener("click",()=>{reiniciarCuenta()})


//Ejecución del programa ---------------------------------------------
cargarDtosDisp()
cargaMisDesc();
muestraDtos();
muestraProds();
muestraMisDesc();

