import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Receta } from '../interfaces/receta.inteface';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  constructor(private httpClient: HttpClient) {}

  consultarRecetas(): Observable<Receta[]> {
    return this.httpClient.get<Receta[]>(HttpApi.CONSULTAR_RECETAS).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  guardarReceta(receta: Receta): Observable<any> {
    return this.httpClient.post<any>(HttpApi.GUARDAR_RECETA, receta).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarReceta(receta: Receta): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_RECETA, receta).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarReceta(receta: Receta): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_RECETA, receta).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
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
