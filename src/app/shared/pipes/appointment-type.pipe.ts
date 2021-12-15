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

  transform(value: string|null, ...args: unknown[]): unknown {
    if (value == null) {
      return "Unbekannt";
    }
    return this.translations[value] || "Unbekannt";
  }

}
