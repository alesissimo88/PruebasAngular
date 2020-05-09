import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AlumnoModel } from 'src/app/models/alumno.model';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos: AlumnoModel[] = [];
  cargando = false;

  constructor( private alumnosService: AlumnosService, private auth: AuthService, private router: Router ) { }

  ngOnInit() {

    // Antes que me traiga la información de los alumnos disparo el cargando
    this.cargando = true;

    // Llamo al método para traerme la informacion de los alumnos
    this.alumnosService.getAlumnos().subscribe( resp => {
      this.alumnos = resp;
      // Si me muestra información, cargando estará en falso
      this.cargando = false;
    });

  }

  // Este método tiene que ser llamado también en el html
  borrarAlumno( alumno: AlumnoModel, i: number ){

    Swal.fire({
      title: '¿Seguro que desea borrar?',
      text: `Está seguro que desea borrar a ${ alumno.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ){
       // Borrar el alumno de la posición i
        this.alumnos.splice(i, 1);
        this.alumnosService.borrarAlumno( alumno.id ).subscribe();
      }
    });

  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}

