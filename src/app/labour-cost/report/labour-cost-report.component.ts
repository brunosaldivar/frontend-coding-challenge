import {OnInit, Component } from '@angular/core';
import { Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LabourCostService } from '../labour-cost.service';
import { DataProviders, Provider, ResponseDataProviders } from '../provider';


@Component({
  selector: 'app-labour-cost-report',
  templateUrl: './labour-cost-report.component.html',
  styleUrls: ['./labour-cost-report.component.css']
})
export class LabourCostReportComponent implements OnInit {

  displayedColumns!: string[]
  dataSource!: MatTableDataSource<Provider>;
  data!: DataProviders;
  sortedData!: Provider[];
  sortColumn : String;
  title: String;
  
  constructor( private service: LabourCostService) { 
      //set columns to display
      this.displayedColumns = ['name', 'workerCount', 'complianceStats', 'grossPayTotal', 'payrollAdminTotal','labourCostTotal','workForce'];
      this.sortColumn = ""
      this.title = 'Labour cost report';
  }
  
  getData(): void{
    this.service.getData().subscribe((data: ResponseDataProviders) => {
      this.data = this.toSingleObject(data);
      //push DC
      this.data.providers.push(this.data.directContractor)
      //
      this.dataSource = new MatTableDataSource(this.data.providers);
      this.sortedData = this.data.providers.slice();
    });
  }
  toSingleObject(data : ResponseDataProviders): DataProviders{
    return {
      providers : data.providers,
      totals : data.total[0],
      directContractor : data.directContractors[0]
    }
  }
  ngOnInit(): void {
    this.getData();    
  }
  //// GET TOTALS///
  getTotalWorkers(): number {
    return this.data.totals.workerCount;
  }
  getTotalScore(): number {
    return (this.data.totals.complianceStats !== null ? this.data.totals.complianceStats.Total / 100: 0);
  }
  getTotalGrossPay(): number {
    return this.data.totals.grossPayTotal;
  }
  getTotalPayrollAdmin()  {
    return this.data.totals.payrollAdminTotal  === 0 ? '-' : this.data.totals.payrollAdminTotal;
  }
  getTotalLabourCost(): number {
    return this.data.totals.labourCostTotal;
  }
  getTotalWorkForce(): number {
    return this.data.totals.workerCount;
  }
  ////// bold for columns sorted
  boldColumn(column: string) : any {
    return this.sortColumn === column ? {'font-weight':'bold'} : {'font-weight':''};
  }

  /// SORTS METHODS //////////
  sortProviders(sort: Sort) {
    const _data = this.data.providers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = _data;
      return;
    }
    this.sortColumn = sort.active;
    this.sortedData = _data.sort((a, b) => {
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
        }
      }
      let elem = this.sortedData.splice(old_index,1)
      this.sortedData.unshift(this.data.directContractor)
    }
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}