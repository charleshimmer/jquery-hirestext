/*!
 * High Res Text jQuery plugin
 * https://github.com/charleshimmer/jquery-hirestext
 *
 * When using webkits transform to do 3d scaling (-webkit-transform: scale3d(x, y, z);)
 * text will become blurry when zoomed in.  This plug implements a work around to fix this
 * by doubling the font-size of an elements children elments and then scaling the element
 * back by 50%.  
 *
 * Copyright 2012, Charles Himmer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

(function($){
    $.hisResText = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("hisResText", base);
        
        base.init = function(){
            base.options = $.extend({},$.hisResText.defaultOptions, options);

            // wrap element
            base.$el.children().wrapAll('<div class="wrapper" style="-webkit-transform: scale3d(0.5, 0.5, 1); width: 200%; height: 200%;"></div>');
        };

        base.findTextElements = function(callback){
            $.each(base.$el.find('.wrapper').children(), function(index, el){
                base.addHiResText(el);
            });
        };

        base.addHiResText = function(element){
            var $el = $(element),
                scale = base.options.scale;

            var fontSize = parseFloat($el.css('fontSize')),
                sizeScaled = 1 / base.options.scale,
                widthScaled = parseFloat($el.css('width')) * base.options.scale,
                heightScaled = parseFloat($el.css('height')) / base.options.scale;
            
            $el.css({
                // increase font by scale factor
                'fontSize': fontSize * base.options.scale
            });

            // will need to double width of element to make up for the scale
        };
        
        // Run initializer
        base.init();

        base.findTextElements();
    };

    $.hisResText.active = $.browser.webkit;
    
    $.hisResText.defaultOptions = {
        scale: 2
    };
    
    // apply as a plugin
    $.fn.hisResText = function(options){
        // we only want to apply the plugin for
        // webkit browsers
        if( ! $.hisResText.active){
            return;
        }

        return this.each(function(){
            (new $.hisResText(this, options));
        });
    };
    
})(jQuery);