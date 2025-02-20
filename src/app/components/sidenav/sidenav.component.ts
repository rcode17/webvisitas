import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa el Router y ActivatedRoute

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isOpen = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  toggle() {
    this.toggleSidenav.emit();
  }

  navigateTo(route: string) {
    if(route == '/record-visit'){
      this.router.navigate([route], { state: { edit: false , agregar:true } });
    }else{
      this.router.navigate([route]);
    }
  }

  cerrarSesion() {
    console.log("Cerrando sesión...");
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}