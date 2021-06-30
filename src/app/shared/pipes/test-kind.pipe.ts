import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testKind'
})
export class TestKindPipe implements PipeTransform {

  private translations: { [id: string]: string } = {
    "Antigen": "Antigen",
    "PCR": "PCR",
    "Vaccination": "Impfung"
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.translations[value] || "Unbekannt";
  }

}
