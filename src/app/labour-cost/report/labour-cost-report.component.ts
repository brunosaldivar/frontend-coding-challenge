import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LabourCostService } from '../labour-cost.service';


export interface ComplianceStats {
  OpsEmpStatusChecked : number;
  Total: number;
  TaxStatus: number;
  Identification: number;
  RightToWork: number;
  OpsChecked: number;
  Contract: number;
  EmpStatusReview: number;
}
export interface Providers {
  rebatesTotal: number;
  grossPayTotal: number;
  workerCount: number;
  complianceStats: ComplianceStats | null;
  payrollAdminTotal : number;
  labourCostTotal: number;
  providerId: number;
  name :string
}

@Component({
  selector: 'app-labour-cost-report',
  templateUrl: './labour-cost-report.component.html',
  styleUrls: ['./labour-cost-report.component.css']
})
export class LabourCostReportComponent implements OnInit {

  displayedColumns: string[] = ['name', 'workerCount', 'total', 'grossPayTotal', 'payrollAdminTotal','labourCostTotal','workForce'];
  dataSource: MatTableDataSource<Providers>;

  constructor( private _service: LabourCostService) { 

    //this._service.getProviders().subscribe((providers)=> {
//      this.dataSource = new MatTableDataSource(providers)
 //   });

    this.dataSource = new MatTableDataSource(this._service.getProviders())
  }

  ngOnInit(): void {

    //let providers  = this.service.getProviders()
    //this.dataSource = new MatTableDataSource(providers)
    

  }

}
