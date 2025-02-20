import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service'; // Importa el servicio
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  visitas: any[] = []; 
  personas: any[] = [];// Arreglo para almacenar las visitas
  isExpanded: { [key: number]: boolean } = {};
  mesActual: string;
  datos: any;
  userEmail: string | null;

  selectedYear = '2025';
  clienteSeleccionado: string = 'todos';


  constructor(private router: Router, private dataService: DataService) {
    this.mesActual = this.obtenerMesActual();
    this.userEmail="";
   }

   agregarPersona(visita: any) {
    this.router.navigate(['/record-person'], { state: { visita: visita, form: true,lista: false } });
}

mostrarPersonas(visita: any) {
    this.router.navigate(['/record-person'], { state: { visita: visita, form: false,lista:true } });
}

 

  editarVisita(visita: any) {
    console.log("Desde resumen : ",visita);
    this.router.navigate(['/record-visit'], { state: { visita: visita, edit: true , agregar:false } });
  }

  get visitasFiltradas() {
    let visitasFiltradas = this.clienteSeleccionado === 'todos'
      ? this.visitas
      : this.visitas.filter(visita => visita.tipo === this.clienteSeleccionado);

    // Ordenar las visitas por la fecha de manera descendente (más reciente primero)
    return visitasFiltradas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }

  getMonthName(monthNumber: string): string {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return months[parseInt(monthNumber, 10) - 1];
  }



  ngOnInit() {

    this.userEmail = localStorage.getItem('userEmail') as string;
    this.dataService.getVisitasPorUsuario(this.userEmail).subscribe({
      next: (data) => {
        this.visitas = data; // Almacena los datos en el array
        console.log("Visitas",this.visitas);
      }
      })
    console.log("Visitas",this.visitas);
    
 
  }
  
  toggleDescription(index: number) {
    this.isExpanded[index] = !this.isExpanded[index]; // Cambiar el estado de expansión
  }



  
  obtenerMesActual(): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const mesIndex = new Date().getMonth(); // Obtiene el índice del mes (0-11)
    return meses[mesIndex]; // Devuelve el nombre del mes correspondiente
  }

  contarRegistros(visita: any): number {

    return visita.servicios.length;
  }

  eliminarVisita(id: number): void {
    // Mostrar el mensaje de confirmación utilizando Swal.fire
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer. ¿Deseas eliminar esta visita?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'btn btn-danger', // Clase de estilo para el botón de confirmación
            cancelButton: 'btn btn-secondary' // Clase de estilo para el botón de cancelación
        },
        // Esta propiedad permite personalizar el estilo del popup
        // Puedes agregar más clases CSS aquí para personalizar aún más
        backdrop: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación, proceder a eliminar
            this.dataService.deleteVisita(id).subscribe({
                next: (response) => {
                    console.log('Visita eliminada:', response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado Satisfactoriamente',
                        text: 'La visita ha sido eliminada.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        // Redirigir a la página de resumen después de la eliminación
                        this.router.navigate(['/resume']);
                    });
                },
                error: (error) => {
                    console.error('Error al eliminar la visita:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar la visita. Por favor, inténtelo de nuevo más tarde.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    });

  }
}
