export interface Ejercicio {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: number;
  hecho: boolean;
  horaRealizado: string | null;
}