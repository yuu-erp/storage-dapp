import classNames from 'classnames'
import React, { useEffect } from 'react'
import ReactSelect, {
  components,
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  Props
} from 'react-select'

const MoreSelectedBadge = ({ items }) => {
  const title = items.join(', ')
  const length = items.length
  const label = `+${length}`

  return (
    <p title={title} className='p-1 text-sm bg-background-700 rounded-sm'>
      {label}
    </p>
  )
}

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 1
  const overflow = getValue()
    .slice(maxToShow)
    .map((x: any) => x.label)

  return index < maxToShow ? (
    // @ts-ignore
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null
}

const Option: React.ComponentType<
  OptionProps<unknown, boolean, GroupBase<unknown>>
> = ({ innerRef, getValue, children, innerProps, ...props }) => {
  const { className, ...divProps } = innerProps

  return (
    <div
      ref={innerRef}
      className={classNames(
        'cursor-pointer relative px-3 py-2 transition duration-300 line-clamp-1 truncate',
        props.isFocused && 'bg-white/20 text-primary-300',
        className
      )}
      {...divProps}
    >
      {children}
    </div>
  )
}

interface SelectProps extends Props {
  isBody?: boolean
}
const SelectBase = React.forwardRef<any, SelectProps>(
  ({ isBody, components, styles, ...props }, ref) => {
    const [portalTarget, setPortalTarget] = React.useState<HTMLElement>()

    useEffect(() => {
      setPortalTarget(document.body)
    }, [])

    return (
      <ReactSelect
        ref={ref}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors
          }
        })}
        styles={{
          control: (provided: CSSObjectWithLabel) => {
            return {
              ...provided,
              backgroundColor: '#FFF',
              minWidth: '12rem',
              maxWidth: '100%'
            }
          },
          menu: (provided: CSSObjectWithLabel) => {
            return {
              ...provided,
              backgroundColor: '#FFF',
              borderRadius: '12px'
            }
          },
          menuPortal: (provided: CSSObjectWithLabel) => ({
            ...provided,
            zIndex: 9999
          }),
          singleValue: (provided: CSSObjectWithLabel) => {
            return { ...provided, color: '#000' }
          },
          multiValue: (provided: CSSObjectWithLabel) => {
            return {
              ...provided,
              backgroundColor: '#262626',
              maxWidth: '30%'
            }
          },
          multiValueLabel: (provided: CSSObjectWithLabel) => {
            return { ...provided, color: 'white' }
          },
          multiValueRemove: (provided: CSSObjectWithLabel) => {
            return {
              ...provided,
              color: 'gray',
              ':hover': {
                backgroundColor: 'transparent',
                color: 'white'
              },
              transition: 'all 300ms'
            }
          },

          input: (provided: CSSObjectWithLabel) => {
            return { ...provided, color: 'white' }
          },

          ...styles
        }}
        hideSelectedOptions={false}
        noOptionsMessage={() => 'No more options'}
        components={{ MultiValue, Option, ...components }}
        isClearable
        menuPortalTarget={isBody ? portalTarget : null}
        menuPlacement='auto'
        {...props}
      />
    )
  }
)

SelectBase.displayName = 'SelectBase'

export default React.memo(SelectBase)
