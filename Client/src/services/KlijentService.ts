import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Klijent } from 'src/models/Klijent';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class KlijentService {
    urlPostKlijent:string="http://localhost:3000/signupklijent";
    getKlijentByUsername:string="http://localhost:3000/getklijent/";
    getAllClients:string="http://localhost:3000/getallklijents/";
    constructor(private httpClient: HttpClient) { }

    dodajKlijenta(noviKlijent:Klijent){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
   this.httpClient.post<Klijent>(this.urlPostKlijent,noviKlijent,{headers:headers})
   .subscribe(data => {
      console.log(data);
    })
    }

    getKlijentProfile(username:string):Observable<Klijent>{
        return this.httpClient.get<Klijent>(this.getKlijentByUsername+username);
    }

    getAllKlijents():Observable<Klijent[]>{
        return this.httpClient.get<Klijent[]>(this.getAllClients);
    }

    getKlijentInstruktori(usernameKlijenta:string){

    }
}