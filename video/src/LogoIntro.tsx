import { useEffect, useState } from 'react';
import {
  AbsoluteFill,
  Easing,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import '@fontsource-variable/frank-ruhl-libre';
import '@fontsource-variable/heebo';
import { evolvePath } from '@remotion/paths';
import { brand, logo, markBox } from './brand';

/** One continuous pen: the line draws first, then roof, chimney and knob, then the wordmark rises. */
export const LogoIntro = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Hold the render until both brand fonts are in, so no frame shows a fallback face.
  const [handle] = useState(() => delayRender('brand fonts'));
  useEffect(() => {
    Promise.all([document.fonts.load(`400 72px ${brand.serif}`)]).then(
      () => continueRender(handle),
      () => continueRender(handle),
    );
  }, [handle]);

  const seg = (from: number, to: number) =>
    interpolate(frame, [from * fps, to * fps], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });

  const line = evolvePath(seg(0.2, 2.2), logo.line);
  const roof = evolvePath(seg(2.0, 2.7), logo.roof);
  const chimney = evolvePath(seg(2.6, 2.95), logo.chimney);
  const knob = seg(2.9, 3.1);

  const textIn = seg(3.0, 3.8);

  const portrait = height > width;
  const markWidth = portrait ? width * 0.78 : Math.min(width * 0.42, height * 0.9);
  const markHeight = (markWidth * markBox.h) / markBox.w;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.paper, color: brand.line }}>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: portrait ? 56 : 40,
        }}
      >
        <svg
          width={markWidth}
          height={markHeight}
          viewBox={`${markBox.x} ${markBox.y} ${markBox.w} ${markBox.h}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={logo.line} strokeWidth={logo.widths.line} style={line} />
          <path d={logo.roof} strokeWidth={logo.widths.roof} style={roof} />
          <path d={logo.chimney} strokeWidth={logo.widths.chimney} style={chimney} />
          <circle
            cx={logo.knob.cx}
            cy={logo.knob.cy}
            r={logo.knob.r}
            strokeWidth={logo.widths.knob}
            style={{
              opacity: knob,
              transform: `scale(${0.6 + 0.4 * knob})`,
              transformOrigin: `${logo.knob.cx}px ${logo.knob.cy}px`,
            }}
          />
        </svg>
        <div
          style={{
            fontFamily: brand.serif,
            fontWeight: 400,
            fontSize: portrait ? 64 : 72,
            letterSpacing: '0.06em',
            opacity: textIn,
            transform: `translateY(${(1 - textIn) * 24}px)`,
            direction: 'ltr',
          }}
        >
          The House Of Brides
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
