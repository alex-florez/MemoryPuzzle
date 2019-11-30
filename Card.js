/**
 * Clase Card que representa a una carta del tablero.
 */
class Card {

    constructor(tipo, x, y) {
        this.tipo = tipo;
        this.x = x;
        this.y = y;
        this.flipped = false;
        this.cell = this.findCell();
    }


    /**
     * Método para dar la vuelta a esta carta en concreto.
     */
    flip() {
        let cell = this.findCell();
        cell.setAttribute("src", this.tipo.imagen);
        this.flipped = true;
    }


    /**
     * Se encarga de volver a dar la vuelta a la carta.
     */
    esconder() {
        let cell = this.findCell();
        cell.setAttribute("src", "img/carta_dada_la_vuelta.png");
        this.flipped = false;
    }


    /**
     * Método que devuelve un elemento div que se corresponde con la celda x,y
     * en el tablero HTML.
     */
    findCell() {
        let id = this.x.toString() + this.y.toString();
        return document.getElementById(id);
    }

}