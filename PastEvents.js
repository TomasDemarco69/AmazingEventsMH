
var checkboxSelected = []
var textSearch = ""
let dataAPI = []
async function dataFromAPI(){
  
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(resp=>resp.json())
  .then(json=> dataAPI=json)
  console.log(dataAPI);
  crearCheckbox();
  
  var checkbox = document.querySelectorAll("input[type=checkbox]");
  
  checkbox.forEach(check => check.addEventListener("click", (evento)=>{
  
 let checked = evento.target.checked
 
 if (checked){
      checkboxSelected.push(evento.target.value)
      filterArray()
      console.log(checked);
    }
    else{
      checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== evento.target.value)
      filterArray()
      console.log(checked);
    }
    console.log(checkboxSelected);
    
  }))
filterArray() 
}
dataFromAPI()


//PARTE CHECKBOX
//PARTE CHECKBOX
//PARTE CHECKBOX
//PARTE CHECKBOX



function crearCheckbox(){
  
  var todosLosEventos = dataAPI.events.map(evento => evento.category);
  const dataArray = new Set(todosLosEventos);
  var categories = [...dataArray];
  var checkboxesSave = "";
  
  categories.forEach(category =>{
    checkboxesSave += `<label><input type="checkbox" value="${category}"> ${category} </label>`
  })
  document.getElementById("checkboxes").innerHTML = checkboxesSave;
  var id= 1
  dataAPI.events.map(evento => evento.id = id++)
  
}

//PARTE BUSQUEDA
//PARTE BUSQUEDA
//PARTE BUSQUEDA
//PARTE BUSQUEDA


var inputSearch = document.getElementById("search")
inputSearch.addEventListener("keyup", (evento)=>{
  textSearch = evento.target.value
  filterArray()
})


// combinacion de checkbox e inputtext

function filterArray() {
  
  let arrayVacio = [];
  
  if (checkboxSelected.length > 0 && textSearch != ""){
    checkboxSelected.map( event => {
      arrayVacio.push(...dataAPI.events.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase()) &&
      evento.category == event))
    })
  }
  
  else if (checkboxSelected.length > 0 && textSearch === ""){
    checkboxSelected.map(event => arrayVacio.push (...dataAPI.events.filter(evento => evento.category == event )))
  }
  
  else if (checkboxSelected.length == 0 && textSearch !== "") {
    arrayVacio.push(...dataAPI.events.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
  }
  
  else {arrayVacio.push(...dataAPI.events)}
  
  displayDatos (arrayVacio)
  
}

var fechaActual = "2022-01-01";
function displayDatos(Cartas){ 
  var templateHtml= "";
  if(Cartas.length !==0){
    for (var i=0; i < Cartas.length; i++){
      if (Cartas[i].date < fechaActual){ 
      
      
  templateHtml +=
  `
  <div class="col-xxl-3">
   <div class="card">
    <div>
      <img  class="card-img-top" src=${Cartas[i].image}>
     </div>
     <div class="card-body">
        <h5 class="card-title">${Cartas[i].name}</h5>
        <p class="card-text">Price:${Cartas[i].price}</p>
        <a href="./descripcion-evento.html?id=${Cartas[i].id}" class="btn btn-primary">Ver más</a>
     </div>
    </div>
   </div>
 `
    }
    document.querySelector("#partecards").innerHTML= templateHtml
  }
}
    else{   
      document.querySelector("#partecards").innerHTML= `<p> No se han encontrado resultados, ajuste su busqueda </p>`
    }
}