// Address Marking is not possible now
const fs=require('fs')
const readline=require('readline')
var node_ner=require('node-ner')
var ner=new node_ner({
    install_path:'C:\\Users\\amand\\Desktop\\prototype\\stanford-ner'
})


const extraction=async (filepath,clbk)=>{

    const found=[]
    const piiTypes=[
    {
        type:'Email',
        reg: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi,
        redact:'<EMAIL_ID>'
    },
    {   
        //add formate checker
       type:'Phone_Number',
        reg:/(\+\d{1,2}\s)?\(?\d{3}\)?[/\s.-]?\d{3}[/\s.-]?\d{4}/g,
        redact:'<PHONE_NUMBER>'
    },
   {
       type:'SSN',
        reg:/\d{3}-?\d{2}-?\d{4}/g,
        redact:'<SSN>'
    },
   {    //add format checker
       type:'Date_Time',
        reg:/\b(?:\d{2}[./-]\d{2}[./-]\d{4}|\d{4}[./-]\d{2}[./-]\d{2}|\d{1,2}[./\- ]{1,3}(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[,./\- ]{1,3}\d{2,4}|(?:January|February|March|April|May|June|July|August|September|October|November|December)[,./\- ]{1,2}\d{2,4}|(?:January|February|March|April|May|June|July|August|September|October|November|December)[./\- ]{1,2}\d{1,2}[,./\- ]{1,2}\d{4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[./\- ]*\d{1,2}[,./\- ]*\d{4})|((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|(?:((0[13-9]|1[0-2])\/(29|30))|((0[13578]|1[0-2])\/31))|((?:(?:1[012])|[1-9])\/(?:(?:[1-2][0-9])|3[0-2]|[0-9]))|((?:(?:1[012])|[1-9])-(?:(?:[1-2][0-9])|3[0-2]|[0-9])-[0-9]{2})\b/gi,
        redact:'<DATE_TIME>'
    },
   {    
       type:'Url_Link',
        reg:/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ig,
        redact:'<URL_LINK>'
    },
    {
        //add ip address checker
       type:'Ip_Address',
        reg:/(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})/g,
        redact:'<IP_ADDRESS>'
    },
    //{
        //need a proper regex
      //  type:'Address',
        //reg:/(\d{1,5}\s+[\w\s]+\s+(?:street|st|avenue|ave|road|rd|blvd|way|drive|dr)\.?(?=\s|$))/gi,
        //redact:'<ADDRESS>'
    //}
    ]

    const r1=readline.Interface({
        input:fs.createReadStream(filepath),
        crlfDelay:Infinity
    });

    r1.on('line',(line)=>{

        piiTypes.forEach((reg)=>{
            const match=line.match(reg.reg);
            if(match){
                for(let i=0;i<match.length;i++){
                    found.push({value:match[i],redact:reg.redact,type:reg.type})
                }            
            }
        })
    })
    r1.on('close',()=>{

        ner.fromFile(filepath,(ents)=>{
            if(ents.PERSON){
                for(let i=0;i<ents.PERSON.length;i++){
                    found.push({value:ents.PERSON[i],redact:'<PERSON>',type:'Person'})
                }
            }
            if(ents.ORGANIZATION){
                for(let i=0;i<ents.ORGANIZATION.length;i++){
                    
                    found.push({value:ents.ORGANIZATION[i],redact:'<ORGANIZATION>',type:'Organization'})
                }
            }
            clbk(found)
        })
    })
}
module.exports=extraction