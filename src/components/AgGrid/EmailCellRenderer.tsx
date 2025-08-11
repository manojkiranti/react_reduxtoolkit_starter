import React, { useState } from 'react';

interface EmailCellRendererProps {
  value: string;
}

const EmailCellRenderer: React.FC<EmailCellRendererProps> = ({ value }) => {
  const [showEmail, setShowEmail] = useState(false);

  if (!value) return null; 

  const maskedEmail = value.replace(/(.{2})(.*)(?=@)/,
    (_, a, b) => a + '*'.repeat(b.length)
  );

  return (
    <div
      style={{ cursor: 'pointer', color: showEmail ? 'inherit' : 'gray' }}
      onClick={() => setShowEmail((prev) => !prev)}
    >
      {showEmail ? value : maskedEmail}
    </div>
  );
};

export default EmailCellRenderer;