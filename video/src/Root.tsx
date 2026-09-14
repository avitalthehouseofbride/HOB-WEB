import { Composition } from 'remotion';
import { LogoIntro } from './LogoIntro';

const fps = 30;
const seconds = 5.5;

export const Root = () => (
  <>
    <Composition
      id="LogoIntro"
      component={LogoIntro}
      durationInFrames={Math.round(fps * seconds)}
      fps={fps}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
    <Composition
      id="LogoIntroSquare"
      component={LogoIntro}
      durationInFrames={Math.round(fps * seconds)}
      fps={fps}
      width={1080}
      height={1080}
      defaultProps={{}}
    />
    <Composition
      id="LogoIntroStory"
      component={LogoIntro}
      durationInFrames={Math.round(fps * seconds)}
      fps={fps}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
  </>
);
