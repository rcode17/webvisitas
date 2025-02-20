import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecordPersonComponent } from './pages/record-person/record-person.component';
import { RecordVisitComponent } from './pages/record-visit/record-visit.component';
import { ResumeComponent } from './pages/resume/resume.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'record-visit', component: RecordVisitComponent },
  { path: 'record-person', component: RecordPersonComponent },
  { path: '**', redirectTo: '/login' }  // Redirige a login si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
