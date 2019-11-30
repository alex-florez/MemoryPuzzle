/**
 * Clase que representa una instancia del juego del puzzle de memoria.
 */
class PuzzleDeMemoria {
    constructor(filas, columnas, dificulty) {
        this.tablero = new Tablero(filas, columnas, this);
        this.intentos = 50;
        this.parejasResueltas = 0;
        this.dificulty = dificulty;
    }

    /**
     * Establece el nivel de dificultad pasado como parámetro.
     * @param dificulty
     */
    setDificulty() {
        switch (this.dificulty) {
            case "facil":
                this.intentos = ((this.tablero.n * this.tablero.m) / 2) + 15;
                break;
            case "medio":
                this.intentos = ((this.tablero.n * this.tablero.m) / 2) + 10;
                break;
            case "dificil":
                this.intentos = ((this.tablero.n * this.tablero.m) / 2) + 5;
                break;
            default:
                this.intentos = 50;
        }
    }

    /**
     * Método para crear el tablero y asignar los eventos de los botones, entre
     * otras acciones de inicialización.
     */
    setUp() {
        this.tablero.crearTablero();
        this.tablero.draw();
        this.tablero.createEvents();
        this.setDificulty();
        this.crearPanelIzquierdo();
        this.crearPanelDerecho();
    }


    /**
     * Crea el panel izquierdo con los datos del juego
     * correspondientes.
     */
    crearPanelIzquierdo() {
        let section = document.getElementsByClassName("panel-izquierdo")[0];

        let h3_parejas_resueltas = document.createElement("h3");
        h3_parejas_resueltas.innerText = "Parejas resueltas";
        let div_parejas_resueltas = document.createElement("div");
        div_parejas_resueltas.setAttribute("id", "parejas-resueltas");
        div_parejas_resueltas.innerText = 0;
        section.appendChild(h3_parejas_resueltas);
        section.appendChild(div_parejas_resueltas);

    }

    /**
     * Crea el panel derecho con los datos del juego
     * correspondientes.
     */
    crearPanelDerecho() {
        let section = document.getElementsByClassName("panel-derecho")[0];

        let h3_intentos_restantes = document.createElement("h3");
        h3_intentos_restantes.innerText = "Intentos restantes";
        let div_intentos_restantes = document.createElement("div");
        div_intentos_restantes.setAttribute("id", "intentos-restantes");
        div_intentos_restantes.innerText = this.intentos;
        section.appendChild(h3_intentos_restantes);
        section.appendChild(div_intentos_restantes);
    }


    /**
     * Incrementa el número de parejas resueltas de cartas.
     */
    incrementarParejasResueltas() {
        this.parejasResueltas++;
    }

    /**
     * Decrementa el número de intentos restantes para que se termine el juego.
     */
    decrementarIntentos() {
        this.intentos--;
    }

    /**
     * Actualiza todos los datos informativos del juego: intentos, parejas...
     */
    update() {
        document.getElementById("parejas-resueltas").innerText = this.parejasResueltas;
        document.getElementById("intentos-restantes").innerText = this.intentos;
    }

    /**
     * Comprueba si el número de parejas resuelto es igual al
     * número de parejas total, y si es así, finaliza la partida.
     */
    checkSucces() {
        if (this.parejasResueltas == ((this.tablero.n * this.tablero.m) / 2)) {
            alert("¡Has ganado!");
            //this.setUp();
        }
    }

    /**
     * Comprueba si el número de intentos es igual a cero o inferior
     * para fiinalizar la partida. Devuelve true si se ha perdido.
     */
    checkFail() {
        if (this.intentos <= 0) {
            alert("¡Has perdido! Otra vez será...");
            //this.setUp();
            return true;
        }
        return false;
    }
}


/**
 * Función encargada de leer la configuración
 * introducida por el usuario.
 */
function readConf() {
    let conf = [];
    let dificulty = getSelectedValue("dificultad");
    let tam = getSelectedValue("tamaño");
    conf.push(dificulty);
    conf.push(tam);
    return conf;
}

/**
 * Función que devuelve el valor del radio button seleccionado
 * del grupo de nombre pasado como parámetro.
 * @param name
 */
function getSelectedValue(name) {
    let radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked)
            return radios[i].value;
    }
    return null;
}

/**
 * Borra todos los elementos hijos del nodo pasado como parámetro.
 * @param nodo
 */
function borrarHijos(nodo) {
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}

window.onload = function () {
    document.getElementById("boton-comenzar").onclick = function () {
        // Borrar los elementos que hubieran sido creados anteriormente
        // ************************************************************
        let pIzq = document.getElementsByClassName("panel-izquierdo")[0];
        let pCentral = document.getElementById("juego");
        let pDer = document.getElementsByClassName("panel-derecho")[0];
        borrarHijos(pIzq);
        borrarHijos(pCentral);
        borrarHijos(pDer);
        // ************************************************************
        // Cargar la configuración del juego
        // *********************************
        let configuration = readConf();
        let dificulty = configuration[0];
        let tam = configuration[1].split("x");
        juego = new PuzzleDeMemoria(tam[0], tam[1], dificulty);
        juego.setUp();
        // *********************************
        console.log(juego.tablero.imprimir());
    }
}