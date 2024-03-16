import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { MatInputModule } from '@angular/material/input';
import { AgregarClienteComponent } from './components/agregar-cliente/agregar-cliente.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, ClientesComponent, AgregarClienteComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [ClienteService],
})
export class FeaturesModule {}
