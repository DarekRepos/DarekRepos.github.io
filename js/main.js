(function (window) {
    'use strict';
    // responsive pinnable sidemenu component
    window.SideMenu = function (el) {
        let htmlSideMenu = el, htmlSideMenuPinTrigger = {}, htmlSideMenuPinTriggerImage = {};
        var init = function () {
            htmlSideMenuPinTrigger = el.querySelector('.sidebar-menu-pin-trigger');
            htmlSideMenuPinTriggerImage = htmlSideMenuPinTrigger.querySelector('i.fa');

            Array.prototype.forEach.call(document.querySelectorAll('.sidebar-menu-trigger'), function (elmt, i) {
                elmt.addEventListener('click', function (e) {
                    e.preventDefault();
                    toggleMenuState();
                }, false);
            });
            htmlSideMenuPinTrigger.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMenuPinState();
            }, false);

            window.addEventListener("resize", checkIfNeedToCloseMenu, false);
            checkIfNeedToCloseMenu();
        };
        const toggleMenuState = function () {
            htmlSideMenu.classList.toggle('open');
            menuStateChanged(htmlSideMenu, htmlSideMenu.classList.contains('open'));
        };
        const toggleMenuPinState = function () {
            htmlSideMenu.classList.toggle('pinned');
            htmlSideMenuPinTriggerImage.classList.toggle('fa-rotate-90');
            if (htmlSideMenu.classList.contains('pinned') !== true) {
                htmlSideMenu.classList.remove('pinned');////-<
            }
            menuPinStateChanged(htmlSideMenu, htmlSideMenu.classList.contains('pinned'));
        };
        const checkIfNeedToCloseMenu = function () {
            const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (width <= 767 && htmlSideMenu.classList.contains('open') === true) {
                htmlSideMenu.classList.remove('open');
                menuStateChanged(htmlSideMenu, htmlSideMenu.classList.contains('open'));
            }
            if (width > 767 && htmlSideMenu.classList.contains('pinned') === false) {
                htmlSideMenu.classList.remove('open');
                menuStateChanged(htmlSideMenu, htmlSideMenu.classList.contains('open'));
            }
        };
        const menuStateChanged = function (element, state) {
            const evt = new CustomEvent('menuStateChanged', {detail: {open: state}});
            element.dispatchEvent(evt);
        };
        const menuPinStateChanged = function (element, state) {
            const evt = new CustomEvent('menuPinStateChanged', {detail: {pinned: state}});
            element.dispatchEvent(evt);
        };
        init();
        return {
            htmlElement: htmlSideMenu,
            toggleMenuState: toggleMenuState,
            toggleMenuPinState: toggleMenuPinState
        };
    };
})(window);


const documentReady = function (fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

documentReady(function() {
    const sidebarMenu = new SideMenu(document.querySelector('.sidebar-menu'));
    sidebarMenu.htmlElement.addEventListener('menuPinStateChanged', function(e) {
    }, false);
    sidebarMenu.htmlElement.addEventListener('menuStateChanged', function(e) {
    }, false);
});

