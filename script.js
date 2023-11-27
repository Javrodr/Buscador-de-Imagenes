// Tomamos todos los elementos del HTML
const formBusqueda = document.querySelector("#form-busqueda");
const cajaBusqueda = document.querySelector("#caja-busqueda");
const resultadoBusqueda = document.querySelector("#resultado-busqueda");
const mostrarMas = document.querySelector("#mostrar-mas");

let keyword = ""; // variable que guarda la palabra a buscar
let page = 1; // número de página de búsqueda
const accessKey = "dL_fzayYeiVjyy8AJd5KmRFFXRQ3hgQCkR-0uRif1Ek"; 

// Función que trae los resultados
async function buscarImagenes() {
    // tomo el valor que ingresó el usuario
    keyword = cajaBusqueda.value;
    // armo la URL
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    // realizo la búsqueda
    const response = await fetch(url);
    const data = await response.json();

    // controlo, si es la primera vez que busco limpio el contenedor
    // donde se muestran los resultados
    if (page === 1) {
        resultadoBusqueda.innerHTML = "";
    }

    const resultados = data.results;
    // Por cada resultado armo un enlace a, con la imagen dentro
    resultados.map((result) => {
        const imagen = document.createElement("img");
        imagen.src = result.urls.small;
        const imagenLink = document.createElement("a");
        imagenLink.href = result.links.html;
        imagenLink.target = "_blank";

        imagenLink.appendChild(imagen);

        // agrego el elemento al contenedor
        resultadoBusqueda.appendChild(imagenLink);
    });

    // muestro el botón mostrar más
    mostrarMas.style.display = "block";
}

// Agrego funcionalidad para cuando
formBusqueda.addEventListener("submit", (e) => {
    // evito que se recargue la página
    e.preventDefault();
    page = 1;
    buscarImagenes();
});

// Funcionalidad al botón Mostrar más.
mostrarMas.addEventListener("click", () => {
    page++;
    buscarImagenes();
});
