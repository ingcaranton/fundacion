/*Variables Globales*/
var pag={};
var administrador= "";

/*Simulacion menu*/
function menu(titulo){
  this.titulo = titulo;
}
var menus = [
  new menu("Quienes Somos"), 
  new menu("Ayudar"), 
  new menu("Certificaciones"), 
  new menu("Eventos"), 
  new menu("Club Amigos"), 
  new menu("Yo soy tu"), 
  new menu("Video"), 
  new menu("Tienda Sana"), 
  new menu("Contacto"),
  new menu("ejemplo1"),
  new menu("ejemplo2"),
  new menu("ejemplo3")
];
/*Fin simulacion menu*/

/*Función de cargar en home*/
$(document).ready(function() {

  /*Menu dinamico*/
  var ul=document.getElementById("menu");
  for(var i=0; i<menus.length; i++){
    var span= document.createElement("span");
    span.class="caret";
    var a= document.createElement("a");
    a.class="dropdown-toggle";
    a.getAttribute('data-toggle','dropdown');
    a.role="button";
    a.getAttribute('aria-expanded', false);
    a.innerHTML=menus[i].titulo;
    a.appendChild(span);
    var li=document.createElement("li");
    li.class="dropdown";
    li.appendChild(a);
    ul.appendChild(li);
  }
  /*Fin Menu dinamico*/

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
  
  /*Acordeon*/
  function toggleChevron(e) {
    $(e.target)
      .prev('.panel-heading')
      .find("i.indicator")
      .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
  }
  $('#accordion').on('hidden.bs.collapse', toggleChevron);
  $('#accordion').on('shown.bs.collapse', toggleChevron);  
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
}
