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
      icon: 'pets',
      label: 'Mascotas',
    },
    {
      icon: 'group',
      label: 'Clientes',
    },
    {
      icon: 'medication',
      label: 'Medicinas',
    },
    {
      icon: 'file_copy',
      label: 'Reportes',
    },
  ];
}
