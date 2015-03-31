/*Variables Globales*/
  var pag={};
  var arrayImagenesSlider=["images/imageSlider/1.jpg","images/imageSlider/2.jpg","images/imageSlider/3.jpg","images/imageSlider/4.jpg","images/imageSlider/5.jpg","images/imageSlider/6.jpg","images/imageSlider/7.jpg"];
  var homeCargado=false;
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
          var tabla=$(this).attr('tabla');
          var panel=$(this).attr('panel');
          var filas=$('tr', '#'+tabla).length;
          if(filas==1){
            $("#editarMenu #accordion .seleccionUrl").css("display","none");
            $("#editarMenu #accordion .urlMenu").css("display","none");
            $("#editarMenu #accordion .tituloSubmenu").css("display","inherit");
            $("#editarMenu #accordion #"+tabla).css("display","inherit");
            $("#editarMenu #accordion .urlMenu #urlExterna").text("javascript:void(0);");
            $("#editarMenu #accordion #seleccionUrl").attr('checked', false);
          }
          $('#editarMenu #accordion #'+tabla+' > tbody:last').
            append('<tr id="'+(filas-1)+'" class="dato"><td>'+filas+'</td><td><input type="text" name="tituloSubmenu['+
            (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input type="text" name="urlSubmenu['+
            (filas-1)+']" required title=\'Url submenu requerida\'></input></td><td><span/></td><td><span/></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
            (filas-1)+',\''+panel+'\',\'Cancelar\')"> Cancelar </a></td></tr>');
        });
      /*Url interna o externa*/
        $("#editarMenu #accordion #seleccionUrl").click(function() { 
          if($("#editarMenu #accordion #seleccionUrl").is(':checked')) {  
            $("#editarMenu #accordion #urlExterna").css("display","none");
            $("#editarMenu #accordion #urlInterna").css("display","inherit");
          } else {  
            $("#editarMenu #accordion #urlExterna").css("display","inherit");
            $("#editarMenu #accordion #urlInterna").css("display","none"); 
          }  
        });
    /*fin editar Menu*/
    /*Menu nuevo*/
      $("#agregarMenu").click(function(){
        $("#menuNuevo").css("display","inherit");
      });
      $("#editarMenu #nuevoMenu #menuNuevo").on('click','#agregarSubmenuMenuNuevo',function(){
        var filas=$("tr","#menuNuevo table").length;
        if(filas==1){
          $("#editarMenu #nuevoMenu #menuNuevo .seleccionUrl").css("display","none");
          $("#editarMenu #nuevoMenu #menuNuevo .urlMenu").css("display","none");
          $("#editarMenu #nuevoMenu #menuNuevo .tituloSubmenu").css("display","inherit");
          $("#editarMenu #nuevoMenu #menuNuevo #tablaMenuNuevo").css("display","inherit");
          $("#editarMenu #nuevoMenu #menuNuevo .urlMenu #urlExterna").text("javascript:void(0);");
          $("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").attr('checked', false);
        }
        $('#editarMenu #menuNuevo table  > tbody:last').
            append('<tr id="'+(filas-1)+'" class="dato"><td>'+filas
            +'</td><td><input type="text" name="tituloSubmenu['+
            (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input name="seleccionUrl" type="checkbox"/></td><td><input type="text" name="urlSubmenu['+
            (filas-1)+']" required title=\'Url submenu requerida\'></input></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
            (filas-1)+',\'panelMenuNuevo\',\'Cancelar\')"> Cancelar </a></td></tr>');
      });
      /*Url interna o externa*/
      $("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").click(function() { 
        if($("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").is(':checked')) {  
          $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").css("display","none");
          $("#editarMenu #nuevoMenu #menuNuevo #urlInterna").css("display","inherit");
        } else {  
          $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").css("display","inherit");
          $("#editarMenu #nuevoMenu #menuNuevo #urlInterna").css("display","none"); 
        }  
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
      if(homeCargado){
        for(var i=0; i<7;i++){
          var img = $('<img src='+arrayImagenesSlider[usados[i]]+'>');
          var li = $('<li/>');
          li.append(img);
          $("#sb-slider").append(li);
        }
      }
    /*Formato fecha*/
      if($("#contenidoPagina #fecha #centro").attr("fecha")){
        var str=$("#contenidoPagina #fecha #centro").attr("fecha");
        var res = str.split(" ",4);
        var fecha=res[0]+" "+res[1]+"-"+res[2]+"-"+res[3];
        $("#contenidoPagina #fecha #centro span").text(fecha);
      }   
      if($("#todoContenido .derecha span.fecha").attr("fecha")){
        var str=$("#todoContenido .derecha span.fecha").attr("fecha");
        var res = str.split(" ",4);
        var fecha=res[0]+" "+res[1]+"-"+res[2]+"-"+res[3];
        $("#todoContenido .derecha span.fecha").text(fecha);
      }  
    /*Buscar*/
      $('#formularioBuscar').submit(function() {
        $.ajax({
          type: 'POST',
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function(data) {
            var contador=0;
            $("#resultadoBuscar ul").empty();
            while(contador<data.length){
              $("#resultadoBuscar ul").append("<li><a href="+data[contador].nombreEnlace+"><span><b>"+data[contador].titulo+"</b></span><br><p>"+data[contador].descripcion+"</p></a></li>");
              if(contador<(data.length-1)){
                $("#resultadoBuscar ul").append("<li class='linea'></li>");
              }
              contador++;
            }
          }
        })        
        return false;
      }); 
  });

/*Otras Funciones*/
  var usados= new Array();

  function cancelar_eliminarSubmenu(id,panel,accion){
    var tabla=$("#editarMenu #"+panel+" button").attr('tabla');
    bootbox.confirm("¿"+accion+" submenu?", function(result) {
      if(result){
        $("#editarMenu #"+tabla+" #"+id).remove();
        if($("tr","#editarMenu #"+tabla).length!=1){
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
        }else{
          $("#editarMenu #"+panel+" .seleccionUrl").css("display","inherit");
          $("#editarMenu #"+panel+" .urlMenu").css("display","inherit");
          $("#editarMenu #"+panel+" .tituloSubmenu").css("display","none");
          $("#editarMenu #"+panel+" #"+tabla).css("display","none");        
        }        
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