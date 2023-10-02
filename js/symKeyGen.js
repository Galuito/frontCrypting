/* This file is going to manage the creation of a unique symmetric key, it will only be run once, because of
  * the obvious fact that once it is created it'll work for as long as it is stored, once it is generated I'll
  * place it in a comment so that the front encrypter and the back decrypter can have it.
  * 
  * It will also be used to generate and store the IV
*/

const {randomBytes} = require('crypto');
const key = randomBytes(16).toString('hex');
const iv = randomBytes(8).toString('hex');
// A byte has 2 hexadecimal digits so 16 bytes equals 32 hexadecimal digits in lenght
console.log(key.length);
console.log("Key: ",key);
// The generated key was: a7e51313fd7c8b8c7930945f76f2660f99f7bf34a77e0c985d6d39c09880ce26
console.log(typeof(key)); // You can handle it as a string.

console.log("IV: ", iv)
// The generated IV was: f530f64b65eb2d84