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

import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, finalize, map, shareReplay, startWith, switchMap, tap} from "rxjs/operators";

export interface PagedResult<T> {
  count: number;
  result: T[];
}

export class PageRequest {
  page: number = 0;
  size: number = 50;
}

export type PaginationEndpoint<T> = (req: PageRequest) => Observable<PagedResult<T>>;

export class PaginationDatasource<T> {
  public totalResults = 0;
  public totalPages = 0;
  private pageNumber: Subject<number> = new Subject<number>();
  public page$: Observable<PagedResult<T>>;

  public currentPage = 0;
  private size = 50;

  private loading: Subject<boolean> = new Subject<boolean>()

  constructor(endpoint: PaginationEndpoint<T>,
              size: number = 50) {
    this.size = size;
    this.page$ = this.pageNumber.pipe(
      startWith(0),
      switchMap(page => {
        this.loading.next(true);
        return endpoint({page, size},);
      }),
      shareReplay(1)
    );
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.pageNumber.next(page);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadPage(this.currentPage + 1);
    }
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(
      tap(page => {
        this.totalResults = page.count;
        this.totalPages = Math.ceil(this.totalResults / this.size);
      }),
      map(page => page.result)
    );
  }
}
