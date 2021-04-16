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
//arreglos
let imagenes=[]
let divisas = []
let listaprod=[]
let dtosdisp=[]
let misDescuentos=[]
let cuenta = []
//inicializacion de arreglos
listaprod.push(new Producto(1,"pizzas",400, "Pizza de  8 porciones"))
listaprod.push(new Producto(2,"papas",310, "Papas con cheddar y panzeta"))
listaprod.push(new Producto(3,"pintas",160, "Pintas cualquier variedad"))
//variables
let montoTotal = 0
let montoDescuento = 0
let dtoAplicado = new Descuento("", 0, 0,0)
let cont = 0
let contpre = 0
let showDivisas = false