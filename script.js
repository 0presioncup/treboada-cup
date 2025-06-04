let categoriasData = [];
let indiceCategoria = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      categoriasData = data.categorias;
      generarSlides();
      mostrarCategoriaActual();
      mostrarCalendario(data.calendario);

      document.getElementById("anterior-categoria").addEventListener("click", () => cambiarCategoria(-1));
      document.getElementById("siguiente-categoria").addEventListener("click", () => cambiarCategoria(1));
    });
});

// Genera todos los slides de categorías una vez
function generarSlides() {
  const contenedor = document.getElementById("contenedor-categorias");
  contenedor.innerHTML = "";

  categoriasData.forEach(categoria => {
    const slide = document.createElement("div");
    slide.classList.add("categoria-slide");

    categoria.grupos.forEach(grupo => {
      const card = document.createElement("div");
      card.classList.add("card");

      const h3 = document.createElement("h3");
      h3.textContent = grupo.nombre;
      card.appendChild(h3);

      const ul = document.createElement("ul");
      grupo.equipos.forEach(equipo => {
        const li = document.createElement("li");
        li.textContent = equipo;
        ul.appendChild(li);
      });

      card.appendChild(ul);
      slide.appendChild(card);
    });

    contenedor.appendChild(slide);
  });
}

// Cambia el slide con efecto desliz
function mostrarCategoriaActual() {
  const nombreCategoria = categoriasData[indiceCategoria].nombre;
  document.getElementById("nombre-categoria").textContent = nombreCategoria;

  const contenedor = document.getElementById("contenedor-categorias");
  contenedor.style.transform = `translateX(-${indiceCategoria * 100}%)`;
}

// Cambia de categoría con wrap-around
function cambiarCategoria(direccion) {
  indiceCategoria += direccion;

  if (indiceCategoria < 0) {
    indiceCategoria = categoriasData.length - 1;
  } else if (indiceCategoria >= categoriasData.length) {
    indiceCategoria = 0;
  }

  mostrarCategoriaActual();
}

// Muestra el calendario (estructura básica)
function mostrarCalendario(calendario) {
  const contenedor = document.getElementById("contenedor-calendario");
  if (!contenedor || !calendario) return;

  contenedor.innerHTML = "";

  calendario.forEach(dia => {
    const card = document.createElement("div");
    card.classList.add("card");

    const h3 = document.createElement("h3");
    h3.textContent = dia.fecha;
    card.appendChild(h3);

    const ul = document.createElement("ul");
    dia.partidos.forEach(partido => {
      const li = document.createElement("li");
      li.textContent = `${partido.hora} - ${partido.categoria}, ${partido.grupo}: ${partido.partido}`;
      ul.appendChild(li);
    });

    card.appendChild(ul);
    contenedor.appendChild(card);
  });
}
