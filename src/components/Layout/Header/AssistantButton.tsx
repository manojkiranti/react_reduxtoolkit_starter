import { Typography, theme } from 'antd';
import AIImage from '@/assets/images/ai.png';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { toggleAIAssistant } from '@/store/slices/common/commonSlice';
const { useToken } = theme;

const AssistantButton = () => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const handleViewAssistant = () => {
    dispatch(toggleAIAssistant());
  };
  return (
    <div
      className="assistant-button"
      onClick={handleViewAssistant}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 56, 98, 0.1)',
        border: 'none',
        outline: 'none',
        padding: '7px 1.5rem',
        gap: '6px',
        borderRadius: '6px',
      }}
    >
      <span>
        <img src={AIImage} alt="" style={{ height: '22px' }} />
      </span>
      <Typography
        style={{ color: token.colorPrimary, fontSize: '16px', fontWeight: 600 }}
      >
        Odin AI
      </Typography>
    </div>
  );
};

export default AssistantButton;
