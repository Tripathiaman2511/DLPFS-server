const fs=require('fs')
const { faker } = require('@faker-js/faker');

const replace=(path,foundValue,clbk)=>{
    const fileContent=fs.readFileSync(path,'utf-8')
    let replacedValue=fileContent

    const fakeDate=()=>{
        const date=faker.date.between('1900-01-01', '2023-02-23')
        return date.toLocaleDateString()
    }
    foundValue.forEach((found)=>{
        switch(found.type){
            case 'Email':
                replacedValue=replacedValue.replace(found.value,faker.internet.email())
            break;
            case 'Phone_Number':
                replacedValue=replacedValue.replace(found.value,faker.phone.number())
            break;
            case 'SSN':
                replacedValue=replacedValue.replace(found.value,faker.helpers.fake('{{phone.number(###)}}-{{phone.number(##)}}-{{phone.number(####)}}'))
            break;
            case 'Date_Time':
                replacedValue=replacedValue.replace(found.value,fakeDate)
            break;
            case 'Url_Link':
                replacedValue=replacedValue.replace(found.value,faker.internet.url())
            break;
            case 'Ip_Address':
                replacedValue=replacedValue.replace(found.value,faker.internet.ip())
            break;
            case 'Person':
                replacedValue=replacedValue.replace(found.value,faker.name.fullName())
            break;
            case 'Organization':
                replacedValue=replacedValue.replace(found.value,faker.company.name())  
        }
    })
    clbk(replacedValue)


}
module.exports=replace