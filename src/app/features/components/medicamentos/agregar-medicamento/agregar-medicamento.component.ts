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
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      id: [
        {
          value: this.data.edit ? this.data.data?.id : '',
          disabled: this.data.edit,
        },
        Validators.required,
      ],
      nombre: [
        this.data.edit ? this.data.data?.nombre : '',
        [Validators.required, Validators.maxLength(15)],
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
        next: (response) => {},
        error: () => {},
      })
      .add(() => {});
  }

  editarMedicamento() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const medicamentoEditado: Medicamento = this.obtenerDatosForm();
    medicamentoEditado.id = this.data.data?.id ?? '0';
    console.log(medicamentoEditado);

    this.medicamentoService
      .editarMedicamento(medicamentoEditado)
      .subscribe({
        next: (response) => {},
        error: () => {},
      })
      .add(() => {});
  }

  obtenerDatosForm(): Medicamento {
    const { id, nombre } = this.form.value;

    const medicamento: Medicamento = {
      id,
      nombre,
    };

    return medicamento;
  }
}
