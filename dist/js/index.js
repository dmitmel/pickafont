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
!function(){"use strict";function n(n){function e(n,e){var o=_.isString(e)?function(n){a.css(e,n)}:e;o(n.val()),n.on("change",function(){o(n.val())})}function o(n){if("google-fonts"==n){var e="https://fonts.googleapis.com/css?family="+encodeURIComponent(d.val());i.append(f=$('<link rel="stylesheet" href="'+e+'">'))}else _.isUndefined(f)||(f.remove(),f=void 0)}var a=n.find(".preview-text"),s=n.height(),c=n.find(".close-pane-container").height(),l=n.find(".font-config").outerHeight(!0);a.css("max-height",s-c-l),a.on("input",function(){_.each(_.without(t,n[0]),function(n){$(n).find(".preview-text").html(a.html())})}),t.length>1?$(t).find(".close-pane-container > .close-pane").addClass("enabled").removeClass("disabled"):$(t).find(".close-pane-container > .close-pane").addClass("disabled").removeClass("enabled"),n.find(".close-pane-container > .close-pane").on("click",function(){t.length>1&&(n.remove(),t=_.without(t,n[0]),1==t.length&&$(t).find(".close-pane-container > .close-pane").addClass("disabled").removeClass("enabled"))});var f,d=n.find(".font"),r=n.find(".font-provider");e(r,o),e(d,function(n){o(r.val()),a.css("font-family",n)});var p=n.find(".foreground");p.parent().colorpicker(),e(p,"color");var h=n.find(".background");h.parent().colorpicker(),e(h,"background"),e(n.find(".font-size"),"font-size"),e(n.find(".line-height"),"line-height"),e(n.find(".font-weight"),"font-weight"),e(n.find(".font-style"),"font-style")}var e=$("#panes"),o=e.find(".opened-pane"),i=$("head"),t=_.toArray(o);_.each(o,function(e){n($(e))}),$("#add-pane").on("click",function(){var o=$(_.last(t)).clone();t.push(o[0]),e.append(o),n(o)})}();