/*Variables Globales*/
var pag={};
var administrador= "";
var numElementosMenu=8;

/*Simulacion menu*/
function menu(titulo, arreglo){
  this.titulo = titulo;
  this.arregloSubmenu=arreglo;
  url="#";
}
function submenu(tit, url){
  this.titulo=tit;
  this.url=url;
}

var menus = [
  new menu("Quienes Somos", new Array(new submenu("Sobre Nosotros", "#"), new submenu("Informacion Centros", "#") ,
  new submenu("Franquicias", "#"), new submenu("Plataforma de difusión", "#"))), 
  new menu("Ayudar", new Array(new submenu("Como Voluntario", "#"), new submenu("Hacer Donación", "#"))), 
  new menu("Certificaciones", new Array(new submenu("Salud Física", "#"), new submenu("Salud Emocional", "#"),
  new submenu("Conexión Espiritual", "#"))), 
  new menu("Eventos", []), 
  new menu("Club Amigos", []), 
  new menu("Yo soy tu", []), 
  new menu("Video", []), 
  new menu("Tienda Sana", []), 
  new menu("Contacto", new Array(new submenu("Sobre Nosotros", "#"), new submenu("Informacion Centros", "#") ,
  new submenu("Franquicias", "#"), new submenu("Plataforma de difusión", "#"))),
  new menu("ejemplo1", new Array(new submenu("Sobre Nosotros", "#"), new submenu("Informacion Centros", "#") ,
  new submenu("Franquicias", "#"), new submenu("Plataforma de difusión", "#"))),
  new menu("ejemplo2", []),
  new menu("ejemplo3", [])
];


/*Fin simulacion menu*/

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
              interval: 6000,
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
  /*Agregar menu al navbar*/
  var ul = document.getElementById("menu");
  for(var j=0; j<menus.length; j++){
    if(j<numElementosMenu){
      ul.appendChild(crearMenu(menus[j]));
    }
  }
  
  if(menus.length>numElementosMenu){
    ul.appendChild(agregarMas());
  }
  /*fin agregar menu al navbar*/
    /*navbar*/
  $(function() {
    window.prettyPrint && prettyPrint()
    $(document).on('click', '.yamm .dropdown-menu', function(e) {
      e.stopPropagation()
    })
  })
     // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });

  // ADD SLIDEUP ANIMATION TO DROPDOWN //
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });
  /*fin navbar*/

  /*flip*/
  $(function(){      
    $(".card").flip({        
      velMax:10000,
      velMin:7500,
      rangoMax:(pag.length-1),
      rangoMin:1
    });
  });
  /*fin flip*/
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

/*Crear menu*/
function crearMenu(menu){
  var liMenu = document.createElement("li");
  liMenu.className="dropdown";
  var aMenu = document.createElement("a");
  aMenu.className="dropdown-toggle";
  aMenu.setAttribute("data-toggle", "dropdown");
  aMenu.href=menu.url;
  aMenu.innerHTML=menu.titulo;
  if(menu.arregloSubmenu.length>0){
    var b = document.createElement("b");
    b.className="caret";
    aMenu.appendChild(b);
  }
  liMenu.appendChild(aMenu);
  /*agregar submenu*/
  if(menu.arregloSubmenu.length>0){
    var ulMenu = document.createElement("ul");
    ulMenu.className="dropdown-menu";
    var liSubmenu = document.createElement("li");
    liSubmenu.className="grid-demo";
    var divSubmenu = document.createElement("div");
    divSubmenu.className="row";
    var divLista = document.createElement("div");
    divLista.className="col-sm-6";
    divLista.appendChild(agregarSubmenu(menu.arregloSubmenu));
    divSubmenu.appendChild(divLista);
    var divImagen = document.createElement("div");
    divImagen.className="col-sm-4";
    divImagen.id="imagenSubmenu";
    var imagen = document.createElement("img");
    imagen.src="/images/logo.png";
    imagen.width="120";
    divImagen.appendChild(imagen);
    divSubmenu.appendChild(divImagen);
    liSubmenu.appendChild(divSubmenu);
    ulMenu.appendChild(liSubmenu);
    liMenu.appendChild(ulMenu);
  }  
  /*fin agregar submenu*/
  return liMenu;
}

function agregarSubmenu(submenu){
  var ulLista = document.createElement("ul");
  ulLista.className="yamm-content list-unstyled";
  ulLista.setAttribute("role","menu");
  for(var i=0; i<submenu.length; i++){
    var liElemento = document.createElement("li");
    var aElemento = document.createElement("a");
    aElemento.setAttribute("tabindex","-1");
    aElemento.href=submenu[i].url;
    aElemento.innerHTML=submenu[i].titulo;
    liElemento.appendChild(aElemento);
    ulLista.appendChild(liElemento);
    /*agrega li.divider solo si faltan elementos por agregar*/
    if(i==(submenu[i].length-1)){
      var liDivider = document.createElement("li");
      liDivider.className="divider";
      ulLista.appendChild(liDivider);
    } 
  }
  return ulLista;
}
/*Fin crear menu*/

/*agregar mas: Agrega un list si los elementos del menu sobrepasan a 8*/
function agregarMas(){  
  var li = document.createElement("li");
  li.className="dropdown yamm-fw";
  var a = document.createElement("a");
  a.className="dropdown-toggle";
  a.href="#";
  a.setAttribute("data-toggle","dropdown");
  a.innerHTML="Mas...";
  var b = document.createElement("b");
  b.className="caret";
  a.appendChild(b);
  li.appendChild(a);
  var ul = document.createElement("ul");
  ul.className="dropdown-menu";
  var liMenu = document.createElement("li");
  var divYamContent = document.createElement("div");
  divYamContent.className="yamm-content";
  var divRow = document.createElement("div");
  divRow.className="row";
  agregarMenusLista(divRow);
  divYamContent.appendChild(divRow);
  liMenu.appendChild(divYamContent);
  ul.appendChild(liMenu);
  li.appendChild(ul);
  return li;
}

function agregarMenusLista(row){
  for(var m=numElementosMenu; m<menus.length; m++){
    var ul = document.createElement("ul");
    ul.className="col-sm-2 list-unstyled";
    var liDivider = document.createElement("li");
    liDivider.className="divider";
    var li = document.createElement("li");
    var h4 = document.createElement("h4");
    h4.innerHTML = menus[m].titulo;
    li.appendChild(h4);
    ul.appendChild(li);
    ul.appendChild(liDivider);
    for(var q=0; q<menus[m].arregloSubmenu.length; q++){
      var liElemento = document.createElement("li");
      var a = document.createElement("a");
      a.href=menus[m].arregloSubmenu[q].url;
      a.innerHTML=menus[m].arregloSubmenu[q].titulo;
      liElemento.appendChild(a);
      ul.appendChild(liElemento);
    }
    row.appendChild(ul);
  }
}
/*fin agregar mas*/

/*agregar flips*
function agregarFlips(){
  var secciones = document.getElementById("seccionesPrincipales");
  for(var i=0; i<8; i++){
    var div 
  }
  #card-2.card
      .cards.front
      .cards.back   
      ul.store
        each pagina in pag 
          if pagina
            if pagina.categoria
              if pagina.categoria == "fisico"
                li
                  .content.fisico 
              if pagina.categoria=="emocional"
                li
                  .content.emocional 
              if pagina.categoria=="espiritual"
                li
                  .content.espiritual
              if pagina.categoria=="otro"
                li
                  .content.otro 
          //#imagenDescripcion
            img(src=pagina.linkImagen width="100" height="100")
          //#descripcion 
          //p #{pagina.descripcion}
}
/*fin flips*/