'use strict';
/*!
 * contacts-nav - a nav compoment for phone contacts
 * https://github.com/pengkobe/contacts-nav
 * Released under the MIT Licenses
 */

; (function () {
    function ContactNav() { }
    /**
    * 初始化
    * @selector {String}   [dom ID]
    * @options  {Object}   [配置对象]
    */
    ContactNav.prototype.init = function (selector, options) {
        var _default = {
            friendList: [],
            navCharArray: [],
            selectCallback: function (alpha) { console.log("ctrl点击事件回调:" + alpha); },
        };
        var opts = options || {};
        for (var k in _default) {
            if (typeof opts[k] === 'undefined') {
                opts[k] = _default[k];
            }
        }
        var contactHtml = '';
        var navHtml = '';
        var that = this;
        var friendList = opts.friendList;
        var navCharArray = opts.navCharArray;
        for (var i = 0; i < friendList.length; i++) {
            contactHtml += '<li id="_' + friendList[i].id + '"> ' + friendList[i].name + '</li>';
        }
        for (var i = 0; i < navCharArray.length; i++) {
            navHtml += '<li data-id="' + navCharArray[i].id + '"> ' + navCharArray[i].firstChar + '</li>';
        }
        $("#" + selector + " .friends_ul").append(contactHtml);
        $("#" + selector + " .alpha-nav").append(navHtml);

        $("#" + selector + " .alpha-nav").bind("touchstart", function (event) {
            var nodeName = event.target.nodeName.toUpperCase();
            if (nodeName !== "LI") {
                return;
            }
            //事件源
            var target = $(event.target);
            //首字母
            var firstCode = target.html();
            // 导航事件回调
            opts.selectCallback(firstCode);
            //标签id
            var id = target.attr("data-id");
            $(".prompt-box").show().html(firstCode);

            that.scrollCharToTop(id, selector);
        }).bind("touchend", function () {
            $(".prompt-box").hide();
        }).bind("touchmove", function (event) {
            var nodeName = event.target.nodeName.toUpperCase();
            if (nodeName !== "LI") {
                return;
            }
            // 根据坐标来获取元素
            var ttt = document.elementFromPoint(
                event.changedTouches[0].pageX,
                event.changedTouches[0].pageY
            );
            nodeName = ttt ? ttt.nodeName.toUpperCase() : "";

            if (nodeName !== "LI") {
                return;
            }
            var target = $(ttt);
            var firstCode = target.html().trim();
            // 导航事件回调
            opts.selectCallback(firstCode);
            // 导航id
            var id = target.attr("data-id");
            // 提示框
            $(".prompt-box").show().html(firstCode);
            that.scrollCharToTop(id, selector);
        });
    }

    /*
    * 通讯录滚动逻辑
    * @param {object} id [首字母元素ID]
    * @param {object} selector [容器对象]
    **/
    ContactNav.prototype.scrollCharToTop = function (id, selector) {
        var charPos = $("#_" + id);
        var contactContainer = $("#" + selector + " .contact-container");
        if (charPos.length === 1) {
            var scrollTop = charPos[0].offsetTop;
            // 27为元素高度
            contactContainer[0].scrollTop = scrollTop - 27;
        } else {
            throw ("nav not exits or more than one");
        }
    }

    window.ContactNav = ContactNav;
})();