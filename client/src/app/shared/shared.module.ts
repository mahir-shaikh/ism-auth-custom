import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ToggleComponent } from './toggle/toggle.component';
import { ContenteditableModelDirective } from './ContenteditableModel.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertComponent,
    ToggleComponent,
    ContenteditableModelDirective
  ],
  exports: [
    AlertComponent,
    ToggleComponent,
    ContenteditableModelDirective
  ],
  providers: []
})
export class SharedModule { }
