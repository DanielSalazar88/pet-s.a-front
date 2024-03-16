import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/mascota.interfa';
import { DialogDataMascota } from '../../../interfaces/dialog-data-mascota.interface';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrl: './agregar-mascota.component.css',
})
export class AgregarMascotaComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataMascota,
    private ref: MatDialogRef<AgregarMascotaComponent>,
    private fb: FormBuilder,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      nombre: [
        this.data.edit ? this.data.data?.nombre : '',
        [Validators.required, Validators.maxLength(15)],
      ],
      edad: [
        this.data.edit ? this.data.data?.edad : '',
        [Validators.required, Validators.maxLength(200)],
      ],
      raza: [
        this.data.edit ? this.data.data?.raza : '',
        [Validators.required, Validators.maxLength(200)],
      ],
      cliente: [
        this.data.edit
          ? typeof this.data.data?.cedula_cliente === 'string'
            ? this.data.data?.cedula_cliente
            : this.data.data?.cedula_cliente.nombres
          : '',
        Validators.required,
      ],
      peso: [this.data.edit ? this.data.data?.peso : '', Validators.required],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarMascota() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const mascotaNueva: Mascota = this.obtenerDatosForm();
    console.log(mascotaNueva);
    this.mascotaService
      .guardarMascota(mascotaNueva)
      .subscribe({
        next: (response) => {},
        error: () => {},
      })
      .add(() => {});
  }

  editarMascota() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const mascotaEditada: Mascota = this.obtenerDatosForm();
    mascotaEditada.id = this.data.data?.id ?? '0';
    console.log(mascotaEditada);

    this.mascotaService
      .editarMascota(mascotaEditada)
      .subscribe({
        next: (response) => {},
        error: () => {},
      })
      .add(() => {});
  }

  obtenerDatosForm(): Mascota {
    const {  nombre, edad, raza, cliente, peso } = this.form.value;

    const mascota: Mascota = {
      nombre,
      edad,
      raza,
      cedula_cliente: cliente,
      peso,
    };

    return mascota;
  }
}
