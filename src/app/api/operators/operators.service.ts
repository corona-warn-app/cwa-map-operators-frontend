import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OperatorDTO} from "./operators.model";

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor(private http: HttpClient) {
  }

  getOperator(): Observable<OperatorDTO> {
    return this.http.get<OperatorDTO>('/api/operators/current');
  }

  save(operator: OperatorDTO): Observable<OperatorDTO> {
    return this.http.put<OperatorDTO>('/api/operators/current', operator);
  }
}
