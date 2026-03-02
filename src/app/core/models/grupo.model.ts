import { Ejercicio } from './ejercicio.model';

export interface Grupo {
  id: string;
  nombre: string;
  ejercicios: Ejercicio[];
}