import { Grupo } from './grupo.model';

export interface Rutina {
  grupos: Grupo[];
  fecha: string;
}