/*
 *  Project: 
 *  Description: 
 *  Author: 
 *  License: 
 */

;(function ( $, window, document, undefined ) {
    

    // Create the defaults once
    var productCtaName = 'productCta',
        productCta,
        selector,
        btnSelector,
        inputSelector,
        addBtnSelector,
        $addBtn,
        $btn,
        btnType,
        $input,
        tooltipSelector,
        tooltipShowClass,
        defaults = {
            selector: 'productCta',
            tooltipSelector: '.product-quantity-tooltip',
            tooltipShowClass: 'product-quantity-tooltip--show'
        };

    function ProductCta( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = productCtaName;

        this.init();
    }

    ProductCta.prototype = {
        init: function (options) {
            $.extend(this.options, options);

            productCta = this;
            selector = productCta.options.selector;
            btnSelector = 'data-' + selector + '-quantity-btn';
            inputSelector = 'data-' + selector + '-quantity-input';
            addBtnSelector = 'data-' + selector + '-add-btn';
            tooltipSelector = productCta.options.tooltipSelector;
            tooltipShowClass = productCta.options.tooltipShowClass;

            $btn = $(productCta.element).find('[' + btnSelector + ']');
            $input = $(productCta.element).find('[' + inputSelector + ']');
            $addBtn = $(productCta.element).find('[' + addBtnSelector + ']');

            productCta.disableAddBtn();

            $btn.click(function() {
                btnType = $(this).attr(btnSelector);
                productCta.setValue($input, btnType);
                productCta.disableAddBtn();
            });
        },

        setValue: function($element, direction) {
            var currentValue = productCta.getCurrentValue($element),
                newValue;

            if (direction == 'plus') {
                newValue = currentValue + 1;
                $element.val(newValue);
            }
            else if (direction == 'min') {
                if (currentValue != 0) {
                    newValue = currentValue - 1;
                    $element.val(newValue);
                }
            }
            else {
                return false;
            }

        },

        getCurrentValue: function() {
            return parseInt($input.val());
        },

        disableAddBtn: function() {
            if (productCta.getCurrentValue($input) == 0) {
                $addBtn.attr('disabled', true);
                $(productCta.element).find(tooltipSelector).addClass(tooltipShowClass);
            }
            else {
                $addBtn.attr('disabled', false);
                $(productCta.element).find(tooltipSelector).removeClass(tooltipShowClass);
            }
        }
    };

    $.fn[productCtaName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + productCtaName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + productCtaName, new ProductCta( this, options ));
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
                var instance = $.data(this, 'plugin_' + productCtaName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof ProductCta && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + productCtaName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));
