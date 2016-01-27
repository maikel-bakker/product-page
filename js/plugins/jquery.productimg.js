;(function ($, window, document, undefined) {

    var productImgName = "productImg",
        productImg,
        targetEl,
        activeClass,
        dataKey = "plugin_" + productImgName;

    var productImgConstruct = function (element, options) {

        this.element = element;

        this.options = {
            targetSelector: 'data-productimg-target',
            activeClass: 'product-thumbnails-item-link--active'
        };

        this.init(options);
    };

    productImgConstruct.prototype = {

        init: function (options) {
            $.extend(this.options, options);

            productImg = this;
            targetEl = '[' + productImg.options.targetSelector + ']';
            activeClass = productImg.options.activeClass;

            $(productImg.element).click(function() {
                var targetSrc = $(this).find('img').attr('src'),
                    targetAlt = $(this).find('img').attr('alt');

                productImg.replaceImg(targetSrc, targetAlt);
                productImg.setActive($(this));
            });
        },

        replaceImg: function (src, alt) {

            $(targetEl).attr('src', src).attr('alt', alt);
        },

        setActive: function($element) {
            $(productImg.element).removeClass(activeClass);
            $element.addClass(activeClass);
        }

    };

    $.fn[productImgName] = function (options) {

        var productImg = this.data(dataKey);

        if (productImg instanceof productImgConstruct) {
            if (typeof options !== 'undefined') {
                productImg.init(options);
            }
        } else {
            productImg = new productImgConstruct(this, options);
            this.data(dataKey, productImg);
        }

        return productImg;
    };

}(jQuery, window, document));
