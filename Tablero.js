/**
 * Clase Tablero que representa al tablero de cartas
 * del juego.
 */
class Tablero {

    constructor(n, m, juego) {
        this.juego = juego;
        this.n = n;
        this.m = m;
        this.tipos = ["A", "B", "C", "D", "E"];
        this.cartas = this.tableroVacio(n);
        this.lastCardFlipped = null;
    }


    imprimir() {
        var o = "";
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (this.cartas[i][j] == null)
                    o += "x" + " ";
                else
                    o += this.cartas[i][j].tipo + " ";
            }
            o += "\n";
        }
        return o;
    }

    /**
     * Se encarga de dar la vuelta a la carta situada en la posición
     * que se pasa como parámetro.
     * @param x
     * @param y
     */
    flip(x, y) {
        let carta = this.cartas[x][y];
        if (!carta.flipped) {
            carta.flip();

            if (this.lastCardFlipped == null) {
                this.lastCardFlipped = carta;
            } else {
                this.checkCards(carta);
            }
        }
    }


    /**
     * Se encarga de comprobar si las dos cartas que se han levantado
     * coinciden, de no ser así se vuelven a dar la vuelta.
     */
    checkCards(carta) {
        if (this.lastCardFlipped.tipo == carta.tipo){ // Coincidencia
            console.log("Pareja encontrada!");
            this.juego.incrementarParejasResueltas();
        } else {
            // esperar 500 ms y ocultar ambas carta
            // this.sleep(1000);
            this.juego.decrementarIntentos();
            setTimeout(this.ocultarPareja.bind(this, this.lastCardFlipped, carta), 1000);
           // this.ocultarPareja(this.lastCardFlipped, carta);
        }
        this.lastCardFlipped = null;
        this.juego.update();
    }

    /**
     * Función que simula un delay de tiempo equivalente a los millisegundos
     * pasados como parámetro.
     * @param millis
     */
    sleep(ms) {
        var currentTime = new Date().getTime();
        while (currentTime + ms >= new Date().getTime()) {
        }
    }

    /**
     * Se encarga de ocultar la pareja de cartas pasada como parámetro al cabo de los
     * milisegundos pasados como parámetro.
     * @param c1
     * @param c2
     */
    ocultarPareja(c1, c2) {
        c1.esconder();
        c2.esconder();
    }


    /**
     * Método que se encarga de dibujar el tablero en el documento
     * html, con sus correspondientes cartas.
     */
    draw() {
        // Obtenemos el elemento div con id "juego"
        let juego = document.getElementById("juego");
        // Creamos el tablero
        let tablero = document.createElement("div");
        tablero.setAttribute("class", "tablero");
        juego.appendChild(tablero);

        // Creamos las cartas
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                let div = document.createElement("div");
                let carta = this.cartas[i][j];
                let id = carta.x.toString() + carta.y.toString();
                div.setAttribute("id", id);
                div.setAttribute("class", "carta");
                div.innerText = "X"; // Dada la vuelta.
                tablero.appendChild(div);
            }
        }
    }

    /**
     * Recorre la matriz de cartas una vez creada para
     * asignar los correspondientes eventos de click.
     */
    createEvents() {
        if (this.cartas.length > 0) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    this.cartas[i][j].findCell().onclick = this.flip.bind(this, i, j);
                }
            }
        }
    }


    /**
     * Se encarga de crear e inicializar el tablero con todas
     * las cartas de distintos tipos, situadas en posiciones aleatorias.
     */
    crearTablero() {
        // Número de parejas necesario de cada tipo para rellenar el tablero
        let nParejas = ((this.n * this.m) / 2) / this.tipos.length;

        for (let j = 0; j < this.tipos.length; j++) {
            for (let i = 0; i < nParejas; i++) {
                this.crearPareja(this.tipos[j]);
            }
        }
    }


    /**
     * Método que se encarga de crear una pareja de cartas del tipo pasado
     * como parámetro y situarlas en un lugar random del tablero que no esté
     * ocupado.
     * @param tipo
     */
    crearPareja(tipo) {
        let i = 0;
        while (i < 2) {
            let pos_x = this.getRandomInt(0, this.n - 1);
            let pos_y = this.getRandomInt(0, this.m - 1);
            if (this.cartas[pos_x][pos_y] == null) {
                this.cartas[pos_x][pos_y] = new Card(tipo, pos_x, pos_y);
                i++;
            }

        }
    }


    /**
     * Devuelve un entero aleatorio entre el rango pasado
     * como parámetro: min inclusive - max inclusive
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * Devuelve un array bidimensional
     * de nxn con todas sus posiciones a null.
     */
    tableroVacio(n) {
        let tab = []
        for (let i = 0; i < n; i++) {
            tab[i] = [];
            for (let j = 0; j < n; j++) {
                tab[i][j] = null;
            }
        }
        return tab;
    }
}

