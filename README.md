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