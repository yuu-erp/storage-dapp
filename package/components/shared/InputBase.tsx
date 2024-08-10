import classNames from 'classnames'
import React, { InputHTMLAttributes, ReactNode } from 'react'

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode
  right?: ReactNode
  classInput?: string
}
const InputBase = React.memo(
  ({ left, right, classInput, className, ...props }: InputBaseProps) => {
    return (
      <div className={classNames('flex items-center gap-3', className)}>
        {left}
        <input
          {...props}
          className={classNames(
            'py-3 bg-transparent focus:outline-none w-full',
            classInput
          )}
        />
        {right}
      </div>
    )
  }
)

export default InputBase
