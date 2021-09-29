import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appointmentType'
})
export class AppointmentTypePipe implements PipeTransform {

  private translations: { [id: string]: string } = {
    "Required": "Erforderlich",
    "NotRequired": "Nicht notwendig",
    "Possible": "Möglich"
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.translations[value] || "Unbekannt";
  }

}
