// Proyecto integrador Javascript. Alumno: Hernán Arcari. Profesor: Andrés Kouvach.

// Idea del proyecto: La idea del proyecto es hacer un sitio donde el usuario (cliente) adquiera descuentos en un bar (o en algun momento descuentos de varios bares, los cuales cargaran sus descuentos) y pueda aplicarlos luego a la hora de pagar la cuenta, la cual tambien se calculará en el mismo sitio aplicando los descuentos seleccionados por el cliente y dando el monto final a pagar, para evitar que los bares cobren cargos indebidos ya que el cliente contará con el detalle del monto final que debe pagar por los productos que ha consumido, el subtotal sin descuentos y el descuento aplicado.

//-------------------------------------------------------------------------------------------


//Ejecución del programa ---------------------------------------------
cargaImagenes()
let interPre = setInterval("precargaImagenes()", 4000)//intervalo de 4 segundos para la funcion de  descargar / cachear imagenes para el fondo
setInterval('cambiaImagenes()',8000) //intervalo de 8 segundos en el cual cambia la imagen del fondo

function ejecutar(){ //Ejecuta todas las funciones para que funcione el Home  
  cargarDtosDisp()
  cargaMisDesc();
  muestraDtos();
  muestraProds();
  muestraMisDesc();
  $(document).ready(function () {  if(divisas.length==0){ // ejecuta divisasGet cuando el document esta listo para recibir la informaciond de la API
    divisasGet()
  }
  })
}

