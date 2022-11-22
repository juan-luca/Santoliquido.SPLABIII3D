
export const URL = "http://localhost:3000/avisos";
const spiner = document.querySelector("[name=spiner]");

const setSpinner = (div = spiner, src = "./img/loader.gif") => {

    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", "spinner");
    img.classList.add("loader");
    div.appendChild(img);
 
    img.hasChildNodes;
 };
 
 const clearSpinner = (div = spiner) => {
 
    div.removeChild(div.firstElementChild);
 
 };
  setSpinner();

let avisos = await fetch(URL)
.then((res) => {
    
   return res.ok
      ? res.json()
      : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
})
.then((dataJson) => {
    
   return dataJson;
   
})
.catch((err) => {
    console.error(err);
 })
 .finally(() => {
    clearSpinner();
 })

if (avisos.length != 0) {
    
    crearCarta(avisos);
}


function crearCarta(avisos) {

    
    const $cardContainer = document.querySelector("[name=cardContainer]");
  

    avisos.forEach((aviso, index) => {
        const $articulo = document.createElement("div");
        $articulo.classList.add("card");
        $articulo.classList.add("text-white");
        $articulo.classList.add("bg-dark");
        $articulo.classList.add("mb-3");
        
        const $divheader = document.createElement("div");
        $divheader.classList.add("card-header");
        $divheader.textContent=aviso.titulo;
        $articulo.appendChild($divheader);



        // se crea el div que va a contener el ttulo, descripcion, precio y especs

        const $divBody = document.createElement("div");
        $divBody.classList.add("h-100");
        $divBody.classList.add("p-5");
        $divBody.classList.add("text-bg-dark");
        $divBody.classList.add("rounded-3");

        $articulo.appendChild($divBody);


        //descripcion
        const $descripcion = document.createElement("h2");
        
        $descripcion.textContent = aviso.descripcion;
        $divBody.appendChild($descripcion);
        //precio
        const $precio = document.createElement("p");
        $precio.classList.add("pPrecio");
        $precio.textContent = "$"+aviso.precio;
        $divBody.appendChild($precio);


        // se crea el div que va a contener las especificaciones
        const $divEspec = document.createElement("div");
        $divEspec.classList.add("divEspec");
        $divBody.appendChild($divEspec);
        //especificaciones


        //divPuertas
        const $divPuertas = document.createElement("div");
        $divPuertas.classList.add("divIco");
        $divEspec.appendChild($divPuertas);


        //img puerta + texto
        const $imgPuertas = document.createElement("img");
        $imgPuertas.classList.add("ico");
        $imgPuertas.setAttribute("src", "./img/puerta.png");
        $imgPuertas.setAttribute("alt", "icono_puertas");
        $divPuertas.appendChild($imgPuertas);
        const $cantPuertas = document.createElement("p");
        $cantPuertas.classList.add("textoIco");
        $cantPuertas.textContent = aviso.puertas+" puertas";
        $divPuertas.appendChild($cantPuertas);



        //divKms
        const $divKms = document.createElement("div");
        $divKms.classList.add("divIco");
        $divEspec.appendChild($divKms);

        //img kms + texto
        const $imgKms = document.createElement("img");
        $imgKms.classList.add("ico");
        $imgKms.setAttribute("src", "./img/velocimetro.png");
        $imgKms.setAttribute("alt", "icono_kms");
        $divKms.appendChild($imgKms);
        const $cantKms = document.createElement("p");
        $cantKms.classList.add("textoIco");
        $cantKms.textContent = aviso.kms+" kms";
        $divKms.appendChild($cantKms);


        //divPotencia
        const $divPotencia = document.createElement("div");
        $divPotencia.classList.add("divIco");
        $divEspec.appendChild($divPotencia);

        //img potencia + texto
        const $imgPotencia = document.createElement("img");
        $imgPotencia.classList.add("ico");
        $imgPotencia.setAttribute("src", "./img/potencia.png");
        $imgPotencia.setAttribute("alt", "icono_potencia");
        $divPotencia.appendChild($imgPotencia);
        const $Potencia = document.createElement("p");
        $Potencia.classList.add("textoIco");
        $Potencia.textContent = aviso.potencia + " hp";
        $divPotencia.appendChild($Potencia);

 

        const $boton = document.createElement("input");
        $boton.setAttribute("type", "button");
        $boton.setAttribute("name", "btnAviso");
        $boton.setAttribute("value", "Ver aviso");
        $boton.classList.add("btn-orange");

        $articulo.appendChild($boton);

        $cardContainer.appendChild($articulo);
    });
}

