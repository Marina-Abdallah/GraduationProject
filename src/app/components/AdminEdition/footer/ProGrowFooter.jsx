import React from 'react';

const FOOTER_LOGO_PATH =
  'M86.6936 139.037H49.9699C46.5898 138.852 33.8005 137.833 23.3863 127.459C14.3424 118.473 12.3326 107.914 11.8758 104.95C8.76985 86.4236 19.3668 71.7881 24.1171 65.0261C29.2328 57.9862 34.8053 53.0768 39.0989 49.8348C40.0124 49.1864 41.2 49.279 41.9309 50.0201C46.3158 54.1884 50.7007 58.3567 55.0856 62.4325C56.5473 63.8219 58.8311 62.803 58.9224 60.8577C59.2878 47.5191 59.7446 34.1804 60.11 20.8417C60.2014 19.267 58.7397 18.1554 57.1867 18.5259C43.5752 22.6017 29.9637 26.5847 16.4435 30.6604C14.4337 31.3089 14.251 34.1804 16.1694 35.014C21.8333 37.4224 27.5885 39.7382 33.2524 42.1465C34.8967 42.7949 35.1708 45.0181 33.8005 46.037C29.781 49.1864 24.9393 53.7253 20.463 59.9314C16.9916 64.5629 5.29845 78.7353 6.66874 97.2612C7.49091 107.914 12.5153 117.547 7.85632 128.755C5.75521 133.757 2.46652 137.092 0.182705 139.13C0.0913526 92.7224 0.0913526 46.4075 0 0C16.0781 0.0926297 32.2475 0.0926297 48.3255 0.185259C70.3415 3.89045 86.0542 20.9343 86.6936 39.0898C87.1504 50.7611 81.0298 63.6366 71.4377 70.9544C61.9371 78.0869 51.7969 78.4574 48.1428 78.3648C36.6324 79.2911 27.8625 89.0172 27.9539 100.04C28.0453 110.044 35.4448 118.937 45.6763 120.882C53.3499 120.697 61.0235 120.511 68.6058 120.326C68.6058 115.324 68.6972 110.322 68.6972 105.32L48.0515 104.857C48.1428 98.8359 48.2342 92.9076 48.3255 86.8867L86.6936 86.9793V139.037Z';

function FooterLogoIcon() {
  return (
    <svg
      width="86.7175"
      height="139.13"
      viewBox="0 0 86.7175 139.13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={FOOTER_LOGO_PATH} fill="#13206D" />
    </svg>
  );
}

const menuColumns = [
  {
    title: 'Solutions',
    items: ['For Business', 'Leadership', 'Development', 'Outplacement'],
  },
  {
    title: 'Coaching',
    items: ['Leadership', 'Coaching', 'Career Coaching', 'Life Coaching', 'Job Search', 'Coaching'],
  },
  {
    title: 'Resources',
    items: ['Guides', 'Jobs', 'Boards', 'Interview Prep', 'Custom Job', 'Boards'],
  },
  {
    title: 'Company',
    items: ['About Us', 'Join as', 'Coach', 'Careers', 'FAQ', 'Press'],
  },
];

const socialLinks = ['Facebook', 'Instagram', 'Twitter', 'Linkedin'];

export function ProGrowFooter() {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '92px 92px 0 0',
        boxShadow: '0px -7.356px 7.356px 0px rgba(132,251,162,0.5)',
        padding: '40px 60px 30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top row: logo + menu columns */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0 }}>
          <FooterLogoIcon />
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#84fba2',
                lineHeight: '64px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Pro
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#13206d',
                lineHeight: '64px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Grow
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Menu columns */}
        <div style={{ display: 'flex', gap: 60 }}>
          {menuColumns.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                style={{
                  color: '#13206d',
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                {col.title}
              </span>
              {col.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    color: '#13206d',
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: '#13206d',
          margin: '28px 0 16px',
          opacity: 0.3,
        }}
      />

      {/* Bottom row: social + copyright */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 24 }}>
          {socialLinks.map((s) => (
            <span
              key={s}
              style={{
                color: '#13206d',
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <span
          style={{
            color: '#13206d',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Copyright @ProGrow 2024
        </span>
      </div>
    </div>
  );
}
