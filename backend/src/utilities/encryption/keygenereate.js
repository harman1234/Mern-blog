const crypto = require('crypto');
const fs = require('fs');

// Generate a pair of RSA keys
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,  // The length of the key in bits
});

// Save the private key to a file (keep this secure!)
fs.writeFileSync('private.key', privateKey.export({ type: 'pkcs1', format: 'pem' }));

// Save the public key to a file (this can be shared with clients)
fs.writeFileSync('public.key', publicKey.export({ type: 'pkcs1', format: 'pem' }));

console.log('RSA key pair generated and saved to files.');
