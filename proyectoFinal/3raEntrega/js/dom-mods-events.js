//funciones del DOM------------------------------------------------------
function nuevosPrecios(){   //Muestra la cuenta con los nuevos precios en la divisa seleciconada
  if($("#SLconvDivisas").val()!==""){
    $("#divCambioDivisas").html(
    `<span>Monto subtotal ${divisas[$("#SLconvDivisas").val()].cod}: ${(montoTotal+parseInt(montoDescuento))*(divisas[$("#SLconvDivisas").val()].valor)}</span><br>
    <span>Descuento aplicado ${divisas[$("#SLconvDivisas").val()].cod}: ${montoDescuento*(divisas[$("#SLconvDivisas").val()].valor)}</span><br>
    <span>Monto total ${divisas[$("#SLconvDivisas").val()].cod}: ${montoTotal*(divisas[$("#SLconvDivisas").val()].valor)}</span>
    `)
    $("#codInDivisa").html(`${divisas[$("#SLconvDivisas").val()].cod}`)
  } 
}

function cargaDivisas(){ // agrega las divisas traidas desde la API al select de divisas
  for(item of divisas){
    $("#SLconvDivisas").append(`<option value="${divisas.indexOf(item)}">${item.cod}</option>`)
  }
}

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
  //Escribe en el DOM los productos del bar con JQUERY
  $("#contterc").append(`<div class="tarjDescProd" id="productos"><h2 style='margin:0;' >Nuestros productos:</h2></div>`)
  for(item of listaprod){
    $("#productos").append(`
    <ul> <li> <b style="text-transform:capitalize;">${item.detalle}</b> - Precio: $${item.precio} | Codigo: ${item.id}</li>
    </ul>
    `)
    $("#selectProductos").append(`<option value="${item.id}">${item.detalle}</option>`)   
  }
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
    divDto.style="background-color:#02d071; display:none;"
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
    $("#divDescAplicado").children().fadeIn("slow")
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
      cont.style=("display:none;")
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
      $(".descuento").fadeIn()
    }    
    aplicarDesc()
    if(montoTotal > 0){        
      montoTotal = parseInt(montoTotal) - parseInt(montoDescuento)
      document.getElementById("subTotalCuenta").innerHTML= parseInt(montoTotal) + parseInt(montoDescuento)
      document.getElementById("descuentoCuenta").innerHTML = parseInt(montoDescuento)
      totCuenta.innerHTML=parseInt(montoTotal)
    }
    nuevosPrecios()
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
    spanVuelto.innerText=("Su vuelto: ARS $" +  vuelto)   
    if(misDescuentos.indexOf(dtoAplicado) >= 0){
      misDescuentos.splice(misDescuentos.indexOf(dtoAplicado),1)
      guardaMisDesc()
    }
    dtoAplicado = new Descuento("", 0, 0,0)    
    if(document.getElementById("divDescAplicado").childNodes.length>0){
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
  $("#monConversor").val("")
  $("#arsConversor").val("")
  $("#divCambioDivisas").html("")
  muestraCuenta()
}
//EVENTOS-------------------------------------------------
//Evento mostrar divisas
$("#btnDivisas").on("click", ()=>{  
  if(!showDivisas){
    $("#divisas").fadeIn()
    showDivisas = !showDivisas;
  }else{
    $("#divisas").fadeOut()
    showDivisas = !showDivisas;
  }
  })
//Evento convertir precios
$("#SLconvDivisas").on("change", nuevosPrecios)
$("#monConversor").on("keyup", ()=>{
  if($("#SLconvDivisas").val()!==""){
    $("#arsConversor").val((parseFloat($("#monConversor").val())/(divisas[$("#SLconvDivisas").val()].valor)))
  }
})
$("#arsConversor").on("keyup", ()=>{
  if($("#SLconvDivisas").val()!==""){
    $("#monConversor").val((parseFloat($("#arsConversor").val())*(divisas[$("#SLconvDivisas").val()].valor)))
  }
})

//Evento adquirir descuento -----------
// let btnAdquirir = document.getElementById("btnAdquirir")
let inCodigo = $("#inCodigoDesc")[0]
let estadoDesc
$("#btnAdquirir").on("click", () => {estadoDesc = selectDesc(misDescuentos, inCodigo.value);
  setEstadoDesc()})
//Evento agregar producto a cuenta-------------
let estadoProd
$("#btnAgregar").on("click", ()=>{if($("#selectProductos")[0].value!=-1){estadoProd = ingresarCuenta($("#selectProductos")[0].value, $("#inCantProd")[0].value); setEstadoProd()}})
//Evento Pagar
$("#btnPagar").on("click",() => {pagar()})
//Evento reiniciar
$("#btnReiniciar").on("click",()=>{reiniciarCuenta()})
