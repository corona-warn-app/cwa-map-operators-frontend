import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../auth.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public environment = environment;

  constructor(private authentication: AuthenticationService) {
  }

  logout() {
    this.authentication.logout();
  }

  ngOnInit(): void {
  }

}
