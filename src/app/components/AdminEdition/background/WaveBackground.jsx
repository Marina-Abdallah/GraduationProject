import React from 'react';

export function WaveBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: 'white',
        pointerEvents: 'none',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 1455 2339.5"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          {/*
            Exact filter from Figma: drop shadow with green glow (dy=-8)
            applied upward so the glow sits on the upper/inner edge of the wave.
          */}
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="2339.5"
            id="waveGlowFilter"
            width="1455"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="-8" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.517647 0 0 0 0 0.984314 0 0 0 0 0.635294 0 0 0 0.5 0"
            />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
          </filter>

          {/*
            Exact gradient from Figma: solid #90BAEF for the first ~40% of height,
            then fades to white. In the visible viewport (~top 39% of the 2339.5px
            design) the wave appears as a solid light blue.
          */}
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="waveColorGradient"
            x1="727.5"
            x2="727.5"
            y1="16"
            y2="2339.5"
          >
            <stop offset="0.399038" stopColor="#90BAEF" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>

        {/*
          Exact path from Figma (pa5c3780).
          Shape: large organic blob filling lower-right.
          Upper-left boundary is a 4-segment S-curve that creates the
          characteristic wave visible in the design screenshots.
          - Starts at top-right (1447, 16), sweeps left to ~(906, 380)
          - Continues left-down to ~(623, 653)
          - Dips down then back up to ~(228, 547) — this is the S-bump
          - Sweeps to the left edge at ~(8, 746)
          - Then fills the entire bottom of the page
        */}
        <g filter="url(#waveGlowFilter)">
          <path
            d="M8.1414 746.387L8 747V2339.5H1447V16C1124.5 33 1243.7 285.955 906.5 380C770.021 418.064 751.768 579.965 623 653.5C447.392 753.784 433.929 599.525 228 547C63.8001 505.118 22.4686 684.282 8.1414 746.387Z"
            fill="url(#waveColorGradient)"
          />
        </g>
      </svg>
    </div>
  );
}
