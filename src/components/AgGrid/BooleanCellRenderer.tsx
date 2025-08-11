import { Tag } from "antd";

const BooleanCellRenderer = (params: any, key:string) => {
    const { data } = params;
    const color = data.key  ? 'green' : 'red';
  
    return <Tag  color={color}>{data?.key}</Tag>;
  };

  
  export default BooleanCellRenderer;