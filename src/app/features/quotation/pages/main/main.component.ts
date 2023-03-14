import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  DetailItem,
  DetailItemForm,
  NumberFormattedFormControl,
  numberOfDigitValidator,
  QuantityFormControl
} from "./main";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  details = new FormArray<FormGroup<DetailItemForm>>([]);

  private _total = 0;

  get total() {
    return this._total
  }

  private _totalWithTax = 0;

  get totalWitTax() {
    return this._totalWithTax
  }


  constructor() {
  }

  ngOnInit(): void {
    this.details.push(this._buildDetailItemForm({
      name: 'item name',
      unit: '個',
      quantity: 10,
      unitPrice: 100,
      subTotal: 1000
    }))
    this.calcTotal();
  }

  addRow() {
    this.details = new FormArray<FormGroup<DetailItemForm>>([
      ...this.details.controls,
      this._buildDetailItemForm({name: '', unit: '個', quantity: 1, unitPrice: 0, subTotal: 0})
    ])
    this.calcTotal();
  }

  removeRow(row: number) {
    this.details.removeAt(row);
    this.details = new FormArray<FormGroup<DetailItemForm>>([
      ...this.details.controls
    ])
    this.calcTotal();
  }

  private calcTotal(): void {
    let total = 0;
    this.details.controls.forEach(v => {
      total = total + v.controls.subTotal.valueAsNumber;
    })
    this._total = total;
    this._totalWithTax = total * 1.1;
  }

  private _buildDetailItemForm(input: DetailItem) {
    const name = new FormControl<string>(input.name, {validators: [Validators.required], nonNullable: true})
    const quantity = new QuantityFormControl(input.quantity.toLocaleString(), input.unit, {
      validators: [Validators.required],
      nonNullable: true
    })
    const unitPrice = new NumberFormattedFormControl(input.unitPrice.toLocaleString(), {
      validators: [Validators.required],
      nonNullable: true
    })
    const subTotal = new NumberFormattedFormControl(input.subTotal.toLocaleString(), {
      validators: [Validators.required, numberOfDigitValidator(15)],
      nonNullable: true
    })
    quantity.valueChanges.subscribe(() => {
      subTotal.setValue(quantity.valueAsNumber * unitPrice.valueAsNumber, {emitEvent: false});
      this.calcTotal();
    })
    unitPrice.valueChanges.subscribe(() => {
      subTotal.setValue(quantity.valueAsNumber * unitPrice.valueAsNumber, {emitEvent: false});
      this.calcTotal();
    })
    subTotal.valueChanges.subscribe(() => {
      unitPrice.setValue(subTotal.valueAsNumber / unitPrice.valueAsNumber, {emitEvent: false});
      this.calcTotal();
    })
    return new FormGroup<DetailItemForm>({
      name: name,
      quantity: quantity,
      unitPrice: unitPrice,
      subTotal: subTotal,
    })
  }
}
