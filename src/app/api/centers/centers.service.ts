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
