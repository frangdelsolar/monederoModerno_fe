import { Component, OnInit } from '@angular/core';
import { ServiceService } from '@app/core/controllers/service.controller';
import { AppDialogService } from '@app/core/services/app-dialog.service';
import { CategoryFormComponent } from '@app/shared/components/category-form/category-form.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  expenseCategories: any[] = [];
  incomeCategories: any[] = [];

  activeIndex = 0;

  menuItems: MenuItem[] = [
    {
      label: 'Nuevo',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.onNewCategoryClick();
      },
    },
  ];
  constructor(
    private dialogSvc: AppDialogService,
    private categorySvc: ServiceService
  ) {}

  ngOnInit(): void {
    this.categorySvc.getByType('EXPENSE').subscribe((res: any) => {
      this.expenseCategories = res;
    });
    this.categorySvc.getByType('INCOME').subscribe((res: any) => {
      this.incomeCategories = res;
    });
  }

  getTransactionTypeFromTabIndex() {
    return this.activeIndex === 0 ? 'EXPENSE' : 'INCOME';
  }

  onNewCategoryClick() {
    this.dialogSvc.show({
      component: CategoryFormComponent,
      data: {
        transactionType: this.getTransactionTypeFromTabIndex(),
        invoker: 'category_form',
      },
      params: {
        header: 'Nueva categoría',
        closable: true,
        maximizable: true,
        contentStyle: { overflow: 'visible' },
      },
    });
  }
}
