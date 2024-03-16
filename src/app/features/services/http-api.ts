export class HttpApi {
  static readonly SOLICITUD_BASE_CLIENTES = '/xxxxx';
  static readonly SOLICITUD_BASE_MASCOTAS = '/xxxxx';
  static readonly SOLICITUD_BASE_MEDICAMENTOS = '/xxxxx';
  static readonly SOLICITUD_BASE_RECETAS = '/xxxxx';

  /*Clientes */
  static readonly CONSULTAR_CLIENTES = `${this.SOLICITUD_BASE_CLIENTES}/xxx/xxx`;
  static readonly GUARDAR_CLIENTE = `${this.SOLICITUD_BASE_CLIENTES}/xxx/xxx`;
  static readonly EDITAR_CLIENTE = `${this.SOLICITUD_BASE_CLIENTES}/xxx/xxx`;
  static readonly ELIMINAR_CLIENTE = `${this.SOLICITUD_BASE_CLIENTES}/xxx/xxx`;

  /*Mascotas */
  static readonly CONSULTAR_MASCOTAS = `${this.SOLICITUD_BASE_MASCOTAS}/xxx/xxx`;
  static readonly GUARDAR_MASCOTA = `${this.SOLICITUD_BASE_MASCOTAS}/xxx/xxx`;
  static readonly EDITAR_MASCOTA = `${this.SOLICITUD_BASE_MASCOTAS}/xxx/xxx`;
  static readonly ELIMINAR_MASCOTA = `${this.SOLICITUD_BASE_MASCOTAS}/xxx/xxx`;

  /*Medicamento */
  static readonly CONSULTAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/xxx/xxx`;
  static readonly GUARDAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/xxx/xxx`;
  static readonly EDITAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/xxx/xxx`;
  static readonly ELIMINAR_MEDICAMENTO = `${this.SOLICITUD_BASE_MEDICAMENTOS}/xxx/xxx`;

  /*Recetas */
  static readonly CONSULTAR_RECETAS = `${this.SOLICITUD_BASE_RECETAS}/xxx/xxx`;
  static readonly GUARDAR_RECETA = `${this.SOLICITUD_BASE_RECETAS}/xxx/xxx`;
  static readonly EDITAR_RECETA = `${this.SOLICITUD_BASE_RECETAS}/xxx/xxx`;
  static readonly ELIMINAR_RECETA = `${this.SOLICITUD_BASE_RECETAS}/xxx/xxx`;
}
