// ==========================================
// TRABAJO PRÁCTICO INTEGRADOR
// FUNDAMENTOS DE JAVASCRIPT
// SISTEMA DE GESTIÓN DE BIBLIOTECA
// ==========================================

// 1. ESTRUCTURA DE DATOS
// ----------------------

// Array de libros
// En este punto se definen las estructuras de datos principales del sistema.
// Se utilizan arrays de objetos para representar:
// - Los libros disponibles en la biblioteca
// - Los usuarios registrados

let libros = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
    genero: "Novela",
    disponible: true
  },
  {
    id: 2,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    anio: 1943,
    genero: "Fantasía",
    disponible: true
  },
  {
    id: 3,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    anio: 1963,
    genero: "Novela",
    disponible: true
  }
];


// 2. GESTIÓN DE LIBROS
// En esta sección se implementan las funciones para la gestión de libros.
// Permite agregar, buscar, ordenar y eliminar libros del sistema.
// Se trabaja directamente sobre el array de libros.


// Agrega un nuevo libro al sistema.
// Recibe los datos del libro como parámetros y lo marca como disponible.

function agregarLibro(id, titulo, autor, anio, genero) {
  let nuevoLibro = {
    id: id,
    titulo: titulo,
    autor: autor,
    anio: anio,
    genero: genero,
    disponible: true
  };

  libros.push(nuevoLibro);
  console.log("Libro agregado correctamente");
}


// Busca libros según un criterio dinámico (titulo, autor o genero).
// Devuelve todos los libros que coincidan con el valor buscado.

function buscarLibro(criterio, valor) {
  let resultados = [];

  for (let i = 0; i < libros.length; i++) {
    if (libros[i][criterio] === valor) {
      resultados.push(libros[i]);
    }
  }

  if (resultados.length > 0) {
    console.log("Libros encontrados:", resultados);
  } else {
    console.log("No se encontraron libros");
  }
}


// Ordena los libros utilizando el algoritmo de burbuja.
// Permite ordenar por título o por año de publicación.

function ordenarLibros(criterio) {

  for (let i = 0; i < libros.length - 1; i++) {

    for (let j = 0; j < libros.length - 1 - i; j++) {

      // Si el criterio es titulo (string)
      if (criterio === "titulo") {
        if (libros[j].titulo > libros[j + 1].titulo) {
          let temp = libros[j];
          libros[j] = libros[j + 1];
          libros[j + 1] = temp;
        }
      }

      // Si el criterio es anio (number)
      if (criterio === "anio") {
        if (libros[j].anio > libros[j + 1].anio) {
          let temp = libros[j];
          libros[j] = libros[j + 1];
          libros[j + 1] = temp;
        }
      }

    }
  }

  console.log("Libros ordenados por " + criterio + ":");
  console.log(libros);
}


// Elimina un libro del sistema buscando por su id.
// Si el libro existe, se elimina del array de libros.

function borrarLibro(id) {
  let index = -1;

  // Buscamos la posición del libro por id
  for (let i = 0; i < libros.length; i++) {
    if (libros[i].id === id) {
      index = i;
      break;
    }
  }

  // Si encontramos el libro, lo eliminamos
  if (index !== -1) {
    libros.splice(index, 1);
    console.log("Libro eliminado correctamente");
  } else {
    console.log("No se encontró un libro con ese id");
  }
}





// 3. GESTIÓN DE USUARIOS
// En esta sección se gestionan los usuarios de la biblioteca.
// Incluye el registro, búsqueda y eliminación de usuarios.
//Array de usuarios 
let usuarios = [
  { id: 1,
    nombre: "Ana",
    email: "ana@email.com",
    librosPrestados: []},
  { id: 2,
    nombre: "Lucia",
    email: "lucia@email.com",
    librosPrestados: []
  }
];

// Registra un nuevo usuario en el sistema.
// Genera un id automático y lo agrega al array de usuarios.

function registrarUsuario(nombre, email) {
  let nuevoId = usuarios.length + 1;

  let nuevoUsuario = {
    id: nuevoId,
    nombre: nombre,
    email: email,
    librosPrestados: []
  };

  usuarios.push(nuevoUsuario);
  console.log("Usuario registrado correctamente");
}


// Busca un usuario por su email.
// Muestra el usuario si existe o un mensaje si no se encuentra.

function buscarUsuario(email) {
  let usuarioEncontrado = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      usuarioEncontrado = usuarios[i];
      break;
    }
  }

  if (usuarioEncontrado) {
    console.log("Usuario encontrado:", usuarioEncontrado);
  } else {
    console.log("No se encontró un usuario con ese email");
  }
}


// Elimina un usuario del sistema verificando nombre y email.

function borrarUsuario(nombre, email) {
  let index = -1;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].nombre === nombre && usuarios[i].email === email) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    usuarios.splice(index, 1);
    console.log("Usuario eliminado correctamente");
  } else {
    console.log("No se encontró el usuario");
  }
}


// 4. SISTEMA DE PRÉSTAMOS
// Este módulo controla el préstamo y devolución de libros.
// Valida disponibilidad del libro y existencia del usuario.

// Presta un libro a un usuario.
// Marca el libro como no disponible y lo agrega a la lista de libros prestados del usuario.

function prestarLibro(idLibro, idUsuario) {
  let libro = null;

  for (let i = 0; i < libros.length; i++) {
    if (libros[i].id === idLibro) {
      libro = libros[i];
      break;
    }
  }

  if (!libro) {
    console.log("Libro no encontrado");
    return;
  }

  if (!libro.disponible) {
    console.log("El libro no está disponible");
    return;
  }

  let usuario = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === idUsuario) {
      usuario = usuarios[i];
      break;
    }
  }

  if (!usuario) {
    console.log("Usuario no encontrado");
    return;
  }

  libro.disponible = false;
  usuario.librosPrestados.push(idLibro);

  console.log("Libro prestado correctamente");
}


// Devuelve un libro prestado.
// Elimina el libro de la lista del usuario y lo marca como disponible nuevamente.

function devolverLibro(idLibro, idUsuario) {
  let usuario = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === idUsuario) {
      usuario = usuarios[i];
      break;
    }
  }

  if (!usuario) {
    console.log("Usuario no encontrado");
    return;
  }

  let indexLibro = usuario.librosPrestados.indexOf(idLibro);

  if (indexLibro === -1) {
    console.log("El usuario no tiene este libro prestado");
    return;
  }

  usuario.librosPrestados.splice(indexLibro, 1);

  let libro = null;

  for (let i = 0; i < libros.length; i++) {
    if (libros[i].id === idLibro) {
      libro = libros[i];
      break;
    }
  }

  if (libro) {
    libro.disponible = true;
  }

  console.log("Libro devuelto correctamente");
}


// 5. REPORTES
// Se generan reportes estadísticos del sistema.
// Se utilizan métodos como filter, map y reduce.

function generarReporteLibros() {
  // Cantidad total de libros
  const totalLibros = libros.length;

  // Cantidad de libros prestados
  const librosPrestados = libros.filter(libro => !libro.disponible).length;

  // Cantidad de libros por género
  const librosPorGenero = libros.reduce((acc, libro) => {
    acc[libro.genero] = (acc[libro.genero] || 0) + 1;
    return acc;
  }, {});

  // Libro más antiguo y más nuevo
  const libroMasAntiguo = libros.reduce((min, libro) =>
    libro.anio < min.anio ? libro : min
  , libros[0]);

  const libroMasNuevo = libros.reduce((max, libro) =>
    libro.anio > max.anio ? libro : max
  , libros[0]);

  console.log("---- REPORTE DE LIBROS ----");
  console.log("Total de libros:", totalLibros);
  console.log("Libros prestados:", librosPrestados);
  console.log("Libros por género:", librosPorGenero);
  console.log("Libro más antiguo:", libroMasAntiguo.titulo, "-", libroMasAntiguo.anio);
  console.log("Libro más nuevo:", libroMasNuevo.titulo, "-", libroMasNuevo.anio);
}


// 6. IDENTIFICACIÓN AVANZADA DE LIBROS
// Identifica libros cuyo título contiene más de una palabra.
// Se valida que el título solo contenga letras y espacios.

function librosConPalabrasEnTitulo() {
  const titulos = libros
    .filter(libro => {
      const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(libro.titulo);
      const masDeUnaPalabra = libro.titulo.trim().split(" ").length > 1;
      return soloLetras && masDeUnaPalabra;
    })
    .map(libro => libro.titulo);

  console.log("Libros con más de una palabra en el título:");
  console.log(titulos);

  return titulos;
}


// 7. MANEJO DE CADENAS
// Normaliza los datos del sistema.
// Convierte títulos a mayúsculas y emails a minúsculas.

function normalizarDatos() {

  // Normalizar títulos de libros (MAYÚSCULAS)
  for (let i = 0; i < libros.length; i++) {
    libros[i].titulo = libros[i].titulo.toUpperCase();
    libros[i].autor = libros[i].autor.trim();
  }

  // Normalizar emails de usuarios (minúsculas)
  for (let i = 0; i < usuarios.length; i++) {
    usuarios[i].email = usuarios[i].email.toLowerCase();
  }

  console.log("Datos normalizados correctamente");
}


// 8. MENÚ PRINCIPAL
// Menú principal del sistema.
// Se muestra por consola sin interacción con prompt.
// El objetivo es demostrar la lógica del sistema y no la entrada de datos.

function menuPrincipal() {
  console.log("====== MENÚ PRINCIPAL ======");
  console.log("1. Mostrar libros");
  console.log("2. Mostrar usuarios");
  console.log("3. Generar reporte de libros");
  console.log("4. Normalizar datos");
  console.log("5. Salir");

  console.log("Menú implementado para uso por consola.");
}





// ===============================
// PRUEBAS (FINAL DEL ARCHIVO)
// Pruebas de funcionamiento del sistema.
// Se ejecutan todas las funciones para verificar su correcto funcionamiento.
// ===============================

console.log("---- PRUEBA AGREGAR LIBRO ----");
agregarLibro(4, "Orgullo y prejuicio", "Jane Austen", 1813, "Romance");

console.log("---- PRUEBA BUSCAR LIBROS ----");
buscarLibro("autor", "Julio Cortázar");
buscarLibro("genero", "Novela");
buscarLibro("titulo", "Rayuela");

console.log("---- PRUEBA ORDENAR LIBROS ----");
ordenarLibros("titulo");
ordenarLibros("anio");

console.log("---- PRUEBA BORRAR LIBRO ----");
borrarLibro(2);   // probá borrar "El principito"
console.log(libros);

console.log("---- PRUEBA MOSTRAR USUARIOS ----");
mostrarTodosLosUsuarios();

console.log("---- PRUEBA REGISTRAR USUARIO ----");
registrarUsuario("Carla", "carla@email.com");
mostrarTodosLosUsuarios();

console.log("---- PRUEBA BUSCAR USUARIO ----");
buscarUsuario("carla@email.com");
buscarUsuario("noexiste@email.com");

borrarUsuario("Carla", "carla@email.com");
mostrarTodosLosUsuarios();

console.log("---- PRUEBA PRESTAR LIBRO ----");
prestarLibro(3, 1); // libro id 3 → usuario id 1

console.log("Usuarios después del préstamo:");
console.log(usuarios);

console.log("Libros después del préstamo:");
console.log(libros);

console.log("---- PRUEBA DEVOLVER LIBRO ----");
devolverLibro(3, 1);

console.log("Usuarios después de la devolución:");
console.log(usuarios);

console.log("Libros después de la devolución:");
console.log(libros);

console.log("---- PRUEBA REPORTE DE LIBROS ----");
generarReporteLibros();

console.log("---- PRUEBA LIBROS CON PALABRAS EN TÍTULO ----");
librosConPalabrasEnTitulo();

console.log("---- PRUEBA NORMALIZAR DATOS ----");
normalizarDatos();

console.log("Libros normalizados:");
console.log(libros);

console.log("Usuarios normalizados:");
console.log(usuarios);

console.log("---- PRUEBA MENÚ PRINCIPAL ----");
menuPrincipal();
