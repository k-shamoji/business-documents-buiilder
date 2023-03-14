import {
  AbstractControl,
  FormControl,
  FormControlOptions,
  FormControlState,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";

export interface DetailItem {
  name: string,
  unit: string,
  quantity: number,
  unitPrice: number,
  subTotal: number,
}

export interface DetailItemForm {
  name: FormControl<string>;
  quantity: QuantityFormControl;
  unitPrice: NumberFormattedFormControl;
  subTotal: NumberFormattedFormControl;
}

export class NumberFormattedFormControl extends FormControl {

  constructor(value: FormControlState<string> | string, opts: FormControlOptions & { nonNullable: true }) {
    super(value, opts);
  }

  get valueAsNumber(): number {
    const value = String(this.value).replace(/,/g, '');
    return Number.isNaN(value) ? 0 : Number(value);
  }
}

export class QuantityFormControl extends NumberFormattedFormControl {
  public readonly quantity: string;

  constructor(value: FormControlState<string> | string, quantity: string, opts: FormControlOptions & { nonNullable: true }) {
    super(value, opts);
    this.quantity = quantity;
  }
}

export function numberOfDigitValidator(digit: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value).replace(/,/g, '')
    return value.length >= digit ? {numberOfDigitOver: value.length} : null;
  }
}
