export type EmployeeRole = 'admin' | 'user'

export interface EmployeeRoleOption {
  value: EmployeeRole
  label: string
  description: string
}

export interface CreateEmployeeRequest {
  username: string
  password: string
  role: EmployeeRole
}

export interface CreateEmployeeResponse {
  id: string
  username: string
  role: EmployeeRole
  createdAt: string
}

export interface EmployeeAccessPreview {
  usernameLabel: string
  roleLabel: string
  roleDescription: string
  roleTone: 'info' | 'success'
  passwordStrengthLabel: string
  passwordStrengthTone: 'neutral' | 'warning' | 'success'
  passwordGuidance: string
  accessScope: string[]
}

export interface PreparedEmployeeAccount {
  username: string
  roleLabel: string
  roleTone: 'info' | 'success'
  passwordStrengthLabel: string
  summary: string
}
