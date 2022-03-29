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
import {operators} from "rxjs/internal/Rx";
import {OperatorsService} from "../api/operators/operators.service";
import {OperatorDTO} from "../api/operators/operators.model";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    saved: boolean = false;
    operator: OperatorDTO | null = null;
    logo: string | null = null;
    error: string | null = null;

    constructor(private operators: OperatorsService) {
    }

    onLogoSelected(event: any) {
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            if (this.operator == null) {
                return;
            }
            this.logo = event.target.result;
            this.operator.logo = this.logo;
        });
        reader.readAsDataURL(event.target.files[0]);
    }

    save() {
        if (this.operator == null) {
            return;
        }

        this.operators.save(this.operator).subscribe(op => {
                this.setOperator(op);
                this.saved = true;
                this.error = null;
            },
            error => {
                this.saved = false;
                this.error = error.error.message
            });
    }

    ngOnInit(): void {
        this.operators.getOperator().subscribe(op => this.setOperator(op));
    }

    setOperator(operator: OperatorDTO) {
        this.operator = operator;
        this.logo = operator.logo;
        if (this.logo != null) {
            this.logo = `${this.logo}?ts=${new Date().getTime()}`
            this.operator.logo = null;
        }
    }
}
