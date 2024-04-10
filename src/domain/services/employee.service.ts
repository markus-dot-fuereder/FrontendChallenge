import EmployeeDatasource from "@/data/datasources/employee.datasource";
import EmployeeDatasourceContract from "../contracts/employeeDatasource.contract";
import { EmployeeListModel, EmployeeModel } from "../models/employee.model";
import {
  CreateEmployeeParams,
  DeleteEmployeeByIdParams,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "../params/employee.param";

export default class EmployeeService {
  private static _instance: EmployeeService;
  public static getInstance(): EmployeeService {
    if (!EmployeeService._instance) {
      EmployeeService._instance = new EmployeeService();
    }
    return EmployeeService._instance;
  }

  private constructor(
    private datasource: EmployeeDatasourceContract = new EmployeeDatasource()
  ) {}

  public getEmployeeList(): Promise<EmployeeListModel | undefined> {
    return this.datasource.getEmployeeList();
  }

  public createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.createEmployee(params);
  }

  public getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.getEmployeeById(params);
  }

  public updateEmployeeById(
    params: UpdateEmployeeParams
  ): Promise<EmployeeModel | undefined> {
    return this.datasource.updateEmployeeById(params);
  }

  public deleteEmployeeById(
    params: DeleteEmployeeByIdParams
  ): Promise<boolean> {
    return this.datasource.deleteEmployeeById(params);
  }
}
