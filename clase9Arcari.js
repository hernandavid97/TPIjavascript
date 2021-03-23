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

//Declaración de arreglos-------------------------------------
let listaprod=[]
listaprod.push(new Producto(1,"pizza",400, "Pizza de  8 porciones"))
listaprod.push(new Producto(2,"papas",310, "Papas con cheddar y panzeta"))
listaprod.push(new Producto(3,"pinta",160, "Pintas cualquier variedad"))

let dtosdisp=[]
dtosdisp.push(new Descuento("pizzaoff",0.20, 1, 10))
dtosdisp.push(new Descuento("papasoff",0.25, 2, 15))
dtosdisp.push(new Descuento("pintasoff",0.50, 3, 50))
dtosdisp.push(new Descuento("HHpizza",0.50, 1, 0))

let misDescuentos=[]

let cuenta = []


//Declaración de funciones----------------------------------

function selectDesc(misdesc, cod){
//esta función permite al usuario adquirir los descuentos que luego podrá usar al pagar la cuenta, los descuentos se adquieren ingresando un codigo de descuento detallado en el html.
  console.log("entro en select")
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
  let estado  
  function Prod(producto, cantidad){this.producto = producto, this.cantidad=cantidad}  
    if(prodsel > listaprod.length || !prodsel || prodsel < 1){
      estado = "Codigo de producto invalido"
      return estado
    }else{    
    cuenta.push(new Prod(prodsel, cant))       
    muestraCuenta()
    return estado
    }
}

function usarDescuento(misdesc){
  //Esta función permite al usuario seleccionar cual de sus descuentos adquiridos aplicará en la cuenta a pagar
  if(misdesc.length>0){
    let cadena = 'ingrese: \n'
    let selec, opc
    let i = 0
    for(desc of misdesc){    
      cadena= cadena+i+"-"+" para aplicar el descuento: "+desc.codigo+"\n"
      i = i+1
    }
    selec = parseInt(prompt(cadena))    
    return selec
  }else{
    alert("no ha adquirido ningun descuento")
    return -1
  }
}

function misDescuentosList(misdesc){
  //Esta función permite al usuario ver cuales son sus descuentos adquiridos
  if(misdesc.length>0){
    let cadena = 'Sus descuentos adquiridos son: \n'
    let i = 0
    for(desc of misdesc){    
      cadena= cadena+i+"-"+" descuento: "+desc.codigo+"\n"
      i = i+1
    }
    alert(cadena)
  }else{alert("No ha adquirido ningun descuento")}
}

function calcularCuenta(cuenta, misdesc) {
  //Esta función calcula los montos de la cuenta aplicando el descuento seleccionado por el usuario
  let total, subtotal = 0, descuento, montodescuento = 0
  let filtradosum, filtrado
  let cant
  descuento=usarDescuento(misdesc)
  for(item of cuenta){
    filtradosum = listaprod.filter((e)=>e.id == item.producto)
    subtotal = subtotal + filtradosum[0].precio*item.cantidad
  }
  if(descuento != -1){
    filtrado = listaprod.filter((e)=>e.id == misdesc[descuento].producto)    
    for(item of cuenta){    
      if(item.producto == filtrado[0].id){
        cant = item.cantidad
      }
    }
    if(!cant){
      cant = 0
    }
    montodescuento = filtrado[0].precio*cant*misdesc[descuento].porcentaje
    misdesc.splice(descuento,1)
    }
  total = subtotal - montodescuento
  let pago = prompt("Subtotal: $" + subtotal+"\nTotal: $"+ total + "\nDescuento: $" + montodescuento + "\nIngrese con cuanto pagó la cuenta")
  while(pago < total){
    alert("Debe pagar el total de la cuenta")
    pago = prompt("Subtotal: $" + subtotal+"\nTotal: $"+ total + "\nDescuento: $" + montodescuento + "\nIngrese con cuanto pagó la cuenta")
  }
  alert("Su vuelto es: $" + (pago - total))
}

function menu() {
  //Esta función genera un prompt con un menu para que el usuario navegue por el sitio, ejecuta las funciones adecuadas segun la opcion ingresada  
  let prodsSelec = []
  let opc= -1
  while(opc != '0' && opc != null ){    
    muestraDtos();
    opc = prompt("Bienvenido, Ingrese la opcion deseada:\n 1- Para adquirir descuentos\n 2- Para calcular cuenta \n 3- Para ver sus descuentos\n 0 - Para salir");
    console.log(opc)
    switch(opc){
      case '1': 
        selectDesc(misDescuentos)
      break;
      case '2': 
        prodsSelec = ingresarCuenta()
        calcularCuenta(prodsSelec, misDescuentos)
      break;
      case '3': 
        misDescuentosList(misDescuentos)
      break;
      case '0'  :
        alert("Hasta la proxima!")
      break;
      case null:
        alert("Hasta la proxima!")
      break;    
    }
  }
}


//DOM------------------------------------------------------
function muestraDtos() {
  //Escribe en el DOM los Descuentos disponibles para adquirir
  let cont = document.getElementById("descuentos")
  cont.innerHTML=""
  cont.innerHTML="<h2 style='margin:0px !important;'>Descuentos disponibles</h2>"
  cont.innerHTML= cont.innerHTML + "<h3 style='margin:5px !important;'>Adquirí los codigos y usalos cuando quieras</h3>"
  for(item of dtosdisp){
    if(item.cantidad > 0){
      cont.innerHTML= cont.innerHTML+`<p>· ${item.porcentaje*100}% de descuento con el codigo <b>${item.codigo}</b> | Disponibles: ${item.cantidad}</p>`
    }
  }
}

function muestraProds() {
  //Escribe en el DOM los productos del bar
  let cont = document.createElement("div");
  cont.id="productos"
  cont.className="tarjDescProd" 
  cont.innerHTML=cont.innerHTML + "<h2 style='margin:0;' >Nuestros productos:</h2>"
  for(item of listaprod){
    cont.innerHTML= cont.innerHTML+`
     <ul> <li> <b style="text-transform:capitalize;">${item.detalle}</b> - Precio: $${item.precio} | Codigo: ${item.id}</li>
     </ul>
     `
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
          <input type="button" value="Usar" >       
      `     
      doc.appendChild(cont)
    }    
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
  //escribe en el DOM los productos agregados a la cuenta  
  if(cuenta.length > 0){
    let totCuenta = document.getElementById("totalCuenta")
    totCuenta.innerHTML = 0
    let doc = document.getElementById("divCuenta")
    doc.innerHTML=""    
    for(item of cuenta){
      let cont = document.createElement("div")
      cont.className="descuento"
      let filtrado = listaprod.filter((e)=>e.id == item.producto)  
      cont.innerHTML= cont.innerHTML +
      `   <span><b>${filtrado[0].detalle}</b>: </span>
          <span>$${filtrado[0].precio} X</span>
          <span>${item.cantidad} => </span>
          <span>${(filtrado[0].precio*item.cantidad)}</span>          
          <input type="button" value="Quitar" >       
      `     
      doc.appendChild(cont)
      totCuenta.innerHTML=parseInt(totCuenta.innerText) + (filtrado[0].precio*item.cantidad)
    }    
  }
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
let inCodigoProd = document.getElementById("inCodigoProd")
let inCantProd = document.getElementById("inCantProd")
let estadoProd
btnAgregar.addEventListener("click", ()=>{estadoProd = ingresarCuenta(inCodigoProd.value, inCantProd.value); setEstadoProd()})



//Ejecución del programa ---------------------------------------------
muestraDtos();
muestraProds();
muestraMisDesc();
