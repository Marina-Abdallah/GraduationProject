import React from 'react';

function MicrosoftLogo() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 3,
        padding: 2,
      }}
    >
      <div style={{ width: 22, height: 22, background: '#f8510c' }} />
      <div style={{ width: 22, height: 22, background: '#7eba00' }} />
      <div style={{ width: 22, height: 22, background: '#00a3f4' }} />
      <div style={{ width: 22, height: 22, background: '#ffba00' }} />
    </div>
  );
}

function PersonAvatar({ initials, bg }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: bg || '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: 18,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {initials}
    </div>
  );
}

function CompanyLogoCircle({ logoType, logoColors, initials, avatarBg, imageUrl }) {
  return (
    <div
      style={{
        width: 78,
        height: 80,
        borderRadius: 114,
        background: 'white',
        boxShadow: '0px 4px 4px rgba(132,251,162,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {logoType === 'image' && imageUrl && (
        <img
          src={imageUrl}
          alt="Company logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 114,
          }}
        />
      )}
      {logoType === 'microsoft' && <MicrosoftLogo />}
      {logoType === 'avatar' && <PersonAvatar initials={initials} bg={avatarBg} />}
      {logoType === 'custom' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
            padding: 2,
          }}
        >
          {(logoColors || ['#666', '#888', '#aaa', '#ccc']).map((c, i) => (
            <div key={i} style={{ width: 22, height: 22, background: c }} />
          ))}
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div
        style={{
          color: '#13206d',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          paddingLeft: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          height: 1,
          background: 'rgba(19,32,109,0.15)',
          marginBottom: 2,
        }}
      />
      <div
        style={{
          color: 'rgba(19,32,109,0.6)',
          fontSize: 13,
          fontFamily: 'Inter, sans-serif',
          paddingLeft: 10,
          paddingBottom: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function RequestCard({ request, onApprove, onDecline }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        width: '100%',
        padding: '18px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        filter: 'drop-shadow(0px 8px 4px rgba(132,251,162,0.5))',
        boxSizing: 'border-box',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          marginBottom: 16,
          minHeight: 80,
        }}
      >
        <CompanyLogoCircle
          logoType={request.logoType}
          logoColors={request.logoColors}
          initials={request.initials}
          avatarBg={request.avatarBg}
          imageUrl={request.imageUrl}
        />
        <div>
          <div
            style={{
              color: '#13206d',
              fontSize: 22,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {request.name}
          </div>
          <div
            style={{
              color: 'rgba(19,32,109,0.8)',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {request.industry}
          </div>
        </div>
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <InfoField label="Email" value={request.email} />
        <InfoField label="Address" value={request.address} />
        <InfoField label="Phone" value={request.phone} />
        <InfoField label="Website" value={request.website} />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 4, marginTop: 18 }}>
        <button
          onClick={() => onApprove(request.id)}
          style={{
            flex: 1,
            background: '#84fba2',
            color: '#13206d',
            border: 'none',
            borderRadius: 8,
            height: 40,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#6de88f'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#84fba2'; }}
        >
          Approve
        </button>
        <button
          onClick={() => onDecline(request.id)}
          style={{
            flex: 1,
            background: '#ea4335',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            height: 40,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#d33527'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#ea4335'; }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
