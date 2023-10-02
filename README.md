# frontCrypting
The repository in which the frontend of a test encrypting application is going to be stored.

This application was done to fulfill an asignment that was given on "Seguridad Informática", in which, we were tasked with developing a Multi-Page application that sends an already encrypted document through a client (this repository), to a backend that receives the document and is able to decrypt it.

2 types of encryption are going to be used, and therefore, 2 types of decryption.
* Asymmetric Encryption
* Symmetric Encryption

This project is being developed by @sadbxss and @Galuito 

### Cert Directory
The cert directory contains everything related to the OpenSSL certificate that was used to abilitate the https protocol in the application, for its implementation in the program fs and path were used.
I'll upload the key and certificate to github because they are not to be hidden in this case, they're only for educational purposes and will not be encrypting serious data.


Now with a working frontend server we can start trying to handle how the information is going to be passed to the backend.

# Timeskip - Explained
So, there's a pretty long timeskip between the commit in which this was introduced and when the project started (last was yesterday XD), but in reality I refer to a great insertion of files and lines of code in the already existing files, this was because I almost dedicated the whole day to this project, and therefore, was able to solve all the problems that related to it. Now I'll do the job of documenting most of the files that are in this code and what is left to do, because we haven't really finished with all.

## The Cert Directory
The cert directory didn't change at all, that's because it was already developed and integrated completely as for the time of the previous commit, as I mentioned before, the contents are public because it is an OpenSSL certificate and keys, therefore it will have no impact in a production enviroment

## Encrypted Files
In this directory, you'll be able to find to types of files, with a propietary extension that is used to identify which is which, any file that ends with ".asy" was encrypted asymmetrically, while the files that end with ".sym. were encrypted simmetrically, this is useful in sending the files and is useful again once they're received because of the logic in which the backend was developed.

## Html
Plain old html that handles file upload to the server using fetch, once an upload is successful the user is redirected to the success.html so that it knows that the file upload was done correctly and it can refresh the home page to send more files.

Precisely, the file was sent to https://127.0.0.1:51012/documento, they were contained inside of the "files" request parameter of the post http request using an input file that accepts multiple files, no matter what, these files must be sent in pairs in order for them to work, that's how the logic was made in the backend.

## Javascript
In here my friend, you'll be able to find the encrypter script and the previously used symmetric key generator, it was used before once we didn't have into consideration sending the symmetric key, its only use now was creating the Initialization Vector (IV variable), but still, having a static symmetric key was useful for the first 50 couple tests I would say.

Now, in regards to encrypt.js, there's a lot going on in that file, it basically is the heart of the "frontend" functionality because it is the one that does the encryption, rather than the main front server.

The encrypt.js mostly relies on the crypto module that has all the functionality to generate random amounts of bytes that can be used as the keys of the file, also it has in it the symmetric and asymmetric encryption methods, then it uses fs to be able to read files present in the archivos directory and write them in the encryptedFiles directory once they're done. Also process was used to be able to send arguments to the script, therefore being able to change parameters in the terminal itself once the script is executed. If no argument values were to be passed to the script it then would exit with a code(1)

Basically then what it does is generate a new random symmetric key, and use it to encrypt the file that is passed to it, it then adds the ".sym. extension to the end of this symmetric file, once this is done, the program uses the public key of the backend server to encrypt the symmetric key and it generates a file with this information, once this is done it creates a file with the same name as the original but with the ".asy" extension, to understand that this is the asymmetrically encrypted file (Therefore, the symmetric key).

## Node Modules
The important modules in this project were:
* crypto
* fs
* https
* express
* process
* path
* cors

And also, OpenSSL was used to generate the Certificates, this was done locally in @Galuito's machine.

## What's missing?
The only thing missing is an improvement on the index.html and success.html file