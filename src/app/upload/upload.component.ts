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

import {Component, OnInit} from '@angular/core';
import {CentersService} from "../api/centers/centers.service";
import {EditCenter, ImportCenterResult} from "../api/centers/centers.model";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  topWarning: string | null = null;
  imported: boolean = false;
  warnings: boolean = false;
  uploaded: boolean = false;
  deleteAll: boolean = false;
  selectedFile: File | null = null;
  preparedCenters: ImportCenterResult[] = [];
  centersWithErrors: ImportCenterResult[] = [];

  constructor(private centers: CentersService) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.reset();
  }

  prepare() {
    this.reset();
    if (this.selectedFile == null) {
      return;
    }

    const reader = new FileReader();
    reader.onerror = ev => {
      this.topWarning = "Die Datei konnte nicht gelesen werden. Wurde sie eventuell verändert, nachdem Sie sie ausgewählt haben?";
    };

    reader.addEventListener('load', (event: any) => {
      this.centers.prepareImport(event.target.result).subscribe(result => {
        if (result.length == 0) {
          this.topWarning = "Es wurden keine Teststellen gefunden. Bitte überprüfen Sie das Format der CSV Datei.";
        } else {
          this.preparedCenters = result.filter(c => c.errors == null || c.errors.length == 0);
          this.centersWithErrors = result.filter(c => c.errors != null && c.errors.length > 0);

          for (let i = 0; i < this.preparedCenters.length; i++) {
            const tmp = this.preparedCenters[i];
            if (tmp.warnings != null && tmp.warnings.length > 0) {
              this.warnings = true;
              this.preparedCenters.splice(i, 1);
              this.preparedCenters.unshift(tmp);
            }
          }
          this.uploaded = true;
        }
      }, error => {
        if (error.error && error.error.message) {
          this.topWarning = error.error.message;
        }
      });
    });
    reader.readAsText(this.selectedFile);
  }

  private reset() {
    this.warnings = false;
    this.topWarning = null;
    this.imported = false;
    this.deleteAll = false;
    this.preparedCenters = [];
    this.centersWithErrors = [];
  }

  import() {
    const centers = this.preparedCenters.map<EditCenter>(v => v.center);
    this.centers.importCenters({
      centers: centers,
      deleteAll: this.deleteAll
    }).subscribe(result => {
      this.imported = true;
      this.centersWithErrors = [];
      this.preparedCenters = [];
      this.uploaded = false;
      this.deleteAll = false;
    });
  }

  ngOnInit(): void {
  }

}
