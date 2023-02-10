// const bcrypt = require("bcrypt");
//
// const getSalt = async () => {
//     const salt = await bcrypt.genSalt();
//     const password = "12345"
//     const pwdHash = await bcrypt.hash(password, salt);
//     console.log(salt)
//     console.log(pwdHash)
// }
//
// getSalt();

//8bMen1nOzDukAchkiychYm@

// 1
const name = "Nurbolot";
console.log(`Hello, ${name} how are you`);

//2

const num1 = 20;
const num2 = 40;
const num3 = 50;

const sum = num1 + num2 + num3
const middleOfNumbers = sum / 3;

console.log(middleOfNumbers);

//3

const side = 4;

const diagonal = (s) => {
    let diagonalOfSquare = Math.sqrt(2) * s
    console.log(diagonalOfSquare)
    let square = s * s;
    console.log(square)
    const perimeter = side * 4;
    console.log(perimeter)
}

diagonal(side)