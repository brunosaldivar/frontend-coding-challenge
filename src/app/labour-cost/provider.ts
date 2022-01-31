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
    totalWorkers : number;
  }
  