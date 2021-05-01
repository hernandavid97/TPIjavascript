// AJAX, APIs --------------------------------------------------
function divisasGet(){ //consulta a api de divisas, trae valor de pesos argentinos a varias monedas
  const APIURL = 'https://api.exchangerate-api.com/v4/latest/ARS'
  $.get(APIURL, function(response, status){
    if(status == "success"){
      let props = Object.keys(response.rates)      
      for(item of props){    
        divisas.push({"cod":item, "valor": response.rates[item]})        
      }  
      cargaDivisas()    
    }else{console.log("Error al consultar divisas")}
  }) 
}
