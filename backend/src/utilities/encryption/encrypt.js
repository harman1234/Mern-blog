const crypto = require('crypto');
const fs = require('fs')
const path = require('path')



const publicpath = path.join(__dirname,'public.key');
const publickey = fs.readFileSync(publicpath,'utf-8');

const text = 'harman123'
const buffer = Buffer.from(text,'utf-8')

const encrypt = crypto.publicEncrypt({key:publickey,
    padding:crypto.constants.RSA_PKCS1_PADDING 
},buffer);
const txt = encrypt.toString('base64')
console.log(txt)