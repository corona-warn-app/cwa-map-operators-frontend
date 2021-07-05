import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  private readonly validationPattern = /'(\w+)' failed for '(\w+)'/;
  private readonly invalidTestKind = /invalid testkind: (\w+)/;

  private translations: { [id: string]: string } = {
    "no valid testkinds found": "Keine gültigen Testarten gefunden",
    "invalid appointment type": "Ungültiger Termintyp",
    "invalid enter date": "Ungültiges Eintrittsdatum",
    "invalid leave date": "Ungültiges Austrittsdatum",
    "invalid image data": "Ungültige Bildinformationen",
    "invalid testkind:": "Ungültige Testart:",
    "validation_required": "ist erforderlich",
    "validation_max": "ist zu lang"
  }

  transform(value: string, ...args: unknown[]): unknown {
    if (this.translations[value]) {
      return this.translations[value];
    } else {
      let matcher = value.match(this.validationPattern);
      if (matcher != null && matcher.length == 3) {
        return matcher[1] + " " + this.transform("validation_" + matcher[2]);
      }

      matcher = value.match(this.invalidTestKind);
      if (matcher != null && matcher.length == 2) {
        return "Ungültige Testart: " + this.transform(matcher[1]);
      }
    }
    return value;
  }

}
