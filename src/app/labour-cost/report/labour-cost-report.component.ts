import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component } from '@angular/core';
import { Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LabourCostService } from '../labour-cost.service';
import { Provider } from '../provider';

@Component({
  selector: 'app-labour-cost-report',
  templateUrl: './labour-cost-report.component.html',
  styleUrls: ['./labour-cost-report.component.css']
})
export class LabourCostReportComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'workerCount', 'complianceStats', 'grossPayTotal', 'payrollAdminTotal','labourCostTotal','workForce'];
  dataSource: MatTableDataSource<Provider>;
  totals : Provider;
  directContractors : Provider;
  sortedData: Provider[];
  providers: Provider[];
  sortColumn : String = "";
  ngAfterViewInit() {
   // this.dataSource.sort = this.sort;
  }
  constructor( private _service: LabourCostService) { 

      //this._service.getProviders().subscribe((providers)=> {
      //      this.dataSource = new MatTableDataSource(providers)
      //   });
      this.sortColumn = ""
      this.providers = this._service.getProviders();
      this.directContractors = this._service.getDirectContractors();
      this.totals = this._service.getTotals();
      this.providers.push(this.directContractors)

      this.dataSource = new MatTableDataSource(this.providers)
      this.sortedData = this.providers.slice();
  }
  sortProviders(sort: Sort) {
    
    const data = this.providers.slice();
    if (!sort.active || sort.direction === '') {
       this.sortedData = data;
       return;
    }
    this.sortColumn = sort.active;
    this.sortedData = data.sort((a, b) => {
       const isAsc = sort.direction === 'asc';
       switch (sort.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          case 'workerCount': return compare(a.workerCount, b.workerCount, isAsc);
          case 'complianceStats': return compare(a.complianceStats !== null ? a.complianceStats.Total : 0, b.complianceStats !== null ? b.complianceStats.Total : 0, isAsc);
          case 'grossPayTotal': return compare(a.grossPayTotal, b.grossPayTotal, isAsc);
          case 'payrollAdminTotal': return compare(a.payrollAdminTotal, b.payrollAdminTotal, isAsc);
          case 'labourCostTotal': return compare(a.labourCostTotal, b.labourCostTotal, isAsc);
          case 'workForce': return compare(a.workerCount, b.workerCount, isAsc);

          default: return 0;
       }});
    if(sort.active === 'name'){
      this.reorderDirectContract(true)
    }
  }
  reorderDirectContract (setFirst: boolean = false){
    let old_index : number = 0
    if(setFirst){
      for ( let i = 0; i < this.sortedData.length; i++){
        if(this.sortedData[i].providerId === 0){
          old_index = i;
          break;
        }
      }
      this.sortedData.splice(0,0,this.sortedData[old_index])
    }
  }
 
  ngOnInit(): void {
    //let providers  = this.service.getProviders()
    //this.dataSource = new MatTableDataSource(providers)

  }

  //// GET TOTALS///
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
  //////
  boldColumn(column: string) : any {
    return this.sortColumn === column ? {'font-weight':'bold'} : {'font-weight':''};
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}