/*!
 * contacts-nav - a nav compoment for phone contacts
 * https://github.com/pengkobe/contacts-nav
 * Released under the MIT Licenses
 */

+(function () {
    'use strict';

    function contactNav() { }

    /**
        * 初始化
        * @selector {String}   [dom ID]
        * @options  {Object}   [配置对象]
    */
    contactNav.prototype.init = function (selector, options) {
        var _default = {
            alphabet: ['↑', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            contacts: null,
            selectCallback: function (alpha) { },
        };
        var opts = options || {};
        for (var k in _default) {
            if (typeof opts[k] === 'undefined') {
                opts[k] = _default[k];
            }
        }
    }

    // 支持 requireJS&&seaJS
    if (typeof define === 'function') {
        define(function () {
            return contactNav;
        });
    }
});