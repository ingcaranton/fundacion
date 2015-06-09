//Google analitycs 
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-62140207-1', 'auto');
  ga('send', 'pageview');

/*Variables Globales*/
  var ultimasEntradas={};
  var ultimasEntradasPrimarias={};
  var paginas={};
  var arrayImagenesSlider=[{src:"https://s3.amazonaws.com/fundacion-bucket/1.png",url:"/Los5principiosdelAcompanar",descripcion:"Programa para el cuidado del ser y sus relaciones, 7 sesiones que permiten identificar las dificultades y las potencialidades de los participantes, encontrando caminos de transformación que mejoran los escenarios de vida de las personas, las familias y las comunidades."},
    {src:"https://s3.amazonaws.com/fundacion-bucket/2.jpg",url:"/croquetazanahoria",descripcion:"Las zanahorias son una de las hortalizas que más se producen a nivel mundial. Por contener carotenoides, numerosos estudios la han vinculado con la prevención del cáncer de mama. Además, es fuente de vitaminas A, B, C y E. También contiene minerales y antioxidantes."},
    {src:"https://s3.amazonaws.com/fundacion-bucket/3.jpg",url:"/hamburguesavegetariana",descripcion:"Aquí tienes 4 opciones de hamburguesa vegetariana, para preparar y disfrutar de un rico y saludable almuerzo. Puedes variar y combinar los distintos ingredientes que más te gusten, para preparar tu hamburguesa perfecta."},
    {src:"https://s3.amazonaws.com/fundacion-bucket/4.jpg",url:"/semillastradicionales",descripcion:"Sembrar, cosechar y cocinar nuestros alimentos nos permite retornar al origen de la vida, a nuestra cultura a nuestro legado. Somos como las semillas diversas, coloridas y sonrientes."},
    {src:"https://s3.amazonaws.com/fundacion-bucket/5.jpg",url:"/domoconsacosdetierra",descripcion:"Los domos hechos con sacos de tierra no son algo novedoso, estas estructuras se han utilizado desde siempre. Actualmente la Bioconstrucción los presenta como una opción equilibrada y amigable  con el medio ambiente, para así generar un  espacio cómodo  y  a  bajo costo."}];
  var homeCargado=false;
  var vistaDonacion=false;
  var vistaEstrellas=false;
  var arrayColor=["#d273cd","#00bb41","#00c7fc","#36abd0","#8762ab","#fef000","#ffa700","#fe889b","#ff7f5b"];
/*Función de cargar en home*/
  $(document).ready(function() {
    posiciones();
    $("#url").val(window.location.pathname);
    //Recuperar Contraseña
      $("#recuperarContrasena").on("click", function(){
        bootbox.dialog({
                title: "Recuperar Contraseña",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal method="POST" action="/user/recuperarContrasena"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">USUARIO:</label> ' +
                    '<div class="col-md-4"> ' +
                    '<input id="name" name="name" type="text" placeholder="Escriba su usuario" class="form-control input-md"> ' +
                    '</div></div> </form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var name = $('#name').val();
                        }
                    }
                }
            }
        );
      });   
    /*Colores de menuEscondido*/
      $(".navbar #menuEscondido #1").css("background-color","#fe889b");
      $(".navbar #menuEscondido #2").css("background-color","#d273cd");
      $(".navbar #menuEscondido #3").css("background-color","#36abd0");
      $(".navbar #menuEscondido #4").css("background-color","#8762ab");
      $(".navbar #menuEscondido #5").css("background-color","#00c7fc");
      $(".navbar #menuEscondido #6").css("background-color","#00bb41");
      $(".navbar #menuEscondido #7").css("background-color","#fef000");
      $(".navbar #menuEscondido #8").css("background-color","#ffa700");
      $(".navbar #menuEscondido #9").css("background-color","#ff7f5b");
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
    /*Cargar Slider
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
      /*centrar menu*/
        var longitudDivMenu = $("#navbar-collapse-1").css("width").slice(0,-2);
        var paddingDivMenu = $("#navbar-collapse-1").css("padding-left").slice(0,-2);
        var longitudMenu=$("#navbar-collapse-1 ul#ulPrincipal").css("width").slice(0,-2);
        left = ((longitudDivMenu-longitudMenu)/2)-paddingDivMenu;
        $("#navbar-collapse-1 ul#ulPrincipal").css("margin-left",left+"px");
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
          if(filas===1){
            $("#editarMenu #accordion .seleccionUrl").css("display","none");
            $("#editarMenu #accordion .urlMenu").css("display","none");
            $("#editarMenu #accordion .tituloSubmenu").css("display","inherit");
            $("#editarMenu #accordion .table-responsive #"+tabla).css("display","inherit");
            $("#editarMenu #accordion .urlMenu #urlExterna").val("");
            $("#editarMenu #accordion .urlMenu #urlInterna option[value='none'").attr("selected",true);
            $("#editarMenu #accordion #seleccionUrl").attr('checked', false);
          }
          var opciones="";
          for(var i=0; i<paginas.length;i++){
            opciones+='<option value="'+paginas[i].nombreEnlace+'">'+paginas[i].titulo+'</option>';
          }
          $('#editarMenu #accordion .table-responsive #'+tabla+' > tbody:last').
            append('<tr id="'+(filas-1)+'" class="dato"><td>'+
              filas+'</td><td><input type="text" name="tituloSubmenu['+
            (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input class="seleccionUrlSubmenu" name="seleccionUrlSubmenu['+
            (filas-1)+']" type="checkbox" interna="urlInternaSubmenu'+
            (filas-1)+'" externa="urlExternaSubmenu'+(filas-1)+'"'+
            (filas-1)+'"></input><input type="hidden" name="valorUrlSubmenu['+
            (filas-1)+']"></input></td><td><input type="url" name="urlExternaSubmenu['+
            (filas-1)+']" placeholder="http://www.ejemplo.com" id="urlExternaSubmenu'+
            (filas-1)+'"></input><select style="display:none" id="urlInternaSubmenu'+
            (filas-1)+'" name="urlInternaSubmenu['+(filas-1)+']" id="urlInternaSubmenu'+
            (filas-1)+'" class="form-control"><option value="none">Seleccione una opción</option>'+opciones
            +'</select></td><td><span/></td><td><span/></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
            (filas-1)+',\''+panel+'\',\'Cancelar\')"> Cancelar </a></td></tr>');
          $("#editarMenu #accordion .seleccionUrlSubmenu").on("click",function() { 
            var interna = $(this).attr("interna");
            var externa = $(this).attr("externa");
            if($(this).is(':checked')) {  
              $("#editarMenu #accordion .table-responsive #"+tabla+" #"+externa).css("display","none");
              $("#editarMenu #accordion .table-responsive #"+tabla+" #"+externa).val("");
              $("#editarMenu #accordion .table-responsive #"+tabla+" #"+interna).css("display","inherit");
            } else {  
              $("#editarMenu #accordion .table-responsive #"+tabla+" #"+externa).css("display","inherit");
              $("#editarMenu #accordion .table-responsive #"+tabla+" #"+interna).css("display","none"); 
              $("#editarMenu #accordion .table-responsive #"+tabla+" #"+interna+" option[value='none'").attr("selected",true);
            }  
          });       
        });
      /*Url interna o externa*/
        $("#editarMenu #accordion #seleccionUrl").on("click",function() { 
          if($(this).is(':checked')) {  
            $("#editarMenu #accordion #urlExterna").css("display","none");
            $("#editarMenu #accordion #urlExterna").val("");
            $("#editarMenu #accordion #urlInterna").css("display","inherit");
          } else {  
            $("#editarMenu #accordion #urlExterna").css("display","inherit");
            $("#editarMenu #accordion #urlInterna").css("display","none"); 
            $("#editarMenu #accordion #urlInterna option[value='none'").attr("selected",true);
          }  
        });
        $("#editarMenu #accordion .seleccionUrlSubmenu").on("click",function() { 
          var interna = $(this).attr("interna");
          var externa = $(this).attr("externa");
          if($(this).is(':checked')) {  
            $("#editarMenu #accordion .table-responsive table #"+externa).css("display","none");
            $("#editarMenu #accordion .table-responsive table #"+externa).val("");
            $("#editarMenu #accordion .table-responsive table #"+interna).css("display","inherit");
          } else {  
            $("#editarMenu #accordion .table-responsive table #"+externa).css("display","inherit");
            $("#editarMenu #accordion .table-responsive table #"+interna).css("display","none"); 
            $("#editarMenu #accordion .table-responsive table #"+interna+" option[value='none'").attr("selected",true);
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
          $("#editarMenu #nuevoMenu #menuNuevo .urlMenu #urlExterna").val("");
          $("#editarMenu #nuevoMenu #menuNuevo .urlMenu #urlInterna option[value='none'").attr("selected",true);
          $("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").attr('checked', false);
        }
        var opciones='';
        for(var i=0; i<paginas.length;i++){
          opciones+='<option value="'+paginas[i].nombreEnlace+'">'+paginas[i].titulo+'</option>';
        }
        $('#editarMenu #menuNuevo table  > tbody:last').
            append('<tr id="'+(filas-1)+'" class="dato"><td>'+filas
            +'</td><td><input type="text" name="tituloSubmenu['+
            (filas-1)+']" required title=\'Titulo submenu requerido\'></input></td><td><input class="seleccionUrlSubmenu" name="seleccionUrlSubmenu['+
            (filas-1)+']" type="checkbox" externa="urlExternaSubmenu'+
            (filas-1)+'" interna="urlInternaSubmenu'+
            (filas-1)+'"'+
            (filas-1)+'"/><input type="hidden" value="off" name="valorUrlSubmenu['+
            (filas-1)+']" id="valorUrlSubmenu'+
            (filas-1)+'"/></td><td><input type="url" name="urlExternaSubmenu['+
            (filas-1)+']" id="urlExternaSubmenu'+
            (filas-1)+'" placeholder="http://www.ejemplo.com"></input><select style="display:none" id="urlInternaSubmenu'+
            (filas-1)+'" name="urlInternaSubmenu['+
            (filas-1)+']" class="form-control"><option value="none" selected>Seleccione una opción</option>'+opciones
            +'</select></td><td><a href="javascript:void(0);" onclick="cancelar_eliminarSubmenu('+
            (filas-1)+',\'panelMenuNuevo\',\'Cancelar\')"> Cancelar </a></td></tr>');
        //Url submenu interna o externa
          $("#editarMenu #menuNuevo table .seleccionUrlSubmenu").click(function() { 
            var interna = $(this).attr("interna");
            var externa = $(this).attr("externa");
            if($(this).is(':checked')) {  
              $("#editarMenu #menuNuevo table #"+externa).css("display","none");
              $("#editarMenu #menuNuevo table #"+externa).val("");
              $("#editarMenu #menuNuevo table #"+interna).css("display","inherit");
            } else {  
              $("#editarMenu #menuNuevo table #"+externa).css("display","inherit");
              $("#editarMenu #menuNuevo table #"+interna).css("display","none"); 
              $("#editarMenu #menuNuevo table #"+interna+" option[value='none'").attr("selected",true);
            }  
          });
      });
      /*Url menu interna o externa*/
        $("#editarMenu #nuevoMenu #menuNuevo #seleccionUrl").on("click",function() { 
          if($(this).is(':checked')) {  
            $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").css("display","none");
            $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").val("");
            $("#editarMenu #nuevoMenu #menuNuevo #urlInterna").css("display","inherit");
          } else {  
            $("#editarMenu #nuevoMenu #menuNuevo #urlExterna").css("display","inherit");
            $("#editarMenu #nuevoMenu #menuNuevo #urlInterna").css("display","none"); 
            $("#editarMenu #nuevoMenu #menuNuevo #urlInterna option[value='none']").attr("selected",true);
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
    /*Formato fecha*/
      if($("#contenidoPagina #fecha #centro").attr("fecha")){
        var str=$("#contenidoPagina #fecha #centro").attr("fecha");
        var res = str.split(" ",4);
        var fecha=res[0]+" "+res[1]+"-"+res[2]+"-"+res[3];
        $("#contenidoPagina #fecha #centro span").text(fecha);
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
      var cantidadMenu=$("#navbar-collapse-1 ul li.dropdown.yamm-fw").length;
      //$("#navbar-collapse-1 ul li.dropdown.yamm-fw").css("min-width",cantidadMenu+"%");
      for(var i=0;i<5;i++){
        var color = $("#navbar-collapse-1 ul li #colorMenu"+(i+1)).attr("color");
        if($("#navbar-collapse-1 ul li #colorMenu"+(i+1))){
          $("#navbar-collapse-1 ul li #colorMenu"+(i+1)).css("background-color", color);
        }
        if($("#navbar-collapse-1 ul li #colorSubmenu"+(i+1))){
          $("#navbar-collapse-1 ul li #colorSubmenu"+(i+1)).css("background-color", color);
        }
      }
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
      $("#navbar-collapse-1 ul li a.dropdown-toggle").mouseenter(function(){
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
      $("#navbar-collapse-1 ul li a.dropdown-toggle").mouseleave(function(){
        var div=$(this).attr("idDiv");
        var li=$(this).attr("li");
        var submenu = $("#navbar-collapse-1 ul #"+li);
        $("#navbar-collapse-1 ul li .colorMenu").each(function(element){
          var id = $(this).attr("id");
          if(id==div && submenu.attr("class")!="dropdown yamm-fw open"){
            $(this).css("visibility" , "hidden");
          }
        });
      });     
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
    /*Vista estrellas*/
      if(vistaEstrellas){
        $("#paginaEstrellas #formulario").css("display", "none");
        $("#paginaEstrellas #confirmacionEstrellas").css("display", "inherit");
      }else{
        $("#paginaEstrellas #formulario").css("display", "inherit");
        $("#paginaEstrellas #confirmacionEstrellas").css("display", "none");
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
    /*redirecciones pagina donacion*/
      $("#paginaDonacion #confirmacion #tiempoEspecie").on("click",function(){
        bootbox.alert("Muchas gracias por tu apoyo, pronto estaremos en contacto!!", function(result){
          location.href="/";
        });
      });
    /*Valor label estrellas*/
      $("#paginaEstrellas #formulario #numEstrellas #estrellas").on('keyup',function(){
        var valorEstrellas=$("#paginaEstrellas #formulario #numEstrellas #estrellas").val();
        if(valorEstrellas=="" || valorEstrellas=="0")
          var valorFinal="000000";
        else
          var valorFinal=valorEstrellas*30000;
        $("#paginaEstrellas #formulario #dinero #valorEstrellas").val(valorFinal);
      });     
    /*Menu collapse*/
      if(window.location.pathname=="/"){
        $(".navbar").css("top","0");
        $("#contenido").css("margin-top","4.6%");
        /*llenar divs home*/
          llenarCards(ultimasEntradas);
          var cardNueva = llenarCardsPrincipales(ultimasEntradasPrimarias[0],"cardFisico");      
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 0 ).before(cardNueva);  
          cardNueva = llenarCardsPrincipales(ultimasEntradasPrimarias[3],"cardEmocional");      
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 2 ).before(cardNueva); 
          cardNueva = llenarCardsPrincipales(ultimasEntradasPrimarias[1],"cardEspiritual");   
          $( "#contenido #seccionesPrincipales #cards" ).find( ".card" ).eq( 5 ).before(cardNueva); 
        /*Imagenes y color Aleatorios Slider*/
          /*for(var i=0; i<arrayImagenesSlider.length;i++){
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
          }*/
          var posicionColor= Math.floor(Math.random()*(8-0+1))+0; 
          if($(window).width()>800){
            $("#slider").mouseenter(function() {
              $(this).css('background-color',arrayColor[posicionColor]);
              $(this).css('transition','background-color 2s');
            });
            $("#slider").mouseleave(function() {
              $(this).css('background-color','white');
              $(this).css('transition','background-color 2s');
            });
          }else{
            $("#slider").css('background-color',arrayColor[posicionColor]);
          }
      }else{
        if($(window).width()>800){
          $(".navbar #menuEscondido").css("display","inherit");
          $(".navbar").mouseenter(function() {
            $(".navbar #menuEscondido").slideUp('slow');
              $(this).stop().animate({'top':'0px','magin-bottom':'4.6%'},'slow');
          });
          $(".navbar").mouseleave(function() {
            $(this).stop().animate({'top':'-50px','magin-bottom':'0'},'slow');
              $(".navbar #menuEscondido").slideDown('slow');
          });
        }else{
          $(".navbar").css("top","0");
          $("#contenido").css("margin-top","4.6%");
        }
      }    
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
    while (repe !== false) { 
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
  function llenarCardsPrincipales(estructura,id){
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
      var divDescripcionSinImagen = $("<div class='descripcionSinImagen'></div>");
      var p = $("<p>"+estructura.descripcion+"</p>");
      divDescripcionSinImagen.append(p);
      divContenidoCard.append(divDescripcionSinImagen);
    }
    var a = $("<a href='/"+estructura.nombreEnlace+"'></a>");
    var divLeerMas = $("<div class='leerMas'>LEER +</div>");
    a.append(divLeerMas);
    divContenidoCard.append(a);
    var card= $("<div class='card'></div>");
    card.attr("id",id);
    card.append(divContenidoCard);
    return card;
  }
  function llenarCards(entradas){
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
          descripcionSinImagen.append(p2);
          contenidoCard.append(descripcionSinImagen);
        }
        var a = $("<a></a>");
        a.attr("href","/"+entradas[i].nombreEnlace);
        var leerMas = $("<div class='leerMas'>LEER +</div>");
        a.append(leerMas);
        var card= $("<div class='card'></div>");
        card.append(contenidoCard);
        card.append(a);
        $("#seccionesPrincipales #cards").append(card);
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