async function displayDatos(){

  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(resp=>resp.json())
  .then(json=> dataAPI=json)
  console.log(dataAPI);

  var idEvento = 1
  dataAPI.events.map(eventos => eventos.id= idEvento++)
  var id = location.search.split("?id=").filter(Number)
  console.log(location);
  console.log(id);
  var selectedId = Number(id[0])
  var eventos = dataAPI.events.find(function(evento){
    console.log(selectedId);
    return evento.id == selectedId

  })
  var templateHtml =  
  `
  <div class="card-detalles">
                               <div class="contenedor-img-detalles">
                                   <img class="img-detalles" src="${eventos.image}" alt="imagen">
                               </div>
                               <div class="descripcion-detalles">
                                     <div class="card-body-detalles">
                                         <div class="titulo-card-detalles">
                                            <h2 class="texto-detalles"> ${eventos.name}</h2>
                                         </div>
                                            <p class="texto-detalles">DESCRIPTION:${eventos.description}</p>
                                            <p class="texto-detalles">PLACE:${eventos.place}</p> 
                                            <p class="texto-detalles">CAPACITY:${eventos.capacity}</p>
                                            <p class="texto-detalles">ASSISTANCE:${eventos.assistance}</p>
                                            <p class="texto-detalles">PRICE:$${eventos.price}</p>
                                       </div>
                                </div>
                     </div>
                    
  `
  document.querySelector('#contenedordetalles').innerHTML = templateHtml
}
displayDatos();

