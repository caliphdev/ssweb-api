const FormData = require('form-data');
const type = require("file-type")
const fetch = require('node-fetch')
const cryp = require("crypto")

module.exports = async function uploadFile(buffer) {
let { ext } = await type.fromBuffer(buffer)
let bodyForm = new FormData();
let randomfile = cryp.randomBytes(5).toString('hex')
bodyForm.append('file', buffer, randomfile+'.'+ext)

let response = await fetch('https://filezone.my.id/upload', { method: 'post', body: bodyForm, headers: {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,id;q=0.8",
                "content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
            } })

return (await response.json()).result
} 
