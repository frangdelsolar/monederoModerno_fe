import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '@app/core/controllers/service.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { ToastService } from '@app/core/services/toast.service';
import { CategoryFormComponent } from '@app/shared/components/category-form/category-form.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() item: any;
  @Input() showMenu = true;
  menuItems: any[] = [
    {
      label: 'Editar',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        this.onEditClick();
      },
    },

    {
      label: 'Eliminar',
      icon: 'pi pi-fw pi-trash',
      command: () => {
        this.onDeleteClick();
      },
    },
  ];
  constructor(
    private categorySvc: ServiceService,
    private toastSvc: ToastService,
    private confirmationService: ConfirmationService,
    private dialogSvc: AppDialogService
  ) {}

  ngOnInit(): void {}

  onEditClick() {
    this.dialogSvc.show({
      component: CategoryFormComponent,
      data: {
        category: this.item,
        edit: true,
      },
      params: {
        header: 'Editar categoría',
        closable: true,
        maximizable: true,
        contentStyle: { overflow: 'visible' },
      },
    });
  }

  onDeleteClick() {
    this.confirmationService.confirm({
      header: 'Eliminar Categoría',
      message: '¿Está seguro que desea continuar?',
      accept: () => {
        this.categorySvc.delete(this.item.id).subscribe(
          (res: any) => {
            this.toastSvc.add({
              severity: 'success',
              summary: 'Categoría eliminada',
              detail: 'La categoría se eliminó correctamente',
            });
            window.location.reload();
          },
          (err: any) => {
            err.error.errors.forEach((element: any) => {
              this.toastSvc.add({
                severity: 'error',
                summary: 'Error',
                detail: element,
              });
            });
          }
        );
      },
    });
  }
}
