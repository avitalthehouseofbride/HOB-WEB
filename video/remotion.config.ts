import { Config } from '@remotion/cli/config';

// Public pages of the site never load this; it only renders brand videos.
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setEntryPoint('./src/index.ts');
// In the cloud sandbox Chrome cannot be downloaded; point at the preinstalled Chromium.
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
