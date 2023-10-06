import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isCollapsed = false;

  constructor(private router: Router) {

  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  sendLogin(): void {
    this.router.navigateByUrl('/')
  }

}
