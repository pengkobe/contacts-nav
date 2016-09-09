var app = angular.module('testnav', []);
app.controller('MainCtrl', ['$scope', function ($scope) {
    // 测试好友列表
    $scope.friendList = [
        { firstChar: "A", id: 1, name: "安以轩" },
        { firstChar: "A", name: "安以轩2" },
        { firstChar: "B", id: 2, name: "白百何" },
        { firstChar: "B", name: "白百何2" },
        { firstChar: "B", name: "白百何3" },
        { firstChar: "B", name: "白百何4" },
        { firstChar: "C", id: 3, name: "陈真" },
        { firstChar: "D", id: 4, name: "斗鱼" },
        { firstChar: "E", id: 5, name: "饿了么" },
        { firstChar: "F", id: 6, name: "富士康" },
        { firstChar: "G", id: 7, name: "咯咯" },
        { firstChar: "H", id: 8, name: "哈哈" },
        { firstChar: "J", id: 9, name: "纪小南" },
        { firstChar: "K", id: 10, name: "卡卡" },
        { firstChar: "L", id: 11, name: "楼萱" },
        { firstChar: "M", id: 12, name: "妹妹" },
        { firstChar: "N", id: 13, name: "牛人" },
        { firstChar: "O", id: 14, name: "欧派" },
        { firstChar: "P", id: 15, name: "彭志向" },
        { firstChar: "Q", id: 16, name: "蛐蛐" },
        { firstChar: "R", id: 17, name: "蓉儿" },
        { firstChar: "S", id: 18, name: "傻哥" },
        { firstChar: "T", id: 19, name: "腾格尔" },
        { firstChar: "U", id: 21, name: "vsir" },
        { firstChar: "V", id: 22, name: "谢尔康" },
        { firstChar: "W", id: 23, name: "悠悠" },
    ];
    // 测试导航字符
    $scope.navCharArray = [
        { firstChar: "A", id: 1 },
        { firstChar: "B", id: 2 },
        { firstChar: "C", id: 3 },
        { firstChar: "D", id: 4 },
        { firstChar: "E", id: 5 },
        { firstChar: "F", id: 6 },
        { firstChar: "G", id: 7 },
        { firstChar: "H", id: 8 },
        { firstChar: "J", id: 9 },
        { firstChar: "K", id: 10 },
        { firstChar: "L", id: 11 },
        { firstChar: "M", id: 12 },
        { firstChar: "N", id: 13 },
        { firstChar: "O", id: 14 },
        { firstChar: "P", id: 15 },
        { firstChar: "Q", id: 16 },
        { firstChar: "R", id: 17 },
        { firstChar: "S", id: 18 },
        { firstChar: "T", id: 19 },
        { firstChar: "V", id: 21 },
        { firstChar: "X", id: 22 },
        { firstChar: "Y", id: 23 },
    ];

    // 导航事件回调
    $scope.navCallBack = function (char) {
        console.log("ctrl点击事件回调:" + char);
    }
}]).directive("ngTouchstart", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            $element.bind('touchstart', onTouchStart);
            function onTouchStart(event) {
                var method = $element.attr('ng-touchstart');
                $scope.$event = event;
                $scope.$apply(method);
            };
        }
    };
}).directive("ngTouchend", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            $element.bind('touchend', onTouchEnd);

            function onTouchEnd(event) {
                var method = $element.attr('ng-touchend');
                $scope.$event = event;
                $scope.$apply(method);
            };
        }
    };
}).directive("ngTouchmove", function () {
    return {
        controller: function ($scope, $element, $attrs) {
            $element.bind('touchstart', onTouchStart);

            function onTouchStart(event) {
                event.preventDefault();
                $element.bind('touchmove', onTouchMove);
                $element.bind('touchend', onTouchEnd);
            };

            function onTouchMove(event) {
                var method = $element.attr('ng-touchmove');
                $scope.$event = event;
                $scope.$apply(method);
            };

            function onTouchEnd(event) {
                event.preventDefault();
                $element.unbind('touchmove', onTouchMove);
                $element.unbind('touchend', onTouchEnd);
            };
        }
    };
}).directive('contactNav', [function () {
    return {
        restrict: "E",
        template: '<div class="nav-container">'
        + '    <ul class="alpha-nav" '
        + '        ng-touchmove="goList($event)" '
        + '        ng-touchend="hidePromptBox()" '
        + '        ng-touchstart="goListByTap($event)">'
        + '        <li ng-repeat="charobj in navCharList" '
        + '              data-id="{{charobj.id}}">{{charobj.firstChar}} '
        + '        </li> '
        + '        <div class="prompt-box" ng-show="tipObj.isShow">{{tipObj.content}}</div> '
        + '    </ul> '
        + '</div>',
        replace: false,
        scope: {
            navCharList: "=navCharList",
            charClickCb: "&charClickCb"
        },
        link: function (scope, element, attrs, controller) {
            // 滚动的指定元素
            var _delegateHandle = attrs["delegateHandleName"];
            scope.tipObj = {};

            /*
            * 隐藏提示框
            * @param {object} event [release事件对象]
            * */
            scope.hidePromptBox = function (event) {
                scope.tipObj = { "isShow": false };
            };

            /*
            * 用户单击
            * @param {object} event [release事件对象]
            * */
            scope.goListByTap = function (event) {
                var nodeName = event.target.nodeName.toUpperCase();
                if (nodeName !== "LI") {
                    return;
                }
                //事件源
                var target = angular.element(event.target);
                //首字母
                var firstCode = target.html();
                // 导航事件回调
                var aaaa = scope.charClickCb()(firstCode);

                //标签id
                var id = target.attr("data-id");
                scope.tipObj = { "isShow": true, "content": firstCode };

                scrollCharToTop(id, _delegateHandle);
            };

            /*
            * 用户滑动
            * @param {object} event [release事件对象]
            * */
            scope.goList = function (event) {
                var nodeName = event.target.nodeName.toUpperCase();
                if (nodeName !== "LI") {
                    return;
                }
                // 根据坐标来获取元素！
                var ttt = document.elementFromPoint(
                    event.changedTouches[0].pageX,
                    event.changedTouches[0].pageY
                );
                nodeName = ttt ? ttt.nodeName.toUpperCase() : "";
                if (nodeName !== "LI") {
                    return;
                }
                var target = angular.element(ttt);
                var firstCode = target.html().trim();
                // 导航事件回调
                scope.charClickCb()(firstCode);
                // 导航id
                var id = target.attr("data-id");
                // 提示框
                scope.tipObj = { "isShow": true, "content": firstCode };
                scrollCharToTop(id, _delegateHandle);
            };

            /*
            * 通讯录滚动逻辑
            * @param {object} id [首字母元素ID]
            * @param {object} _delegateHandle [容器对象]
            * */
            function scrollCharToTop(id, _delegateHandle) {
                var charPos = angular.element(document.querySelectorAll("#_" + id));
                var contactContainer = angular.element(document.querySelectorAll("#" + _delegateHandle));
                if (charPos.length === 1) {
                    scrollTop = charPos[0].offsetTop;
                    // 27为元素高度
                    contactContainer[0].scrollTop = scrollTop - 27;
                } else {
                    throw ("nav not exits or more than one");
                }
            }
        }
    };
}]);