function hjms(secondes) {
  let days = Math.floor(secondes / 86400);
  let hours = Math.floor((secondes % 86400) / 3600);
  let minutes = Math.floor(((secondes % 86400) % 3600) / 60);
  let sec = ((secondes % 86400) % 3600) % 60;
  return { days, hours, minutes, sec };
}

let secondes = +prompt("Entrez un nombre de secondes : ");
let { days, hours, minutes, sec } = hjms(secondes);

console.log(
  `${secondes} secondes est équivalent à ${days} jours, ${hours} heures, ${minutes} minutes et ${sec} secondes.`
);

// Amélioration

function display(secondes) {
  let { days, hours, minutes, sec } = hjms(secondes);
  let message = `${secondes} secondes est équivalent à `;
  if (days !== 0) {
    message += `${days} jour${days > 1 ? "s" : ""}, `;
  }
  if (hours !== 0) {
    message += `${hours} heure${hours > 1 ? "s" : ""}, `;
  }
  if (minutes !== 0) {
    message += `${minutes} minute${minutes > 1 ? "s" : ""} et `;
  }
  message += `${sec} seconde${sec > 1 ? "s" : ""}.`;
  console.log(message);
}

display(secondes);
