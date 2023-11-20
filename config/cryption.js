require('dotenv').config();
const crypto = require('crypto');

const algorithm = process.env.ENC_ALG;
const key = crypto.createHash('sha256').update(String(process.env.ENC_KEY)).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);

const encryptText = (Text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(Text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

const decryptText = (Text) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = decipher.update(Text, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted
}

module.exports.encryptText = encryptText;
module.exports.decryptText = decryptText;