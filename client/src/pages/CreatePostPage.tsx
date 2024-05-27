import { Card, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;
const CreatePostPage = () => {
  const props: UploadProps = {
    name: "file",
    accept: "image/*",
    action: "",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    
  };
  return (
    <>
      <Typography.Title level={2}>สร้างโพสต์ใหม่</Typography.Title>
      <div className="sm:grid sm:grid-cols-3 gap-4">
        <div>
          {" "}
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">เลือกไฟล์รูปภาพ</p>
            <p className="ant-upload-hint">
              เฉพาะ (.jpeg .jpg หรือ .png เท่านั้น){" "}
            </p>
          </Dragger>
        </div>
        <div className="sm:col-span-2"><Card>sad</Card></div>
      </div>
    </>
  );
};

export default CreatePostPage;
