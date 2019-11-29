/**
 * Clase que representa una instancia del juego del puzzle de memoria.
 */
class PuzzleDeMemoria {
    constructor(filas, columnas) {
        this.tablero = new Tablero(filas, columnas, this);
        this.started = false;
        this.intentos = 50;
        this.parejasResueltas = 0;
    }


    /**
     * Método para crear el tablero y asignar los eventos de los botones, entre
     * otras acciones de inicialización.
     */
    setUp() {
        this.tablero.crearTablero();
        this.tablero.draw();
        this.tablero.createEvents();
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

        section.setAttribute("class", "panel-derecho");
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
}


window.onload = function () {
    document.getElementById("boton-comenzar").onclick = function () {
        juego = new PuzzleDeMemoria(5, 6);
        juego.setUp();
        console.log(juego.tablero.imprimir());
    }
}