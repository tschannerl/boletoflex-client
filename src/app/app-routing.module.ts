import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterClientComponent } from './register-client/register-client.component';


const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
