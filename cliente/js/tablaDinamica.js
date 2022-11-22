function crearCabecera(row){

const cabecera = document.createElement("thead");
const tr = document.createElement("tr");


for (const key in row) {
    if(key!="id")
    {
        const th= document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);
    }
    
        
    
}

cabecera.appendChild(tr);
cabecera.classList.add("table-danger");
return cabecera;
}

function crearCuerpo(data){

    const cuerpo = document.createElement("tbody");

    data.forEach((element) => {
        const fila = document.createElement("tr");
        for (const atributo in element) {
            if(atributo==="id")
            {
                fila.setAttribute("data-id",element[atributo]);
                continue;
            }
            
            const td= document.createElement("td");
                td.textContent = element[atributo];
                fila.appendChild(td);
                
            
        }


        const filas = cuerpo.children;

        for(let i=0; i< filas.length ; i++)
        {
            if (!(i%2)) {
                filas[i].classList.add("table-secondary");
            }
        }

        cuerpo.appendChild(fila);

    });
    return cuerpo;
    
}

export function crearTabla(data){
    if(!Array.isArray(data)){
        return null;
    }

    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));
    tabla.classList.add("table");
    tabla.classList.add("table-bordered");



    return tabla;
    
}