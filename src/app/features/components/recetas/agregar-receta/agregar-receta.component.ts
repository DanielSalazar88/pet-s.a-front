import { Receta } from './../../../interfaces/receta.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { DialogDataReceta } from '../../../interfaces/dialog-data-receta.interface';
import { RecetaService } from '../../../services/receta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrl: './agregar-receta.component.css',
})
export class AgregarRecetaComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataReceta,
    private ref: MatDialogRef<AgregarRecetaComponent>,
    private fb: FormBuilder,
    private recetaService: RecetaService
  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      medicamento: [
        this.data.edit ? this.data.data?.medicamento.id : '',
        [Validators.required, Validators.maxLength(15)],
      ],
      mascota: [
        this.data.edit ? this.data.data?.mascota.id_mascota : '',
        [Validators.required, Validators.maxLength(200)],
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarReceta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const recetaNueva: Receta = this.obtenerDatosForm();
    this.recetaService
      .guardarReceta(recetaNueva)
      .subscribe({
        next: (response) => {
          this.closepopup();
        },
        error: () => { },
      })
      .add(() => { });
  }

  obtenerDatosForm(): Receta {
    const { medicamento, mascota } = this.form.value;

    const receta: Receta = {
      medicamento,
      mascota,
    };

    return receta;
  }
}
