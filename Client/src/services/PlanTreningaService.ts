import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PlanTrenignaService {
    constructor(private httpClient: HttpClient) { }
    
}