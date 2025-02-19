function Fibo1(n) {
  if (n === 1) console.log(`Le premiere terme de la suite de Fibonacci est 0`);
  else if (n === 2)
    console.log(`Le deuxième terme de la suite de Fibonacci est 1`);
  else {
    let u0 = 0,
      u1 = 1,
      u;

    for (let i = 3; i <= n; i++) {
      u = u0 + u1;
      u0 = u1;
      u1 = u;
    }

    console.log(`Le ${n}ème terme de la suite de Fibonacci est ${u}`);
  }
}

function Fibo2(value) {
  let u0 = 0,
    u1 = 1,
    rang = 2,
    u;

  while (true) {
    u = u0 + u1;
    u0 = u1;
    u1 = u;
    rang++;
    if (u > value) break;
  }

  console.log(
    `Le premier terme de la suite de Fibonacci supérieur à ${value} est ${u}, et son rang est ${rang}.`
  );
}

function firstOption() {
  let n = +prompt("Entrer un nombre positif");
  Fibo1(n);
}

function secondOption() {
  let n = +prompt("Entrer un nombre positif");
  Fibo2(n);
}
