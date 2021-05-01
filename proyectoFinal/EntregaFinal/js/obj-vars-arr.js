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

class Usuario{
  constructor(user, pass, nombre, apellido){
    this.pass = pass
    this.user = user
    this.nombre = nombre
    this.apellido = apellido
    this.descuentos=[]
  }
}
//Declaración de arreglos y variables-------------------------------------
//arreglos
let imagenes=[] //nombres de las imagenes para el fondo
let divisas = [] //todos los valores de las divisas a intercambiar
let listaprod=[] //todos los productos disponibles
let dtosdisp=[] //descuentos disponibles
let misDescuentos=[] //descuentos adquiridos
let cuenta = [] //productos en la cuenta a pagar
//inicializacion de arreglos
//agregando productos a la lista de disponibles
listaprod.push(new Producto(1,"pizzas",400, "Pizza de  8 porciones")) 
listaprod.push(new Producto(2,"papas",310, "Papas con cheddar y panzeta"))
listaprod.push(new Producto(3,"pintas",160, "Pintas cualquier variedad"))
//variables
let montoTotal = 0 //total a pagar
let montoDescuento = 0 //total de descuento
let dtoAplicado = new Descuento("", 0, 0,0) //variable auxiliar para descuento aplicado
let cont = 0 //contador para imagenes de fondo
let contpre = 0 //contador para cacheo de imagenes de fondo
let showDivisas = false //variable para control de mostrar/ocular el intercambio de divisas