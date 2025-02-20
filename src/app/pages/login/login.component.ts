import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { DataService } from '../../services/data.service'; // Importa el servicio


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Lista de objetos con datos de usuario
  userList: any[] = [];
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {

    this.dataService.getDataAll().subscribe({
      next: (data) => {
        this.userList = data; // Almacena los datos en el array
      }
      })
  }

  onSubmit(emailInput: HTMLInputElement, passwordInput:HTMLInputElement) {

    console.log(this.userList);
    const emailValue = emailInput.value;
    const passwordValue=passwordInput.value; // Obtener el valor del input
    console.log('Correo ingresado:', emailValue); // Mostrar en consola
   

    // Validar si el correo existe en la lista
    //this.userList=this.dataService.getuserList();
    const userExists = this.userList.some(userinfos => userinfos.user === emailValue);
    const matchingUsers =this.userList.filter(user => user.user === emailValue);

    if (userExists && passwordValue==='febrero_2025') {
      console.log('El correo existe en la lista.');
      
      localStorage.setItem('userEmail', emailValue); // Guardar el email
      localStorage.setItem('matchingUsers',  JSON.stringify(matchingUsers)); // Guardar el email
      
      this.router.navigate(['/resume']);
    } else {
      // Usar SweetAlert2 para mostrar un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Correo o Contraseña no coinciden',
        text: 'Error en el correo o Contraseña no coinciden.',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        backdrop: true
      }).then(() => {
        emailInput.focus(); // Enfocar el campo de correo después de cerrar la alerta
      });
    }
  }
}