import { ScreenContainer } from '@/components/lib'
import { useDocumentTitle } from '@/utils'
import { useBoards } from '@/utils/board'
import { useTasks } from '@/utils/task'
import styled from '@emotion/styled'
import { Spin } from 'antd'
import BoardItem from './board-item'
import CreateBoard from './create-board'
import { SearchPanel } from './search-panel'
import TaskModal from './task-modal'
import {
  useBoardSearchParams,
  useProjectInUrl,
  useTaskSearchParams
} from './util'

const BoardScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: boards, isLoading: boardIsLoading } = useBoards(
    useBoardSearchParams()
  )
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams())

  const isLoading = taskIsLoading || boardIsLoading
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <BoardItemContainer>
          {boards?.map(board => (
            <BoardItem board={board} key={board.id} />
          ))}
          <CreateBoard />
        </BoardItemContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  )
}

export default BoardScreen

export const BoardItemContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
