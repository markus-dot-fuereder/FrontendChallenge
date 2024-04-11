import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import {
  CreateEmployeeParams,
  DeleteEmployeeByIdParams,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees",
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    params: CreateEmployeeParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    if (!params?.id) {
      return undefined;
    }
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${params.id}`,
        { method: "GET" },
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: UpdateEmployeeParams,
  ): Promise<EmployeeModel | undefined> {
    if (!params?.id || !params.data) {
      return undefined;
    }
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(params.data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async deleteEmployeeById(
    params: DeleteEmployeeByIdParams,
  ): Promise<boolean> {
    if (!params?.id) {
      return false;
    }
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${params.id}`,
        { method: "DELETE" },
      );

      // Validate response
      if (response.status !== 200) {
        return false;
      }

      // Obtain json from response
      const json = await response.json();

      return json["status"] === "success";
    } catch (exception) {
      return false;
    }
  }
}
