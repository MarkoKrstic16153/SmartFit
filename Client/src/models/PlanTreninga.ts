import { Trening } from './Trening';

export interface PlanTreninga{
    treninzi:Trening[];
    usernameKlijenta:string;
    usernameInstruktora:string;
    datum: string;
    naziv: string;
}