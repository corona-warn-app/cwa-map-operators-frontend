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

  centers: Center[] = [];
  datasource: PaginationDatasource<Center>;

  constructor(private centersService: CentersService) {
    this.datasource = new PaginationDatasource<Center>(req => centersService.getCenters(req),20);
  }

  delete(center: Center) {
    this.centersService.delete(center).subscribe(_ => {
      this.datasource.loadPage(this.datasource.currentPage);
    });
  }

  ngOnInit(): void {
    this.datasource.connect().subscribe(result => this.centers = result);
  }
}
