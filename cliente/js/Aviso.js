import { URL, setSpinner, clearSpinner } from "./app.js";

export class Aviso {



  constructor(id, titulo, transaccion, descripcion, precio) {
    this.id = id;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = precio;

  }

  static generarId() {
    let last = 1;
    fetch(URL)
      .then((res) => {
        setSpinner();
        return res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      })
      .then((dataJson) => {
        let sortedIds = dataJson.map(aviso => aviso.id).sort((a, b) => b - a)[0];              // sort desc.
        last = sortedIds[0];
        return last;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        clearSpinner();
      })


  }

  ModficarAviso() {
    setSpinner();
    fetch(URL + "/" + this.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this)
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        clearSpinner();
      })

  }
  EliminarAviso() {
    setSpinner();
    fetch(URL + "/" + this.id, {
      method: "DELETE"
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        clearSpinner();
      })

  }

  agregarAviso() {
    setSpinner();
    axios(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(this),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        clearSpinner();
      });
  }

}