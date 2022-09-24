import { User } from './search-panel'
import { Table } from 'antd'
import dayjs from 'dayjs'
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
  created: number
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
          key: 'organization',
          title: '部门',
          dataIndex: 'organization'
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
        },
        {
          key: 'created',
          title: '创建时间',
          render(value, project) {
            console.log(value)

            return (
              <span>
                {project.created ?? dayjs(project.created).format('YYYY-MM-DD')}
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
