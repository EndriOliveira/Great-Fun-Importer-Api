function validateCPF(cpf = 0) {
  cpf = cpf.replace(/\.|-/g, '');
  if (!validateFirstDigit(cpf)) return false;
  if (!validateSecondDigit(cpf)) return false;
  return true;
}

function validateFirstDigit(cpf = null) {
  let firstDigit = (sumFirstDigit(cpf) * 10) % 11;
  firstDigit = firstDigit == 10 || firstDigit == 11 ? 0 : firstDigit;
  if (firstDigit != cpf[9]) return false;
  return true;
}

function validateSecondDigit(cpf = null) {
  let secondDigit = (sumSecondDigit(cpf) * 10) % 11;
  secondDigit = secondDigit == 10 || secondDigit == 11 ? 0 : secondDigit;
  if (secondDigit != cpf[10]) return false;
  return true;
}

function sumFirstDigit(cpf, position = 0, sum = 0) {
  if (position > 9) return 0;
  return (
    sum +
    sumFirstDigit(
      cpf,
      position + 1,
      cpf[position] * (cpf.length - 1 - position)
    )
  );
}

function sumSecondDigit(cpf, position = 0, sum = 0) {
  if (position > 10) return 0;
  return (
    sum +
    sumSecondDigit(cpf, position + 1, cpf[position] * (cpf.length - position))
  );
}

module.exports = {
  validateCPF,
};
