import { Image, Button, Flex, Upload, UploadProps } from "antd";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import { ImageDraggerPhotoType } from "@/assets/types";

const { Dragger } = Upload;

const ImageDragger = ({
  photo,
  setPhoto,
}: {
  photo: ImageDraggerPhotoType;
  setPhoto: React.Dispatch<React.SetStateAction<ImageDraggerPhotoType>>;
}) => {
  const props = {
    name: "photo",
    multiple: false,
    showUploadList: false,
    accept: "image/*",
    customRequest(data) {
      const image = URL.createObjectURL(data.file);
      const photoData: ImageDraggerPhotoType = {
        file: data.file,
        filename: data.filename,
        image,
      };
      setPhoto(photoData);
    },
  };
  return (
    <Dragger {...props} style={{ maxHeight: 400 }}>
      {photo.image.length === 0 ? (
        <Flex
          style={{ minHeight: 200 }}
          vertical
          align="center"
          justify="center"
        >
          <InboxOutlined style={{ fontSize: 56 }} />
          <p className="ant-upload-text">
            คลิกเพื่อเลือกไฟล์รูปภาพ หรือลากไฟล์มาที่นี่
          </p>
          <p className="ant-upload-hint">(.jpeg .jpg หรือ .png เท่านั้น)</p>
        </Flex>
      ) : (
        <>
          <div className="relative">
            <Button
              size="small"
              danger
              className="rounded-full right-0 z-10 absolute"
              icon={<CloseOutlined />}
              onClick={() => {
                setPhoto({ file: null, filename: "", image: "" });
              }}
            />
            <Image
              preview={false}
              src={photo.image}
              style={{ maxHeight: 400 }}
            />
          </div>
        </>
      )}
    </Dragger>
  );
};

export default ImageDragger;
