import { Trening } from './Trening';
import { Odgovor } from './Odgovor';

export interface PlanTreninga{
    treninzi:Trening[];
    usernameKlijenta:string;
    usernameInstruktora:string;
    datum: string;
    naziv: string;
    komentari:Odgovor[];
}