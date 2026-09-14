// Shared brand values. Keep in sync with src/styles/global.css in the site.
import paths from '../../src/assets/brand/logo-paths.json';

export const brand = {
  cream: '#f5f1e8',
  ink: '#1e1d1a',
  stone: '#b9aea1',
  sea: '#5b7c8c',
  olive: '#6b7355',
  serif: "'Frank Ruhl Libre Variable', 'David Libre', 'Times New Roman', serif",
  sans: "'Heebo Variable', 'Assistant', system-ui, sans-serif",
};

export const logo = paths;
// The mark's drawing occupies roughly x 50..800, y 300..675 of the original 915x900 canvas.
export const markBox = { x: 50, y: 300, w: 750, h: 375 };
