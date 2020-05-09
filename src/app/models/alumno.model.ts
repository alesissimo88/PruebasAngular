
export class AlumnoModel{
    id: string;
    nombre: string;
    apellidos: string;
    direccion: string;
    ciudad: string;
    registrado: boolean;

    constructor(){ 
        this.registrado = true;
    }
}