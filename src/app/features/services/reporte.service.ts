import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Receta } from '../interfaces/receta.inteface';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private httpClient: HttpClient) {}

  consultarReporteClientes(): Observable<Receta[]> {
    return this.httpClient.get<Receta[]>(HttpApi.CONSULTA_REPORTE_CLIENTE).pipe(
      map((res: any) => {
        const data = JSON.parse(res.Message);
        return data.map((item: any) => ({
          id: item.id,
          medicamento: {
            dosis: item.dosis,
            nombre: item.medicamento,
            descripcion: item.descripcion,
          },
          mascota: {
            nombre: item.nombre_mascota,
            cedula_cliente: item.cedula_cliente,
          },
        }));
      })
    );
  }

  consultarReporteRecetas(): Observable<Receta[]> {
    return this.httpClient.get<Receta[]>(HttpApi.CONSULTA_REPORTE_CLIENTE).pipe(
      map((res: any) => {
        const data = JSON.parse(res.Message);
        return data.map((item: any) => ({
          id: item.id,
          medicamento: {
            dosis: item.dosis,
            nombre: item.medicamento,
            descripcion: item.descripcion,
          },
          mascota: {
            nombre: item.nombre_mascota,
            cedula_cliente: item.cedula_cliente,
          },
        }));
      })
    );
  }

  validarMensajeError(res: unknown) {
    const error = res as IRespuesta;
    if (error.error) {
      //this.utilService.mostrarMensaje(error.descripcionRespuesta, 'warning');
      throw new Error(error.descripcionRespuesta);
    }
  }
}
