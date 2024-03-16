import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { IRespuesta } from '../interfaces/respuesta-error.interface';
import { Medicamento } from '../interfaces/medicamento.inteface';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  constructor(private httpClient: HttpClient) {}

  consultarMedicamento(): Observable<Medicamento[]> {
    return this.httpClient.get<Medicamento[]>(HttpApi.CONSULTAR_MEDICAMENTO).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  guardarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.httpClient.post<any>(HttpApi.GUARDAR_MEDICAMENTO, medicamento).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_MEDICAMENTO, medicamento).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.httpClient.post<any>(HttpApi.EDITAR_MEDICAMENTO, medicamento).pipe(
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
