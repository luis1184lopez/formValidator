window.onload=function(){
  var formulario = document.forms[0];
  //agregar manejador de evento para el formulario
  if(document.addEventListener){
    formulario.addEventListener("submit", validarFormulario);
  }
  else if(document.attachEvent){
    formulario.attachEvent("onsubmit", validarFormulario);
  }
}
function validarFormulario(event){
  var inputEmail = document.getElementById('email');
  var inputcodigoCliente= document.getElementById('codigoCliente');
  var inputnoFactura = document.getElementById('numFactura');
  var inputmonto = document.getElementById('montoPago');
  var inputtarjetacredito=document.getElementById('numtarjeta');
  var inputfechaexp= document.getElementById('fechaexp');

  //validar código de cliente
  if(inputcodigoCliente.value==0 || !validarcodigoCliente(inputcodigoCliente.value)){
    alert("Complete el Codigo de Cliente,debe tener un formato numérico: 123-456");
    event.preventDefault(); //evitar que formulario se envie
    return false; //cidigo cliente no válido
  }

  //validar correo electrónico
  if(!validarEmail(inputEmail.value)){
    alert("email no valido, debe tener un formato: ej. algo@dominio.com");
    event.preventDefault();//evitar que formulario se envie
    return false;//dirección de correo no válida
  }
  //validar número de factura
  //formato es digito-3digitos
  if(inputnoFactura.value==0 || !validarnoFactura(inputnoFactura.value)){
    alert("Complete el Codigo de Factura, debe tener un formato numérico: 1-234");
    event.preventDefault(); //evitar que formulario se envie
    return false; //cidigo cliente no válido
  }

  //validar monto a pagar, solo aceptar valores en coma flotate,
  //por ejemplo: 133.30 o 1020.15
  if(inputmonto.value==0 || !validarmonto(inputmonto.value)){
       alert("Complete el Monto de la Factura, debe tener un formato numérico: 1020.15 o 133.30");
    event.preventDefault(); //evitar que formulario se envie
    return false; //cidigo cliente no válido
  }

  //validar tarjeta de crédito
  //formato valido es 3333-3333-3333-3333
  //16 digitos en grupos de 4 separados por guión
  if(inputtarjetacredito.value==0 || !validartarjeta(inputtarjetacredito.value)){
      alert("Complete el Nº de la Tarjeta, debe tener un formato numérico: 0000-0000-0000-0000");
      event.preventDefault(); //evitar que formulario se envie
      return false; //cidigo cliente no válido
  }

  //validar nombre tarjeta habiente, no debe ser vacío
  var tarjetaHabiente = document.getElementById("tarjetahabiente");
  if(tarjetaHabiente.value.trim().length==0){
    alert("Tarjeta habiente no puede ser vacío");
    event.preventDefault();
    return false;
  }

  //validar fecha de experición de tarjeta
  //formato es mm-aa (dos digitos para mes, guión, dos digitos para año)
  //por ejemplo: 09-18
  if(inputfechaexp.value==0 || !validarfechaexp(inputfechaexp.value)){
    alert("Complete la fecha de Expiración debe seguir el siguiente formato: mm-aa ej. 11-22");
    event.preventDefault(); //evitar que formulario se envie
    return false; //cidigo cliente no válido
  }
  //Si todo fue validado, retornar true
  alert("Datos Correctos el formulario ha sido enviado");
 document.getElementById('codigoCliente').value="";
 document.getElementById('email').value="";
 document.getElementById('numFactura').value="";
 document.getElementById('montoPago').value="";
 document.getElementById('numtarjeta').value="";
 document.getElementById('fechaexp').value="";
 document.getElementById('codigoCliente').focus
  return true;
}
function getTarget(e){
  var target;
  if(e.target)
    target = e.target;
  else if(e.srcElement)
    target = e.srcElement;
  if(target.nodeType==3) //safari
    target = target.parentNode;

  return target;
}
function validarEmail(email){
  //expresión regular para validar correo
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  return re.test(email);
}
function validarcodigoCliente(inputcodigoCliente){
  var re = /[0-9]{3}-[0-9]{3}/;
  return re.test(inputcodigoCliente);
}
function validarnoFactura(inputnoFactura){
  var re = /[0-9]{1}-[0-9]{3}/;
  return re.test(inputnoFactura);
}
function validarmonto(inputmonto){
  var re = /[0-9]{1,4}\.[0-9]{2}/;
  return re.test(inputmonto);
}
function validartarjeta(inputtarjetacredito){
  var re = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}/;
  return re.test(inputtarjetacredito);
}
function validarfechaexp(inputfechaexp){
  var re = /[0-9]{2}-[0-9]{2}/;
  return re.test(inputfechaexp);
}
