function imcCalculator() {
  let imcResult = +weight.value / (+height.value * +height.value);
  let resultText = `Votre IMC est de ${imcResult.toFixed(
    2
  )} Vous êtes en état `;

  if (imcResult < 18.5) {
    resultText += "de maigreur";
  }
  if (imcResult >= 18.5 && imcResult < 25) {
    resultText += "normal";
  }
  if (imcResult >= 25 && imcResult < 30) {
    resultText += "de surpoids";
  }

  if (imcResult >= 30 && imcResult < 35) {
    resultText += "d'obésité modérée";
  }

  if (imcResult >= 35 && imcResult < 40) {
    resultText += "d'obésité sévère";
  }

  if (imcResult >= 40) {
    resultText += "d'obésité morbide";
  }

  result.textContent = resultText;
}
