const fs=require('fs')
const mask=(path,foundValue,clbk)=>{
    const fileContent=fs.readFileSync(path,'utf-8')
    let maskedValue=fileContent
    foundValue.forEach(found=>{
        maskedValue=maskedValue.replace(found.value,found.redact)
    })
    clbk(maskedValue)
}
module.exports=mask