import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { pathNames } from "@/assets/translate";


const ContentCard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split("/").filter((segment) => segment !== ""); // Filter out empty segments

  const items = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    if (index === segments.length - 1) {
      return {
        title: pathNames[segment],
      };
    }
    return {
      title: <Link to={path}>{pathNames[segment]}</Link>,
    };
  });
  items.unshift({ title: <Link to="/">หน้าหลัก</Link> });

  return (
    <div>
      <Breadcrumb items={items} />
      {children}
    </div>
  );
};

export default ContentCard;
