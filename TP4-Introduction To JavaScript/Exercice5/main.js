let number;

while (true) {
  const input = prompt("Entrez un nombre positif supérieur à 0 :");
  number = Number(input);

  if (Number.isInteger(number) && number > 0) {
    break;
  }

  alert("Veuillez entrer un nombre valide supérieur à 0 !");
}

function primeChecker(number) {
  if (number === 1) {
    return { isPrime: false, dividedBy: 1 };
  }

  const limit = Math.sqrt(number);
  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return { isPrime: false, dividedBy: i };
    }
  }
  return { isPrime: true };
}

const { isPrime, dividedBy } = primeChecker(number);

console.log(`Nombre saisi : ${number}`);
if (isPrime) {
  console.log(`${number} est un nombre premier`);
} else {
  console.log(
    number === 1
      ? `1 n'est pas un nombre premier, il est divisible seulement par 1`
      : `${number} n'est pas un nombre premier, il est divisible par ${dividedBy}`
  );
}
