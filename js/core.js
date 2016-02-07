/**
 * Created by maikelbakker on 27/01/16.
 */

$(document).ready(function() {
    $('.product-thumbnails-item-link').productImg();

    $('[data-productcta]').productCta();

    $('[data-modal]').modal();

    $('[data-tabs]').tabs();
});