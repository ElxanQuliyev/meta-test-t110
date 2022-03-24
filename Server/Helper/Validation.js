const db=require('../db')
const { addDoc, collection,getDocs ,QuerySnapshot, getDoc} = require('firebase/firestore');

  const rules= {
    Name:'required|string',
    Picture:'required|string'
   }
   
    function language(Languages,Languagelist){
    try {
        let answers=true
        Languagelist.forEach(x=>{
        const langcode=Languages.filter(a=>a.lang_code==x.data().name)[0]
        if (langcode.length==0) {
           answers=false
          }
        if (langcode.name==null || langcode.description==null || langcode.name==""){
           answers= false
        }
     })
         return answers
    } catch (error) {
        return false
    }
   }
   
   function catlanguage(Languages,Languagelist){
       try {
       let answers=true
        Languagelist.forEach(x=>{
            const langcode=Languages.filter(a=>a.lang_code==x.data().name)[0]
            if(typeof langcode.name==='undefined'){
                 answers= false
            }
            if(langcode.length==0){
                 answers= false
            }
             if (langcode.name==null || langcode.name==""){
                answers= false
            }
             })
             return answers;
       } catch (error) {
           return false;
       }
   }

   module.exports={
       rules,
       language,
       catlanguage,
   }