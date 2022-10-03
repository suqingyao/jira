import { useAddTask } from '@/utils/task'
import { Card, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useProjectIdInUrl, useTasksQueryKey } from './util'

const CreateTask = ({ boardId }: { boardId: number }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)
  const submit = async () => {
    await addTask({ projectId, name, boardId })
    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode(mode => !mode)
  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'需要做些什么'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Card>
  )
}

export default CreateTask
