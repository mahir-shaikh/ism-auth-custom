import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.styl']
})
export class ToggleComponent implements OnInit {
  @Input() isChecked = false;
  @Output() stateUpdated = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.isChecked = !this.isChecked
    this.stateUpdated.emit(this.isChecked)
  }

}
