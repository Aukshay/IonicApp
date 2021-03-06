import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploaderPage } from './uploader.page';
import { ShareModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: UploaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploaderPage]
})
export class UploaderPageModule {}
