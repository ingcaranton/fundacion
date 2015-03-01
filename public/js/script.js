var pag={};
$(document).ready(function() {
  $("#sliderImagenes").featureCarousel({ 
  });
  cargarPaginasEnLayout();
  cargarPaginasEnEditar();
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
	var cell = row.insertCell();
	var a = document.createElement("a");
  a.href = "/admin/";
  a.innerHTML = "Editar"
	cell.appendChild(a);
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