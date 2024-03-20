import { Medicamento } from './../../../interfaces/medicamento.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { DialogDataMedicamento } from '../../../interfaces/dialog-data-medicamento.interface';
import { MedicamentoService } from '../../../services/medicamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.component.html',
  styleUrl: './agregar-medicamento.component.css',
})
export class AgregarMedicamentoComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDataMedicamento,
    private ref: MatDialogRef<AgregarMedicamentoComponent>,
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService
  ) { }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      nombre: [
        this.data.edit ? this.data.data?.nombre : '',
        [Validators.required, Validators.maxLength(15)],
      ],
      dosis: [
        this.data.edit ? this.data.data?.dosis : '',
        [Validators.required, Validators.maxLength(50)],
      ],
      descripcion: [
        this.data.edit ? this.data.data?.descripcion : '',
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarMedicamento() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const medicamentoNuevo: Medicamento = this.obtenerDatosForm();
    console.log(medicamentoNuevo);
    this.medicamentoService
      .guardarMedicamento(medicamentoNuevo)
      .subscribe({
        next: (response) => {
          this.closepopup();
        },
        error: () => { },
      })
      .add(() => { });
  }

  editarMedicamento() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const medicamentoEditado: Medicamento = this.obtenerDatosForm();
    medicamentoEditado.id = this.data.data?.id ?? 0;
    console.log(medicamentoEditado);

    this.medicamentoService
      .editarMedicamento(medicamentoEditado)
      .subscribe({
        next: (response) => {
          this.closepopup();
        },
        error: () => { },
      })
      .add(() => { });
  }

  obtenerDatosForm(): Medicamento {
    const { nombre, dosis, descripcion } = this.form.value;

    const medicamento: Medicamento = {
      nombre,
      dosis,
      descripcion
    };

    return medicamento;
  }
}
