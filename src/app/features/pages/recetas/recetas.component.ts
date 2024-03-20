import { Component, OnInit, ViewChild } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { Receta } from '../../interfaces/receta.inteface';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { DialogDataReceta } from '../../interfaces/dialog-data-receta.interface';
import { AgregarRecetaComponent } from '../../components/recetas/agregar-receta/agregar-receta.component';
import { MedicamentoService } from '../../services/medicamento.service';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../interfaces/mascota.interfa';
import { Medicamento } from '../../interfaces/medicamento.inteface';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  listMascotas: Mascota[];
  listMedicamentos: Medicamento[];

  recetas: Receta[] = [

    // Puedes añadir más datos de recetas aquí si lo deseas
  ];

  filtroDescripcion = '';
  filtroNombreMascota = '';

  informacionRecetas: MatTableDataSource<Receta> =
    new MatTableDataSource<Receta>(this.recetas);

  displayedColumns: string[] = ['id', 'medicamento', 'mascota', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private recetaService: RecetaService,
    private medicamentoService: MedicamentoService,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    this.consultarRecetas();
    this.consultarMascotas();
    this.consultarMedicamentos();

    this.informacionRecetas.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);


      const matchDescripcion = data.medicamento.nombre
        .toLowerCase()
        .includes(filters.descripcion);


      const mathNombreMascota = data.mascota.nombre
        .toLowerCase()
        .includes(filters.nombreMascota);

      return matchDescripcion && mathNombreMascota;
    };
  }

  ngAfterViewInit(): void {
    this.informacionRecetas.paginator = this.paginator;
  }

  consultarRecetas(): void {
    this.recetaService.consultarRecetas().subscribe({
      next: (response) => {
        this.informacionRecetas.data = response;
        this.informacionRecetas.paginator = this.paginator;
      },
      error: () => {
        this.informacionRecetas.data = [];
      },
    });
  }

  agregarReceta(): void {
    const data: DialogDataReceta = {
      title: 'Agregar Receta',
      edit: false,
      mascotas: this.listMascotas,
      medicamentos: this.listMedicamentos,
    };

    var _popup = this.dialog.open(AgregarRecetaComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe((item) => {
      this.consultarRecetas();
    });
  }


  eliminarReceta(recetaSeleccionada: Receta): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar la receta con Id: ${recetaSeleccionada.id}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.recetaService
          .eliminarReceta(recetaSeleccionada)
          .subscribe({
            next: (response) => {
              this.consultarRecetas();
            },
            error: () => { },
          })
          .add(() => { });
      }
    });
  }

  consultarMascotas(): void {
    this.mascotaService.consultarMascotas().subscribe({
      next: (response) => {
        this.listMascotas = response;
      },
      error: () => { },
    });
  }

  consultarMedicamentos(): void {
    this.medicamentoService.consultarMedicamento().subscribe({
      next: (response) => {
        this.listMedicamentos = response;
      },
      error: () => { },
    });
  }

  aplicarFiltros(): void {
    this.informacionRecetas.filter = JSON.stringify({
      descripcion: this.filtroDescripcion.toLowerCase(),
      nombreMascota: this.filtroNombreMascota.toLowerCase(),
    });
  }
}
