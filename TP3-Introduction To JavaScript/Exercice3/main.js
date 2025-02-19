function troisNombres (numbres) {
    let [a, b, c] = numbres;
    
    if (a > b) {
        [a, b] = [b, a];
    }
    if (a > c) {
        [a, c] = [c, a];
    }
    if (b > c) {
        [b, c] = [c, b];
    }
    return [a, b, c];
}

let n1 = +prompt("Entrez le premier nombre : ");
let n2 = +prompt("Entrez le deuxième nombre : ");
let n3 = +prompt("Entrez le troisième nombre : ");

let [a, b, c] = troisNombres([n1, n2, n3]);
console.log(`les nombres dans l'ordre croissant : ${a} ${b} ${c}`);