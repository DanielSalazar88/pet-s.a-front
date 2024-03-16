import { Cliente } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Mascota } from '../interfaces/mascota.interfa';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  constructor(private httpClient: HttpClient) {}

  consultarMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(HttpApi.CONSULTAR_MASCOTAS).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  guardarMascota(mascota: Mascota): Observable<any> {
    return this.httpClient.post<any>(HttpApi.GUARDAR_MASCOTA, mascota).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarMascota(mascota: Mascota): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_MASCOTA, mascota).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarMascota(mascota: Mascota): Observable<any> {
    return this.httpClient.post<any>(HttpApi.ELIMINAR_MASCOTA, mascota).pipe(
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
