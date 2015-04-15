/*Variables Globales*/
  var pag={};
  var ultimasEntradas={};
  var ultimasEntradasPrimarias={};
  var arrayImagenesSlider=[{src:"images/imageSlider/1.png",url:"/Los5principiosdelAcompanar",descripcion:"Programa para el cuidado del ser y sus relaciones, 7 sesiones que permiten identificar las dificultades y las potencialidades de los participantes, encontrando caminos de transformación que mejoran los escenarios de vida de las personas, las familias y las comunidades."},
    {src:"images/imageSlider/2.jpg",url:"/croquetazanahoria",descripcion:"Las zanahorias son una de las hortalizas que más se producen a nivel mundial. Por contener carotenoides, numerosos estudios la han vinculado con la prevención del cáncer de mama. Además, es fuente de vitaminas A, B, C y E. También contiene minerales y antioxidantes."},
    {src:"images/imageSlider/3.jpg",url:"/hamburguesavegetariana",descripcion:"Aquí tienes 4 opciones de hamburguesa vegetariana, para preparar y disfrutar de un rico y saludable almuerzo. Puedes variar y combinar los distintos ingredientes que más te gusten, para preparar tu hamburguesa perfecta."},
    {src:"images/imageSlider/4.jpg",url:"/semillastradicionales",descripcion:"Sembrar, cosechar y cocinar nuestros alimentos nos permite retornar al origen de la vida, a nuestra cultura a nuestro legado. Somos como las semillas diversas, coloridas y sonrientes."},
    {src:"images/imageSlider/5.jpg",url:"/domoconsacosdetierra",descripcion:"Los domos hechos con sacos de tierra no son algo novedoso, estas estructuras se han utilizado desde siempre. Actualmente la Bioconstrucción los presenta como una opción equilibrada y amigable  con el medio ambiente, para así generar un  espacio cómodo  y  a  bajo costo."}];
  var homeCargado=false;
  var vistaDonacion=false;
  var arrayColor=["#fe889b","#d273cd","#8762ab","#36abd0","#00c7fc","#00bb41","#fef000","#ffa700","#ff7f5b"];
/*Función de cargar en home*/
  $(document).ready(function() {
    posiciones();
    llenarCards(ultimasEntradasPrimarias, ultimasEntradas);
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
      $('#accordionClubAmigos').on('hidden.bs.collapse', toggleChevron);
      $('#accordionClubAmigos').on('shown.bs.collapse', toggleChevron);  
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
      /*centrar menu*/
        var longitudDivMenu = $("#navbar-collapse-1").css("width").slice(0,-2);
        var paddingDivMenu = $("#navbar-collapse-1").css("padding-left").slice(0,-2);
        var longitudMenu=$("#navbar-collapse-1 ul#ulPrincipal").css("width").slice(0,-2);
        left = ((longitudDivMenu-longitudMenu)/2)-paddingDivMenu;
        //$("#navbar-collapse-1 ul#ulPrincipal").css("margin-left",left+"px");
        var longitudVentana = $(window).width();
        var marginSubmenu = (longitudVentana-longitudMenu)/2;
        $("ul.submenus.dropdown-menu.colorSubmenu").css("margin", "0 "+marginSubmenu+"px");
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
            (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input name="seleccionUrl" type="checkbox"/></td><td><input type="text" name="urlSubmenu['+
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
    /*FlechaBajar*/
      $.fn.scrollBottom = function() { 
        return $(document).height() - this.scrollTop() - this.height() - 200; 
      };
      $('a.scrolldown').click(function(){
        $("html, body").animate({ scrollTop: $("#seccionesPrincipales").scrollBottom() }, 900);
        return false;
      });
    /*Imagenes y color Aleatorios Slider*/
      if(homeCargado){
        for(var i=0; i<arrayImagenesSlider.length;i++){
          var img = $('<img src="'+arrayImagenesSlider[usados[i]].src+'">');
          var h3 = $('<h3 style="font-size:14px">'+arrayImagenesSlider[usados[i]].descripcion+'</h3>')
          var a = $('<a href="'+arrayImagenesSlider[usados[i]].url+'"><div class="divLinkImagen"><b style="font-size:14px">LEER +</b></div></a>');
          var div = $('<div class="sb-description"></div>');
          div.append(h3);
          div.append(a);
          var li = $('<li/>');
          li.append(img);
          li.append(div);
          $("#sb-slider").append(li);
        }
        var posicionColor= Math.floor(Math.random()*(8-0+1))+0; 
        $("#slider").css("background-color", arrayColor[posicionColor]);
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
    /*Color Menu*/
      $("#navbar-collapse-1 ul li .colorMenu").each(function(index, element){
        $(this).css("background-color", arrayColor[index]);
      });
      $("#navbar-collapse-1 ul li a.dropdown-toggle").on("click",function(){
        var div=$(this).attr("idDiv");
        var li=$(this).attr("li");
        var submenu = $("#navbar-collapse-1 ul #"+li);
        $("#navbar-collapse-1 ul li .colorMenu").each(function(element){
          var id = $(this).attr("id");
          if(id==div && submenu.attr("class")!="dropdown yamm-fw open"){
            $(this).css("visibility" , "visible");
          }else{
            $(this).css("visibility" , "hidden");
          }
        });
      });
      $("#navbar-collapse-1 ul li ul.colorSubmenu").each(function(index, element){
        $(this).css("background-color", arrayColor[index]);
        if(arrayColor[index]== "#fef000"){
          var ul = $(this).attr("id");
          $("#navbar-collapse-1 ul li #"+ul+" a.tituloSubmenu").css("color", "gray");
        }
      });
    /*divSinImagen*/
      for(var i=1; i<=8; i++){
        if($("#d"+i+" p").css("height")){
          var height = $("#d"+i+" p").css("height").slice(0,-2);
          var padding = (280-height)/2;
          $("#d"+i+" p").css("padding", padding+"px 5px")
        }
      }      
    /*mas contenido en home*/
      var anchoVentana = $(window).width();
      var padding = (anchoVentana-1100)/2;
      $("#masContenido").css("padding","2% "+padding+"px");
    /*vista donacion*/
      if(vistaDonacion){
        $("#paginaDonacion #formulario").css("display", "none");
        $("#paginaDonacion #confirmacion").css("display", "inherit");
      }else{
        $("#paginaDonacion #formulario").css("display", "inherit");
        $("#paginaDonacion #confirmacion").css("display", "none");
      }
    /*input cantidad*/
      $("#paginaDonacion #formulario #opciones #dinero #checkDinero").on("click",function() { 
        if($("#paginaDonacion #formulario #opciones #dinero #checkDinero").is(':checked')) {  
          $("#paginaDonacion #formulario #cantidad").css("display", "inherit");  
          $("#paginaDonacion #formulario #cantidad").attr("required", true);
        } else {  
          $("#paginaDonacion #formulario #cantidad").css("display", "none");
          $("#paginaDonacion #formulario #cantidad").attr("required", false);
        } 
      });
    /*posicionFooter*/
      var heightFooter = ($("#piePagina").css("height")).slice(0,-2);
      var heightVentana = heightWindow()-heightFooter;
      $("#contenido").css("min-height",heightVentana+"px");
    /*llenar divs principales home*/
      for(var i=0; i<ultimasEntradasPrimarias.length; i++){
        if(ultimasEntradasPrimarias[i].categoria=="fisico"){
          var contenido = llenarCardsPrincipales(ultimasEntradasPrimarias[i], 1);        
          $("#contenido #seccionesPrincipales #cards #cardFisico").append(contenido);
        }else if(ultimasEntradasPrimarias[i].categoria=="emocional"){
          var contenido = llenarCardsPrincipales(ultimasEntradasPrimarias[i], 3); 
          $("#contenido #seccionesPrincipales #cards #cardEmocional").append(contenido);
        }else if(ultimasEntradasPrimarias[i].categoria=="espiritual"){
          var contenido = llenarCardsPrincipales(ultimasEntradasPrimarias[i], 6); 
          $("#contenido #seccionesPrincipales #cards #cardEspiritual").append(contenido);
        }
      }
    /*redirecciones pagina donacion*/
      $("#paginaDonacion #confirmacion #tiempoEspecie").on("click",function(){
        bootbox.alert("Muchas gracias por tu apoyo, pronto estaremos en contacto!!", function(result){
          location.href="/";
        });
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
    for(var i=0; i<5; i++){
      aleatorio(0,4);
    }
  }
  function llenarCardsPrincipales(estructura, id){
    var divContenidoCard = $("<div class='contenidoCard'></div>");
    if(estructura.linkImagen){
      var divImagenDescripcion = $("<div class='imagenDescripcion'></div>");
      var img = $("<img src='"+estructura.linkImagen+"'></img>");
      divImagenDescripcion.append(img);
      var divDescripcion = $("<div class='descripcion'></div>");
      var p = $("<p>"+estructura.descripcion+"</p>");
      divDescripcion.append(p);
      divContenidoCard.append(divImagenDescripcion);
      divContenidoCard.append(divDescripcion);
    }else{
      var divDescripcionSinImagen = $("<div class='descripcionSinImagen' id='d"+id+"'></div>");
      var p = $("<p id='p"+id+"'>"+entradasPrimarias[i].descripcion+"</p>");
      divDescripcionSinImagen.append(p);
      divContenidoCard.append(divDescripcionSinImagen);
    }
    var a = $("<a href='/"+estructura.nombreEnlace+"'></a>");
    var divLeerMas = $("<div class='leerMas'>LEER +</div>");
    a.append(divLeerMas);
    divContenidoCard.append(a);
    return divContenidoCard;
  }
  function sacarRepetidosUltimasEntradas(array1,array2){
    var arrayPrimario=array1;
    var arraySecundario=array2
    for(var i=0; i<arraySecundario.length; i++){
      for(var j=0; j<arrayPrimario.length; j++){
        if(arrayPrimario[j].categoria!="sinCategoria"){
          if(arrayPrimario[j].nombreEnlace==arraySecundario[i].nombreEnlace){
            delete arraySecundario[i];
            j=arrayPrimario.length;
          }
        }
      }
    }
    for(var i=0; i<arraySecundario.length; i++){
      if(!arraySecundario[i]){
        arraySecundario.splice(i,1);
      }
    }
    return arraySecundario;
  }
  function llenarCards(array1, array2){
    var entradas=sacarRepetidosUltimasEntradas(array1,array2);  
    for(var i=0;i<entradas.length;i++){
      if(entradas[i]){
        var contenidoCard = $("<div class='contenidoCard'></div>");
        if(entradas[i].linkImagen){
          var imagenDescripcion =$("<div class='imagenDescripcion'></div>");
          var img = $("<img src='"+entradas[i].linkImagen+"'/>");
          imagenDescripcion.append(img);
          var descripcion = $("<div class='descripcion'></div>");
          var p = $("<p>"+entradas[i].descripcion+"</p>");
          descripcion.append(p);
          contenidoCard.append(imagenDescripcion);
          contenidoCard.append(descripcion);
        }else{
          var descripcionSinImagen = $("<div class='descripcionSinImagen'></div>");
          var p2 = $("<p>"+entradas[i].descripcion+"</p>");
          if(i==0){
            descripcionSinImagen.attr("id","d2");
            p2.attr("id","p2");
          }else if(i==1){
            descripcionSinImagen.attr("id","d4");
            p2.attr("id","p4");
          }else if(i==2){
            descripcionSinImagen.attr("id","d5");
            p2.attr("id","p5");
          }else if(i==3){
            descripcionSinImagen.attr("id","d7");
            p2.attr("id","p7");
          }else{
            descripcionSinImagen.attr("id","d8");
            p2.attr("id","p8");
          }
          descripcionSinImagen.append(p2);
          contenidoCard.append(descripcionSinImagen);
        }
        var a = $("<a></a>");
        a.attr("href","/"+entradas[i].nombreEnlace);
        var leerMas = $("<div class='leerMas'>LEER +</div>");
        a.append(leerMas);
        $("#seccionesPrincipales #cards #card"+i).append(contenidoCard);
        $("#seccionesPrincipales #cards #card"+i).append(a);
      }
    }
  }
  $.fn.reset = function () {
    $(this).each (function() { this.reset(); });
  }

  function heightWindow() {
    var myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
      //No-IE
      myHeight = window.innerHeight;
    } else if( document.documentElement && document.documentElement.clientHeight) {
      //IE 6+
      myHeight = document.documentElement.clientHeight;
    } else if( document.body && document.body.clientHeight) {
      //IE 4 compatible
      myHeight = document.body.clientHeight;
    }
    return myHeight;
  }