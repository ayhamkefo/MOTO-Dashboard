import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import {
  createEmployeeSchema,
  type CreateEmployeeFormValues,
} from '../models/create-employee.schema'
import type {
  CreateEmployeeRequest,
  PreparedEmployeeAccount,
} from '../models/employee.types'
import {
  DEFAULT_EMPLOYEE_ROLE,
  EMPLOYEE_ROLE_OPTIONS,
  buildEmployeeAccessPreview,
  buildPreparedEmployeeAccount,
  mapCreateEmployeeFormToRequest,
} from '../utils/employee-ui'

const defaultValues: CreateEmployeeFormValues = {
  username: '',
  password: '',
  role: DEFAULT_EMPLOYEE_ROLE,
}

export function useCreateEmployeeForm() {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [lastPreparedEmployee, setLastPreparedEmployee] = useState<PreparedEmployeeAccount | null>(null)

  const form = useForm<CreateEmployeeFormValues>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues,
  })

  const watchedValues = useWatch({
    control: form.control,
  })

  const preview = useMemo(
    () =>
      buildEmployeeAccessPreview({
        username: watchedValues.username ?? '',
        password: watchedValues.password ?? '',
        role: watchedValues.role ?? DEFAULT_EMPLOYEE_ROLE,
      }),
    [watchedValues.password, watchedValues.role, watchedValues.username],
  )

  const resetForm = () => {
    form.reset(defaultValues)
    setSubmitMessage(null)
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    const payload: CreateEmployeeRequest = mapCreateEmployeeFormToRequest(values)

    setLastPreparedEmployee(buildPreparedEmployeeAccount(payload))
    setSubmitMessage(`Account details prepared for ${payload.username}.`)
    form.reset(defaultValues)
  })

  return {
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    lastPreparedEmployee,
    preview,
    resetForm,
    roleOptions: EMPLOYEE_ROLE_OPTIONS,
    submitMessage,
  }
}
