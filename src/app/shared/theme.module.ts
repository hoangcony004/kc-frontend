import { NgModule } from '@angular/core';

// Import các component standalone
import { IconEditComponent } from './components/templates/icons/edit/icon-edit.component';
import { IconCancelComponent } from './components/templates/icons/cancel/icon-cancel.component';
import { BtnAddComponent } from './components/templates/buttons/add/btn-add.component';

@NgModule({
  imports: [
    IconEditComponent, 
    IconCancelComponent,

    BtnAddComponent,
  ],
  exports: [
    IconEditComponent,
    IconCancelComponent,

    BtnAddComponent
  ]
})
export class ThemeModule {}
