import { ScreenContainer } from '@/components/lib'
import { useDocumentTitle } from '@/utils'
import { useBoards } from '@/utils/board'
import styled from '@emotion/styled'
import BoardItem from './board-item'
import { SearchPanel } from './search-panel'
import { useBoardSearchParams, useProjectInUrl } from './util'

const BoardScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: boards } = useBoards(useBoardSearchParams())
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {boards?.map(board => (
        <BoardItemContainer key={board.id}>
          <BoardItem board={board} />
        </BoardItemContainer>
      ))}
    </ScreenContainer>
  )
}

export default BoardScreen

const BoardItemContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
