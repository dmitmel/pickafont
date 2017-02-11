/*!
 * Copyright (c) 2017 Dmytro Meleshko
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global _ */

(function() {
    'use strict';

    var $panesContainer = $('#panes'),
        $openedOnLoadPanes = $panesContainer.find('.opened-pane'),
        $head = $('head');

    var panes = _.toArray($openedOnLoadPanes);

    function setupPane($pane) {
        var $previewText = $pane.find('.preview-text');

        var paneInnerHeight = $pane.height(),
            closePaneContainerHeight = $pane.find('.close-pane-container').height();
        // Get font config's height with margin
        var fontConfigOuterHeight = $pane.find('.font-config')
            .outerHeight( /* includeMargin = */ true);
        $previewText.css('max-height', paneInnerHeight - closePaneContainerHeight - fontConfigOuterHeight);

        $previewText.on('input', function() {
            _.each(_.without(panes, $pane[0]), function(otherPreviewText) {
                $(otherPreviewText).find('.preview-text').html($previewText.html());
            });
        });

        if (panes.length > 1)
            $(panes).find('.close-pane-container > .close-pane').addClass('enabled').removeClass('disabled');
        else
            $(panes).find('.close-pane-container > .close-pane').addClass('disabled').removeClass('enabled');

        $pane.find('.close-pane-container > .close-pane').on('click', function() {
            if (panes.length > 1) {
                $pane.remove();
                panes = _.without(panes, $pane[0]);

                if (panes.length == 1) {
                    $(panes).find('.close-pane-container > .close-pane').addClass('disabled')
                        .removeClass('enabled');
                }
            }
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
        var $pane = $(_.last(panes)).clone();
        panes.push($pane[0]);
        $panesContainer.append($pane);
        setupPane($pane);
    });
}());
