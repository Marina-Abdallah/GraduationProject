import React from 'react';
import { RequestCard } from './RequestCard';
import { EmptyState } from './EmptyState';

export function RequestsGrid({ requests, onApprove, onDecline }) {
  if (requests.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 385px))',
        gap: 24,
        alignItems: 'start',
      }}
    >
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onApprove={onApprove}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
}
