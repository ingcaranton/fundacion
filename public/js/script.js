/*Variables Globales*/
  var pag={};

  var arrayImagenesSlider=["images/imageSlider/1.jpg","images/imageSlider/2.jpg","images/imageSlider/3.jpg","images/imageSlider/4.jpg","images/imageSlider/5.jpg","images/imageSlider/6.jpg","images/imageSlider/7.jpg"];

/*Función de cargar en home*/
  $(document).ready(function() {
    posiciones();
    /*Selector de imagen*/
      $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });
      
      $(document).ready( function() {
        $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
            
            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;
            
            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }          
        });
      });
    /*fin selector de imagen*/
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
              autoplay: false,
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
    /*Acordeon*/
      function toggleChevron(e) {
        $(e.target)
          .prev('.panel-heading')
          .find("i.indicator")
          .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
      }
      $('#accordion').on('hidden.bs.collapse', toggleChevron);
      $('#accordion').on('shown.bs.collapse', toggleChevron);  
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
    /*editar Menu*/
      /*Ocultar paneles*/
      $("#editarMenu #accordion").on('click','a.aEditar',function(){
        var titulo=$(this).attr('titulo'); 
        $("#editarMenu #accordion .panel-heading").css("display","inherit");
        $("#editarMenu #accordion #"+titulo).css("display","none");
      });
      /*Actualizar panel*/
      $("#editarMenu #accordion").on('click','a.aCancelar',function() {
        var panel=$(this).attr('panel');
        var panelCollapse=$(this).attr('panelCollapse');
        var titulo=$(this).attr('titulo');
        $('#'+panel).load(' #'+titulo+', #'+panelCollapse);
      });
      $("#editarMenu #menuNuevo").on('click','#aCancelar',function() {
        $('#nuevoMenu').load(' #menuNuevo');
      });
      /*Agregar submenu*/
      $("#editarMenu #accordion .panel.panel-primary .acciones").on('click', 'a.agregarSubmenu',function(){
        $('#editarMenu #accordion .alert').css("display","none");
        var tabla=$(this).attr('tabla');
        var panel=$(this).attr('panel');
        var filas=$('tr', '#'+tabla).length;
        $('#editarMenu #accordion #'+tabla+' > tbody:last').
          append('<tr id="'+(filas-1)+'" class="dato"><td>'+filas+'</td><td><input type="text" name="tituloSubmenu['+
          (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input type="text" name="urlSubmenu['+
          (filas-1)+']" required title=\'Url submenu requerida\'></input></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
          (filas-1)+',\''+panel+'\',\'Cancelar\')"> Cancelar </a></td></tr>');
      });
    /*fin editar Menu*/
    /*Menu nuevo*/
      $("#agregarMenu").click(function(){
        $("#menuNuevo").css("display","inherit");
      });
      $("#editarMenu #nuevoMenu #menuNuevo").on('click','#agregarSumenuMenuNuevo',function(){
        var filas=$("tr","#menuNuevo table").length;
        $('#editarMenu #menuNuevo table  > tbody:last').
            append('<tr id="'+(filas-1)+'" class="dato"><td>'+filas
            +'</td><td><input type="text" name="tituloSubmenu['+
            (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input type="text" name="urlSubmenu['+
            (filas-1)+']" required title=\'Url submenu requerida\'></input></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
            (filas-1)+',\'panelMenuNuevo\',\'Cancelar\')"> Cancelar </a></td></tr>');
      });
    /*Fin menu nuevo*/
    /*Confirmación de elimar pagina*/
      $("#editarPaginas table").on('click', 'a.eliminarPagina', function(){
        var pagina=$(this).attr('pagina');
        var enlace=$(this).attr('enlace');
        bootbox.confirm("¿Eliminar pagina "+pagina+"?", function(result) {    
          if(result){
            $("#editarPaginas table a.eliminarPagina").attr('href', "/admin/pagina/borrar/"+enlace);
            document.location.href=$("#editarPaginas table a.eliminarPagina").attr('href');
          }      
        }); 
      });
    /*Confirmación de elimar menu*/
      $("#editarMenu #accordion .panel.panel-primary .acciones").on('click', 'a.eliminarMenu',function(){
        var menu=$(this).attr('menu');
        var enlace=$(this).attr('enlace');
        bootbox.confirm("¿Eliminar menu "+menu+"?", function(result) {    
          if(result){
            document.location.href=enlace;
          }      
        }); 
      });
    /*Boton subir*/
      $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
      });
    /*Imagenes Aleatorias Slider*/
      for(var i=0; i<7;i++){
        var img = $('<img src='+arrayImagenesSlider[usados[i]]+'>');
        var li = $('<li/>');
        li.append(img);
        $("#sb-slider").append(li);
      }
  });

/*Otras Funciones*/
  var usados= new Array();

  function cancelar_eliminarSubmenu(id,panel,accion){
    var tabla=$("#editarMenu #"+panel+" button").attr('tabla');
    bootbox.confirm("¿"+accion+" submenu?", function(result) {
      if(result){
        $("#editarMenu #"+tabla+" #"+id).remove();
        var i=1;
        $('#'+tabla+' tr.dato').each(function () {
          var td=$(this).find("td").eq(0);
          td.html(i);
          this.id=i-1;
          $(this).find("td").eq(1).find("input").attr('name','tituloSubmenu['+(i-1)+']');
          $(this).find("td").eq(2).find("input").attr('name','urlSubmenu['+(i-1)+']');
          $(this).find("td").eq(3).find("a").attr('onclick','cancelar_eliminarSubmenu('+(i-1)+', "'+panel+'")');
          i++;
        });
      }
    });
  }  

  function repetido(num){ 
    var repe= false; 
    for (i=0; i<usados.length; i++) { 
      if (num == usados[i]) { 
        repe = true; 
      } 
    } 
    return repe; 
  } 

  function aleatorio(min, max){ 
    while (repe != false) { 
      var num= Math.floor(Math.random()*(max-min+1))+min; 
      var repe = repetido(num); 
    } 
    usados.push(num); 
    return num; 
  } 

  function posiciones(){
    for(var i=0; i<7; i++){
      aleatorio(0,6);
    }
  }