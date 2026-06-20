//Para verificar si es un número válido:

function validar_numero(callback) {
    let dato = prompt("Ingrese un número:");

    if (!isNaN(dato)) {
        // Es un número
    } else {
        // Error
    }
}

function calcular_y_avisar_despues(numero, callback) {

}
function calcular_y_avisar_dependiendo(numero, callback, callback_error) {

}


//Para temporizar ejecuciones con callback:

setTimeout(() => {
    callback(resultado);
}, 5000);
