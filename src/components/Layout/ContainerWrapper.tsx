import React from 'react';

const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        padding: '0 32px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;
