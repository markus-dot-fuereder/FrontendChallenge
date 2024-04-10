import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployeeById = ({ id }: DeleteEmployeeByIdParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_ = undefined) => {
      const success = await service.deleteEmployeeById({ id });
      if (!success) {
        throw Error();
      }
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeById", id] });
    },
  });
};
