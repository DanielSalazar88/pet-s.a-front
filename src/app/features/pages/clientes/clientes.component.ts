import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgregarClienteComponent } from '../../components/agregar-cliente/agregar-cliente.component';

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
      cedula: 1234567890,
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '123-456-7890',
      correo: 'juan@example.com',
      direccion: 'Calle Principal 123',
    },
    {
      cedula: 9876543210,
      nombre: 'María',
      apellido: 'González',
      telefono: '987-654-3210',
      correo: 'maria@example.com',
      direccion: 'Avenida Central 456',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    {
      cedula: 4567890123,
      nombre: 'Carlos',
      apellido: 'Sánchez',
      telefono: '456-789-0123',
      correo: 'carlos@example.com',
      direccion: 'Plaza Mayor 789',
    },
    // Agrega más objetos Cliente según sea necesario
  ];

  filtroNroDocumento = '';
  filtroDescripcion = '';

  informacionClientes: MatTableDataSource<Cliente> =
    new MatTableDataSource<Cliente>(this.clientes);
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
  ) {}

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
      const matchDescripcion = data.nombre
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
      error: () => {},
    });
  }

  agregarCliente() {
    const code: string = 'Hola';
    const title: string = 'Hola';
    var _popup = this.dialog.open(AgregarClienteComponent, {
      width: '40%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        title: title,
        code: code,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
    });
  }

  aplicarFiltros(): void {
    this.informacionClientes.filter = JSON.stringify({
      nroDocumento: this.filtroNroDocumento.toLowerCase(),
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
