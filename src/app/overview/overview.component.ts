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
