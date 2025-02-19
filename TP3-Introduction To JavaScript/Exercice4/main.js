let taille = +prompt("Entrer la taille :");

function getPattern(n) {
  return 2 * n - 1;
}

function escaliers(taille) {
  let shape = "";
  for (let i = 0; i < taille; i++) {
    let star = "*";
    shape += star.repeat(i + 1) + "\n";
  }
  return shape;
}

function pyramides(taille) {
  let shape = "";
  for (let i = 1; i <= taille; i++) {
    let ligne = " ".repeat(taille - i) + "*".repeat(getPattern(i));
    shape += ligne + "\n";
  }
  return shape;
}

console.log(escaliers(taille));
console.log(pyramides(taille));
