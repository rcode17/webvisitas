import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service'; // Importa el servicio
// Asegúrate de importar SweetAlert2


// Ahora sí, el decorador Component
@Component({
  selector: 'app-record-visit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './record-visit.component.html',
  styleUrls: ['./record-visit.component.scss']
})
export class RecordVisitComponent {
  esCliente: string = '';
  practica!: string;
  cliente!: string;
  ciudad!: string;
  tipoVisita!: string;
  diaVisita: string = new Date().toISOString().split('T')[0];
  rangoHora!: string;
  modeVisita!: string;
  personaVisitada!: string;
  personaVisitadaEmail!:string;
  emailPersona!: string;
  descripcion!: string;
  responsable!:string;
  alertaOportunidadComercial: boolean = false;
  userList: any[] = [];
  clienteSeleccionado: string = '';
  clienteSeleccionadoGet: string = '';
  proyectoSeleccionado: string = '';
  proyectosFiltrados: any[] = []; 
  visita:any;
  editar:boolean= false;
  agregar:boolean= true;

  constructor(private router: Router, private dataService: DataService, private location: Location ) {}
  actualizarCampos() {

    const navigation = this.location.getState() as any;
    this.agregar=navigation?.agregar;
    this.editar=navigation?.edit;
    this.visita = navigation?.visita;
    console.log("Data A Settear: " ,this.visita );
    if(this.visita){
    this.visita = navigation?.visita;
    this.esCliente=this.visita.esCliente;
    this.rangoHora=this.visita.rangoVisita;
    this.tipoVisita=this.visita.tipoVisita;
    this.personaVisitadaEmail=this.visita.emailVisitada;
    this.descripcion=this.visita.observaciones;
    this.personaVisitada=this.visita.nombreVisitada;
    this.modeVisita=this.visita.modalidad;
    this.tipoVisita=this.visita.tipoVisita.idTipoVisita;
    this.rangoHora=this.visita.rangoVisita.idRango;
    this.alertaOportunidadComercial=this.visita.generaOportunidad;
    this.practica=this.visita.codCliente;
    this.cliente=this.visita.codProyecto;
    }
 
    this.userList=JSON.parse(localStorage.getItem('matchingUsers')as string);

    console.log(this.visita);
    const users = this.userList[0];
    if (users) 
        {
          console.log(users.user);
          this.emailPersona= users.user;
          this.responsable= users.dsm;
        }
  }

  limpiarFormulario() {
    this.esCliente = 'si';
    this.practica = '';
    this.cliente = '';
    this.ciudad = '';
    this.tipoVisita = '';
    this.diaVisita = '';
    this.rangoHora = '';
    this.modeVisita = '';
    this.personaVisitada = '';
    this.emailPersona = '';
    this.descripcion = '';
    this.alertaOportunidadComercial = false;
  }

  eliminarVisita() {
    console.log('Visita eliminada');
  }

  ngOnInit() {
    this.actualizarCampos();

  }

   visitList: any[] = [];

   get uniqueClients() {
    const clients = new Set<string>();
    return this.userList.filter(user => {
      if (!clients.has(user.cliente)) {
        clients.add(user.cliente);
        return true;
      }
      return false;
    });
  }

  onClienteChange(event: any): void {
    this.clienteSeleccionado = event.target.value.split('-')[0]; // Obtener el código del cliente seleccionado
    this.clienteSeleccionadoGet=event.target.value;
    this.filterProyectos(); // Filtrar los proyectos según el cliente seleccionado
  }

  onProyectoChange(event: any): void{
    this.proyectoSeleccionado=event.target.value;
  }

  filterProyectos(): void {
    // Filtrar la lista de proyectos en base al cliente seleccionado
    this.proyectosFiltrados = this.userList.filter(user => user.codCliente === this.clienteSeleccionado);
  }

  onSubmit(): void {
    const visitData = {
      user: this.emailPersona,
      codCliente: this.asignarCodCliente(this.convertirRespuesta(this.esCliente)),
      codProyecto: this.proyectoSeleccionado,
      idTipoVisita: this.tipoVisita,
      diaVisita: this.diaVisita,
      idRango: this.rangoHora,
      modalidad: this.modeVisita,
      nombreVisitada: this.personaVisitada,
      emailVisitada: this.personaVisitadaEmail,
      generaOportunidad: this.alertaOportunidadComercial,
      esCliente: this.convertirRespuesta(this.esCliente),
      observaciones: this.descripcion,
      servicios: []
    };
    this.dataService.guardarVisita(visitData).subscribe({
      next: (response) => {
        console.log("Visita guardada:", response);
        Swal.fire({
          icon: 'success',
          title: 'Guardado Satisfactoriamente',
          text: 'La visita ha sido guardada.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/resume']);
          this.limpiarFormulario(); // Navegar a la página de resumen después de que el usuario cierre la alerta
        });
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

  convertirRespuesta(respuesta: string): boolean {
    return respuesta.trim().toLowerCase() === 'si';
  }
  asignarCodCliente(esCliente: boolean): string {
    if (esCliente) {
      return this.clienteSeleccionadoGet; // Asigna el código del cliente seleccionado
    } else {
      return this.cliente; // Asigna el código del cliente por defecto
    }
    
  }

  booleanToString(value: boolean): string {
    return value ? 'sí' : 'no';
  }


  updateVisita() {
    console.log(this.descripcion);
    const visitData = {
     
      user: this.emailPersona,
      codCliente:this.visita.codCliente,
      codProyecto:this.visita.codProyecto,
      idTipoVisita:this.visita.tipoVisita.idTipoVisita,
      diaVisita: this.visita.diaVisita,
      idRango:this.visita.rangoVisita.idRango,
      //esCliente: this.booleanToString(this.visita.esCliente),
      modalidad:this.visita.modalidad,
      nombreVisitada: this.visita.nombreVisitada,
      emailVisitada:this.visita.emailVisitada,
      observaciones: this.descripcion,
      generaOportunidad:this.visita.generaOportunidad
    };

    this.dataService.updateVisita(this.visita.idVisita, visitData).subscribe({
      next: (response) => {
        console.log('Visita actualizada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Actualizado Satisfactoriamente',
          text: 'La visita ha sido actualizada.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/resume']); // Redirigir a la lista de visitas
        });
      },
      error: (error) => {
        console.error('Error al actualizar la visita:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la visita. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }


}
