
//-------------- DECLARACIÓN DE DATOS

// Se arma variable string a partir de listado de palabras aleatorias obtenidos desde sitio web
const palabras_string = 'Abeja, Anguila, Ardilla, Ballena, Beluga, Bisonte, Buitre, Burro, Caballo, Cabra, Canguro, Cocodrilo, Dingo, Dromedario, Elefante, Escarabajo, Flamenco, Foca, Frailecillo, Gacela, Gallina, Ganso, Gato, Gorila, Hiena, Hormiga, Ibis, Iguana, Impala, Irukandji, Jaguar, Jerbo, Jilguero, Jirafa, Kiwi, Koala, Krill, Lagartija, Langosta, Lechuza, Liebre, Macaco, Mamba, Mantis, Mapache, Medusa, Narval, Nautilo, Novillo, Nutria, Ñu, Ocelote, Orca, Ornitorrinco, Oso, Oveja, Paloma, Panda, Pantera, Perro, Quetzal, Quirquincho, Rana, Renacuajo, Rinoceronte, Ruiseñor, Salamandra, Serpiente, Termita, Tigre, Urraca, Vaca, Varano, Venado, Vinchuca, Vizcacha, Wallaby, Wombat, Yak, Yegua, Zancudo, Zorro, Zorrino, Zorzal';

// Se arma array de 84 elementos a partir de string con listado de nombres de animales.
const palabras_array = palabras_string.split(', ');

// Variable para almacenar palabra a adivinar.
let palabra_elegida = '';

// Array para almacenamiento de letras ingresadas en pantalla.
let letras_ingresadas = [];

// Array para guardar progreso del juego. Cada letra ingresada se va almacenando. Sirve para detectar ingresos repetidos.
let progreso = [];

// Variable contadora de ingresos de letras incorrectas.
let errores = 0;

// Variable bandera indicadora de juego ganado.
let victoria = '';

// Variable bandera indicadora de continuar jugando o interrumpir juego.
let seguir_jugando = '';



//-------------- FUNCIONES

// Retorna valor comprendido entre 0 y X (parámetro MAX de entrada)
function getRandomInt(max) {

    return Math.floor((Math.random() * max));

}

// Búsqueda de caracter dentro de string y retorno de posiciones con acierto.
function getIndicesOf(searchStr, str) {

    // Declaración de variables locales de función.
    let startIndex = 0;
    let x;
    let indices = [];

    if (searchStr.length === 0) {

        // Si no hay acierto de la letra en la palabra, se retorna array vacío.
        return [];

    } else {   ///

        while ((x = str.indexOf(searchStr, startIndex)) > -1) {

            // Si letra se encuentra contenida en string, se 'descubre' dentro del array de progreso, añadiendo entrada.        
            indices.push(x);
            startIndex = x + searchStr.length;

            // Cuando valor de función estándar no encuentra acierto, retorna '-1' y finaliza el bucle del WHILE dentro del código actual.

        }

        return indices;

    }

}


//-------------- COMIENZO DE LÓGICA DE PROCESAMIENTO

while (seguir_jugando !== 'N') {

    // Inicialización de variables.    
    errores = 0;
    victoria = '';
    palabra_elegida = '';
    progreso = [];
    letras_ingresadas = [];
    seguir_jugando = '';


    // Llamado a función para elección aleatoria de palabra del array.
    palabra_elegida = palabras_array[getRandomInt(palabras_array.length)].toUpperCase();

    // Se arma patrón de letras de acuerdo a la cantidad de caracteres de la palabra elegida al azar.
    for (let a = 0; a < palabra_elegida.length; a++) {

        progreso.push('_');

    }

    // Se imprime array de progreso en pantalla.
    console.log(progreso);

    // Se imprime cantidad de intentos disponibles restantes.
    console.log(`Intentos restantes: ${6 - errores}`);


    while (errores < 6 && victoria === '') {

        // Se pide ingreso de letra y se convierte automáticamente a mayúscula para facilitar posteriores búsquedas.
        let letra = prompt('Ingrese letra:').toUpperCase();

        // Con cada nueva entrada de letra, se inicializa la consola, para facilitar la lectura del progreso del juego.
        console.clear();

        // Se valida que no se ingrese más de un caracter.
        if (letra.length === 1) {

            // Se verifica que el caracter ingresado sea una letra válida.
            if (/^[A-Z Ñ]+$/.test(letra) === true) {

                // Se verifica si letra elegida en la ocasión actual ya había sido seleccionada en la misma ronda.
                if (letras_ingresadas.includes(letra)) {

                    console.log(`Letra "${letra}" ya había sido elegida previamente. Ingrese otro valor.`);

                } else {

                    // Se añade nueva letra a array de histórico de ingresos.    
                    letras_ingresadas.push(letra);

                    // Se verifica si letra ingresada se encuentra contenida en palabra seleccionada aleatoriamente.
                    if (palabra_elegida.includes(letra)) {

                        //console.log(`Palabra ${palabra_elegida} incluye la letra ${letra}`);
                        console.log(`Palabra incluye la letra ${letra}`);

                        // Se obtienen posiciones de aciertos de la letra dentro de la palabra.
                        let indices = getIndicesOf(letra, palabra_elegida);


                        for (let i = 0; i < indices.length; i++) {

                            // Se reemplazan las posiciones con acierto por la letra ingresada.
                            progreso.splice(indices[i], 1, letra);

                        }

                        // Si la palabra aún no se adivinó por completo, se imprime variable con progreso.
                        if (!(progreso.includes('_'))) {

                            // Impresión final del progreso (palabra completa)           
                            console.log(progreso);
                            victoria = 'X';
                            break;

                        }

                    } else {

                        // Se incrementa variable contadora de intentos fallidos.    
                        errores++;

                        //console.log(`Palabra ${palabra_elegida} NO incluye la letra ${letra}`);
                        console.log(`Palabra NO incluye la letra ${letra}`);

                    }

                }

            } else {

                console.log('Caracter inválido. Ingrese letras comprendidas entre la A y la Z.');

            }

        } else {

            console.log('Ingrese una letra individual.');

        }

        // Se imprime el progreso de adivinanza de la palabra.            
        console.log(progreso);

        // Se imprime cantidad de intentos disponibles restantes.
        console.log(`Intentos restantes: ${6 - errores}`);

        // Registro de histórico de letras ingresadas.
        console.log(`Letras ingresadas hasta el momento: ${letras_ingresadas}`);

    }


    // Se imprime la palabra que había sido elegida aleatoriamente.
    console.log(`La palabra elegida era: ${palabra_elegida}`);

    // Se evalúa si se ganó el juego o no.
    if (victoria === 'X') {

        console.log('¡Felicitaciones! Ganó el juego.');

    } else {

        console.log('Fin del juego. Mejor suerte para la próxima.');

    }


    while (seguir_jugando !== 'S' && seguir_jugando !== 'N') {

        seguir_jugando = prompt('¿Desea volver a jugar? (S/N)').toUpperCase();

        switch (seguir_jugando) {

            case 'S':

                // Se inicializa consola previo a comenzar nueva partida.       
                console.clear()
                break;

            case 'N':

                console.log('¡Gracias por jugar! Hasta la próxima.');
                break;

            default:

                console.log('Respuesta incorrecta. Ingrese "S" para seguir jugando o "N" para finalizar.');
                break;

        }

    }

}