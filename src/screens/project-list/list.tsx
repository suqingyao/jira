import { User } from './search-panel'
import { Table } from 'antd'

interface ListProps {
  list: Project[]
  users: User[]
}

interface Project {
  id: string
  name: string
  personId: string
  pin: string
  organization: string
}

const List = ({ list, users }: ListProps) => {
  return (
    <Table
      columns={[
        {
          key: 'name',
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
          key: 'personId',
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find(user => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          }
        }
      ]}
      dataSource={list}
      pagination={false}
    ></Table>
  )
}

export default List
