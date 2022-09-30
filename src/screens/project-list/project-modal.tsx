import { Button, Drawer } from 'antd'

interface ProjectModalProps {
  projectModalOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ projectModalOpen, onClose }: ProjectModalProps) => {
  return (
    <Drawer open={projectModalOpen} onClose={onClose} width={'100%'}>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  )
}

export default ProjectModal
