jQuery(function ($) {
    resizeImages();
    
    $('#home-slider img').on('load', resizeImages);
    $(window).resize(resizeImages);
    
    // We resize the images continuously for 20 seconds to fix an annoying Chrome bug
    var start = new Date();
    
    var interval = setInterval(function () {
        resizeImages();
        
        if((new Date()) - start >= 20000) {
            clearInterval(interval);
        }
    }, 1000);
    
    var nav = $('#main-nav');
    var win = $(window);
    var toTop = $('#to-top');
    var anim2 = {queue: false, duration: 200};
        
    $('#main-nav').on('mouseenter', function () {
        $(this).find('.submenu').animate({'opacity': 1}, anim2);
    }).on('mouseleave', function () {
        win.scroll();
    });
    
    win.scroll(function () {
        var top = win.scrollTop();
        nav.css('top', top);
        
        if(top > 10) {
            $('#main-nav .submenu').animate({'opacity': 0.1}, anim2);
        } else {
            $('#main-nav .submenu').animate({'opacity': 1}, anim2);
        }
        
        if(top > 100) {
            toTop.show();
        } else {
            toTop.hide();
        }
    }).scroll();
    
    toTop.click(function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: "0px" }, 200);
    });
});

function resizeImages () {
    var imgs = $('#wrapper .slide > img, #wrapper .slide > section > img').not('.no-scale');
    var slides = $('#wrapper .slide');
    var win = $(window);
    var width = win.width();
    
    // For every image...
    imgs.each(function () {
        var img = $(this);
        var height = img.closest('.slide').height();
        
        // What shall we resize?
        var widthRatio = img.width() / width;
        var heightRatio = img.height() / height;
        var lowerRatio = Math.min(widthRatio, heightRatio);
        
        var imgWidth = img.width();
        var imgHeight = img.height();
        
        img.height('height', imgHeight / lowerRatio);
        img.width('width', imgWidth / lowerRatio);
        
        imgWidth = img.width();
        imgHeight = img.height();
        
        if(img.closest('.slide').hasClass('row-2')) {
            console.log(height, imgHeight, (height - imgHeight));
        }
        
        // Center
        img.css('top', (height - imgHeight) / 2); // The top of the image should always be visible
        img.css('left', (width - imgWidth) / 2);
    });
    
    // For every image...
    slides.each(function () {
        var slide = $(this);
        
        // What shall we resize?
        var height = win.height();
        slide.css('height', height);
    });
    
    
    
    var count = imgs.length;
    var preloader = $('#preloader');
    
    imgs.on('load', function () {
        count--;
        
        if(count === 0) {
            preloader.fadeOut();
        }
    });

}

