import { FC } from 'react';
import {
  EyeOutlined
} from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
type ActionButtonType ='view'


interface ActionCellRendererProps {
  buttons: ActionButtonType[];
  onView?: (data: any) => void;
  data: any;
  // other props...
}

const ActionCellRenderer: FC<ActionCellRendererProps> = ({
  onView,
  data,
  buttons,
}) => {
  const hasView = buttons.includes('view');

  const viewItem = () => {
    if (onView) {
      onView(data);
    }
  };



  return (
    <Flex gap="small">
      {hasView && (
        <Tooltip title="View Detail">
          <Button
            size="small"
            onClick={viewItem}
            type="text"
            shape="circle"
            icon={<EyeOutlined />}
          />
        </Tooltip>
      )}     
    </Flex>
  );
};

export default ActionCellRenderer;
