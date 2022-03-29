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
import {Center} from "../api/centers/centers.model";
import {PaginationDatasource} from "../shared/datasource";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  private _searchString: string | null = null;
  private searchTimeout: number | null = null;
  centers: Center[] = [];
  datasource: PaginationDatasource<Center>;

  constructor(private centersService: CentersService) {
    this.datasource = new PaginationDatasource<Center>(req => centersService.getCenters(req, this.searchString), 20);
  }

  delete(center: Center) {
    this.centersService.delete(center).subscribe(_ => {
      this.datasource.loadPage(this.datasource.currentPage);
    });
  }

  get searchString(): string | null {
    return this._searchString;
  }

  set searchString(value: string | null) {
    this._searchString = value;
    if (this.searchTimeout != null) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchTimeout = null;
      this.datasource.loadPage(0);
    }, 500);
  }

  ngOnInit(): void {
    this.datasource.connect().subscribe(result => this.centers = result);
  }
}
