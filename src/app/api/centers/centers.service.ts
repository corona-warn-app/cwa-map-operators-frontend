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

  prepareImport(csv: string): Observable<ImportCenterResult[]> {
    return this.http.post<ImportCenterResult[]>('/api/centers/csv', csv);
  }

  importCenters(centers: ImportCenterRequest): Observable<EditCenter[]> {
    return this.http.post<EditCenter[]>('/api/centers', centers);
  }

  delete(center: Center): Observable<any> {
    return this.http.delete(`/api/centers/${center.uuid}`);
  }

  getCenters(page: PageRequest): Observable<PagedResult<Center>> {
    let params = new HttpParams().set('page', page.page).set('size', page.size);
    return this.http.get<PagedResult<Center>>('/api/centers/all', {params});
  }
}