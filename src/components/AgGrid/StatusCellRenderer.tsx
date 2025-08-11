import { Tag } from "antd";

const StatusCellRenderer = (params: any) => {
    const { data } = params;
    const color = data.hubspot_status === 'Sent' ? 'green' : 'red';
  
    return <Tag  color={color}>{data?.hubspot_status}</Tag>;
  };

  
  export default StatusCellRenderer;