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

  mascotas: Mascota[] = [
    {
      id: '1',
      nombre: 'Luna',
      edad: 3,
      raza: 'Labrador Retriever',
      cedula_cliente: {
        cedula: '1234567890',
        nombres: 'Juan',
        apellidos: 'Pérez',
        telefono: '123456789',
        correo: 'juanperez@example.com',
        direccion: 'Calle 123, Ciudad XYZ',
      },
      peso: 25,
    },
    {
      id: '2',
      nombre: 'Buddy',
      edad: 2,
      raza: 'Golden Retriever',
      cedula_cliente: {
        cedula: '0987654321',
        nombres: 'María',
        apellidos: 'González',
        telefono: '987654321',
        correo: 'mariagonzalez@example.com',
        direccion: 'Av. Principal, Ciudad ABC',
      },
      peso: 30,
    },
    // Puedes añadir más datos de mascotas aquí si lo deseas
  ];

  // También puedes tener datos de clientes separados si lo necesitas

  clientes: Cliente[] = [
    {
      cedula: '1234567890',
      nombres: 'Juan',
      apellidos: 'Pérez',
      telefono: '123-456-7890',
      correo: 'juan@example.com',
      direccion: 'Calle Principal 123',
    },
    {
      cedula: '9876543210',
      nombres: 'María',
      apellidos: 'González',
      telefono: '987-654-3210',
      correo: 'maria@example.com',
      direccion: 'Avenida Central 456',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: '4567890123',
      nombres: 'Carlos',
      apellidos: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    // Agrega más objetos Cliente según sea necesario
  ];
  listadoClientes: Cliente[] = this.clientes;

  filtroDescripcion = '';

  informacionMascotas: MatTableDataSource<Mascota> =
    new MatTableDataSource<Mascota>(this.mascotas);

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
  ) {}

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
      error: () => {},
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
        message: `¿Está seguro de eliminar la mascota ${mascotaSeleccionada.nombre}  con Id: ${mascotaSeleccionada.id}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.mascotaService
          .eliminarMascota(mascotaSeleccionada)
          .subscribe({
            next: (response) => {},
            error: () => {},
          })
          .add(() => {});
      }
    });
  }

  consultarClientes(): void {
    this.clienteService.consultarClientes().subscribe({
      next: (response) => {
        this.listadoClientes = response;
      },
      error: () => {},
    });
  }

  aplicarFiltros(): void {
    this.informacionMascotas.filter = JSON.stringify({
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
