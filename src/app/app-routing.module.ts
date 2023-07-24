import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { MissingComponent } from './layouts/error/missing/missing.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./layouts/auth/auth-routing.module').then(
        (m) => m.AuthRoutingModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layouts/home/home-routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  { path: '**', pathMatch: 'full', component: MissingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
