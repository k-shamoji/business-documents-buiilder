import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {DetailItemForm, NumberFormattedFormControl, QuantityFormControl} from "../main/main";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() details: FormArray<FormGroup<DetailItemForm>> = new FormArray<FormGroup<DetailItemForm>>([]);

  @Output() delete = new EventEmitter<number>();

  readonly displayedColumns = ['name', 'quantity', 'unitPrice', 'subTotal','delete']

  constructor() {
  }

  ngOnInit(): void {
  }

  getNameControl(row: number): FormControl<string> {
    const f: FormGroup<DetailItemForm> = this.details.at(row);
    return f.controls.name;
  }

  getQuantityControl(row: number): QuantityFormControl {
    const f: FormGroup<DetailItemForm> = this.details.at(row);
    return f.controls.quantity;
  }

  getUnitPriceControl(row: number): NumberFormattedFormControl {
    const f: FormGroup<DetailItemForm> = this.details.at(row);
    return f.controls.unitPrice;
  }

  getSubTotalControl(row: number): NumberFormattedFormControl {
    const f: FormGroup<DetailItemForm> = this.details.at(row);
    return f.controls.subTotal;
  }

  onDelete(row: number): void {
    this.delete.emit(row);
  }
}
