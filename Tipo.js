/**
 * Clase Tipo que representa el tipo de una carta.
 */
class Tipo {

    /*
     * Diferentes tipos de frutas.
     */
    static Manzana = "A";
    static Platano = "B";
    static Cereza = "C";
    static Limon = "D";

    constructor(nombre, ruta){
        this.nombre = nombre;
        this.imagen = ruta;
    }

}