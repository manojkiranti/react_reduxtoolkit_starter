import { EyeOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Flex, Tooltip } from 'antd';
import { FC } from 'react';
interface ContactLinkRendererProps extends ICellRendererParams {
  tooltip?: string;
}
const ContactLinkRenderer: FC<ContactLinkRendererProps> = (props) => {
  const { data, tooltip = 'View Hubspot Contact' } = props;
  if (!data.contact_id) {
    return <div style={{ height: '100%', textAlign: 'center' }}>No URL</div>;
  }
  return (
    <Flex justify="flex-start" gap={10}>
      <Tooltip title={tooltip}>
        <Button
          type="link"
          href={`https://app.hubspot.com/contacts/23436755/record/0-1/${data.contact_id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'underline',
          }}
          size="small"
        >
          View Contact
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ContactLinkRenderer;
