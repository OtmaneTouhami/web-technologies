function permutation() {
    let inputs = document.getElementsByTagName('input');
    [inputs[0].value, inputs[1].value] = [inputs[1].value, inputs[0].value];
}