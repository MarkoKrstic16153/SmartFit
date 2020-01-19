import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hrana } from 'src/models/Hrana';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HranaService {
    urlPostHrana='http://localhost:3000/posthrana';
    ulrGetAllHrana="http://localhost:3000/getallhrana";
    constructor(private httpClient: HttpClient) { }
    
    dodajHranu(novaHrana:Hrana){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
   this.httpClient.post<Hrana>(this.urlPostHrana,novaHrana,{headers:headers})
   .subscribe(data => {
      console.log(data);
    })
    }

    getAllHrana():Observable<Hrana[]>{
        return this.httpClient.get<Hrana[]>(this.ulrGetAllHrana);
    }
}