import { DialogData } from './../../interfaces/dialog-data.interface';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgregarClienteComponent } from '../../components/clientes/agregar-cliente/agregar-cliente.component';
import { DialogSimpleComponent } from '../../../shared/components/dialog-simple/dialog-simple.component';
import { DialogDataCliente } from '../../interfaces/dialog-data-cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

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

  filtroNroDocumento = '';
  filtroDescripcion = '';

  informacionClientes: MatTableDataSource<Cliente> =
    new MatTableDataSource<Cliente>();
  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'telefono',
    'correo',
    'direccion',
    'acciones',
  ];

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.consultarClientes();

    this.informacionClientes.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);
      const matchNroDocumento = data.cedula
        .toString()
        .toLowerCase()
        .includes(filters.nroDocumento);
      const matchDescripcion = data.nombres
        .toLowerCase()
        .includes(filters.descripcion);
      return matchNroDocumento && matchDescripcion;
    };
  }

  ngAfterViewInit(): void {
    this.informacionClientes.paginator = this.paginator;
  }

  consultarClientes(): void {
    this.clienteService.consultarClientes().subscribe({
      next: (response) => {
        this.informacionClientes.data = response;
        this.informacionClientes.paginator = this.paginator;
      },
      error: (error) => {
        console.log('ERROR', error);
        this.informacionClientes.data = [];
      },
    });
  }

  agregarCliente(): void {
    const data: DialogData = {
      title: 'Agregar Cliente',
      edit: false,
    };

    var _popup = this.dialog.open(AgregarClienteComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarClientes();
    });
  }

  editarCliente(clienteSeleccionado: Cliente): void {
    const data: DialogDataCliente = {
      title: 'Editar Cliente',
      edit: true,
      data: clienteSeleccionado,
    };

    var _popup = this.dialog.open(AgregarClienteComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarClientes();
    });
  }

  eliminarCliente(clienteSeleccionado: Cliente): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar el cliente ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}  con Cédula: ${clienteSeleccionado.cedula}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.clienteService
          .eliminarCliente(clienteSeleccionado.cedula)
          .subscribe({
            next: () => {
              this.consultarClientes();
            },
            error: () => { },
          })
          .add(() => { });
      }
    });
  }

  aplicarFiltros(): void {
    this.informacionClientes.filter = JSON.stringify({
      nroDocumento: this.filtroNroDocumento.toLowerCase(),
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
