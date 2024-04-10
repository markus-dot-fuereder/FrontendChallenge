import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EmployeeByIdParams,
  UpdateEmployeeDataParams,
} from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployeeById = ({ id }: EmployeeByIdParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEmployeeDataParams) => {
      return service.updateEmployeeById({ id, data });
    },
    onSuccess: (result) => {
      const query = { queryKey: ["getEmployeeById", id] };
      if (result) {
        queryClient.setQueryData(query.queryKey, result);
      } else {
        queryClient.invalidateQueries(query);
      }
    },
  });
};
