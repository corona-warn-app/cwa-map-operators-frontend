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

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Center, EditCenter, ImportCenterRequest, ImportCenterResult} from "./centers.model";
import {PagedResult, PageRequest} from "../../shared/datasource";

@Injectable({
  providedIn: 'root'
})
export class CentersService {

  constructor(private http: HttpClient) {
  }

  getCenterByUuid(uuid: string): Observable<Center> {
    return this.http.get<Center>(`/api/centers/${uuid}`);
  }

  updateCenter(uuid: string, center: EditCenter): Observable<Center> {
    return this.http.put<Center>(`/api/centers/${uuid}`, center);
  }

  prepareImport(csv: string): Observable<ImportCenterResult[]> {
    return this.http.post<ImportCenterResult[]>('/api/centers/csv', csv);
  }

  importCenters(centers: ImportCenterRequest): Observable<Center[]> {
    return this.http.post<Center[]>('/api/centers', centers);
  }

  delete(center: Center): Observable<any> {
    return this.http.delete(`/api/centers/${center.uuid}`);
  }

  getCenters(page: PageRequest, searchString: string|null): Observable<PagedResult<Center>> {
    let params = new HttpParams()
      .set('page', page.page)
      .set('size', page.size);

    if (searchString != null) {
      params = params.set('search', searchString);
    }

    return this.http.get<PagedResult<Center>>('/api/centers/all', {params});
  }
}
