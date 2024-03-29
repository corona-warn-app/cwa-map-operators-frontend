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
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Center, EditCenter, ImportCenterRequest} from "../api/centers/centers.model";
import {of} from "rxjs";
import {CentersService} from "../api/centers/centers.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-center',
  templateUrl: './edit-center.component.html',
  styleUrls: ['./edit-center.component.css']
})
export class EditCenterComponent implements OnInit {

  center: Center | null = null;
  title: string | null = null;
  submitted = false;
  saved = false;
  error: string | null = null;

  form: FormGroup = new FormGroup({
    name: new FormControl('', []),
    address: new FormControl('', [Validators.required]),
    addressNote: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    website: new FormControl(''),
    enterDate: new FormControl('', [Validators.pattern(/\d\d\.\d\d\.\d\d\d\d/)]),
    leaveDate: new FormControl('', [Validators.pattern(/\d\d\.\d\d\.\d\d\d\d/)]),
    appointment: new FormControl(''),
    testKinds: new FormControl(''),
    openingHours: new FormControl(''),
    dcc: new FormControl(false),
    visible: new FormControl(true),
    labId: new FormControl(''),
    operatorName: new FormControl(''),
    longitude: new FormControl(''),
    latitude: new FormControl('')
  });

  constructor(private centerService: CentersService,
              private activatedRoute: ActivatedRoute) {
  }

  public save() {
    if (this.center == null) {
      return;
    }

    if (!this.form.valid) {
      this.submitted = true;
      return;
    }
    const editCenter = {
      name: this.form.get('name')?.value,
      userReference: this.center.userReference,
      address: this.form.get('address')?.value,
      addressNote: this.form.get('addressNote')?.value,
      email: this.form.get('email')?.value,
      website: this.form.get('website')?.value,
      enterDate: this.form.get('enterDate')?.value,
      leaveDate: this.form.get('leaveDate')?.value,
      appointment: this.form.get('appointment')?.value,
      testKinds: this.form.get('testKinds')?.value,
      dcc: this.form.get('dcc')?.value,
      visible: this.form.get('visible')?.value,
      operatorName: this.form.get('operatorName')?.value,
      labId: this.form.get('labId')?.value,
      coordinates: {
        longitude: parseFloat(this.form.get('longitude')?.value),
        latitude: parseFloat(this.form.get('latitude')?.value)
      }
    } as EditCenter;

    if (editCenter.appointment === "") {
      editCenter.appointment = null;
    }

    const openingHours = this.form.get('openingHours');
    if (openingHours != null) {
      editCenter.openingHours = (openingHours.value as string)
        .split("\n")
        .filter(e => e != null && e.trim() != "");
    }

    if (this.center.uuid == null) {
      this.centerService.importCenters({
        deleteAll: false,
        centers: [editCenter]
      } as ImportCenterRequest)
        .subscribe(res => {
          this.saved = true;
          this.updateForm(res[0])
        }, err => {
          this.handleErrors(err);
        });
    } else {
      this.centerService.updateCenter(this.center.uuid, editCenter)
        .subscribe(res => {
          this.saved = true;
          this.updateForm(res);
        }, err => {
          this.handleErrors(err);
        });
    }
  }

  private handleErrors(err: any) {
    this.saved = false;
    if (err.error.message === "validation error") {
      for (const fieldError of err.error.errors) {
        this.form.controls[fieldError.field].setErrors({"backend": fieldError.validation});
      }
    }
    this.error = err.error.message;
  }

  private updateForm(center: Center) {
    this.center = center;

    if (center.uuid == null) {
      this.title = "Neu";
    } else {
      this.title = center.name;
    }

    this.form.patchValue({
      name: center.name,
      userReference: center.name,
      address: center.address,
      addressNote: center.addressNote,
      email: center.email,
      website: center.website,
      enterDate: center.enterDate,
      leaveDate: center.leaveDate,
      appointment: center.appointment ? center.appointment : "",
      testKinds: center.testKinds,
      openingHours: center.openingHours ? center.openingHours.join("\n") : "",
      dcc: center.dcc,
      visible: center.visible,
      operatorName: center.operatorName,
      labId: center.labId,
      longitude: center.coordinates ? center.coordinates.longitude : 0,
      latitude: center.coordinates ? center.coordinates.latitude : 0
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const uuid = params.get("uuid");
        if (uuid != null && uuid !== "new") {
          return this.centerService.getCenterByUuid(uuid);
        } else {
          return of({
            visible: true
          } as Center);
        }
      })
    ).subscribe(center => {
      this.updateForm(center);
    });
  }
}
