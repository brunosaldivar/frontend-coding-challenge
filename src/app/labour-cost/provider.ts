export interface ComplianceStat {
    OpsEmpStatusChecked : number;
    Total: number;
    TaxStatus: number;
    Identification: number;
    RightToWork: number;  
    OpsChecked: number;
    Contract: number;
    EmpStatusReview: number;
  }

  export interface Provider {
    rebatesTotal: number;
    grossPayTotal: number;
    workerCount: number;
    complianceStats: ComplianceStat | null;
    payrollAdminTotal : number;
    labourCostTotal: number;
    providerId: number;
    name :string;
  }
  export interface ResponseDataProviders {
    providers: Provider[],
    total : Provider[],
    directContractors  : Provider[]
  } 
   export interface DataProviders {
    providers: Provider[],
    totals : Provider,
    directContractor  : Provider
  }