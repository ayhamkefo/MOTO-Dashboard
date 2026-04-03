import type {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
} from '../models/employee.types'

export const employeesKeys = {
  all: ['employees'] as const,
  create: () => [...employeesKeys.all, 'create'] as const,
}

export interface EmployeesApiContract {
  createEmployee: (
    payload: CreateEmployeeRequest,
  ) => Promise<CreateEmployeeResponse>
}
