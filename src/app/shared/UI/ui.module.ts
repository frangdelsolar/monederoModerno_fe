import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardComponent } from './card/card.component';
import { ChipsComponent } from './chips/chips.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogComponent } from './dialog/dialog.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormSectionComponent } from './form-section/form-section.component';
import { InputCurrencyComponent } from './input-currency/input-currency.component';
import { InputImageComponent } from './input-image/input-image.component';
import { InputEditorComponent } from './input-editor/input-editor.component';
import { InputTextAreaComponent } from './input-text-area/input-text-area.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { InputTextCustomComponent } from './input-text-custom/input-text-custom.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { TagComponent } from './tag/tag.component';
import { TagDisplayComponent } from './tag-display/tag-display.component';
import { ToastComponent } from './toast/toast.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CardMenuComponent } from './card-menu/card-menu.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { IconPickerComponent } from './icon-picker/icon-picker.component';
import { ChartComponent } from './chart/chart.component';

const pngModules = [
  AutoCompleteModule,
  AvatarModule,
  BlockUIModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  ChipsModule,
  CheckboxModule,
  CKEditorModule,
  ColorPickerModule,
  ConfirmPopupModule,
  DialogModule,
  ConfirmDialogModule,
  DividerModule,
  DropdownModule,
  DynamicDialogModule,
  FieldsetModule,
  FileUploadModule,
  FormsModule,
  ImageModule,
  InplaceModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  KnobModule,
  MenubarModule,
  MenuModule,
  MessagesModule,
  OverlayPanelModule,
  PanelModule,
  PasswordModule,
  ProgressBarModule,
  RadioButtonModule,
  ReactiveFormsModule,
  RippleModule,
  SidebarModule,
  SpeedDialModule,
  TableModule,
  TabMenuModule,
  TabViewModule,
  TagModule,
  ToastModule,
  ToolbarModule,
];

const uiComponents = [
  CardComponent,
  CardMenuComponent,
  ChartComponent,
  ChipsComponent,
  ColorPickerComponent,
  DatepickerComponent,
  DialogComponent,
  DropdownComponent,
  FormSectionComponent,
  IconPickerComponent,
  InputCurrencyComponent,
  InputImageComponent,
  InputEditorComponent,
  InputTextAreaComponent,
  InputTextComponent,
  InputPasswordComponent,
  InputSwitchComponent,
  InputTextCustomComponent,
  MonthPickerComponent,
  RadioButtonComponent,
  TabMenuComponent,
  TagComponent,
  TagDisplayComponent,
  ToastComponent,
  ToolbarComponent,
];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...pngModules],
  exports: [...uiComponents, ...pngModules],
})
export class UIModule {}
