import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InstruktorService {
    constructor(private httpClient: HttpClient) { }
    
}