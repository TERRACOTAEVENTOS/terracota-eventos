document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Fotografías existentes en IMG/RAMOS DE NOVIA.
    // Se conserva el nombre exacto de cada archivo (incluidas mayúsculas y espacios).
    const carpeta = 'IMG/RAMOS DE NOVIA/';

    const ramos = {
        // Catálogo, página 1
        bruna: {
            nombre: 'Ramo Bruna',
            imagenes: ['RAMOBRUNA1.png', 'RAMOBRUNA2.png', 'RAMOBRUNA3.png']
        },
        amara: {
            nombre: 'Ramo Amara',
            imagenes: ['RAMO AMARA.png', 'RAMOAMARA2.png', 'RAMOAMARA3.png']
        },
        cascada: {
            nombre: 'Ramo Cascada Celynn',
            imagenes: ['ramocascada.png', 'ramocascada2.png', 'ramocascada3.png']
        },
        lelia: {
            nombre: 'Ramo Lelia',
            imagenes: ['ramolelia.png', 'ramolelia2.png']
        },
        iris: {
            nombre: 'Ramo Iris',
            imagenes: ['RAMOIRIS.png', 'RAMOIRIS2.png', 'RAMOIRIS3.png']
        },
        veronica: {
            nombre: 'Ramo Verónica',
            imagenes: ['RAMOVERONICA.png', 'RAMOVERONICA2.png', 'RAMOVERONICA3.png']
        },
        ofelia: {
            nombre: 'Ramo Ofelia',
            imagenes: ['RAMOOFELIA.png', 'RAMOOFELIA2.png', 'RAMOOFELIA3.png']
        },
        lisia: {
            nombre: 'Ramo Lisia',
            imagenes: ['RAMOLISIA.png', 'RAMOLISIA2.png', 'RAMOLISIA3.png']
        },
        lina: {
            nombre: 'Ramo Lina',
            imagenes: ['RAMOLINA.png', 'RAMOLINA2.png', 'RAMOLINA3.png']
        },
        evelina: {
            nombre: 'Ramo Evelina',
            imagenes: ['RAMOEVELINA.png', 'RAMOEVELINA2.png', 'RAMOEVELINA3.png']
        },
        celina: {
            nombre: 'Ramo Celina',
            imagenes: ['RAMOCELINA.png', 'RAMOCELINA2.png', 'RAMOCELINA3.png']
        },
        tuli: {
            nombre: 'Ramo Tuli',
            imagenes: ['RAMOTULI.png']
        },

        // Catálogo, página 2
        eva: {
            nombre: 'Ramo Bolso Eva',
            imagenes: ['BOLSAEVA.jpg', 'BOLSAEVA2.jpg', 'RAMOEVA3.jpg']
        },
        lucia: {
            nombre: 'Ramo Lucía',
            imagenes: ['RAMOLUCIA.png', 'RAMOLUCIA2.png', 'RAMOLUCIA3.png']
        },
        aurora: {
            nombre: 'Ramo Aurora',
            imagenes: ['RAMOAURORA.png', 'RAMOAURORA2.png', 'RAMOAURORA3.png']
        },
        cala: {
            nombre: 'Ramo Cala',
            imagenes: ['RAMOCALA.jpg', 'RAMOCALA2.jpg', 'RAMOCALA3.jpg']
        },
        liora: {
            nombre: 'Ramo Liora',
            imagenes: ['RAMOLIORA.png', 'RAMOLIORA2.png', 'RAMOLIORA3.png']
        },
        ramo: {
            nombre: 'Ramo',
            imagenes: ['RAMO2.png', 'RAMO3.png']
        },
        camelia: {
            nombre: 'Ramo Camelia',
            imagenes: ['RAMOCAMELIA.png', 'RAMOCAMELIA2.png', 'RAMOCAMELIA3.png']
        },
        chiara: {
            nombre: 'Ramo Chiara',
            imagenes: ['RAMOCHIARA.png', 'RAMOCHIARA2.png', 'RAMOCHIARA3.png']
        },
        elena: {
            nombre: 'Ramo Elena',
            imagenes: ['RAMOELENA.png', 'RAMOELENA2.png', 'RAMOELENA3.png']
        },
        olivia: {
            nombre: 'Ramo Olivia',
            imagenes: ['RAMOOLIVIA.png']
        },
        alina: {
            nombre: 'Ramo Alina',
            imagenes: ['RAAMOALINA.png', 'RAMOALINA2.png']
        },
        charlotte: {
            nombre: 'Ramo Charlotte',
            imagenes: ['RAMOCHARLOTTE.png']
        }
    };

    const parametros = new URLSearchParams(window.location.search);
    const claveRamo = (parametros.get('ramo') || '').toLowerCase();
    const ramoSeleccionado = ramos[claveRamo];

    const fotoPrincipal = document.getElementById('fotoPrincipal');
    const miniaturas = document.getElementById('miniaturasRamo');
    const nombreRamo = document.getElementById('nombreRamo');
    const descripcionRamo = document.getElementById('descripcionRamo');
    const whatsappAgs = document.getElementById('whatsappAgs');
    const whatsappLeon = document.getElementById('whatsappLeon');

    // Comprobar que el HTML tenga los elementos necesarios.
    if (!fotoPrincipal || !miniaturas || !nombreRamo || !descripcionRamo) {
        console.error('Faltan elementos de la galería en producto-ramo.html.');
        return;
    }

    if (!ramoSeleccionado) {
        nombreRamo.textContent = 'Ramo no encontrado';
        descripcionRamo.textContent = 'Regresa al catálogo para seleccionar un ramo disponible.';
        fotoPrincipal.removeAttribute('src');
        fotoPrincipal.alt = 'Ramo no disponible';
        miniaturas.innerHTML = '';
        if (whatsappAgs) whatsappAgs.style.display = 'none';
        if (whatsappLeon) whatsappLeon.style.display = 'none';
        return;
    }

    nombreRamo.textContent = ramoSeleccionado.nombre;
    descripcionRamo.textContent = 'Consulta con nuestro equipo la disponibilidad de este diseño floral y las opciones para tu evento.';

    function mostrarImagen(ruta, botonActivo) {
        fotoPrincipal.src = carpeta + ruta;
        fotoPrincipal.alt = ramoSeleccionado.nombre;
        miniaturas.querySelectorAll('button').forEach(function (boton) {
            boton.classList.remove('activa');
            boton.setAttribute('aria-pressed', 'false');
        });
        if (botonActivo) {
            botonActivo.classList.add('activa');
            botonActivo.setAttribute('aria-pressed', 'true');
        }
    }

    miniaturas.innerHTML = '';
    ramoSeleccionado.imagenes.forEach(function (archivo, indice) {
        const boton = document.createElement('button');
        const miniatura = document.createElement('img');
        const ruta = carpeta + archivo;

        boton.type = 'button';
        boton.className = 'miniatura-ramo';
        boton.setAttribute('aria-label', 'Ver fotografía ' + (indice + 1) + ' de ' + ramoSeleccionado.nombre);
        boton.setAttribute('aria-pressed', indice === 0 ? 'true' : 'false');

        miniatura.src = ruta;
        miniatura.alt = 'Vista ' + (indice + 1) + ' de ' + ramoSeleccionado.nombre;
        miniatura.loading = 'lazy';

        // Si una fotografía no existe, no dejamos una miniatura rota.
        miniatura.addEventListener('error', function () {
            boton.remove();
            console.error('No se encontró la imagen: ' + ruta);
        }, { once: true });

        boton.appendChild(miniatura);
        boton.addEventListener('click', function () {
            mostrarImagen(archivo, boton);
        });
        miniaturas.appendChild(boton);

        if (indice === 0) {
            mostrarImagen(archivo, boton);
        }
    });

    fotoPrincipal.addEventListener('error', function () {
        console.error('No se pudo cargar la fotografía principal:', fotoPrincipal.src);
    }, { once: true });

    const mensaje = encodeURIComponent(
        'Hola, quisiera consultar información y disponibilidad del ' +
        ramoSeleccionado.nombre + ' para mi evento.'
    );

    if (whatsappAgs) {
        whatsappAgs.href = 'https://wa.me/524493639750?text=' + mensaje;
    }
    if (whatsappLeon) {
        whatsappLeon.href = 'https://wa.me/524778494417?text=' + mensaje;
    }
});
