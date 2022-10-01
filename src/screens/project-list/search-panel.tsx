import UserSelect from '@/components/user-select'
import { Form, Input } from 'antd'
import { Project } from './list'
interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          onChange={evt => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={value => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
