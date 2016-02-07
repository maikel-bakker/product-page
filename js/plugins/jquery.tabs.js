;(function ( $, window, document, undefined ) {

    "use strict";


    // Create the defaults once
    var tabsName = "tabs",
        tabs,
        tabsContent,
        initialHash,
        tabsLinkSelector,
        tabsLink,
        linkActiveClass,
        scrollToOffset,
        callbackSelector,
        defaults = {
            contentSelector: 'data-tabs-content',
            linkSelector: 'data-tabs-link',
            callbackSelector: 'data-tabs-link-callback',
            linkActiveClass: 'tabs-link-active',
            scrollToOffset: 0
        };

    // The actual plugin constructor
    function Tabs ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = tabsName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Tabs.prototype, {
        init: function () {
            tabs = this;
            tabsContent = '[' + tabs.settings.contentSelector + ']';
            initialHash = window.location.hash;
            tabsLinkSelector = tabs.settings.linkSelector
            tabsLink = '[' + tabsLinkSelector + ']';
            linkActiveClass = tabs.settings.linkActiveClass;
            scrollToOffset = tabs.settings.scrollToOffset;
            callbackSelector = tabs.settings.callbackSelector;

            //Set tab on page load
            tabs.initialTab();

            //Set tab on history change
            $(window).on('popstate', function() {
                var target = window.location.hash;

                tabs.hideAllTabs();
                tabs.showTab(target, true);
                tabs.removeAllActive();
                tabs.setActive();
            });

            //Change tab on click
            $(tabsLink).click(function() {
                var target = $(this).attr('href');

                //Check if accordion
                if ($(this).attr('data-tabs-link') == 'accordion') {
                    if ($(this).hasClass(linkActiveClass)) {
                        tabs.hideTab(target);
                        tabs.removeActive($(this), linkActiveClass);
                    }
                    else {
                        tabs.hideAllTabs();
                        tabs.showTab(target);

                        tabs.removeAllActive();
                        tabs.setActive();

                        tabs.scrollTo($(this)[0]);
                    }

                }
                else {
                    //Don't fire functions when a link is active
                    if (!$(this).hasClass(linkActiveClass)) {
                        tabs.hideAllTabs();
                        tabs.showTab(target);

                        tabs.removeAllActive();
                        tabs.setActive();
                    }

                }

                //Callback
                if ($(this).attr(callbackSelector)) {
                    var callback = new Function($(this).attr(callbackSelector));
                    callback();
                }

                return false;

            });

        },

        showTab: function(target, isPopState) {
            $(target).fadeIn(300);

            if (!isPopState) {
                tabs.historyPushState(target);
            }

        },

        toggleTab: function(target) {
            $(target).fadeToggle(300);
        },

        hideTab: function(target) {
            $(target).hide();
        },

        hideAllTabs: function() {
            $(tabsContent).hide();
        },

        setActive: function() {

            //Check the active tab (set by the showTab function)
            var activeTab = '#' + $(tabsContent+':visible').attr('id'),

            //Target the link corresponding to the active tab
                $target = $(tabsLink + '[href="' + activeTab + '"]');

            //Set the active css class
            $target.addClass(linkActiveClass);
        },

        removeActive: function($element, cssClass) {
            var href = $element.attr('href');
            $element.removeClass(cssClass);
            $(tabs.element).find(tabsLink + '[href="' + href + '"]').removeClass(cssClass);
        },

        removeAllActive: function() {
            $(tabsLink).removeClass(linkActiveClass);
        },

        initialTab: function() {
            //If there is a hash in the link on page load: show that tab
            if (initialHash) {
                tabs.showTab(initialHash, true);
                tabs.removeAllActive();
                tabs.setActive();
            }
            //if there is an active class on a link on init; show that target
            else if ($(tabs.element).find('.' + linkActiveClass).length > 0) {
                var target = $(tabs.element).find('.' + linkActiveClass).attr('href');

                tabs.hideAllTabs();
                tabs.showTab(target, true);
                tabs.historyReplaceState(target);
            }
        },

        historyPushState: function(target) {
            if(history.pushState) {
                history.pushState(null, null, target);
            }
            else {
                location.hash = target;
            }
        },

        historyReplaceState: function(target) {
            if(history.replaceState) {
                history.replaceState(null, null, target);
            }
        },

        scrollTo: function(target) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - scrollToOffset
            }, 300);
        }
    });

    $.fn[ tabsName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + tabsName ) ) {
                $.data( this, "plugin_" + tabsName, new Tabs( this, options ) );
            }
        });
    };

})( jQuery, window, document );
