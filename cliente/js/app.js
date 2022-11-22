
import { crearTabla } from './tablaDinamica.js'
import { avisoAuto } from './avisoAuto.js'
import { validarCampoVacio, validarSoloNumeros, validarCamposVaciosClick, validarCantPuertas, validarClases, validarCantKms, validarPotencia, clearError } from './validaciones.js';


export const avisos = [];
export const URL = "http://localhost:3000/avisos";
const spiner = document.querySelector("[name=spiner]");

export const setSpinner = (div = spiner, src = "./img/loader.gif") => {

   const img = document.createElement("img");
   img.setAttribute("src", src);
   img.setAttribute("alt", "spinner");
   img.classList.add("loader");
   div.appendChild(img);

   img.hasChildNodes;
};

export const clearSpinner = (div = spiner) => {

   div.removeChild(div.firstElementChild);

};
const $frmAviso = document.forms[0];
const $divTabla = document.querySelector(".divTabla");
const id = document.querySelector("[name=id]");
const titulo = document.querySelector("[name=titulo]");
const rdVenta = document.querySelector("[id=rdVenta]");
const rdAlquiler = document.querySelector("[id=rdAlquiler]");
const descripcion = document.querySelector("[name=descripcion]");
const precio = document.querySelector("[name=precio]");
const puertas = document.querySelector("[name=puertas]");
const kms = document.querySelector("[name=kms]");
const transaccion = document.querySelector("[name=transaccion]");
const potencia = document.querySelector("[name=potencia]");
const fTitulo = document.querySelector("[id=filtroTitulo]");
const fTransaccion = document.querySelector("[id=filtroTransaccion]");
const fDescripcion = document.querySelector("[id=filtroDescripcion]");
const fPrecio = document.querySelector("[id=filtroPrecio]");
const fKms = document.querySelector("[id=filtroKms]");
const fPuertas = document.querySelector("[id=filtroPuertas]");
const fPotencia = document.querySelector("[id=filtroPotencia]");

const promPrecio = document.querySelector("[id=promPrecio]");
const ddlFiltroTrans = document.querySelector("[id=ddlFiltroTrans]");


const btnModificar = document.querySelector("[name=btnModificar]");
const btnCancelar = document.querySelector("[name=btnCancelar]");
const btnGuardar = document.querySelector("[name=btnGuardar]");
const btnEliminar = document.querySelector("[name=btnEliminar]");
const controles = $frmAviso.elements;
let filtros = { 'titulo': true, 'transaccion': true, 'descripcion': true, 'precio': true, 'puertas': true, 'kms': true, 'potencia': true, 'ddlFiltroTrans': "Todos" };

actualizarTabla(filtros);

ddlFiltroTrans.addEventListener('change', (e) => {

   if (ddlFiltroTrans.value == "Alquiler") {
      filtros['ddlFiltroTrans'] = "Alquiler";
      actualizarTabla(filtros);
   } else if (ddlFiltroTrans.value == "Venta") {
      filtros['ddlFiltroTrans'] = "Venta";
      actualizarTabla(filtros);
   } else {
      filtros['ddlFiltroTrans'] = "Todos";
      actualizarTabla(filtros);
   }

})

fTitulo.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['titulo'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['titulo'] = false;
      actualizarTabla(filtros);
   }
})

fTransaccion.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['transaccion'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['transaccion'] = false;
      actualizarTabla(filtros);
   }
})
fDescripcion.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['descripcion'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['descripcion'] = false;
      actualizarTabla(filtros);
   }
})
fPrecio.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['precio'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['precio'] = false;
      actualizarTabla(filtros);
   }
})
fPuertas.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['puertas'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['puertas'] = false;
      actualizarTabla(filtros);
   }
})
fKms.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['kms'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['kms'] = false;
      actualizarTabla(filtros);
   }
})
fPotencia.addEventListener('change', (event) => {
   if (event.currentTarget.checked) {
      filtros['potencia'] = true;
      actualizarTabla(filtros);
   } else {
      filtros['potencia'] = false;
      actualizarTabla(filtros);
   }
})

$divTabla.addEventListener("click", (e) => {
   setSpinner();
   const emisor = e.target;
   let flag = 1;
   if (emisor.matches("tbody tr td")) {
      let id = emisor.parentElement.dataset.id;

      fetch(URL + "/" + id)
         .then((res) => {

            return res.ok
               ? res.json()
               : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
         })
         .then((dataJson) => {
            rellenarCamposConAviso(dataJson);
            validarCamposVaciosClick(controles);

         })
         .finally(() => {
            clearSpinner();
         })
   }
});



btnModificar.addEventListener("click", (e) => {
   e.preventDefault();
   if (validarClases(controles) != 1) {
      if (validarCamposVaciosClick(controles) != 1) {
         const aviso = new avisoAuto(id.value, titulo.value, $frmAviso.transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);
         if (window.confirm("Esta seguro de modificar el vehiculo " + aviso.titulo + "?")) {

            aviso.ModficarAviso();
            limpiarCampos();
            actualizarTabla(filtros);
         }
      }

   }
})

btnEliminar.addEventListener("click", (e) => {
   e.preventDefault();

   const aviso = new avisoAuto(id.value, titulo.value, $frmAviso.transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);
   if (window.confirm("Esta seguro de eliminar el vehiculo " + aviso.titulo + "?")) {

      aviso.EliminarAviso();
      limpiarCampos();
      actualizarTabla(filtros);
   }

})



btnCancelar.addEventListener("click", (e) => {


   e.preventDefault();
   limpiarCampos();
})

btnGuardar.addEventListener("click", (e) => {
   e.preventDefault();

   if (validarClases(controles) != 1) {
      if (validarCamposVaciosClick(controles) != 1) {

         const nuevoAviso = new avisoAuto(avisoAuto.generarId(), titulo.value, $frmAviso.transaccion.value, descripcion.value, precio.value, puertas.value, kms.value, potencia.value);

         nuevoAviso.agregarAviso();

         limpiarCampos();
         actualizarTabla(filtros);
      }

      
   }
   


})


titulo.addEventListener("blur", validarCampoVacio);
descripcion.addEventListener("blur", validarCampoVacio);
precio.addEventListener("blur", validarCampoVacio);
puertas.addEventListener("blur", validarCampoVacio);
kms.addEventListener("blur", validarCampoVacio);
potencia.addEventListener("blur", validarCampoVacio);

precio.addEventListener('keypress', validarSoloNumeros);
puertas.addEventListener('keypress', validarSoloNumeros);
kms.addEventListener('keypress', validarSoloNumeros);
potencia.addEventListener('keypress', validarSoloNumeros);


puertas.addEventListener('blur', validarCantPuertas);
kms.addEventListener('blur', validarCantKms);
potencia.addEventListener('blur', validarPotencia);



//Con un 9 me conformo



function actualizarTabla(filtros) {
   setSpinner();
   
   let count = 0;
   const xhr = new XMLHttpRequest();
   try {
      

      xhr.addEventListener("readystatechange", () => {
         if (xhr.readyState == 4) {
            
            if (xhr.status > 199 && xhr.status < 300) {

               let dataJson = JSON.parse(xhr.responseText);
               dataJson = dataJson.map(function (row) {
                  if (!filtros['titulo']) {
                     delete row['titulo'];
                  }
                  if (!filtros['transaccion']) {
                     delete row['transaccion'];
                  }
                  if (!filtros['descripcion']) {
                     delete row['descripcion'];
                  }
                  if (!filtros['precio']) {
                     delete row['precio'];
                  }
                  if (!filtros['puertas']) {
                     delete row['puertas'];
                  }
                  if (!filtros['kms']) {
                     delete row['kms'];
                  }
                  if (!filtros['potencia']) {
                     delete row['potencia'];
                  }
                  return row;
               });

               dataJson = dataJson.filter(filtrarTransaccion);

               promPrecio.value = ((dataJson.reduce((acum, valorActual) => {
                  count++;
                  return acum + parseFloat(valorActual.precio);
               }, 0)) / count).toFixed(2);

               while ($divTabla.hasChildNodes()) {
                  $divTabla.removeChild($divTabla.firstChild);
               }
               $divTabla.appendChild(crearTabla(dataJson));
               while ($divTabla.hasChildNodes()) {
                  $divTabla.removeChild($divTabla.firstChild);
               }
               $divTabla.appendChild(crearTabla(dataJson));
            } else {
               console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

         clearSpinner(spiner);
            
         }
      });

      xhr.open("GET", URL);
      xhr.send();


   } catch (err) {
      console.error(err);
   }
   
}

function filtrarTransaccion(item) {
   if (ddlFiltroTrans.value != 'Todos') {
      return item.transaccion == ddlFiltroTrans.value;
   } else {
      return item;
   }
}



function limpiarCampos() {

   for (const control of controles) {
      if (control.type == "text" || control.name == "id") {
         control.value = "";
         clearError(control);

      } else if (control.name == "transaccion") {
         rdVenta.checked = true;
         rdAlquiler.checked = false;
      }
   }
   console.log(id);
   validarBotonesOcultos();
}

async function rellenarCamposConAviso(aviso) {
   //console.log(aviso);
   titulo.value = aviso.titulo;

   if (aviso.transaccion == "Venta") {
      rdVenta.checked = true;
      rdAlquiler.checked = false;
   } else {
      rdVenta.checked = false;
      rdAlquiler.checked = true;
   }

   descripcion.value = aviso.descripcion;
   precio.value = aviso.precio;
   puertas.value = aviso.puertas;
   kms.value = aviso.kms;
   potencia.value = aviso.potencia;
   id.value = aviso.id;
   validarBotonesOcultos();
   foco(titulo);
}


function validarBotonesOcultos() {
   if (id.value != 0) {
      btnCancelar.setAttribute("type", "button");
      btnEliminar.setAttribute("type", "button");
      btnModificar.setAttribute("type", "button");
      btnGuardar.setAttribute("type", "hidden");
   } else {
      btnEliminar.setAttribute("type", "hidden");
      btnCancelar.setAttribute("type", "hidden");
      btnModificar.setAttribute("type", "hidden");
      btnGuardar.setAttribute("type", "submit");
   }
}

function foco(elemento) {
   elemento.focus();
}





