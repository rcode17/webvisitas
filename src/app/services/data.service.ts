import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs'; // Importar firstValueFrom
import { environment } from '../../environments/environment'; // Importa el archivo de entorno


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlUsuarioprod: string; 
  private apiUrlTodosprod: string;
  private apiUrlVisitUsuarioprod: string;
  private apiUrlVisita:string;
  private apiUrlPersona:string;
 

  private userListlocal: { 
    id: number; 
    pais: string; 
    codigo: number; 
    nombreProyecto: string; 
    responsable: string; 
    email: string; 
    descripcion: string; 
    area: string; 
    codigoCliente: number; 
    cliente: string; 
  }[] = [
    {
      "id": 121,
      "pais": "ARGENTINA",
      "codigo": 123485,
      "nombreProyecto": "[DWP YPF.2024.SRV] ITO_CTO_SOURCING_CENTRONORTE_ONDEMAND_PROVEEDORES",
      "responsable": "LENIN ROJAS",
      "email": "olquijada@latam.stefanini.com",
      "descripcion": "Servicio para medir facturación de proveedores/materiales/insumos",
      "area": "PRACTICE DIGITAL WORKPLACE",
      "codigoCliente": 2554,
      "cliente": "YPF"
    },
    {
      "id": 213,
      "pais": "ARGENTINA",
      "codigo": 127250,
      "nombreProyecto": "[DWP YPF] EQUIPO BP",
      "responsable": "LENIN ROJAS",
      "email": "olquijada@latam.stefanini.com",
      "descripcion": "SERVICIO CREADO PARA EQUIPO BP",
      "area": "PRACTICE DIGITAL WORKPLACE",
      "codigoCliente": 2475,
      "cliente": "STEFANINI ARGENTINA"
    },
    {
      "id": 219,
      "pais": "ARGENTINA",
      "codigo": 128650,
      "nombreProyecto": "[DWP.2024.SRV] OKR'S",
      "responsable": "LENIN ROJAS",
      "email": "olquijada@latam.stefanini.com",
      "descripcion": "SERVICIO CREADO PARA LA FACTURACIÓN DE LOS OKRS",
      "area": "PRACTICE DIGITAL WORKPLACE",
      "codigoCliente": 2554,
      "cliente": "YPF"
    },
    {
      "id": 239,
      "pais": "ARGENTINA",
      "codigo": 129852,
      "nombreProyecto": "[DWP] OCIOSIDAD LOCAL",
      "responsable": "LENIN ROJAS",
      "email": "olquijada@latam.stefanini.com",
      "descripcion": "OCIOSIDAD LOCAL",
      "area": "PRACTICE DIGITAL WORKPLACE",
      "codigoCliente": 7568,
      "cliente": "VOLKSWAGEN"
    }
  ];
 
  private userListlocalService: any[] = [];
  private visitList: any[] = []; // Arreglo privado para almacenar las visitas
  private personasList: any[] = []; // Arreglo privado para almacenar las visitas

  constructor(private http: HttpClient) {
    this.apiUrlUsuarioprod=`${environment.apiHost}/api/masa/usuario/`;
    this.apiUrlTodosprod=`${environment.apiHost}/api/masa`;
    this.apiUrlVisitUsuarioprod=`${environment.apiHost}/api/visitas/usuario/`;
    this.apiUrlVisita = `${environment.apiHost}/api/visitas`; 
    this.apiUrlPersona=`${environment.apiHost}/api/visita-servicio/`;
   
  }

  // Método para agregar una visita
  addLideres(visit: any) {

    this.userListlocalService.push(visit);
    console.log("desde service",this.userListlocalService);
  }

  getLideres(): any[]  {
    return this.userListlocalService;
  }



  addVisit(visit: any) {
    this.visitList.push(visit);
  }

  // Método para obtener la lista de visitas
  getVisits(): any[] {
    return this.visitList;
  }

  addPersonas(person: any) {
    this.personasList.push(person);
  }

  // Método para obtener la lista de visitas
  getPersonas(): any[] {
    return this.personasList;
  }

  getuserList(): any[] {
    return this.userListlocal;
  }

  addUserListlocal(visit: any) {
    this.userListlocal.push(visit);
  }


// consumiendo servicios
    getData(user: string): Observable<any> {
      const fullUrl = `${this.apiUrlUsuarioprod}${user}`;
      return this.http.get<any>(fullUrl);
    }

    getDataAll(): Observable<any> {
      const fullUrl = `${this.apiUrlTodosprod}`;
      return this.http.get<any>(fullUrl);
    }

    getVisitasPorUsuario(user: string): Observable<any> {
      const fullUrl = `${this.apiUrlVisitUsuarioprod}${user}`;
      return this.http.get<any>(fullUrl);
    }

    
    guardarVisita(visita: any): Observable<any> {
    return this.http.post<any>(this.apiUrlVisita, visita);
  }

  // Método para enviar los datos de la persona
  guardarPersona(visitaId: number, persona: any): Observable<any> {
    const fullUrl = `${this.apiUrlPersona}${visitaId}/persona`; // Construir la URL completa
    return this.http.post<any>(fullUrl, persona); // Realiza la solicitud POST
  }

  updatePerson(idVisita: number,idPersona: number, visitaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlPersona}/${idVisita}/persona/${idPersona}`, visitaData);
  }

  getPersonaByVisitaId(visitaId: number): Observable<any> {
    const fullUrl = `${this.apiUrlPersona}${visitaId}`; // Construir la URL completa
    return this.http.get<any>(fullUrl); // Retorna un Observable
  }
  deleteVisita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlVisita}/${id}`);
  }

  deletePersona(visitaId: number, personaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlPersona}${visitaId}/persona/${personaId}`);
  }

  updateVisita(id: number, visitaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlVisita}/${id}`, visitaData);
  }



    

    
  
}
