import { Directive, OnChanges, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()'
  }
})
export class ContenteditableModelDirective implements OnChanges {
  @Input('contenteditableModel') model: any;
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;


  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes) {
    if(changes['model'] && changes['model'].currentValue !== this.lastViewModel){
      // if (isPropertyUpdated(changes, this.lastViewModel)) {
      this.lastViewModel = this.model
      this.refreshView()
    }
  }

  onBlur() {
    var value = this.elRef.nativeElement.innerText
    this.lastViewModel = value
    this.update.emit(value)
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model
  }

}
