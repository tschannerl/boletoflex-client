import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { LoginComponent } from './login/login.component';
import { ListClientComponent } from './list-client/list-client.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterClientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listClients', component: ListClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
