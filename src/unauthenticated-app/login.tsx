import { useAuth } from '@/context/auth-context'
import { useAsync } from '@/utils/useAsync'
import { Form, Input } from 'antd'
import { LongButton } from '.'

interface LoginForm {
  username: string
  password: string
}

interface LoginScreenProps {
  onError: (err: Error) => void
}

const LoginScreen = ({ onError }: LoginScreenProps) => {
  const { login } = useAuth()

  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async (values: LoginForm) => {
    try {
      await run(login(values))
    } catch (error) {
      onError(error)
    }
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
        <Input placeholder="用户名" type="text" allowClear />
      </Form.Item>
      <Form.Item name={'password'} rules={formRules.password}>
        <Input placeholder="密码" type="password" allowClear />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default LoginScreen
