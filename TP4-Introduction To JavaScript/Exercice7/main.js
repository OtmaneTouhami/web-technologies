function Racal(A) {
  let u = A / 2;
  const precision = 1e-5;

  while (Math.abs(u * u - A) >= precision) {
    u = 0.5 * (u + A / u);
  }

  console.log(`Pour un nombre A entre 1 et 100: ${A}`);
  console.log(`Valeur approchée de la racine carrée = ${u}`);
}

let A;

while (true) {
  const input = prompt(
    "Entrez un nombre réel positif supérieur à 0 et qui ne depasse pas 100:"
  );
  A = Number(input);

  if (!Number.isNaN(A) && A > 0 && A <= 100) {
    break;
  }

  alert("Le nombre doit être entre 1 et 100.");
}

Racal(A);
