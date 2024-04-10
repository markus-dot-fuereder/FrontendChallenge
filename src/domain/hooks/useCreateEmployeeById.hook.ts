import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEmployeeDataParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployeeById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeDataParams) => {
      return service.createEmployee({ data });
    },
    onSuccess: (result) => {
      if (result?.id) {
        queryClient.setQueryData(["getEmployeeById", result.id], result);
      }
    },
  });
};
