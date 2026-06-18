const formRepeatText = document.getElementById('repeatForm')
const repeatTextInput = document.getElementById('text')
const repeatNumberInput = document.getElementById('times')
const containerRepeatText = document.getElementById('resultContainer')
const resultText = document.getElementById('result')


formRepeatText.addEventListener('submit', (e) => {
    e.preventDefault()
    const textValue = repeatTextInput.value;
    const numberValue = repeatNumberInput.value;
    if (textValue.length > 0 && numberValue.length && numberValue > 0) {
        repeatText(textValue, numberValue)
    }
    else {
        alert('Ingresa un valor válido')
    }

})

const repeatText = (text, times) => {

    const repeatedText = text.repeat(times);
    const p1 = document.createElement('p');

    p1.textContent = `Palabra elegida: ${text}`;
    const p2 = document.createElement('p');

    p2.textContent = `A repetirse ${times} veces`;
    resultText.textContent = repeatedText

    containerRepeatText.prepend(p1, p2);
}



