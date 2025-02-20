import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importamos Router para las rutas
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SidenavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'visitas-stefanini';

  isSidenavOpen = true;

  constructor(private router: Router) {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  esLogin(): boolean {
    return this.router.url.includes('/login');
  }
}
