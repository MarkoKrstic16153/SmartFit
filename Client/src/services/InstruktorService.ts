import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Instruktor } from 'src/models/Instruktor';
import { Klijent } from 'src/models/Klijent';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InstruktorService {
    urlPostInstruktor:string="http://localhost:3000/signupinstruktor";
    getInstruktorByUsername:string="http://localhost:3000/getinstruktor/";
    getAllInstruktors:string="http://localhost:3000/getallinstruktor/";
    getClientsInstruktor:string= "http://localhost:3000/getclientinstruktor/";
    constructor(private httpClient: HttpClient) { }
    
    getAllInstruktori():Observable<Instruktor[]>{
        return this.httpClient.get<Instruktor[]>(this.getAllInstruktors);
    }

    dodajInstruktora(noviInstruktor:Instruktor){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
   this.httpClient.post<Klijent>(this.urlPostInstruktor,noviInstruktor,{headers:headers})
   .subscribe(data => {
      console.log(data);
    })
    }

    getKiljentiInstruktora(usernameInstruktora:string){
        
    }

    getInstruktorProfil(username:string){
        return this.httpClient.get<Instruktor>(this.getInstruktorByUsername+username);
    }

}