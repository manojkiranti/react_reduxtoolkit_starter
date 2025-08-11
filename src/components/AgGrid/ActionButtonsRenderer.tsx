import { FC } from 'react';
import {
  BankOutlined,
  DeleteOutlined,
  DeliveredProcedureOutlined,
  DiffOutlined,
  EyeOutlined,
  FileTextOutlined,
  FormOutlined,
  LoginOutlined,
  PlayCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Flex, Tooltip } from 'antd';

const defaultTooltips: Record<ActionButtonType, string> = {
  delete: 'Delete Contact',
  view: 'View Contact',
  create: 'Create Contact',
  update: 'Update Contact',
  complianceNote: 'Generate Compliance Note',
  createInfynityContact: 'Create Infynity Contact',
  createPurchaseAssessment: 'Create Purchase Assessment',
  createRefinanceAssessment: 'Create Refinance Assessment',
  viewAsClient: 'View As Client',
  continueApplication: 'Continue Application',
};

type ActionButtonType =
  | 'delete'
  | 'view'
  | 'create'
  | 'update'
  | 'complianceNote'
  | 'createInfynityContact'
  | 'createPurchaseAssessment'
  | 'createRefinanceAssessment'
  | 'viewAsClient'
  | 'continueApplication';
interface ActionButtonsRendererProps extends ICellRendererParams {
  buttons: ActionButtonType[];
  handleDelete?: (data: any) => void;
  onView?: (data: any) => void;
  onCreate?: (data: any) => void;
  onUpdate?: (data: any) => void;
  onComplianceNote?: (data: any) => void;
  onCreateInfynityContact?: (data: any) => void;
  onCreatePurchaseAssessment?: (data: any) => void;
  onCreateRefinanceAssessment?: (data: any) => void;
  onViewAsClient?: (data: any) => void;
  onContinueApplication?: (data: any) => void;
  data: any;
  tooltipTexts?: Partial<Record<ActionButtonType, string>>;
}

const ActionButtonsRenderer: FC<ActionButtonsRendererProps> = ({
  handleDelete,
  onView,
  onCreate,
  onUpdate,
  onComplianceNote,
  onCreateInfynityContact,
  onCreatePurchaseAssessment,
  onCreateRefinanceAssessment,
  onViewAsClient,
  onContinueApplication,
  data,
  buttons,
  tooltipTexts,
  context,
}) => {
  const hasDelete = buttons.includes('delete');
  const hasView = buttons.includes('view');
  const hasCreate = buttons.includes('create');
  const hasUpdate = buttons.includes('update');
  const hasComplianceNote = buttons.includes('complianceNote');
  const hasCreateInfynityContact = buttons.includes('createInfynityContact');
  const hasCreatePurchaseAssessment = buttons.includes(
    'createPurchaseAssessment',
  );
  const hasCreateRefinanceAssessment = buttons.includes(
    'createRefinanceAssessment',
  );
  const hasViewAsClient = buttons.includes('viewAsClient');
  const hasContinueApplication = buttons.includes('continueApplication');
  const loginAsUserLoading = context?.loginAsUserLoading;

  const getTooltip = (type: ActionButtonType) =>
    tooltipTexts?.[type] || defaultTooltips[type];

  const delteItem = () => {
    if (handleDelete) {
      handleDelete(data);
    }
  };

  const viewItem = () => {
    if (onView) {
      onView(data);
    }
  };

  const createItem = () => {
    if (onCreate) {
      onCreate(data);
    }
  };

  const updateItem = () => {
    if (onUpdate) {
      onUpdate(data);
    }
  };
  const generateComplaiceNote = () => {
    if (onComplianceNote) {
      onComplianceNote(data);
    }
  };

  const createInfynityContact = () => {
    if (onCreateInfynityContact) {
      onCreateInfynityContact(data);
    }
  };

  const createPurchaseAssessment = () => {
    if (onCreatePurchaseAssessment) {
      onCreatePurchaseAssessment(data);
    }
  };

  const createRefinanceAssessment = () => {
    if (onCreateRefinanceAssessment) {
      onCreateRefinanceAssessment(data);
    }
  };

  const handleViewAsClient = () => {
    if (onViewAsClient) {
      onViewAsClient(data);
    }
  };

  const handleContinueApplication = () => {
    if (onContinueApplication) {
      onContinueApplication(data);
    }
  };

  return (
    <Flex gap="small" align="center" style={{ height: '100%' }}>
      {hasDelete && (
        <Tooltip title={getTooltip('delete')}>
          <Button
            size="small"
            onClick={delteItem}
            type="text"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      )}
      {hasView && (
        <Tooltip title={getTooltip('view')}>
          <Button
            size="small"
            onClick={viewItem}
            type="text"
            shape="circle"
            icon={<EyeOutlined />}
          />
        </Tooltip>
      )}
      {hasCreate && (
        <Tooltip title={getTooltip('create')}>
          <Button
            size="small"
            onClick={createItem}
            type="text"
            shape="circle"
            icon={<FormOutlined />}
          />
        </Tooltip>
      )}
      {hasUpdate && (
        <Tooltip title={getTooltip('update')}>
          <Button
            size="small"
            onClick={updateItem}
            type="text"
            shape="circle"
            icon={<FormOutlined />}
          />
        </Tooltip>
      )}
      {hasViewAsClient && (
        <Tooltip title={getTooltip('viewAsClient')}>
          <Button
            size="small"
            onClick={handleViewAsClient}
            type="text"
            shape="circle"
            icon={<LoginOutlined />}
            disabled={loginAsUserLoading}
            loading={loginAsUserLoading}
          />
        </Tooltip>
      )}
      {hasComplianceNote && (
        <Tooltip title={getTooltip('complianceNote')}>
          <Button
            size="small"
            onClick={generateComplaiceNote}
            type="text"
            shape="circle"
            icon={<FileTextOutlined />}
          />
        </Tooltip>
      )}
      {hasCreateInfynityContact && (
        <Tooltip title={getTooltip('createInfynityContact')}>
          <Button
            size="small"
            onClick={createInfynityContact}
            type="text"
            shape="circle"
            icon={<UserAddOutlined />}
          />
        </Tooltip>
      )}

      {hasCreatePurchaseAssessment && (
        <Tooltip title={getTooltip('createPurchaseAssessment')}>
          <Button
            size="small"
            onClick={createPurchaseAssessment}
            type="text"
            shape="circle"
            icon={<BankOutlined />}
          />
        </Tooltip>
      )}
      {hasCreateRefinanceAssessment && (
        <Tooltip title={getTooltip('createRefinanceAssessment')}>
          <Button
            size="small"
            onClick={createRefinanceAssessment}
            type="text"
            shape="circle"
            icon={<DiffOutlined />}
          />
        </Tooltip>
      )}
      {hasContinueApplication && (
        <Tooltip title={getTooltip('continueApplication')}>
          <Button
            size="small"
            onClick={handleContinueApplication}
            type="text"
            shape="circle"
            icon={<PlayCircleOutlined />}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default ActionButtonsRenderer;
