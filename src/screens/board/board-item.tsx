import bugIcon from '@/assets/bug.svg'
import taskIcon from '@/assets/task.svg'
import { Row } from '@/components/lib'
import Mark from '@/components/mark'
import { Board } from '@/types/board'
import { Task } from '@/types/task'
import { useDeleteBoard } from '@/utils/board'
import { useTasks } from '@/utils/task'
import { useTaskTypes } from '@/utils/task-type'
import styled from '@emotion/styled'
import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import CreateTask from './create-task'
import { useBoardsQueryKey, useTaskSearchParams, useTasksModal } from './util'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <img src={name === 'task' ? taskIcon : bugIcon} alt="task-icon" />
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTaskSearchParams()
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

const More = ({ board }: { board: Board }) => {
  const { mutateAsync: deleteBoard } = useDeleteBoard(useBoardsQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        return deleteBoard({ id: board.id })
      }
    })
  }
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} onClick={startEdit}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  )
}

const BoardItem = ({ board }: { board: Board }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter(task => task.boardId === board.id)
  return (
    <Container>
      <Row between={true}>
        <h3>{board.name}</h3>
        <More board={board} />
      </Row>
      <TasksContainer>
        {tasks?.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask boardId={board.id} />
      </TasksContainer>
    </Container>
  )
}

export default BoardItem

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
