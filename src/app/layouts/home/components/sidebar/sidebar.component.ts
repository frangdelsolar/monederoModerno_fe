import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  display = true;
  budgetGroup_formControl = new FormControl('', []);

  items = [
    {
      label: 'Navegar',
      items: [
        {
          label: 'Inicio',
          icon: 'pi pi-home',
          command: (event: any) => {
            this.router.navigate(['/']);
            this.sidebarSvc.closeSidebar();
          },
        },
      ],
    },
    {
      label: 'Configuración',
      items: [
        {
          label: 'Billeteras',
          icon: 'pi pi-wallet',
          command: (event: any) => {
            this.router.navigate(['billeteras']);
            this.sidebarSvc.closeSidebar();
          },
        },
        {
          label: 'Categorías',
          icon: 'pi pi-th-large',
          command: (event: any) => {
            this.router.navigate(['categorias']);
            this.sidebarSvc.closeSidebar();
          },
        },
        //     {
        //       label: 'Etiquetas',
        //       icon: 'pi pi-tags',
        //       command: (event: any) => {
        //         this.router.navigate(['etiquetas']);
        //         this.sidebarSvc.closeSidebar();
        //       },
        //     },
        {
          label: 'Presupuestos',
          icon: 'pi pi-percentage',
          command: (event: any) => {
            this.router.navigate(['presupuestos']);
            this.sidebarSvc.closeSidebar();
          },
        },
      ],
    },
    {
      label: 'Reportes',
      items: [
        {
          label: 'Recurrencias',
          icon: 'pi pi-table',
          command: (event: any) => {
            this.router.navigate(['transacciones']);
            this.sidebarSvc.closeSidebar();
          },
        },
      ],
    },
  ];

  user: any;

  constructor(
    private sidebarSvc: SidebarService,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.authSvc.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.sidebarSvc.$display.subscribe((res) => (this.display = res));
  }

  onShow() {
    this.sidebarSvc.$display.next(true);
  }

  onHide() {
    this.sidebarSvc.$display.next(false);
  }

  onLogout() {
    this.authSvc.logout();
    window.location.reload();
  }
}
