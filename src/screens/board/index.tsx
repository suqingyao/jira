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
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {boards?.map(board => (
        <BoardItemContainer key={board.id}>
          <BoardItem board={board} />
        </BoardItemContainer>
      ))}
    </div>
  )
}

export default BoardScreen

const BoardItemContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
