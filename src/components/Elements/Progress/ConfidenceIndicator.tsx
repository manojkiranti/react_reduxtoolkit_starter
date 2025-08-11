import React from 'react';
import { Progress, Tooltip } from 'antd';

interface ConfidenceIndicatorProps {
  confidence: number; // value between 0 and 1
}

const getColor = (confidence: number): string => {
  if (confidence >= 0.8) return '#52c41a'; // green
  if (confidence >= 0.5) return '#faad14'; // orange
  return '#ff4d4f'; // red
};

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ confidence }) => {
  const percent = Math.round(confidence * 100);
  const color = getColor(confidence);

  return (
    <Tooltip title={`Confidence: ${percent}%`}>
      <Progress
        percent={percent}
        strokeColor={color}
        showInfo={false}
        size="small"
        status="active"
      />
    </Tooltip>
  );
};
