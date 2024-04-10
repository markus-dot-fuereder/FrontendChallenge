import { useQuery } from "@tanstack/react-query";
import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = ({ id }: GetEmployeeByIdParams) => {
  return useQuery({
    queryKey: ["getEmployeeById", id],
    queryFn: () => service.getEmployeeById({ id }),
    enabled: !!id,
  });
};
