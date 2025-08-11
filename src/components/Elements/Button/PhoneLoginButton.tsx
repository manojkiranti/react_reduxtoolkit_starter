import { Button, Typography } from 'antd';
import styled from 'styled-components';
import { FC } from 'react';
import { Phone } from 'lucide-react';

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;

interface PhoneLoginButtonProps {
  isLoading: boolean;
  handleButtonClick: () => void;
}

const PhoneLoginButton: FC<PhoneLoginButtonProps> = ({
  isLoading,
  handleButtonClick,
}) => {
  return (
    <StyledButton disabled={isLoading} onClick={handleButtonClick}>
      <IconContainer>
        <Phone
          size={20}
          strokeWidth={2.2}
          style={{
            color: 'green',
          }}
        />
      </IconContainer>
      <Typography.Text
        style={{
          fontWeight: 600,
          fontSize: '14px',
          color: '#475569',
        }}
      >
        Continue with Phone
      </Typography.Text>
    </StyledButton>
  );
};

export default PhoneLoginButton;
