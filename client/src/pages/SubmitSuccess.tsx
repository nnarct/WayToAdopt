import { SomethingWentWrong } from "@/components/shared/Result";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

// todo - verify only access this page from submission
const SubmitSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { message, postId } = location.state;

  if (!message) {
    return <SomethingWentWrong />;
  }
  // todo: verify that success really came from transaction

  return (
    <Result
      status="success"
      title={`${message}เรียบร้อยแล้ว!`}
      extra={[
        <Button
          onClick={() => navigate("/", { state: null })}
          type="primary"
          key="console"
        >
          กลับหน้าหลัก
        </Button>,
        postId ? (
          <Button
            onClick={() =>
              navigate(`/myposts/pdetail/${postId}`, { state: null })
            }
            key="go-to-post"
          >
            ไปที่โพสต์
          </Button>
        ) : null,
      ]}
    />
  );
};

export default SubmitSuccess;
