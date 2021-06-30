import {Component, OnInit} from '@angular/core';
import {operators} from "rxjs/internal/Rx";
import {OperatorsService} from "../api/operators/operators.service";
import {OperatorDTO} from "../api/operators/operators.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  saved: boolean = false;
  operator: OperatorDTO | null = null;
  logo: string | null = null;
  error: string | null = null;

  constructor(private operators: OperatorsService) {
  }

  onLogoSelected(event: any) {

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      if (this.operator == null) {
        return;
      }
      this.logo = event.target.result;
      this.operator.logo = this.logo;
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  save() {
    if (this.operator == null) {
      return;
    }

    this.operators.save(this.operator).subscribe(op => {
        this.setOperator(op);
        this.saved = true;
      },
      error => this.error = error.error.message);
  }

  ngOnInit(): void {
    this.operators.getOperator().subscribe(op => this.setOperator(op));
  }

  setOperator(operator: OperatorDTO) {
    this.operator = operator;
    this.logo = operator.logo;
    if (this.logo != null) {
      this.logo = `${this.logo}?ts=${new Date().getTime()}`
      this.operator.logo = null;
    }
  }
}
