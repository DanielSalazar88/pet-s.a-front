import { Mascota } from './mascota.interfa';
import { Medicamento } from './medicamento.inteface';

export interface Receta {
  id?: string;
  medicamento: Medicamento;
  mascota: Mascota;
}
