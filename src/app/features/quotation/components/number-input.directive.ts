import {DecimalPipe} from '@angular/common';
import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[numberInput]'
})
export class NumberInputDirective implements OnInit {

  private element: HTMLInputElement;
  private digits: string = '1.0-0';

  constructor(
    private elementRef: ElementRef,
    private _decimalPipe: DecimalPipe,
  ) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.element.value = this._transform(this.element.value, this.digits);
  }

  private _transform(value: string, digits?: string): string {
    const res = this._decimalPipe.transform(this._parse(value), digits);
    return res === null ? '' : res;
  }

  private _parse(value: string): string {
    return value.replace(/,/g, '');
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value: string) {
    this.element.value = this._parse(value);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: string) {
    this.element.value = this._transform(value, this.digits);
  }

}
