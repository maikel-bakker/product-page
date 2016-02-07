/*
 *  Project: 
 *  Description: Modal plugin
 *  Author: Maikel Bakker
 *  License: 
 */

;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var modalName = 'modal',
        defaults = {
            modalSelector: 'data-modal',
            modalWrapper: $('#modal-template').html(),
            noScrollClass: 'no-scroll'
        };

    function Modal( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = modalName;

        this.init();
    }

    Modal.prototype = {
        init: function() {
            this.bindOpenBtn(this.element, this.options.modalSelector);
        },

        createModal: function(html) {
            var newHtml = html.replace('{{content}}', this.options.content);

            $(newHtml).appendTo('body').addClass('modal--show');
            this.bodyNoScroll('add');
            this.bindCloseBtn();
            this.clickOutsideClose($(newHtml));
        },

        closeModal: function($element) {
            $element.parents('[' + this.options.modalSelector + '="open"]').remove();
            this.bodyNoScroll('remove');
        },

        bindOpenBtn: function(btn, selector) {
            var modal = this,
                modalWrapper = modal.options.modalWrapper;

            $(btn).click(function() {
                var target = $(btn).attr(selector),
                    targetHtml = $(target).html(),
                    newModal = modalWrapper.replace('{{content}}', targetHtml);

                modal.createModal(newModal);
            });
        },

        bindCloseBtn: function() {
            var modal = this;

            $('[' + this.options.modalSelector + '="close"]').click(function() {
                modal.closeModal($(this));
            });
        },

        bodyNoScroll: function(action) {
            if (action == 'add') {
                $('body').addClass(this.options.noScrollClass);
            }
            else if (action == 'remove') {
                $('body').removeClass(this.options.noScrollClass);
            }
        },

        clickOutsideClose: function($element) {
            var modal = this,
                modalContainer = '[' + modal.options.modalSelector + ']',
                modalBlock = '[' + modal.options.modalSelector + '="block"]';

            $(document).bind('mouseup touchend', function (e) {
                var container = $element.find(modalBlock);

                if (!container.is(e.target) && container.has(e.target).length === 0)
                {
                    modal.closeModal($(modalContainer));
                }
            });
        }

    };

    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultmodalName('functionName', arg1, arg2)
    $.fn[modalName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + modalName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + modalName, new Modal( this, options ));
                }
            });

            // If the first parameter is a string and it doesn't start
            // with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + modalName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Modal && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + modalName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));