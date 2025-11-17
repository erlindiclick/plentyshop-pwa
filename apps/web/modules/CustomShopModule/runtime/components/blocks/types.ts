/**
 * Props for CustomHeroBanner component
 */
export interface CustomHeroBannerProps {
  /**
   * Main title text
   */
  title?: string;

  /**
   * Subtitle text
   */
  subtitle?: string;

  /**
   * Button text (if empty, button won't be shown)
   */
  buttonText?: string;

  /**
   * URL to navigate when button is clicked
   */
  buttonLink?: string;
}
