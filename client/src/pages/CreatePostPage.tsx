import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  Select,
  Typography,
  notification,
} from "antd";

import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import ImageDragger from "@/components/features/myPosts/ImageDragger";
import { ImageDraggerPhotoType } from "@/assets/types";
import dayjs from "dayjs";
import useGetPetTypes from "@/hooks/useGetPetTypes";
import useCreatePost from "@/hooks/post/useCreatePost";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CreatePostPage = () => {
  const { mutate, isLoading } = useCreatePost();

  const [photo, setPhoto] = useState<ImageDraggerPhotoType>({
    file: null,
    filename: "",
    image: "",
  });
  const [createForm] = useForm();
  const handleConfirm = async (values) => {
    if (photo.file === null) {
      notification.error({ message: "Please Add Photo" });
      return;
    }
    const epoch = values.petDob.valueOf();
    values.petDob = epoch;
    if (photo.file !== null) mutate({ file: photo.file, post: values });
  };

  const { data: petTypes } = useGetPetTypes();

  return (
    <>
      <Typography.Title level={2}>สร้างโพสต์ใหม่</Typography.Title>
      <div className="sm:grid sm:grid-cols-3 gap-4">
        <ImageDragger photo={photo} setPhoto={setPhoto} />
        <div className="sm:col-span-2">
          <Card>
            <Form
              layout="vertical"
              form={createForm}
              onFinish={handleConfirm}
              className="grid grid-cols-2 gap-x-4"
            >
              <Form.Item
                name="postTitle"
                label="หัวข้อประกาศ"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Input placeholder="หัวข้อประกาศ" />
              </Form.Item>
              <Form.Item
                name="petType"
                label="ประเภทสัตว์เลี้ยง"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Select placeholder="ประเภทสัตว์เลี้ยง">
                  {petTypes?.map((petType: { id: string; name: string }) => (
                    <Select.Option key={petType.id} value={petType.id}>
                      {petType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="พันธุ์สัตว์เลี้ยง"
                name="petBreed"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Input placeholder="พันธุ์สัตว์เลี้ยง" />
              </Form.Item>

              <Form.Item
                label="เพศของสัตว์"
                name="petGender"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Select placeholder="เพศของสัตว์">
                  <Select.Option value={0}>ตัวผู้</Select.Option>
                  <Select.Option value={1}>ตัวเมีย</Select.Option>
                  <Select.Option value={2}>ไม่ทราบเพศ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ flex: 1 }}
                label="วันเกิด"
                name="petDob"
                rules={[{ required: true }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  maxDate={dayjs()}
                  minDate={dayjs().subtract(40, "year")}
                  format="DD MMM YYYY"
                  placeholder="DD MMM YYYY"
                />
              </Form.Item>
              <Form.Item
                label="การรับการฉีดวัคซีน"
                name="petVaccinated"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Select placeholder="การรับการฉีดวัคซีน">
                  <Select.Option value={0}>ยังไม่ได้ฉีดวัคซีน</Select.Option>
                  <Select.Option value={1}>ฉีดวัคซีนแล้ว</Select.Option>
                  <Select.Option value={2}>ไม่ทราบ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="การทำหมัน"
                name="petSterilized"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Select placeholder="การทำหมัน">
                  <Select.Option value={0}>ยังไม่ได้ทำหมัน</Select.Option>
                  <Select.Option value={1}>ทำหมันแล้ว</Select.Option>
                  <Select.Option value={2}>ไม่ทราบ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="การหย่านม"
                name="petWean"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Select placeholder="การหย่านม">
                  <Select.Option value={0}>ยังไม่หย่านม</Select.Option>
                  <Select.Option value={1}>หย่านมแล้ว</Select.Option>
                  <Select.Option value={2}>ไม่ทราบ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="การฝึกฝนการขับถ่าย"
                name="petHouseBreaking"
                rules={[{ required: true, message: "โปรดเติมข้อมูล" }]}
              >
                <Select placeholder="การฝึกฝนการขับถ่าย">
                  <Select.Option value={0}>ขับถ่ายไม่เป็นที่</Select.Option>
                  <Select.Option value={1}>ขับถ่ายเป็นที่</Select.Option>
                  <Select.Option value={2}>ไม่ทราบ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="postDescription" label="รายละเอียดเพิ่มเติม">
                <Input placeholder="รายละเอียดเพิ่มเติม" />
              </Form.Item>
              <div className="col-span-2">
                <Form.List
                  name="questions"
                  initialValue={[{}]}
                  rules={[
                    {
                      validator: async (_, questions) => {
                        if (!questions || questions.length < 1) {
                          return Promise.reject(
                            new Error("โปรดใส่อย่างต่ำ 1 คำถาม")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          label={index === 0 ? "คำถาม" : ""}
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            key={field.key}
                            // validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  fields.length > 1
                                    ? "โปรดระบุคำถาม หรือลบคำถามนี้"
                                    : "โปรดระบุคำถาม",
                              },
                            ]}
                            noStyle
                          >
                            <Flex gap={4}>
                              <Input placeholder={`คำถามที่ ${index}`} />{" "}
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Flex>
                          </Form.Item>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: "100%" }}
                          icon={<PlusOutlined />}
                        >
                          เพิ่มคำถาม
                        </Button>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
              <Button
                htmlType="submit"
                type="primary"
                className="col-end-3"
                loading={isLoading}
              >
                สร้างโพสต์
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
