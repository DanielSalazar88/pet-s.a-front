import { Component, OnInit, ViewChild } from '@angular/core';
import { Medicamento } from '../../interfaces/medicamento.inteface';
import { MedicamentoService } from '../../services/medicamento.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { AgregarMedicamentoComponent } from '../../components/medicamentos/agregar-medicamento/agregar-medicamento.component';
import { DialogDataMedicamento } from '../../interfaces/dialog-data-medicamento.interface';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css',
})
export class MedicamentosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  medicamentos: Medicamento[] = [
    {
      id: '1',
      nombre: 'Paracetamol',
    },
    {
      id: '2',
      nombre: 'Ibuprofeno',
    },
    {
      id: '3',
      nombre: 'Amoxicilina',
    },
    {
      id: '4',
      nombre: 'Omeprazol',
    },
  ];

  filtroId = '';
  filtroDescripcion = '';

  informacionMedicamentos: MatTableDataSource<Medicamento> =
    new MatTableDataSource<Medicamento>(this.medicamentos);

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    this.consultarMedicamentos();

    this.informacionMedicamentos.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);
      const matchNroDocumento = data.id
        .toString()
        .toLowerCase()
        .includes(filters.nroDocumento);
      const matchDescripcion = data.nombre
        .toLowerCase()
        .includes(filters.descripcion);
      return matchNroDocumento && matchDescripcion;
    };
  }

  ngAfterViewInit(): void {
    this.informacionMedicamentos.paginator = this.paginator;
  }

  consultarMedicamentos(): void {
    this.medicamentoService.consultarMedicamento().subscribe({
      next: (response) => {
        this.informacionMedicamentos.data = response;
        this.informacionMedicamentos.paginator = this.paginator;
      },
      error: () => {},
    });
  }

  agregarMedicamento(): void {
    const data: DialogData = {
      title: 'Agregar Medicamento',
      edit: false,
    };

    var _popup = this.dialog.open(AgregarMedicamentoComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe((item) => {
      this.consultarMedicamentos();
    });
  }

  editarMedicamento(medicamentoSeleccionado: Medicamento): void {
    const data: DialogDataMedicamento = {
      title: 'Editar Medicamento',
      edit: true,
      data: medicamentoSeleccionado,
    };

    var _popup = this.dialog.open(AgregarMedicamentoComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarMedicamentos();
    });
  }

  eliminarMedicamento(medicamentoSeleccionado: Medicamento): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar el medicamento ${medicamentoSeleccionado.nombre}  con Id: ${medicamentoSeleccionado.id}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.medicamentoService
          .eliminarMedicamento(medicamentoSeleccionado)
          .subscribe({
            next: (response) => {},
            error: () => {},
          })
          .add(() => {});
      }
    });
  }

  aplicarFiltros(): void {
    this.informacionMedicamentos.filter = JSON.stringify({
      nroDocumento: this.filtroId.toLowerCase(),
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
