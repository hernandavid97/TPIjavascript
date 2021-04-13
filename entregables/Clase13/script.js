$("#h1").slideDown("slow", aparecer2)

function desaparecer(){
  $(`h1`).delay(2000).slideUp("slow")
}

function aparecer2(h){  
  $(`#h2`).slideDown("slow",aparecer3)
}

function aparecer3(){  
  $(`#h3`).slideDown("slow",aparecer4)
}

function aparecer4(){  
  $(`#h4`).slideDown("slow",aparecer5)
}

function aparecer5(){  
  $(`#h5`).slideDown("slow",aparecer6)
}

function aparecer6(){  
  $(`#h6`).slideDown("slow",aparecer7)
}

function aparecer7(){  
  $(`#h7`).slideDown("slow",aparecer8)
}

function aparecer8(){  
  $(`#h8`).slideDown("slow",aparecer9)
}

function aparecer9(){  
  $(`#h9`).slideDown("slow",aparecer10)
}

function aparecer10(){  
  $(`#h10`).slideDown("slow", cambiatamano)
}

function cambiatamano(){
  $("h1").animate({fontSize:"100px"},"slow", cambiafondo).css({"color":"purple"})
}

function cambiafondo(){
  $("body").css({"background-color":"#3dc44f"})
  desaparecer()
  $("span").css({"color":"#3dc44f"})
}

