import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authentication: AuthenticationService) {
  }

  logout() {
    this.authentication.logout();
  }
  ngOnInit(): void {
  }

}
