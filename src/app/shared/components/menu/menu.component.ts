import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      icon: 'home',
      label: 'Inicio',
      route: '',
    },
    {
      icon: 'pets',
      label: 'Mascotas',
      route: 'pets/mascotas',
    },
    {
      icon: 'group',
      label: 'Clientes',
      route: 'pets/clientes',
    },
    {
      icon: 'medication',
      label: 'Medicinas',
      route: 'pets/medicamentos',
    },
    {
      icon: 'description',
      label: 'Recetas',
      route: 'pets/recetas',
    },
    {
      icon: 'file_copy',
      label: 'Reportes',
      route: 'pets/reportes',
    },
  ];
}
