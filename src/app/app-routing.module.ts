import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CreateComponent} from './create/create.component'
import { InicioComponent } from './inicio/inicio.component'
import {DetallesComponent} from './detalles/detalles.component'

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'create/prospecto', component:CreateComponent },
  {path: 'detalles/prospecto/:id', component:DetallesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
