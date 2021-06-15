import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ism-inventory-card',
  templateUrl: './inventory-card.component.html',
  styleUrls: ['./inventory-card.component.styl']
})
export class InventoryCardComponent implements OnInit {
  @Input()
  headerText="";
  constructor() { }

  ngOnInit() {
  }

}
