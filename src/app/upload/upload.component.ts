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
    this.reset();
  }

  prepare() {
    this.reset();
    if (this.selectedFile == null) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.centers.prepareImport(event.target.result).subscribe(result => {
        if (result.length == 0) {
          this.topWarning = "Es wurden keine Teststellen gefunden. Bitte überprüfen Sie das Format der CSV Datei.";
        } else {
          this.preparedCenters = result.filter(c => c.errors == null || c.errors.length == 0);
          this.centersWithErrors = result.filter(c => c.errors != null && c.errors.length > 0);

          let insertAt = 0;
          for (let i = 0; i < this.preparedCenters.length; i++) {
            const tmp = this.preparedCenters[i];
            if (tmp.warnings != null && tmp.warnings.length > 0) {
              this.warnings = true;
              this.preparedCenters[i] = this.preparedCenters[insertAt];
              this.preparedCenters[insertAt] = tmp;
              insertAt++;
            }
          }
          this.uploaded = true;
        }
      });
    });
    reader.readAsText(this.selectedFile);
  }

  private reset() {
    this.topWarning = null;
    this.imported = false;
    this.deleteAll = false;
    this.preparedCenters = [];
    this.centersWithErrors = [];
  }

  import() {
    const centers = this.preparedCenters.map<EditCenter>(v => ({
      name: v.center.name,
      address: v.center.address,
      addressNote: v.center.addressNote,
      dcc: v.center.dcc,
      appointment: v.center.appointment,
      openingHours: v.center.openingHours,
      testKinds: v.center.testKinds,
      userReference: v.center.userReference,
      website: v.center.website,
      enterDate: v.center.enterDate,
      leaveDate: v.center.leaveDate
    }));
    this.centers.importCenters({centers: centers, deleteAll: this.deleteAll}).subscribe(result => {
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
