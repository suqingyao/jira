import { useAuth } from '@/context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from '.'

interface LoginForm {
  username: string
  password: string
}

const LoginScreen = () => {
  const { login } = useAuth()

  const handleSubmit = ({ username, password }: LoginForm) => {
    login({ username, password })
  }
  const formRules = {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={formRules.username}>
        <Input placeholder="用户名" type="text" />
      </Form.Item>
      <Form.Item name={'password'} rules={formRules.password}>
        <Input placeholder="密码" type="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default LoginScreen
