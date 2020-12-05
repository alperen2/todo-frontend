import { List, Col, Row, Typography, Button, Input, Form } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Content, Header } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import './App.css';
import { useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';

const { Title } = Typography;

const data = [
  {
    id: 1,
    title: "UI design ile ilgiili araştırma yap",
    brief: "Uzun hikaye kardeş",
    deadline: "20.12.2021",
    completed: false,
  },
  {
    id: 2,
    title: "Backend için symfony araştır",
    brief: "Uzun hikaye kardeş",
    deadline: "20.12.2021",
    completed: false,
  },
  {
    id: 3,
    title: "Aöf sınavlarına girmeyi unutma",
    brief: "Uzun hikaye kardeş",
    deadline: "20.12.2021",
    completed: false,
  },
  {
    id: 4,
    title: "Udemy kursalarına göz at",
    brief: "Uzun hikaye kardeş",
    deadline: "20.12.2021",
    completed: true,
  },
]

function App() {
  const [tasks, setTasks] = useState(data);


  return (
    <>
      <Header />
      <Content style={{ marginTop: 10, padding: 20 }}>
        <Row>
          <Col span={14} offset={5}>
            <Tasks tasks={tasks} />
          </Col>
        </Row>
      </Content>
    </>
  );
}

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.tasks)
  const [modal, setModal] = useState(false);
  return <>
    {modal && <AddModal onClose={() => setModal(false)} />}
    <List
      header={
        <Row justify="space-between">
          <Col>
            <Title level={3}>Görevlerim</Title>
          </Col>
          <Col>
            <Button onClick={() => setModal(old => !old)} icon={<PlusOutlined />}>Yeni Görev</Button>
          </Col>
        </Row>
      }
      dataSource={tasks}
      bordered
      renderItem={item => (
        <ListItem task={item} />
      )}
    />
  </>
}

const ListItem = (props) => {
  const [task, setTask] = useState(props.task)
  const onChange = (e) => {
    setTask({ ...task, completed: !task.completed })
  }

  return <List.Item>
    <Checkbox
      value={task}
      className={task.completed && "completedTask"}
      checked={!!task.completed}
      onChange={onChange}
    >
      <Typography.Text>{task.title}</Typography.Text>
    </Checkbox>
  </List.Item>

}

const AddModal = (props) => {
  const [form] = Form.useForm()

  return <Modal
    title="Yeni görev ekle"
    okText="Ekle"
    cancelText="İptal"
    onCancel={() => props.onClose()}
    onOk={() => form.submit()}
    visible={true}
  >
    <Form layout="vertical" form={form} onFinish={(e) => console.log(e)}>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item name="title" label="Tanım" help="Görevinizi doğru tanımlamanız, bitirmenize yardımcı olacaktır." renderItem={e => {
            console.log(e)

          }}>

            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="brief" label="Açıklama">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Modal>
}
export default App;
