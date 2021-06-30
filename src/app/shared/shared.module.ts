import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppointmentTypePipe} from "./pipes/appointment-type.pipe";
import {TestKindPipe} from "./pipes/test-kind.pipe";
import {LayoutComponent} from "./components/layout/layout.component";
import {RouterModule} from "@angular/router";
import {YesNoPipe} from "./pipes/yes-no.pipe";
import {ErrorMessagePipe} from "./pipes/error-message.pipe";



@NgModule({
  declarations: [
    AppointmentTypePipe,
    TestKindPipe,
    YesNoPipe,
    ErrorMessagePipe,
    LayoutComponent
  ],
  exports: [
    AppointmentTypePipe,
    TestKindPipe,
    YesNoPipe,
    ErrorMessagePipe,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
