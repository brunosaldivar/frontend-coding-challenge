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
  name :string;
  totalWorkers : number;
  setTotalWorkers() : any;
}

@Component({
  selector: 'app-labour-cost-report',
  templateUrl: './labour-cost-report.component.html',
  styleUrls: ['./labour-cost-report.component.css']
})
export class LabourCostReportComponent implements OnInit {

  displayedColumns: string[] = ['name', 'workerCount', 'complianceStats', 'grossPayTotal', 'payrollAdminTotal','labourCostTotal','workForce'];
  dataSource: MatTableDataSource<Providers>;
  totals : Providers;
  constructor( private _service: LabourCostService) { 

    //this._service.getProviders().subscribe((providers)=> {
//      this.dataSource = new MatTableDataSource(providers)
 //   });
    let providers = this._service.getProviders();
    this.totals = this._service.getTotals();


    this.dataSource = new MatTableDataSource(providers)
  }

  getTotalWorkers(): number {
    return this.totals.workerCount;
  }
  getTotalScore(): number {
    return (this.totals.complianceStats !== null ? this.totals.complianceStats.Total / 100: 0);
  }
  getTotalGrossPay(): number {
    return this.totals.grossPayTotal;
  }
  getTotalPayrollAdmin()  {
    return this.totals.payrollAdminTotal  === 0 ? '-' : this.totals.payrollAdminTotal;
  }
  getTotalLabourCost(): number {
    return this.totals.labourCostTotal;
  }
  getTotalWorkForce(): number {
    return this.totals.workerCount;
  }
  ngOnInit(): void {

    //let providers  = this.service.getProviders()
    //this.dataSource = new MatTableDataSource(providers)
    

  }

}
