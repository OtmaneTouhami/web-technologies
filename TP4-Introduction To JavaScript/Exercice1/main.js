function degreC (fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

let fahrenheit = Number(prompt("Enter the temperature in Fahrenheit"));
let celsius = degreC(fahrenheit);

console.log(`Une température en Fahrenheit: ${fahrenheit.toFixed(1)}`);
console.log(`La température équivaut a ${celsius.toFixed(1)} degrés Celsius`);
