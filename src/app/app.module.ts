import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RecordPersonComponent } from './pages/record-person/record-person.component';
import { RecordVisitComponent } from './pages/record-visit/record-visit.component';
import { ResumeComponent } from './pages/resume/resume.component';


@NgModule({
  declarations: [
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     
  ],
  providers: [],
  
})
export class AppModule { }
