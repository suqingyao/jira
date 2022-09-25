import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { User } from './search-panel'

interface ListProps extends TableProps<Project> {
  users: User[]
}

export interface Project {
  id: number
  name: string
  personId: number
  pin: string
  organization: string
  created: number
}

const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={'id'}
      columns={[
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
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
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : null}
              </span>
            )
          }
        }
      ]}
      pagination={false}
      {...props}
    ></Table>
  )
}

export default List
