const check_number = (callback) => {
    let userNumber = prompt("Ingrese un número:");

    //si no es número o si el campo está vacío

    if (!isNaN(userNumber) && userNumber.length > 0) {

        callback("El número ingresado es válido ");
    } else {
        callback("El número ingresado no es válido");
    }
}

const calculate_notify_after = (number, callback) => {
    //hacemos una lista con los números impares , no es requisito , no se muestra en consola
    let listOfodds = []
    let addOdds = 0;
    //inicializamos con 1 ya que desde ah+i es dónde contaremos los números impares

    for (let i = 1; i <= number; i++) {
        // sabemos si el número es impar si el residuo no es igual a 0 /  si dividimos un número y nos da un residuo
        if (i % 2 !== 0) {
            listOfodds.push(i)
            addOdds += i;
        }
    }


    setTimeout(() => {
        callback(`El valor de la sumatoria es ${addOdds}. Este resultado se obtuvo hace 5 segundos`);
    }, 5000);
}

const calculate_and_notify_depending = (number, callback, callback_error) => {
    let totalResult = 0;

    for (let i = 1; i <= number; i++) {

        // fórmula matemática que te da la suma de todos los números desde 1 hasta i

        let sumFrom1ToCurrentNumber = (i * (i + 1)) / 2;

        // console.log('thiss', result, sumFrom1ToCurrentNumber)

        totalResult += sumFrom1ToCurrentNumber;

        console.log(`Sumatoria hasta ${i}: ${sumFrom1ToCurrentNumber} | Total acumulado: ${totalResult}`);
    }

    if (totalResult < 1000) {
        callback(`Las sumatorias sucesivas de número es ${totalResult}`);
    } else {
        callback_error(`El número sobrepasa el objetivo de la función. Resultado obtenido: ${totalResult}`);
    }
}


check_number((msg) => {
    alert(msg);
});

calculate_notify_after(10, (msg) => {
    alert(msg);
});

calculate_and_notify_depending(5, (msg) => {
    alert(msg);
}, (msg) => {
    alert(msg);
});