import { z } from "zod";
import {
  EmployeeAgeSchema,
  EmployeeIdSchema,
  EmployeeNameSchema,
  EmployeeProfileImageSchema,
  EmployeeSalarySchema,
} from "../models/employee.model";

// ID
export const EmployeeByIdSchema = z.object({
  id: EmployeeIdSchema.optional(),
});
export type EmployeeByIdParams = z.infer<typeof EmployeeByIdSchema>;

// CREATE
export const CreateEmployeeDataSchema = z.object({
  name: EmployeeNameSchema,
});
export type CreateEmployeeDataParams = z.infer<typeof CreateEmployeeDataSchema>;

export const CreateEmployeeSchema = z.object({
  data: CreateEmployeeDataSchema,
});
export type CreateEmployeeParams = z.infer<typeof CreateEmployeeSchema>;

// GET
export const GetEmployeeByIdSchema = EmployeeByIdSchema;
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;

// UPDATE
export const UpdateEmployeeDataSchema = z.object({
  name: EmployeeNameSchema,
  salary: EmployeeSalarySchema,
  age: EmployeeAgeSchema,
  profile_image: EmployeeProfileImageSchema,
});
export type UpdateEmployeeDataParams = z.infer<typeof UpdateEmployeeDataSchema>;

export const UpdateEmployeeSchema = z
  .object({
    data: UpdateEmployeeDataSchema,
  })
  .merge(EmployeeByIdSchema);
export type UpdateEmployeeParams = z.infer<typeof UpdateEmployeeSchema>;

// DELETE
export const DeleteEmployeeByIdSchema = EmployeeByIdSchema;
export type DeleteEmployeeByIdParams = z.infer<typeof DeleteEmployeeByIdSchema>;
