/* global _ */

(function() {
    'use strict';

    var $panesContainer = $('#panes'),
        $openedOnLoadPanes = $panesContainer.find('.opened-pane'),
        $head = $('head');

    var panes = $openedOnLoadPanes;

    function setupPane($pane) {
        var $previewText = $pane.find('.preview-text');

        // Get pane height without padding
        var paneInnerHeight = $pane.height();
        // Get font config's height with padding
        var fontConfigOuterHeight = $pane.find('.font-config')
            .outerHeight( /* includeMargin = */ true);
        $previewText.css('max-height', paneInnerHeight - fontConfigOuterHeight);

        $previewText.on('input', function() {
            _.each(_.without(panes, $pane[0]), function(otherPreviewText) {
                $(otherPreviewText).find('.preview-text').html($previewText.html());
            });
        });

        function setupFontProperty($input, onChange) {
            var _onChange = _.isString(onChange) ? function(value) {
                $previewText.css(onChange, value);
            } : onChange;
            _onChange($input.val());
            $input.on('change', function() {
                _onChange($input.val());
            });
        }

        var $font = $pane.find('.font'),
            $fontProvider = $pane.find('.font-provider'),
            fontLinkTag;

        function checkFontProvider(fontProvider) {
            if (fontProvider == 'google-fonts') {
                var fontURL = 'https://fonts.googleapis.com/css?family=' + encodeURIComponent($font.val());
                $head.append(fontLinkTag = $('<link rel="stylesheet" href="' + fontURL + '">'));
            } else {
                if (!_.isUndefined(fontLinkTag)) {
                    fontLinkTag.remove();
                    fontLinkTag = undefined;
                }
            }
        }

        setupFontProperty($fontProvider, checkFontProvider);

        setupFontProperty($font, function(font) {
            checkFontProvider($fontProvider.val());
            $previewText.css('font-family', font);
        });

        var foreground = $pane.find('.foreground');
        foreground.parent().colorpicker();
        setupFontProperty(foreground, 'color');

        var background = $pane.find('.background');
        background.parent().colorpicker();
        setupFontProperty(background, 'background');
        setupFontProperty($pane.find('.font-size'), 'font-size');
        setupFontProperty($pane.find('.line-height'), 'line-height');
        setupFontProperty($pane.find('.font-weight'), 'font-weight');
        setupFontProperty($pane.find('.font-style'), 'font-style');
    }

    _.each($openedOnLoadPanes, function(pane) {
        setupPane($(pane));
    });

    $('#add-pane').on('click', function() {
        var $pane = $panesContainer.find('.opened-pane').last().clone();
        $panesContainer.append($pane);
        panes.push($pane[0]);
        setupPane($pane);
    });
}());
