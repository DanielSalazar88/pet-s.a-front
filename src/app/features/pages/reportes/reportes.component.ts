import { ReporteService } from './../../services/reporte.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../interfaces/mascota.interfa';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaClientes: Cliente[] = [];
  listaMascotas: Mascota[] = [];

  form: FormGroup;

  dataList: any[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 },
  ];
  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private reporteService: ReporteService,
    private excelSercice: ExcelService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
    this.consultarClientes();
    this.consultarMascotas();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      tipoReporte: ['', Validators.required],
      reporteCliente: ['', Validators.required],
      reporteMascota: ['', Validators.required],
    });
  }

  consultarClientes(): void {
    this.clienteService.consultarClientes().subscribe({
      next: (response) => {
        this.listaClientes = response;
      },
      error: (error) => {
        this.listaClientes = [];
      },
    });
  }

  consultarMascotas(): void {
    this.mascotaService.consultarMascotas().subscribe({
      next: (response) => {
        this.listaMascotas = response;
      },
      error: () => {
        this.listaMascotas = [];
      },
    });
  }

  validarCampos(): void {
    const tipoReporte = this.form.get('tipoReporte')?.value;
    if (tipoReporte === 'CLIENTE') {
      this.form.get('reporteCliente')?.setValidators([Validators.required]);
      this.form.get('reporteMascota')?.clearValidators();
    } else if (tipoReporte === 'RECETA') {
      this.form.get('reporteMascota')?.setValidators([Validators.required]);
      this.form.get('reporteCliente')?.clearValidators();
    }
    this.form.get('reporteCliente')?.updateValueAndValidity();
    this.form.get('reporteMascota')?.updateValueAndValidity();
  }

  generarReporte(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tipoReporte = this.form.get('tipoReporte')?.value;
    if (tipoReporte === 'CLIENTE') {
      this.reporteService.consultarReporteClientes().subscribe({
        next: (response) => {
          this.excelSercice.exportToExcel(
            response,
            'Reporte Clientes',
            'Sheet1'
          );
        },
      });
    } else {
      this.reporteService.consultarReporteRecetas().subscribe({
        next: (response) => {
          this.excelSercice.exportToExcel(
            response,
            'Reporte Recetas',
            'Sheet1'
          );
        },
      });
    }
  }
}
