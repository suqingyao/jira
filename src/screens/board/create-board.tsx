import { useAddBoard } from '@/utils/board'
import { Input } from 'antd'
import { useState } from 'react'
import { Container } from './board-item'
import { useBoardsQueryKey, useProjectIdInUrl } from './util'

const CreateBoard = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addBoard } = useAddBoard(useBoardsQueryKey())
  const submit = async () => {
    await addBoard({ name, projectId })
    setName('')
  }
  return (
    <Container>
      <Input
        size={'large'}
        placeholder={'新建看板名称'}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Container>
  )
}

export default CreateBoard
