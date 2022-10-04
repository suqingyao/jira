import { ErrorBox } from '@/components/lib'
import { useAddEpic } from '@/utils/epic'
import styled from '@emotion/styled'
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useProjectIdInUrl } from '../board/util'
import { useEpicsQueryKey } from './util'

const CreateEpic = (
  props: Pick<DrawerProps, 'open'> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey())
  const [form] = useForm()
  const projectId = useProjectIdInUrl()
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId })
    props.onClose()
  }

  useEffect(() => {
    form.resetFields()
  }, [form, props.open])

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              onFinish={onFinish}
              layout={'vertical'}
              style={{ width: '40rem' }}
            >
              <Form.Item
                label={'名称'}
                name={'name'}
                rules={[{ required: true, message: '请输入任务组名' }]}
              >
                <Input placeholder={'请输入任务组名称'} />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={isLoading}
                  type={'primary'}
                  htmlType={'submit'}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        <Button onClick={close}>关闭</Button>
      </Container>
    </Drawer>
  )
}

export default CreateEpic

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
