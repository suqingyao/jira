import { Link, Outlet } from 'react-router-dom'

const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'board'}>看板</Link>
      <Link to={'task'}>任务组</Link>
      <Outlet />
    </div>
  )
}

export default ProjectScreen
