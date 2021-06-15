import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ToggleComponent } from './toggle/toggle.component';
import { ContenteditableModelDirective } from './ContenteditableModel.directive';
import { InventoryCardComponent } from './inventory-card/inventory-card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertComponent,
    ToggleComponent,
    ContenteditableModelDirective,
    InventoryCardComponent,
    HeaderComponent
  ],
  exports: [
    AlertComponent,
    ToggleComponent,
    ContenteditableModelDirective,
    InventoryCardComponent,
    HeaderComponent
  ],
  providers: []
})
export class SharedModule { }
