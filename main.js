//Comienzo definiendo la clase producto y su constructor correspondiente con las diferentes propiedad de cada producto

class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

//Creo el array vacio al cual después le voy a ir cargando lso productos mediante el método push
const productos = [];

productos.push(new Producto(1, "cerveza brahma 473", 330, 110));
productos.push(new Producto(2, "cerveza heineken 473", 560, 30));
productos.push(new Producto(3, "cerveza quilmes 473", 430, 150));
productos.push(new Producto(4, "fernet branca", 2930, 48));
productos.push(new Producto(5, "smirnoff", 1930, 24));
productos.push(new Producto(6, "smirnoff maracuya", 1930, 12));
productos.push(new Producto(7, "smirnoff frutos rojos", 2060, 9));
productos.push(new Producto(8, "skyy anana", 2200, 30));
productos.push(new Producto(9, "skyy coco", 2000, 12));
productos.push(new Producto(10, "coca", 990, 230));
productos.push(new Producto(11, "pepsi", 730, 160));
productos.push(new Producto(12, "fanta", 780, 110));
productos.push(new Producto(13, "pritty", 930, 170));

productos.unshift(new Producto(22, "sprite", 1000, 12));

productos.unshift(new Producto(27, "whisky blue label", 3000, 1));

//Inicializo el total de compra para después poder dar un valor de compra total cuando se haga mas de 1 compra

let totalCompra = 0;

function compra() {

    //Creo un array vacío en el cual voy a almacenar los productos que se van comprando para que después pueda mostrar al usuario un resumen de la compra
    const productosComprados = [];
    // Inicializo otros valores que se van a usar en los métodos de pago.
    let descuento = 0.3;
    let recargaCredito = 0.2;

    //Defino la variable salir como false, va a actuar como variable de control para finalizar el bucle

    let salir = false;

    alert("Bienvenido a la tienda!!\nTenemos productos que van desde:\nCerveza brahma 473\nCerveza quilmes 473\nCerveza heineken 473\nFernet branca\nVodkas de Skyy y Smirnoff de ananá, frutos rojos, coco, maracuya\nGaseosas de fanta 2 lt, pepsi 2 lt, sprite 3lt y\nWhisky blue label :D");
    //Uso el bucle for of para tener acceso a los objetos dentro del array productos
    for (const producto of productos) {

        // Ciclo principal para realizar compras con el bucle while con la condicion de salida negativa para que se haga la compra, si salida llega a ser true, se termina la compra

        while (!salir) {

            // Solicito al usuario que ingrese el producto que quiere comprar.
            let productoComprado = prompt("Ingrese el producto que desea comprar").toLowerCase();

            //Creo la variable productoEncontrado en donde voy a verificar si el producto ingresado por el usuario se encuentra dentro del array producto
            let productoEncontrado = productos.find(item => item.nombre === productoComprado);

            if (productoEncontrado) {

                alert(`Tenemos ${productoComprado} en stock.\nPrecio: $${productoEncontrado.precio}\nStock: ${productoEncontrado.stock} unidades`);

                // Solicito al usuario que ingrese el método de pago.

                let metodoDePago;

                while (true) {
                    //Mientras el metodo de pago esté bien ingresado, se va a entrar al bucle, si se ingresa un dato erroneo, no entra y le vuelve a hacer la pregunta

                    metodoDePago = prompt("¿Va a pagar en efectivo, débito o crédito?").toLowerCase();

                    //En caso que el método de pago esté bien ingresado, se sale de este bucle para poder seguir con la compra
                    if (metodoDePago === "efectivo" || metodoDePago === "debito" || metodoDePago === "credito") {
                        break;
                    } else {
                        alert("Opción no válida. Por favor, ingrese efectivo, débito o crédito.");
                    }
                }

                //Defino la variable precio y la asocio al precio del producto encontrado que fue el ingresado por el usuario
                let precio = productoEncontrado.precio;

                if (metodoDePago === "efectivo") {
                    precio -= precio * descuento;
                    alert(`El precio pagando en efectivo es $${precio}`);

                } else if (metodoDePago === "credito") {

                    precio += precio * recargaCredito; alert(`El precio pagando con credito es $${precio}`);

                } else if (metodoDePago === "debito") {

                    alert(`El precio pagando con debito es $${precio}`);

                }

                // Ciclo para solicitar la cantidad de productos hasta que sea una cantidad válida
                //Tuve que recurrir a esta opcion ya que en el codigo anterior, si se ingresaba mal una opcion o incluso, si ingresaba un numero, se finalizaba el bucle y estuve buscando como hacer que, al ingresar mal la respuesta, se volviera a hacer la pregunta y no llevar al usuario al inicio de la funcion compra()
                while (true) {

                    // Solicito al usuario que ingrese cuantos productos quiere comprar.
                    let cantidadComprada = Number(prompt(`¿Cuántas unidades de ${productoComprado} desea comprar?`));

                    //si la cantidad ingresada es un numero, si se ingresa un numero positivo y si la cantidad ingresada no supera al stock que tiene el producto, la compra se puede realizar
                    if (!isNaN(cantidadComprada) && cantidadComprada > 0 && cantidadComprada <= productoEncontrado.stock) {

                        //Creamos la constante precio final donde se va a multiplicar el precio según el método de pago por la cantidad comprada
                        const precioFinal = precio * cantidadComprada;

                        //El precio final va a ser sumado al total de la compra para el caso que haya mas de 1 compra realizada
                        totalCompra += precioFinal;

                        //Acá le ingreso, mediante el método push, las propiedades que van a estar dentro del resumen de compra, al constructor vacío productosComprados que había creado antes

                        productosComprados.push({
                            cantidad: cantidadComprada,
                            nombre: productoEncontrado.nombre,
                            pago: metodoDePago,
                            precio: precio,
                            montoTotal: precioFinal,
                        });

                        //Actualizamos el stock del prodcuto comprado
                        productoEncontrado.stock -= cantidadComprada;

                        alert(`Compra exitosa. El precio total es $${precioFinal}. Stock restante: ${productoEncontrado.stock}`);
                        break;

                    } else {
                        //Respuesta en el caso que no se ingrese un número, si se pone un número negativo o si se quiere comprar una cantidad superior al stock
                        alert("Ingrese una cantidad válida y que esté dentro del stock disponible.");
                    }
                }
            } else {

                //En caso que el usuario quiera un producto que no tenemos disponible, aparece este mensaje y se le vuelve a realizar la pregunta de que quiere comprar
                alert("Disculpe, no tenemos ese producto. Por favor, ingrese un producto disponible.");
            }

            // Procedo a preguntar al cliente si quiere hacer otra compra

            const preguntaRecompra = prompt("¿Desea realizar otra compra? (si/no)").toLowerCase();

            if (preguntaRecompra === "no") {
                salir = true; // Defino la variable de control como true para salir del bucle y finalizar la compra
            } else if (preguntaRecompra !== "si") {
                alert("Opción no válida."); //Si se coloca una respuesta distinta a si o no, se vuelve al inicio de la funcion compra(), pero igualmente la compra queda guardada
            }
        }
    }

    alert("Resumen de productos comprados:");

    //Uso el método forEach donde tome como parámetro cada ítem, que sería los objetos creados en el array productosComprados, para recorrerlos y podes extraer cada información dentro para brindar el resumen de la compra
    productosComprados.forEach(item => {
        alert(`${item.cantidad} unidades de ${item.nombre}\nPagado con ${item.pago}\nAl precio de: $${item.precio} pesos\nMonto total: $${item.montoTotal} pesos`);
    });

    alert(`Gracias por su compra. Total a pagar: $${totalCompra}`);
}

compra();
