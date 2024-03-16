import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/cliente.interface';
import { DialogDataCliente } from '../../../interfaces/dialog-data-cliente.interface';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrl: './agregar-cliente.component.css',
})
export class AgregarClienteComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCliente,
    private ref: MatDialogRef<AgregarClienteComponent>,
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      cedula: [
        {
          value: this.data.edit ? this.data.data?.cedula : '',
          disabled: this.data.edit,
        },
        Validators.required,
      ],
      nombre: [
        this.data.edit ? this.data.data?.nombres : '',
        [Validators.required, Validators.maxLength(15)],
      ],
      apellido: [
        this.data.edit ? this.data.data?.apellidos : '',
        [Validators.required, Validators.maxLength(200)],
      ],
      telefono: [
        this.data.edit ? this.data.data?.telefono : '',
        Validators.required,
      ],
      correo: [
        this.data.edit ? this.data.data?.correo : '',
        Validators.required,
      ],
      direccion: [
        this.data.edit ? this.data.data?.direccion : '',
        Validators.required,
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarCliente() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clienteNuevo: Cliente = this.obtenerDatosForm();
    this.clienteService
      .guardarCliente(clienteNuevo)
      .subscribe({
        next: (response) => {},
        error: () => {},
      })
      .add(() => {});
  }

  editarCliente() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const clienteEditado: Cliente = this.obtenerDatosForm();
    clienteEditado.cedula = this.data.data?.cedula ?? '0';
    this.clienteService
      .editarCliente(clienteEditado)
      .subscribe({
        next: (response) => {},
        error: () => {},
      })
      .add(() => {});
  }
  obtenerDatosForm(): Cliente {
    const { cedula, nombre, apellido, telefono, correo, direccion } =
      this.form.value;

    const cliente: Cliente = {
      nombres: nombre,
      apellidos: apellido,
      cedula,
      telefono,
      correo,
      direccion,
    };

    return cliente;
  }
}
