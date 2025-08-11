import React, { FC, useEffect } from "react";
import {
  MoneyCollectFilled,
  CheckCircleFilled,
  ClockCircleFilled,
} from "@ant-design/icons";
import { Card, Col, Row, Typography, Progress } from "antd";
import { useTheme } from "@/contexts/themeContext";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  data: any;
  link?: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  id,
  title,
  icon = <MoneyCollectFilled style={{ fontSize: "50px" }} />,
  data,
  link,
}) => {
  const { theme: currentTheme } = useTheme();

  const [detail, setDetail] = React.useState<any>(null);

  useEffect(() => {
    if (data) {
      const tempData = [
        {
          title: "Progress",
          value: data?.pending,
          icon: <ClockCircleFilled />,
          color: "#f5bf36",
        },
        {
          title: "Completed",
          value: data?.completed,
          icon: <CheckCircleFilled />,
          color: "#4caf50",
        },
      ];
      setDetail(tempData);
    }
  }, [data]);

  const navigate = useNavigate();

  return (
    <Card
      style={{
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        background: currentTheme === "dark" ? "#1F1F1F" : "#FFFFFF",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
      }}
      onClick={() => {
        console.log("Clicked", data);
        navigate(link || "");
      }}
      hoverable
    >
      <Row align="middle" gutter={[16, 16]}>
        <Col xs={16}>
          <Typography.Paragraph
            style={{
              margin: 0,
              color: currentTheme === "dark" ? "#FFFFFF" : "#003862",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography.Paragraph>
          <Typography.Title
            level={2}
            style={{
              margin: "0.5rem 0",
              color: currentTheme === "dark" ? "#E0E0E0" : "#003862",
              fontWeight: 700,
            }}
          >
            {data.total}
          </Typography.Title>
        </Col>
        <Col
          xs={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {React.cloneElement(icon as React.ReactElement, {
            style: {
              ...(icon as React.ReactElement).props.style,
              color: currentTheme === "dark" ? "#FFFFFF" : "#003862",
              fontSize: "60px",
            },
          })}
        </Col>
      </Row>
      <div
        style={{
          height: "1px",
          background: currentTheme === "dark" ? "#444" : "#E0E0E0",
          margin: "1rem 0",
        }}
      />
      {id != "tax_application_count" && (
        <Row gutter={[16, 16]}>
          {detail?.map((item: any, index: number) => (
            <Col key={index} xs={12}>
              <Row align="middle">
                <Col
                  flex="auto"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {React.cloneElement(item.icon as React.ReactElement, {
                    style: {
                      ...(icon as React.ReactElement).props.style,
                      color: item.color,
                      fontSize: "18px",
                    },
                  })}
                  <Typography.Text
                    style={{
                      fontWeight: 600,
                      color: currentTheme === "dark" ? "#FFFFFF" : "#475569",
                    }}
                  >
                    {item.title}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text
                    style={{
                      fontWeight: 700,
                      color: item.color,
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.value}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
};

export default DashboardCard;
