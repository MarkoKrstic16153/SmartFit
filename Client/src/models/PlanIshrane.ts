import { Dan } from "./Dan";
import { Odgovor } from './Odgovor';

export interface PlanIshrane {
  dani: Dan[];
  usernameKlijenta: string;
  usernameInstruktora: string;
  datum: string;
  naziv: string;
  komentari: Odgovor[];
}
