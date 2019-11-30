/**
 * Clase Tipo que representa el tipo de una carta.
 */
class Tipo {

    /*
     * Diferentes tipos de frutas.
     */
    static Manzana = "img/apple.jpg";
    static Platano = "img/banana.jpg";
    static Cereza = "img/cherries.jpg";
    static Limon = "img/lemon.jpg";
    static Pineapple = "img/pineapple.jpg";

    constructor(nombre, ruta){
        this.nombre = nombre;
        this.imagen = ruta;
    }

}