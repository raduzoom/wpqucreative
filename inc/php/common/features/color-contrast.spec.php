<?php
// Run: php -d zend.assertions=1 -d assert.exception=1 color-contrast.spec.php

include_once 'color-contrast.php';


// -- the default highlight: must match $color_on_highlight and $color_highlight_text in _TOKENS.scss
assert(qucreative_color_on('#97c1cf') == '#1a1a1a');
assert(qucreative_color_readable_on_light('#97c1cf') == '#587078');

$tokens = file_get_contents(__DIR__ . '/../../../../libs/qucreative/_TOKENS.scss');
assert(preg_match('/\$color_highlight: *(#[0-9a-f]{6})/i', $tokens, $highlight));
assert(preg_match('/\$color_on_highlight: *(#[0-9a-f]{6})/i', $tokens, $onHighlight));
assert(preg_match('/\$color_highlight_text: *(#[0-9a-f]{6})/i', $tokens, $highlightText));
assert(strtolower($onHighlight[1]) == qucreative_color_on($highlight[1]));
assert(strtolower($highlightText[1]) == qucreative_color_readable_on_light($highlight[1]));


// -- dark colours keep white text and stay as they are
assert(qucreative_color_on('#1e3a8a') == '#ffffff');
assert(qucreative_color_readable_on_light('#1e3a8a') == '#1e3a8a');

// -- light colours get dark text and a darker shade
assert(qucreative_color_on('#ffcc00') == '#1a1a1a');
assert(qucreative_color_contrast(qucreative_color_rgb(qucreative_color_readable_on_light('#ffcc00')), qucreative_color_rgb('#efefef')) >= 4.5);

// -- formats
assert(qucreative_color_on('fff') == '#1a1a1a');
assert(qucreative_color_on('not a colour') === null);
assert(qucreative_color_highlight_css_vars('nope') === '');
assert(qucreative_color_highlight_css_vars('#97C1CF') == ':root{--qu-color-highlight:#97c1cf;--qu-color-on-highlight:#1a1a1a;--qu-colors-hightlight-text:#587078;}');

// -- contrast ratio
assert(round(qucreative_color_contrast(array(255, 255, 255), array(0, 0, 0)), 2) == 21.0);
assert(round(qucreative_color_contrast(qucreative_color_rgb('#777777'), array(255, 255, 255)), 2) == 4.48);

echo "color-contrast: all assertions passed\n";
