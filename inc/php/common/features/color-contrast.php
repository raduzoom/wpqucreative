<?php

// -- Colours derived from the Customizer highlight colour so text on it and in it stays readable
// (WCAG AA, 4.5:1). The default highlight's results are Sass tokens in _TOKENS.scss
// ($color_on_highlight, $color_highlight_text); color-contrast.spec.php checks they match.

const QUCREATIVE_COLOR_CONTRAST_MIN = 4.5;
const QUCREATIVE_COLOR_DARK_TEXT = '#1a1a1a';
// -- the darkest light background highlight-coloured text sits on (the post meta panels)
const QUCREATIVE_COLOR_LIGHT_BACKGROUND = '#efefef';

/**
 * '#97c1cf' or '97c1cf' (also 3-digit) to [r, g, b] in 0-255, or null when it isn't a hex colour.
 *
 * @param string $hex
 * @return int[]|null
 */
function qucreative_color_rgb($hex) {
  $hex = ltrim(trim((string) $hex), '#');
  if (strlen($hex) === 3) {
    $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
  }
  if (!preg_match('/^[0-9a-f]{6}$/i', $hex)) {
    return null;
  }

  return array(hexdec(substr($hex, 0, 2)), hexdec(substr($hex, 2, 2)), hexdec(substr($hex, 4, 2)));
}

/**
 * @param int[] $rgb
 * @return string '#rrggbb'
 */
function qucreative_color_hex($rgb) {
  return sprintf('#%02x%02x%02x', $rgb[0], $rgb[1], $rgb[2]);
}

/**
 * WCAG relative luminance.
 *
 * @param int[] $rgb
 * @return float
 */
function qucreative_color_luminance($rgb) {
  $channels = array_map(function ($value) {
    $value = $value / 255;

    return $value <= 0.03928 ? $value / 12.92 : pow(($value + 0.055) / 1.055, 2.4);
  }, $rgb);

  return 0.2126 * $channels[0] + 0.7152 * $channels[1] + 0.0722 * $channels[2];
}

/**
 * WCAG contrast ratio of two colours, 1 to 21.
 *
 * @param int[] $rgbA
 * @param int[] $rgbB
 * @return float
 */
function qucreative_color_contrast($rgbA, $rgbB) {
  $luminanceA = qucreative_color_luminance($rgbA);
  $luminanceB = qucreative_color_luminance($rgbB);

  return (max($luminanceA, $luminanceB) + 0.05) / (min($luminanceA, $luminanceB) + 0.05);
}

/**
 * Text colour for a background of this colour: white when it reaches 4.5:1, otherwise
 * QUCREATIVE_COLOR_DARK_TEXT (or white, if that contrasts better).
 *
 * @param string $hex
 * @return string|null '#rrggbb', null for an invalid colour
 */
function qucreative_color_on($hex) {
  $rgb = qucreative_color_rgb($hex);
  if ($rgb === null) {
    return null;
  }
  $white = array(255, 255, 255);
  $dark = qucreative_color_rgb(QUCREATIVE_COLOR_DARK_TEXT);
  if (qucreative_color_contrast($white, $rgb) >= QUCREATIVE_COLOR_CONTRAST_MIN
    || qucreative_color_contrast($white, $rgb) >= qucreative_color_contrast($dark, $rgb)) {
    return '#ffffff';
  }

  return QUCREATIVE_COLOR_DARK_TEXT;
}

/**
 * The colour, darkened just enough to reach 4.5:1 as text on the theme's light backgrounds:
 * mixed toward black in 1% steps, so the hue stays.
 *
 * @param string $hex
 * @return string|null '#rrggbb', null for an invalid colour
 */
function qucreative_color_readable_on_light($hex) {
  $rgb = qucreative_color_rgb($hex);
  if ($rgb === null) {
    return null;
  }
  $background = qucreative_color_rgb(QUCREATIVE_COLOR_LIGHT_BACKGROUND);
  for ($percent = 0; $percent <= 100; $percent++) {
    $candidate = array_map(function ($value) use ($percent) {
      return (int) round($value * (100 - $percent) / 100);
    }, $rgb);
    if (qucreative_color_contrast($candidate, $background) >= QUCREATIVE_COLOR_CONTRAST_MIN) {
      return qucreative_color_hex($candidate);
    }
  }

  return '#000000';
}

/**
 * The :root variables for a highlight colour (see wpqucreative docs/accessibility.md).
 *
 * @param string $hex
 * @return string CSS, empty for an invalid colour
 */
function qucreative_color_highlight_css_vars($hex) {
  $rgb = qucreative_color_rgb($hex);
  if ($rgb === null) {
    return '';
  }

  return ':root{--qu-color-highlight:' . qucreative_color_hex($rgb) . ';--qu-color-on-highlight:' . qucreative_color_on($hex) . ';--qu-colors-hightlight-text:' . qucreative_color_readable_on_light($hex) . ';}';
}
