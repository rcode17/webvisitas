import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service'; // Importa el servicio
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-person',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-person.component.html',
  styleUrls: ['./record-person.component.scss']
})
export class RecordPersonComponent {
  visita: any;
  codigoServicio: string = '';
  tipoPersona: string = '';
  personaVisitada: string = '';
  emailPersona: string = '';
  observaciones: string = '';
  alertaSeguimiento: boolean = false;
  personas: any[] = [];  // Lista de personas
  personaEditando: any = null; // Persona que se está editando
  visitas: any[] = []; // Arreglo para almacenar las visitas
  mostrarForm:boolean=true;
  mostrarList:boolean=false;
  isExpanded: { [key: number]: boolean } = {};

  constructor(private location: Location, private dataService: DataService, private router: Router) {
    // Obtener la visita pasada desde la navegación
    const navigation = this.location.getState() as any;
    this.visita = navigation?.visita;
    this.mostrarList=navigation?.mostrarList;
   

    console.log(this.visita, "personas");
    console.log(this.mostrarList, "mirar");

  }

  ngOnInit() {
    
    this.mostrarPersonas();    
    // Obtener visitas del servicio
    const navigation = this.location.getState() as any;
    this.mostrarForm = navigation?.form;
    this.mostrarList = navigation?.lista;

  }

  // Función para retroceder a la vista anterior
  goBack(): void {
    this.location.back();
  }

  // Función para limpiar los campos del formulario
  limpiarFormulario(): void {
    this.codigoServicio = '';
    this.tipoPersona = '';
    this.personaVisitada = '';
    this.emailPersona = '';
    this.observaciones = '';
    this.alertaSeguimiento = false;
    this.personaEditando = null;
  }

  // Función para manejar el submit del formulario
  onSubmit() {
    if (this.personaEditando) {
      const personaActualizada = {
        tipoPersona: this.tipoPersona,
        nombrePersona: this.personaVisitada,
        emailPersona: this.emailPersona,
        observaciones: this.observaciones,
        esAlerta: this.alertaSeguimiento
      };

      this.dataService.updatePerson(this.visita.idVisita,this.personaEditando.idVisitaServicio, personaActualizada).subscribe({
        next: (response) => {
          console.log("Visita actualizada:", response);
          Swal.fire({
            icon: 'success',
            title: 'Persona actualizada',
            text: 'La visita se ha actualizado correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.mostrarOcultar();
            this.limpiarFormulario();
            this.mostrarPersonas();
          });
        },
        error: (error) => {
          console.error('Error al actualizar persona:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la persona. Por favor, inténtelo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      const nuevaPersona = {
        codigoServicio: this.codigoServicio,
        tipoPersona: this.tipoPersona,
        nombrePersona: this.personaVisitada,
        emailPersona: this.emailPersona,
        observaciones: this.observaciones,
        esAlerta: this.alertaSeguimiento
      };

      this.dataService.guardarPersona(this.visita.idVisita, nuevaPersona).subscribe({
        next: (response) => {
          console.log("Visita guardada:", response);
          Swal.fire({
            icon: 'success',
            title: 'Visita guardada',
            text: 'La visita se ha guardado correctamente.',
            confirmButtonText: 'Aceptar'
          });
          this.mostrarPersonas();   
          this.limpiarFormulario();
        },
        error: (error) => {
          console.error('Error al guardar visita:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar la visita. Por favor, inténtelo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }


  // Función para eliminar una persona del listado
  eliminarPersona(persona: any): void {
    this.personas = this.personas.filter(p => p !== persona); // Filtramos la persona a eliminar
  }

  // Función para editar los datos de una persona
  editarPersona(persona: any): void {
    // Rellenamos los campos del formulario con los datos de la persona seleccionada
    console.log(persona);
    this.personaEditando = persona;
    this.codigoServicio = persona.codigoServicio;
    this.tipoPersona = persona.tipoPersona;
    this.personaVisitada = persona.nombrePersona;
    this.emailPersona = persona.emailPersona;
    this.observaciones = persona.observaciones;
    this.alertaSeguimiento = persona.esAlerta;
    this.mostrarFormulario()
  }

  // Función para mostrar el formulario de nuevo (si ya hay personas registradas)
  mostrarFormulario(): void {
 // Limpiamos el listado de personas
    this.mostrarForm=true;
    this.mostrarList=false;
  }
  mostrarOcultar(): void {
    this.mostrarForm=false;
    this.mostrarList=true;
  }

  toggleDescription(index: number) {
    this.isExpanded[index] = !this.isExpanded[index]; // Cambiar el estado de expansión
  }
  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarPersonas(){
    this.dataService.getPersonaByVisitaId(this.visita.idVisita).subscribe({
      next: (data) => {
        this.personas = data; // Almacena los datos de la visita
        console.log("Personas obtenidas:", this.personas); // Muestra los datos en la consola
      },
      error: (error) => {
        console.error('Error al obtener personas:', error); // Manejo de errores
        this.mostrarError('No se pudo obtener la persona. Por favor, inténtelo de nuevo más tarde.');
      }
    });
  }

  deletePersona(persona: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer. ¿Deseas eliminar esta persona?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deletePersona(this.visita.idVisita, persona.idVisitaServicio).subscribe({
          next: (response) => {
            console.log('Persona eliminada:', response);
            Swal.fire({
              icon: 'success',
              title: 'Eliminado Satisfactoriamente',
              text: 'La persona ha sido eliminada.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              // Redirigir a la página deseada o actualizar la vista
              this.router.navigate(['/resume']); // Por ejemplo, redirigir a la página de resumen
            });
          },
          error: (error) => {
            console.error('Error al eliminar la persona:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la persona. Por favor, inténtelo de nuevo más tarde.',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }

  
}