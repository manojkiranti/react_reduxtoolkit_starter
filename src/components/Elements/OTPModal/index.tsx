// components/OtpModal.tsx
import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

interface OtpModalProps {
  visible: boolean;
  onCancel: () => void;
  onVerify: (otp: string) => Promise<void>;
  modalTitle?: string;
}

const OTPModal: React.FC<OtpModalProps> = ({
  visible,
  onCancel,
  onVerify,
  modalTitle = 'OTP Verification',
}) => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    if (!otp) {
      message.error('Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      await onVerify(otp);
      setOtp('');
    } catch (error) {
      console.log('error - otp', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="verify"
          type="primary"
          onClick={handleVerify}
          loading={loading}
          disabled={loading}
        >
          Verify
        </Button>,
      ]}
    >
      <Paragraph style={{ fontSize: '12px', marginTop: '0' }}>
        OTP code has been sent to your registered phone.
      </Paragraph>
      <Input.OTP value={otp} onChange={(text) => setOtp(text)} length={6} />
    </Modal>
  );
};

export default OTPModal;
