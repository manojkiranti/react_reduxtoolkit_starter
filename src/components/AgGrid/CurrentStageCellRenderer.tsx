import { Tag } from 'antd';


const CurrentStageCellRenderer = (params: any) => {
    const { data } = params;
    const color = data.status === 'in_progress' ? 'orange' : 'green';
    const text =
      data.status === 'in_progress'
        ? data.current_step
            .split('_')
            .map((word: string) => word.toUpperCase())
            .join(' ')
        : 'OA Completed';
  
    return <Tag color={color}>{text}</Tag>;
  };

  export default CurrentStageCellRenderer;
