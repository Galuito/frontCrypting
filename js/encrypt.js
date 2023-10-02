/**
 * Encrypting module in charge of doing both symmetric and asymmetric encryption, logically it is placed here
 * because it should be a part of the client in case we were to implement the encryption directly here.
 */

const {createCipheriv, publicEncrypt, randomBytes} = require('crypto');
const process = require('process');
const fs = require('fs');
const path = require('path')

// Node encrypt.js fileLocation
// e.g. Node encrypt.js example.pdf
// Accessed by process.argv[2]

if (!process.argv[2]){
  console.log("No file location name was passed, exiting");
  process.exit(1)
}

// Storing a file in the data variable so that it can be encrypted later
let data;
// Storing it synchronously
try{
  data = fs.readFileSync(path.join(__dirname, '..', 'archivos', process.argv[2]));
}catch(err){
  // console.error(err);
  console.error("Problem reading the file, check the name or try again!");
  process.exit(1);
}

// Don't print the received data, pdfs are not friendly.
// console.log(data.toString()); // If you don't print to string the result is going to be byte code.

const symmetricKey = randomBytes(16).toString('hex');
// const symmetricKey = "8f87c191b382bff2ddfc3aaf51678361"; // A 64 chars long key gave me problems, this is 32 chars 
const iv = "f530f64b65eb2d84" // This makes it so that the output is not always the same and I was supposed
// const iv = randomBytes(16); // This makes it so that the output is not always the same
// to send it and change it everytime but you know the drill...

const publicKey = 
`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAm91jVhe173UamaYnR8Hm
hFZW+SzPryMaJtOSGngNkZD9fCbA5enCsiBL2GnUYVkPGdGaaEYlDSmoeITMeIcz
hSb6pRjAPnJMRn1RIDjI/ArIYXrRaZlMH/STg3BYaAL/eKT1hOjM+nZlexHf6QLh
OeKFp7uk6sGBAWZJXYIEYgL6D96yT+kcB8BmTkpEGaW3m60462NoPb0/patgEQs7
LHzrniYKEIodVRpyy187qLENuh3i4n/zx5RqjLahTr4agGeGD4fhO5err5X+a/j/
r67n1MxIect+O0x7FLJkOyRCl5BY2ze+mPy3K8HlssZ9Ci0OgZ0MhEgDmgwb5u49
feYhra5yyF9tmvsoTprjXjPWdSnFOL4J4MS0uqe7sEiXGhg21Hc+F5CpTbiMT5RL
jyHsX8r/EKKvMN9FeYv4yIfHeD4ifx8AnuZCOXaz+42wmPYr/hc4P+QJtu8d5la8
LQ3l1kaboPIdwhiuKaI2/sZuYUR9c8iU4BDzKtZfGKQ9Hdpalqax63OD8y5fPOMi
0Konj/vuXSygkc27LEhN6WJsmx8YKrfj08opEpi6K4tYgHeVp5z1LEFDAkSHLdjP
i01kvAc+mMlG7c7OFqTHF9W7qPGRnDEiNZ+HDrNvF/WiubylAGngix9U1FFemnAP
glGXl3ks0562MCN6Nt/Q1fUCAwEAAQ==
-----END PUBLIC KEY-----`;

// Encrypting Symmetric File
const cipher = createCipheriv('aes256', symmetricKey, iv);
const encryptedMessageSym = cipher.update(data, 'utf8', 'hex')
                         + cipher.final('hex'); // Finalize the Cipher

// We end with ecryptedMessage, now we have to do two things, load the file into the testMessage and
// then store it as a file in a folder of this directory.

// Saving the Encrypted Symmetric File!
fs.writeFile(path.join(__dirname, '..', 'encryptedFiles', process.argv[2] + ".sym"), encryptedMessageSym, (err) =>{
  if(err){
    throw err;
  }
  console.log(`Data has been written to file ${process.argv[2]}.sym in folder encryptedFiles successfully.`);
  console.log();
})

// Encrypting Assymetric File
// Continuamente nos encontramos con el error de que error:0200006E:rsa routines::data too large for key size
// por lo tanto llegamos a la consideracion de encriptar lo que ya fue encriptado simetricamente debido a su
// size simplificado
const encryptedSymmetricKey = publicEncrypt(
  publicKey,
  Buffer.from(symmetricKey)
);

// Saving the Encrypted Asymmetric File.
fs.writeFile(path.join(__dirname, '..', 'encryptedFiles', process.argv[2] + '.asy'), encryptedSymmetricKey, (err) =>{
  if(err){
    throw err;
  }
  console.log(`Encrypted symmetric key has been written to file ${process.argv[2]}.asy in folder encryptedFiles successfully`);
  console.log();
})
