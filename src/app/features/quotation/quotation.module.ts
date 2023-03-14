import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MainComponent} from "./pages/main/main.component";
import {QuotationRoutingModule} from "./quotation-routing.module";
import {DetailComponent} from './pages/detail/detail.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { NumberInputDirective } from './components/number-input.directive';


@NgModule({
  providers: [DecimalPipe],
  declarations: [
    MainComponent,
    DetailComponent,
    NumberInputDirective
  ],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ]
})
export class QuotationModule {
}
