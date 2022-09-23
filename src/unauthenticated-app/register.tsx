import { useAuth } from '@/context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from '.'
const RegisterScreen = () => {
  const auth = useAuth()

  if (auth instanceof Error) {
    console.log(auth)
    return
  }

  const handleSubmit = (values: { username: string; password: string }) => {
    auth.register(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" type="text" />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder="密码" type="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="ghost">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default RegisterScreen
