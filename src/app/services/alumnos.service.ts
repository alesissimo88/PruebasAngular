import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnoModel } from '../models/alumno.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  // Propiedad privada para la url de la base de datos.
  private url = 'https://registroalumnos-b1ed9.firebaseio.com';

  constructor( private http: HttpClient ) { }

    // Método para realizar las inserciones de datos.
    crearAlumno( alumno: AlumnoModel ){

      return this.http.post( `${ this.url }/alumnos.json`, alumno )
      // Método pipe de los observables
        .pipe(
          map ( (resp: any) => {
            alumno.id = resp.name;
            return alumno;
          } )
        );
    }

    actualizarAlumno( alumno: AlumnoModel ){

      const alumnoTemp = {
        // Para no tener que escribir todas las propiedades ponemos tres puntos
        ...alumno
      };
  
      delete alumnoTemp.id;
  
      return this.http.put(`${ this.url }/alumnos/${ alumno.id }.json`, alumnoTemp);
  
    }
  
      // Método borrar alumno
      borrarAlumno( id: string ){
  
        return this.http.delete(`${ this.url }/alumnos/${ id }.json`);
  
      }
  
  
      // Servicio para obtener alumno por id
      getAlumno( id: string ){
        return this.http.get(`${ this.url }/alumnos/${ id }.json`);
      }
  
  
      getAlumnos(){
      return this.http.get(`${ this.url }/alumnos.json`)
          .pipe(
            map( this.crearArregloAlumnos ),
            // El Delay hace que la carga de la informacón no se haga tan rápido
            delay(1500)
          );
      }
  
  
      private crearArregloAlumnos( alumnosObj: object ){
  
        const alumnos: AlumnoModel[] = [];
  
        if ( alumnosObj === null ) { return []; }
  
        Object.keys( alumnosObj ).forEach( key => {
  
        const alumno: AlumnoModel = alumnosObj[key];
        alumno.id = key;
  
        alumnos.push( alumno );
  
        });
  
        return alumnos;
  
    }
  
  
  
  }
