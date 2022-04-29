 //import  * as RR from  "../redux/RootReducer";
 //console.log( RR    );


export function InspectForAnim(e) { 
       
      //

    let _endResult={status:null, message:''}    
    // check 1 for Animation Code is not presence.
        let CheckPoint1, CheckPoint2=false; 
        _endResult.status=false; 
       
          
        let _animCode = e;

         if(_animCode.replace(/[\s\t]+/gm, '').indexOf("constmotionWidget={")!==-1){
            CheckPoint1=true;
         }else{
            CheckPoint1=false;
         }
  

         // -----
         let _compCode = e.replace(/[\s\t]+/gm, '')//.split('components:[')[1];
 
         if(_compCode.indexOf('components:[')!==-1){
        
           // This will be taken from redux root reducer later to avoid hardcoding.
            const registeredComponents = ["map","hybridGallery", "scrollbar", "containerGallery", "tabs", "imageGallery","containerGallery"]// 
            
            
            registeredComponents.map((value, index, arr)=>{
                   // console.log(  value, _compCode.split("components:")[1].replace(/[\s\t]+/gm, '').indexOf('name:"'+value+'"'), 'name:"'+value+'"'  )
                        if(_compCode.split("components:")[1].replace(/[\s\t]+/gm, '').indexOf('name:"'+value+'"') !==-1){
                            CheckPoint2=true; 
                        }  
                });
            
            } else{
                CheckPoint2=false; 
        }      
         
       // console.info( !CheckPoint1,  !CheckPoint2)

        if(!CheckPoint1 && !CheckPoint2){
            _endResult.status=true;
            _endResult.message="Invalid Java Script file.";
        } else if(!CheckPoint1){
            _endResult.status=true;
            _endResult.message="Animation code is not present in the Java Script file uploaded.";
            
        } 

        if(!CheckPoint2){
            //_endResult.message="Component code is not present in the Java Script file uploaded";            
        }

        return _endResult;

   }

//// Function to check if brackets are balanced paired.
/*
if there is a syntax error(related to {} globally and[] only in animation code) in the uploaded designer-config.js file, show a message "syntax error! please check java-script file uploaded".
*/

export function CharPairChecker(_codeString, _character){
  /*
  only use for [],{},()
  pass code content as string in param first, and type of character pair like, 
  {},[],() in second param.
  Usage: ver res =  charPairChecker('function()[[break;var l=43,for..=>{}]{}}', "[]");
             res.status | res.message
  Output: WIll be an object, with 2 keys - 'status' and 'message'
          {status: true, message: 'Pairing is fine for []'}
          {status: false, message: '1 right pair element/s ] missing'}
          {status: false, message: '2 left pair element/s [ missing'}
  */
  let _cont=0; 
  let _contLb=0;
  let _contRb=0;
  let _endResult={status:null, message:''}
  
  for(let i=0; i<_codeString.split('').length; i++){
    if(_codeString[i].indexOf(_character.split("")[0])>=0){_contLb++}
    if(_codeString[i].indexOf(_character.split("")[1])>=0){_contRb++}
    if(_codeString[i].indexOf(_character.split("")[0])>=0 || _codeString[i].indexOf(_character.split("")[1])>=0){ _cont++;
    
     if(_contLb<_contRb){
       _endResult.status=_contLb===_contRb;
       _endResult.message="Syntax error! Please check java-script file uploaded.  :: "+(_contRb-_contLb)+" "+ _character.split("")[0]+ " missing";
     }else if(_contLb>_contRb){ 
       _endResult.status=_contLb===_contRb;
       _endResult.message="Syntax error! Please check java-script file uploaded.  :: "+(_contLb-_contRb)+" " + _character.split("")[1]+ " missing";
     }else if(_contLb===_contRb){
       _endResult.status=_contLb===_contRb;
       _endResult.message=_character.split("")[0]+_character.split("")[1]+" Pairing fine";
     }
                                                                                                                 
    }
  }
  
  return _endResult;
}
// end of char pair checker.

 