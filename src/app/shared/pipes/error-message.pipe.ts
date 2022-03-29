/*
 *
 *  Corona-Warn-App / cwa-map-operators-frontend
 *
 * (C) 2020, T-Systems International GmbH
 *
 * Deutsche Telekom AG and all other contributors /
 * copyright owners license this file to you under the Apache
 * License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  private readonly validationPattern = /'(\w+)' failed for '(\w+)'/;
  private readonly invalidTestKind = /invalid testkind: (\w+)/;
  private readonly invalidDateEntry = /invalid date: (\w+)/;
  private readonly invalidOpeningHours = /'OpeningHours\[(\d+)\]' failed for '(\w+)'/;

  private translations: { [id: string]: string } = {
    "no valid testkinds found": "Keine gültigen Testarten gefunden",
    "invalid appointment type": "Ungültiger Termintyp",
    "invalid enter date": "Ungültiges Eintrittsdatum",
    "invalid leave date": "Ungültiges Austrittsdatum",
    "invalid image data": "Ungültige Bildinformationen",
    "invalid testkind:": "Ungültige Testart:",
    "validation_required": "ist erforderlich",
    "validation_max": "ist zu lang/groß",
    "validation_url": "ist keine gültige URL",
    "field_website": "Webseite",
    "field_address": "Adresse",
    "field_name": "Name",
    "image must not be larger then 100x70": "Das Bild darf nicht größer als 100x70 Pixel sein."
  }

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return null;
    }

    if (this.translations[value]) {
      return this.translations[value];
    } else {
      let matcher = value.match(this.validationPattern);
      if (matcher != null && matcher.length == 3) {
        return this.transform(`field_${matcher[1].toLowerCase()}`) + " " + this.transform(`validation_${matcher[2].toLowerCase()}`);
      }

      matcher = value.match(this.invalidDateEntry);
      if (matcher != null && matcher.length == 2) {
        return "Ungültiges Datum: " + matcher[1];
      }

      matcher = value.match(this.invalidTestKind);
      if (matcher != null && matcher.length == 2) {
        return "Ungültige Testart: " + matcher[1];
      }

      matcher = value.match(this.invalidOpeningHours);
      if (matcher != null && matcher.length == 3) {
        return `Öffnungszeiten (Punkt ${parseInt(matcher[1]) + 1}): ${this.transform('validation_' + matcher[2])}`;
      }
    }
    return value;
  }

}
