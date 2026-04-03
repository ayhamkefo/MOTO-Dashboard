import type {
  CreateEmployeeRequest,
  EmployeeAccessPreview,
  EmployeeRole,
  EmployeeRoleOption,
  PreparedEmployeeAccount,
} from '../models/employee.types'
import type { CreateEmployeeFormValues } from '../models/create-employee.schema'

export const employeeRoleValues = ['admin', 'user'] as const

export const DEFAULT_EMPLOYEE_ROLE: EmployeeRole = 'user'

export const EMPLOYEE_ROLE_OPTIONS: EmployeeRoleOption[] = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full permissions for employee management, catalog control, and operational oversight.',
  },
  {
    value: 'user',
    label: 'User',
    description: 'Standard employee access for normal day-to-day store work without admin-level permissions.',
  },
]

const roleToneMap: Record<EmployeeRole, 'info' | 'success'> = {
  admin: 'info',
  user: 'success',
}

const roleScopeMap: Record<EmployeeRole, string[]> = {
  admin: [
    'Full permissions across employee accounts and dashboard administration.',
    'Suitable for managing catalog workflows, operational settings, and store oversight.',
    'Use when the account should be able to configure and supervise the system.',
  ],
  user: [
    'Standard employee access for regular store operations.',
    'Suitable for everyday inventory, sales, and customer-facing workflows.',
    'Keeps normal work available without administrative permissions.',
  ],
}

function getRoleOption(role: EmployeeRole) {
  return (
    EMPLOYEE_ROLE_OPTIONS.find((option) => option.value === role) ??
    EMPLOYEE_ROLE_OPTIONS[0]
  )
}

function getPasswordStrength(password: string): {
  label: 'Needs work' | 'Good' | 'Strong'
  tone: 'neutral' | 'warning' | 'success'
  guidance: string
} {
  const trimmedPassword = password.trim()

  if (!trimmedPassword) {
    return {
      label: 'Needs work',
      tone: 'neutral',
      guidance: 'Start with a password that combines letters and numbers.',
    }
  }

  const score =
    Number(trimmedPassword.length >= 8) +
    Number(/[a-z]/i.test(trimmedPassword)) +
    Number(/[0-9]/.test(trimmedPassword)) +
    Number(/[^a-zA-Z0-9]/.test(trimmedPassword)) +
    Number(trimmedPassword.length >= 12)

  if (score >= 4) {
    return {
      label: 'Strong',
      tone: 'success',
      guidance: 'This password looks ready for production use.',
    }
  }

  if (score >= 3) {
    return {
      label: 'Good',
      tone: 'warning',
      guidance: 'Consider adding a symbol or a few extra characters.',
    }
  }

  return {
    label: 'Needs work',
    tone: 'neutral',
    guidance: 'Add more length or variation before creating the account.',
  }
}

export function mapCreateEmployeeFormToRequest(
  values: CreateEmployeeFormValues,
): CreateEmployeeRequest {
  return {
    username: values.username.trim(),
    password: values.password,
    role: values.role,
  }
}

export function buildEmployeeAccessPreview(
  values: CreateEmployeeRequest,
): EmployeeAccessPreview {
  const roleOption = getRoleOption(values.role)
  const passwordStrength = getPasswordStrength(values.password)

  return {
    usernameLabel: values.username || 'New employee username',
    roleLabel: roleOption.label,
    roleDescription: roleOption.description,
    roleTone: roleToneMap[values.role],
    passwordStrengthLabel: passwordStrength.label,
    passwordStrengthTone: passwordStrength.tone,
    passwordGuidance: passwordStrength.guidance,
    accessScope: roleScopeMap[values.role],
  }
}

export function buildPreparedEmployeeAccount(
  values: CreateEmployeeRequest,
): PreparedEmployeeAccount {
  const roleOption = getRoleOption(values.role)
  const passwordStrength = getPasswordStrength(values.password)

  return {
    username: values.username,
    roleLabel: roleOption.label,
    roleTone: roleToneMap[values.role],
    passwordStrengthLabel: passwordStrength.label,
    summary: `${roleOption.label} access is staged with a ${passwordStrength.label.toLowerCase()} password setup.`,
  }
}
