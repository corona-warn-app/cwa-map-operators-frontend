import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  private translations: { [id: string]: string } = {
    "no valid testkinds found": "Keine gültigen Testarten gefunden",
    "invalid appointment type": "Ungültiger Termintyp",
    "invalid enter date": "Ungültiges Eintrittsdatum",
    "invalid leave date": "Ungültiges Austrittsdatum",
    "invalid image data": "Ungültige Bildinformationen",
    "invalid testkind:": "Ungültige Testart:"
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.translations[value] || value;
  }

}
