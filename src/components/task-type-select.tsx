import { useTaskTypes } from '@/utils/task-type'
import IdSelect from './id-select'

const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props} />
}

export default TaskTypeSelect
