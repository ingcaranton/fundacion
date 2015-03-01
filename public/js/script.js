/*Variables Globales*/
var pag={};
var administrador= "";

/*Función de cargar en home*/
$(document).ready(function() {
  /*Cargar Slider*/
  $("#sliderImagenes").featureCarousel({ 
    largeFeatureWidth: 600,
    largeFeatureHeight: 380
  });
  cargarPaginasEnLayout();

  /*Carga los enlaces de las paginas en la opcion de editar*/
  if($("#editarEnlaces").length){
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
});

/*Carga los enlaces de las paginas en el pie de pagina*/
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

  /*Si existe  aparece enlace para salir*/
  if(administrador){
    var cell = row.insertCell();
    var a = document.createElement("a");
    a.href = "/admin/logout";
    a.innerHTML = "Salir"
    cell.appendChild(a);
  }else{
  /*Si no existe administrador aparece enlace para login*/
    var cell = row.insertCell();
    var a = document.createElement("a");
    a.href = "/admin/login";
    a.innerHTML = "Administrar";
    cell.appendChild(a);
  }
}