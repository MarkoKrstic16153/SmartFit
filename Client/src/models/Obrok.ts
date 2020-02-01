import { DeoObroka } from './DeoObroka';

export interface Obrok{
    deloviObroka:DeoObroka[];
    vreme:string;
    ukupniProteini:number;
    ukupniUgljeniHidrati:number;
    ukupneMasti:number;
    ukupnaVlakna:number;
    ukupneKalorije:number;
}