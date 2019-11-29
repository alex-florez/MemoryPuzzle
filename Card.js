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
        let div = this.findCell();
        div.innerText = this.tipo;
        this.flipped = true;
    }


    /**
     * Se encarga de volver a dar la vuelta a la carta.
     */
    esconder() {
        let div = this.findCell();
        div.innerText = "X";
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