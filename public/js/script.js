/*Variables Globales*/
var pag={};
var administrador= "";

/*Función de cargar en home*/
$(document).ready(function() {
  /*Cargar Slider*/
  $(function() {
        var Page = (function() {
          var $navArrows = $( '#nav-arrows' ).hide(),
            $navDots = $( '#nav-dots' ).hide(),
            $nav = $navDots.children( 'span' ),
            $shadow = $( '#shadow' ).hide(),
            slicebox = $( '#sb-slider' ).slicebox( {
              onReady : function() {
                $navArrows.show();
                $navDots.show();
                $shadow.show();
              },
              orientation : 'r',
              cuboidsCount : 5,
              disperseFactor : 20,
              autoplay: true,
              interval: 4500,
              onBeforeChange : function( pos ) {
                $nav.removeClass( 'nav-dot-current' );
                $nav.eq( pos ).addClass( 'nav-dot-current' );
              }
            }),            
            init = function() {
              initEvents();              
            },
            initEvents = function() {
              // add navigation events
              $navArrows.children( ':first' ).on( 'click', function() {
                slicebox.next();
                return false;
              });
              $navArrows.children( ':last' ).on( 'click', function() {                
                slicebox.previous();
                return false;
              });
              $nav.each( function( i ) {              
                $( this ).on( 'click', function( event ) {                  
                  var $dot = $( this );                  
                  if( !slicebox.isActive() ) {
                    $nav.removeClass( 'nav-dot-current' );
                    $dot.addClass( 'nav-dot-current' );                  
                  }                  
                  slicebox.jump( i + 1 );
                  return false;                
                });                
              });
            };
            return { init : init };
        })();
        Page.init();
      });
  /*Fin Cargar Slider*/
  cargarPaginasEnLayout();

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