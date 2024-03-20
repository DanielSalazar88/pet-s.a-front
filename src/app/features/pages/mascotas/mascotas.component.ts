import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { Cliente } from '../../interfaces/cliente.interface';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { Mascota } from '../../interfaces/mascota.interfa';
import { MascotaService } from '../../services/mascota.service';
import { AgregarMascotaComponent } from '../../components/mascotas/agregar-mascota/agregar-mascota.component';
import { DialogDataMascota } from '../../interfaces/dialog-data-mascota.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css',
})
export class MascotasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  listadoClientes: Cliente[] = [];

  filtroDescripcion = '';

  informacionMascotas: MatTableDataSource<Mascota> =
    new MatTableDataSource<Mascota>();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'edad',
    'raza',
    'peso',
    'cliente',
    'acciones',
  ];

  constructor(
    private dialog: MatDialog,
    private mascotaService: MascotaService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.consultarMascotas();
    this.consultarClientes();

    this.informacionMascotas.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);

      const matchDescripcion = data.nombre
        .toLowerCase()
        .includes(filters.descripcion);
      return matchDescripcion;
    };
  }

  ngAfterViewInit(): void {
    this.informacionMascotas.paginator = this.paginator;
  }

  consultarMascotas(): void {
    this.mascotaService.consultarMascotas().subscribe({
      next: (response) => {
        this.informacionMascotas.data = response;
        this.informacionMascotas.paginator = this.paginator;
      },
      error: () => {
        this.informacionMascotas.data = [];
      },
    });
  }

  agregarMascota(): void {
    const data: DialogDataMascota = {
      title: 'Agregar Macota',
      edit: false,
      clientes: this.listadoClientes,
    };

    var _popup = this.dialog.open(AgregarMascotaComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarMascotas();
    });
  }

  editarMascota(mascotaSeleccionada: Mascota): void {
    const data: DialogDataMascota = {
      title: 'Editar Macota',
      edit: true,
      data: mascotaSeleccionada,
      clientes: this.listadoClientes,
    };

    var _popup = this.dialog.open(AgregarMascotaComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarMascotas();
    });
  }

  eliminarMascota(mascotaSeleccionada: Mascota): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar la mascota ${mascotaSeleccionada.nombre}  con Id: ${mascotaSeleccionada.id_mascota}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.mascotaService
          .eliminarMascota(mascotaSeleccionada)
          .subscribe({
            next: (response) => {
              this.consultarMascotas();
            },
            error: () => { },
          })
          .add(() => { });
      }
    });
  }

  consultarClientes(): void {
    this.clienteService.consultarClientes().subscribe({
      next: (response) => {
        this.listadoClientes = response;
      },
      error: () => { },
    });
  }

  aplicarFiltros(): void {
    this.informacionMascotas.filter = JSON.stringify({
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
