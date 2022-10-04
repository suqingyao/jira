import Drop, { Drag, DropChild } from '@/components/drag-and-drop'
import { ScreenContainer } from '@/components/lib'
import { useDocumentTitle } from '@/utils'
import { useBoards, useReorderBoard } from '@/utils/board'
import { useReorderTask, useTasks } from '@/utils/task'
import styled from '@emotion/styled'
import { Spin } from 'antd'
import { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import BoardItem from './board-item'
import CreateBoard from './create-board'
import { SearchPanel } from './search-panel'
import TaskModal from './task-modal'
import {
  useBoardSearchParams,
  useBoardsQueryKey,
  useProjectInUrl,
  useTaskSearchParams,
  useTasksQueryKey
} from './util'

const BoardScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: boards, isLoading: boardIsLoading } = useBoards(
    useBoardSearchParams()
  )
  const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams())

  const isLoading = taskIsLoading || boardIsLoading

  const onDragEnd = useDragEnd()
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <BoardItemContainer>
            <Drop
              type={'COLUMN'}
              direction={'horizontal'}
              droppableId={'board'}
            >
              <DropChild style={{ display: 'flex' }}>
                {boards?.map((board, index) => (
                  <Drag
                    key={board.id}
                    draggableId={`board${board.id}`}
                    index={index}
                  >
                    <BoardItem board={board} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateBoard />
          </BoardItemContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

export default BoardScreen

export const BoardItemContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`

export const useDragEnd = () => {
  const { data: boards } = useBoards(useBoardSearchParams())
  const { mutate: reorderBoard } = useReorderBoard(useBoardsQueryKey())
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())
  const { data: allTasks = [] } = useTasks(useTaskSearchParams())
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return
      }
      if (type === 'COLUMN') {
        const fromId = boards?.[source.index].id
        const toId = boards?.[destination.index].id
        if (!fromId || !toId || fromId === toId) {
          return
        }
        const type = destination.index > source.index ? 'after' : 'before'
        reorderBoard({ fromId, referenceId: toId, type })
      }
      if (type === 'ROW') {
        const fromBoardId = +source.droppableId
        const toBoardId = +destination.droppableId
        if (fromBoardId === toBoardId) {
          return
        }
        const fromTask = allTasks.filter(task => task.boardId === fromBoardId)[
          source.index
        ]
        const toTask = allTasks.filter(task => task.boardId === toBoardId)[
          destination.index
        ]
        if (fromTask.id === toTask.id) {
          return
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromBoardId,
          toBoardId,
          type:
            fromBoardId === toBoardId && destination.index > source.index
              ? 'after'
              : 'before'
        })
      }
    },
    [boards, reorderBoard, allTasks, reorderTask]
  )
}
