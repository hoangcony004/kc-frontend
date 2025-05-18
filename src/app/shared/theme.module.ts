import { NgModule } from '@angular/core';

// Import các component standalone
import { IconEditComponent } from './components/templates/icons/edit/icon-edit.component';
import { IconCancelComponent } from './components/templates/icons/cancel/icon-cancel.component';
import { BtnAddComponent } from './components/templates/buttons/add/btn-add.component';
import { BtnBackComponent } from './components/templates/buttons/back/btn-back.component';
import { BtnSaveComponent } from './components/templates/buttons/save/btn-save.component';
import { IconInfoComponent } from './components/templates/icons/info/icon-info.component';
import { IconDeleteComponent } from './components/templates/icons/delete/icon-delete.component';
import { IconTreeComponent } from './components/templates/icons/tree/icon-tree.component';
import { BtnCloseComponent } from './components/templates/buttons/close/btn-close.component';
import { BtnSearchComponent } from './components/templates/buttons/search/btn-search.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule, 

    IconEditComponent, 
    IconCancelComponent,
    IconInfoComponent,
    IconDeleteComponent,
    IconTreeComponent,


    BtnAddComponent,
    BtnBackComponent,
    BtnSaveComponent,
    BtnCloseComponent,
    BtnSearchComponent,


  ],
  exports: [
    IconEditComponent,
    IconCancelComponent,
    IconInfoComponent,
    IconDeleteComponent,
    IconTreeComponent,

    BtnAddComponent,
    BtnBackComponent,
    BtnSaveComponent,
    BtnCloseComponent,
    BtnSearchComponent,

  ]
})
export class ThemeModule {}
