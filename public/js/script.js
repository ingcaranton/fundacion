$(document).ready(function(){

//menu cliente
  //Abre la pestaña editar mis vuelos en el cliente
  
  $('#menuAdminUser').ready(function( ) {
      $("#administrarUser #editarMisVuelos").show( "slow" );
  });

  $('#menuAdminUser li#bEditarMisVuelos').click(function( ) {
      $('#administrarUser .active').hide(function(){
      $('#administrarUser .active').removeClass('active');
      $('#menuAdminUser .active').removeClass('active');
      $("#administrarUser #editarMisVuelos").show( "slow" );
      $('#administrarUser #editarMisVuelos').addClass('active');
      $('#menuAdminUser li#bEditarMisVuelos').addClass('active');

      });
  });

  //Abre la pestaña editar mis perfil en el cliente
  $('#menuAdminUser li#bEditarMiPerfil').click(function( ) {
      $('#administrarUser .active').hide(function(){
      $('#administrarUser .active').removeClass('active');
      $('#menuAdminUser .active').removeClass('active');
      $("#administrarUser #editarMiPerfil").show( "slow" );
      $('#administrarUser #editarMiPerfil').addClass('active');
      $('#menuAdminUser li#bEditarMiPerfil').addClass('active');

      });
  });

//Menu admin
  //Abre la pestaña nuevo clente en el admin
  $('#menuAdmin li#bNuevoCliente').click(function( ) {
      $('#administrar .active').hide(function(){
    	$('#administrar .active').removeClass('active');
    	$('#menuAdmin .active').removeClass('active');
    	$( "#administrar #nuevoCliente" ).show( "slow" );
	   	$('#administrar #nuevoCliente').addClass('active');
    	$('#menuAdmin li#bNuevoCliente').addClass('active');

      });
  });

  //Abre la pestaña editar cliente en el admin
  $('#menuAdmin li#bEditarCliente').click(function( ) {
      $('#administrar .active').hide(function(){
    	$('#administrar .active').removeClass('active');
    	$('#menuAdmin .active').removeClass('active');
      $( "#administrar #editarCliente" ).show( "slow" );
	   	$('#administrar #editarCliente').addClass('active');
    	$('#menuAdmin li#bEditarCliente').addClass('active');

      });
  });

  //Abre la pestaña nuevo vuelo en el admin
  $('#menuAdmin li#bNuevoVuelo').click(function( ) {
      $('#administrar .active').hide(function(){
    	$('#administrar .active').removeClass('active');
    	$('#menuAdmin .active').removeClass('active');
     	$( "#administrar #nuevoVuelo" ).show( "slow" );
		  $('#administrar #nuevoVuelo').addClass('active');
    	$('#menuAdmin li#bNuevoVuelo').addClass('active');

      });
  });

  //Abre la pestaña editar vuelo en el admin
  $('#menuAdmin li#bEditarVuelo').click(function( ) {
      $('#administrar .active').hide(function(){
    	$('#administrar .active').removeClass('active');
    	$('#menuAdmin .active').removeClass('active');
     	$( "#administrar #editarVuelo" ).show( "slow" );
		  $('#administrar #editarVuelo').addClass('active');
    	$('#menuAdmin li#bEditarVuelo').addClass('active');

      });
  });

//Se devuelve al ultima pestaña del admin, si entra desde otra pagina lo devuelve a newCliente
  if($('#administrar #estado').val()==""||$('#administrar #estado').val()=="newCliente"){
      $('#administrar #nuevoCliente').show();
      $('#administrar #nuevoCliente').addClass('active');
      $('#menuAdmin li#bNuevoCliente').addClass('active');
  }
  if($('#administrar #estado').val()=="editCliente"){
      $( "#administrar #editarCliente" ).show();
      $('#administrar #editarCliente').addClass('active');
      $('#menuAdmin li#bEditarCliente').addClass('active');
  }
  if($('#administrar #estado').val()=="newVuelo"){
      $( "#administrar #nuevoVuelo" ).show();
       $('#administrar #nuevoVuelo').addClass('active');
       $('#menuAdmin li#bNuevoVuelo').addClass('active');
  }
  if($('#administrar #estado').val()=="editVuelo"){
      $( "#administrar #editarVuelo" ).show();
      $('#administrar #editarVuelo').addClass('active');
      $('#menuAdmin li#bEditarVuelo').addClass('active');
  }

//recibe info del socket y cambia los valores de los input
    var socket = io();
      socket.on('userSocketServer', function(user){
          $("#fEditCliente input[name='nickName'] ").val(user.nickName);
          $("#fEditCliente input[name='nickNameOriginal']").val(user.nickName);
          $("#fEditCliente input[name='nombre'] ").val(user.nombre);
          $("#fEditCliente input[name='tipoPago'] ").val(user.tipoPago);
          $("#fEditCliente input[name='documento'] ").val(user.documento);
      });
      socket.on('VueloSocketServer', function(vuelo){
          $("#fEditVuelo input[name='nVuelo'] ").val(vuelo.nVuelo);
          $("#fEditVuelo input[name='nVueloOriginal'] ").val(vuelo.nVuelo);
          $("#fEditVuelo input[name='aerolinea'] ").val(vuelo.aerolinea);
          $("#fEditVuelo input[name='origen'] ").val(vuelo.origen);
          $("#fEditVuelo input[name='destino'] ").val(vuelo.destino);
          $("#fEditVuelo input[name='numeroPasajeros'] ").val(vuelo.numeroPasajeros);
          $("#fEditVuelo input[name='fechaVuelo'] ").val(vuelo.fechaVuelo);
          $("#fEditVuelo input[name='horaVuelo'] ").val(vuelo.horaVuelo);
          $("#fEditVuelo input[name='precioVuelo'] ").val(vuelo.precioVuelo);
      });
      socket.on('ArrayVueloSocketServer', function(vuelo){
        $('#buscar #seleccionVuelo').html('');
         $('#buscar #seleccionVuelo').append(new Option("Escoje una","vacio"));
        for (var i = 0; i < vuelo.length; i++) {
           $('#buscar #seleccionVuelo').append(new Option(vuelo[i], vuelo[i]));
        }
      });

      socket.on('buscarVueloSocketServer', function(vuelos){
        $('#resultado #vuelos').html('');
        for (var i = 0; i < vuelos.length; i++) {
           $('#resultado #vuelos').append(new Option(vuelos[i].origen+"-"+vuelos[i].destino, vuelos[i].nVuelo));
        }
      });

      socket.on('detallesVuelosSocket', function(vuelos){   
        $('#resultado #detalleVuelo #detalles').text("")    
        $('#resultado #detalleVuelo #detalles').append(
          $('<table>').append(
            $('<tr>').append(
              $('<td>').text("Vuelo:"),
              $('<td>').text(vuelos.nVuelo)
            ),
            $('<tr>').append(
              $('<td>').text("Fecha del vuelo:"),
              $('<td>').text(vuelos.fechaVuelo)
            ),
            $('<tr>').append(
              $('<td>').text("Hora:"),
              $('<td>').text(vuelos.horaVuelo)
            ),
            $('<tr>').append(
              $('<td>').text("Aerolinea:"),
              $('<td>').text(vuelos.aerolinea)
            ),
            $('<tr>').append(
              $('<td>').text("Precio:"),
              $('<td>').text(vuelos.precioVuelo)
            ),
            $('<tr>').append(
              $('<td>').text("Origen:"),
              $('<td>').text(vuelos.origen)
            ),
            $('<tr>').append(
              $('<td>').text("Destino:"),
              $('<td>').text(vuelos.destino)
            ),
            $('<tr>').append(
              $('<td>').text("Puestos disponibles:"),
              $('<td>').text(vuelos.numeroPasajerosDis)
            )
          )
        );
      });
  
//habilita boton al escoger vuelo
  $('#resultado #listaVuelos #vuelos').change(function(){
      $('#resultado #listaVuelos button').prop('disabled', false);
       $('#resultado #listaVuelos input[name="vuelosOyD"]').val($('#resultado #listaVuelos #vuelos option:selected').text());
  });  


  //evento al seleccionar un usuario en el admin
  $('#editarCliente #nombreUser').change(function( ) {
    //envia info cliente al socket admin
    var nombreSocketCliente = $('#editarCliente #nombreUser').val();
        socket.emit('nombreSocketUser', nombreSocketCliente);
        $("#fEditCliente button").prop('disabled', false);
        $("button#eliminarUser").prop('disabled', false);
    if(nombreSocketCliente=="vacio"){
        $("#fEditCliente button").prop('disabled', true);
        $("button#eliminarUser").prop('disabled', true);
        $("#fEditCliente input[name='nickName'] ").val("");
        $("#fEditCliente input[name='nickNameOriginal']").val("");
        $("#fEditCliente input[name='nombre'] ").val("");
        $("#fEditCliente input[name='tipoPago'] ").val("");
        $("#fEditCliente input[name='documento'] ").val("");
      }
    //bloquea algunos input si es admin es admin 
    if(nombreSocketCliente=="admin"){
       $("button#eliminarUser").prop('disabled', true);
       $("#fEditCliente input[name='nickName'] ").prop('disabled', true);
       $("#fEditCliente input[name='nombre'] ").prop('disabled', true);
       $("#fEditCliente input[name='tipoPago'] ").prop('disabled', true);
       $("#fEditCliente input[name='documento'] ").prop('disabled', true);
    }else{
       $("button#eliminarUser").prop('disabled', false);
       $("#fEditCliente input[name='nickName'] ").prop('disabled', false);
       $("#fEditCliente input[name='nombre'] ").prop('disabled', false);
       $("#fEditCliente input[name='tipoPago'] ").prop('disabled', false);
       $("#fEditCliente input[name='documento'] ").prop('disabled', false);
     }     
  });

   //envia info vuelos al socket admin
  $('#editarVuelo #nombreVuelo').change(function( ) {
      var nombreSocketVuelo = $('#editarVuelo #nombreVuelo').val();
          socket.emit('nombreSocketVuelo', nombreSocketVuelo);
          $("#fEditVuelo button").prop('disabled', false);
          $("button#eliminarVuelo").prop('disabled', false);
      if(nombreSocketVuelo=="vacio"){
          $("#fEditVuelo button").prop('disabled', true);
          $("button#eliminarVuelo").prop('disabled', true);
          $("#fEditVuelo input[name='nVueloOriginal']").val("");
          $("#fEditVuelo input[name='nVuelo'] ").val("");
          $("#fEditVuelo input[name='aerolinea'] ").val("");
          $("#fEditVuelo input[name='origen'] ").val("");
          $("#fEditVuelo input[name='destino'] ").val("");
          $("#fEditVuelo input[name='numeroPasajeros'] ").val("");
          $("#fEditVuelo input[name='fechaVuelo'] ").val("");
          $("#fEditVuelo input[name='horaVuelo'] ").val("");
          $("#fEditVuelo input[name='precioVuelo'] ").val("");
      }
  });

//buscar vuelo cliente
    $('#buscarVuelos button').click(function(){
      var ParametrosBusqueda={};
      if($("#buscarVuelos input[name='fecha']").val())
          ParametrosBusqueda.fechaVuelo=$("#buscarVuelos input[name='fecha']").val();
      if($("#buscarVuelos input[name='origen']").val())
          ParametrosBusqueda.origen=$("#buscarVuelos input[name='origen']").val();
      if($("#buscarVuelos input[name='destino']").val())
          ParametrosBusqueda.destino=$("#buscarVuelos input[name='destino']").val();
          
        socket.emit('buscarSocketVuelo', ParametrosBusqueda);
    });
    //escribe los detalles del vuelo
      $('#resultado #listaVuelos #vuelos').change(function(){
        var vuelo=$('#resultado #listaVuelos #vuelos').val();
            socket.emit('detallesVuelosSocket', vuelo);
      });
 // $("#fBuscar input[name='busqueda']").attr('type', 'date');

});

//cuadros de confirmacion
function eliminarUser(){

    if(confirm("¿Seguro que quieres eliminar a "+$("#fEditCliente input[name='nickNameOriginal']").val()+"?")) {
        document.location.href= "/users/delete/"+$("#fEditCliente input[name='nickNameOriginal']").val();
    }
}

function eliminarMiPerfil(){
    if(confirm("¿Seguro que quieres eliminar tu perfil?")){
        document.location.href= "/users/delete/MiPerfil";
    } 
}
function eliminarVuelo(){
    if(confirm("¿Seguro que quieres eliminar el vuelo"+$("#fEditVuelo input[name='nVueloOriginal']").val()+"?")){
        document.location.href= "/vuelos/delete/"+$("#fEditVuelo input[name='nVueloOriginal']").val();
    } 
}
function dialog(titulo, cuerpo, boton, funcionClick){
  $('#myModal #myModalTitulo').text(titulo);
  $('#myModal #myModalCuerpo').html(cuerpo);
  $('#myModal #myModalBoton').text(boton);
  $('#myModal #myModalBoton').attr("onclick", funcionClick);
  $('#myModal').modal();
}

