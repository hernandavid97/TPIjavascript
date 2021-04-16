// Proyecto integrador Javascript. Alumno: Hernán Arcari. Profesor: Andrés Kouvach.

// Idea del proyecto: La idea del proyecto es hacer un sitio donde el usuario (cliente) adquiera descuentos en un bar (o en algun momento descuentos de varios bares, los cuales cargaran sus descuentos) y pueda aplicarlos luego a la hora de pagar la cuenta, la cual tambien se calculará en el mismo sitio aplicando los descuentos seleccionados por el cliente y dando el monto final a pagar, para evitar que los bares cobren cargos indebidos ya que el cliente contara con el detalle del monto final que debe pagar por los productos que ha consumido, el subtotal sin descuentos y el descuento aplicado.


//-------------------------------------------------------------------------------------------
//Ejecución del programa ---------------------------------------------
cargaImagenes()
setInterval("precargaImagenes()", 2000)
setInterval('cambiaImagenes()',8000)
cargarDtosDisp()
cargaMisDesc();
muestraDtos();
muestraProds();
muestraMisDesc();
$(document).ready(function () {  if(divisas.length==0){
  divisasGet()
}
})


