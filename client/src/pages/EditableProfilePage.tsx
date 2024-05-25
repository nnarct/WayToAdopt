import React from "react";
import { Form, Input, Button, DatePicker, Radio, Row, Col, Space } from "antd";
import dayjs from "dayjs";

interface User {
    firstName: string;
    lastName: string;
    tel: string;
    email: string;
    dob: number;
    sex: number;
  }
  
  interface EditableProfileFormProps {
    user: User;
    onSave: (values: any) => void;
    onCancel: () => void;
    className?: string; // เพิ่ม props className
  }
  
  const EditableProfilePage: React.FC<EditableProfileFormProps> = ({ user, onSave, onCancel, className }) => {
    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      onSave(values);
    };
  
    const validateMessages = {
      required: '${label} จำเป็นต้องใส่',
      types: {
        email: '${label} นี้ ไม่ถูกต้อง',
      },
    };
  
    const validatePhoneNumber = (rule: any, value: any) => {
      if (!value) {
        return Promise.reject('เบอร์โทรศัพท์จำเป็นต้องใส่');
      } else if (!/^\d{10}$/.test(value)) {
        return Promise.reject('เบอร์โทรศัพท์ต้องเป็นเลข 10 หลัก');
      } else {
        return Promise.resolve();
      }
    };
  
    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...user,
          dob: dayjs(user.dob * 1000), // Convert to dayjs object
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        className={className} // เพิ่ม className ใน form
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="firstName" label="ชื่อจริง" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" label="นามสกุล" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dob" label="วันเกิด (ค.ศ.)" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sex" label="เพศ" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value={0}>ชาย</Radio>
                <Radio value={1}>หญิง</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tel"
              label="เบอร์โทรศัพท์"
              rules={[{ validator: validatePhoneNumber }]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
            <Button onClick={onCancel}>ยกเลิก</Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };

export default EditableProfilePage;
