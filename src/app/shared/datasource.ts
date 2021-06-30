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
