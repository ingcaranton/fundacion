var pag={};
var administrador= false;
$(document).ready(function() {
  $("#sliderImagenes").featureCarousel({ 
    largeFeatureWidth: 600,
    largeFeatureHeight: 380
  });
  cargarPaginasEnLayout(); 
});

function cargarPaginasEnLayout(){
	var table = document.getElementById("tablaEnlaces");
  var contador=1;
	var row = table.insertRow();
	for(var i=0; i<pag.length; i++){
		if(contador==6){
			row = table.insertRow();
			contador=1;
		}
		var cell = row.insertCell();
		var a = document.createElement("a");
        a.href = "/"+pag[i].nombreEnlace;
        a.innerHTML= pag[i].titulo;
		cell.appendChild(a);
        contador++;
	}
	if(contador==6){
		row = table.insertRow();		
	}
  if(administrador){
    var cell = row.insertCell();
    var a = document.createElement("a");
    a.href = "/admin/logout";
    a.innerHTML = "Salir"
    cell.appendChild(a);
  }else{
    var cell = row.insertCell();
    var a = document.createElement("a");
    a.href = "/admin/login";
    a.innerHTML = "Administrar";
    cell.appendChild(a);
  }
}

function cargarPaginasEnEditar(){
  var table = document.getElementById("tablaEditarEnlaces");
  var contador=1;
  var row = table.insertRow();
  for(var i=0; i<pag.length; i++){
    if(contador==6){
      row = table.insertRow();
      contador=1;
    }
    var cell = row.insertCell();
    var a = document.createElement("a");
    a.href = "/admin/"+pag[i].nombreEnlace;
    a.innerHTML= pag[i].titulo;
    cell.appendChild(a);
        contador++;
  }
}