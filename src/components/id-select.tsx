import { Raw } from '@/types'
import { Select } from 'antd'

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'options' | 'onChange'> {
  value: Raw | undefined | null
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: {
    name: string
    id: number
  }[]
}

const IdSelect = ({
  value,
  onChange,
  defaultOptionName,
  options,
  ...restProps
}: IdSelectProps) => {
  return (
    <Select
      value={toNumber(value)}
      onChange={value => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map(option => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default IdSelect

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
