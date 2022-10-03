import bugIcon from '@/assets/bug.svg'
import taskIcon from '@/assets/task.svg'
import { Board } from '@/types/board'
import { useTasks } from '@/utils/task'
import { useTaskTypes } from '@/utils/task-type'
import styled from '@emotion/styled'
import { Card } from 'antd'
import { useTaskSearchParams } from './util'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return <img src={name === 'task' ? taskIcon : bugIcon} />
}

const BoardItem = ({ board }: { board: Board }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter(task => task.boardId === board.id)
  return (
    <Container>
      <h3>{board.name}</h3>
      <TasksContainer>
        {tasks?.map(task => (
          <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  )
}

export default BoardItem

const Container = styled.div`
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
