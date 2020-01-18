import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HranaService {
    constructor(private httpClient: HttpClient) { }
    
}