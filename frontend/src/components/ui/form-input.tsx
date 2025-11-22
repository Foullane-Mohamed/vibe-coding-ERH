import { forwardRef, useId } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
          {...props}
        />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
