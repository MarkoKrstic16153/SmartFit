import { OdradjenaVezba } from './OdradjenjaVezba';


export interface Trening{
    vrsta:string;
    vezbe:OdradjenaVezba[];
    trajanje:number;
    odmorIzmedjuSerija:number;
}