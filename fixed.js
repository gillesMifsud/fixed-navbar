(function () {

    // Returns the number of pixels that the document has already been scrolled vertically.
    var scrollY = function () {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    };

    var menu = document.querySelector('.menu');
    /*
        getBoundingClientRect() returns element size & position relative to viewport
        zone d'affichage = viewport
    */
    var rect = menu.getBoundingClientRect();

    var top = rect.top + scrollY();

    // As the section won't stick to fixed menu anymore :
    // we then create a div with same height&width than menu
    var faked = document.createElement('div');
    faked.style.width = rect.width + "px";
    faked.style.height = rect.height + "px";

    var onScroll = function ()
    {
        // Define var contains fixed property
        var classFixed = menu.classList.contains('fixed');
        if (scrollY() > top && !classFixed)
        {
            menu.style.width = rect.width + "px";
            menu.classList.add('fixed');
            menu.parentNode.insertBefore(faked, menu);
        }
        else if (scrollY() < top && classFixed)
        {
            menu.classList.remove('fixed');
            menu.parentNode.removeChild(faked);
        }
    };

    // If user resize browser window
    var onResize = function()
    {
        menu.style.width = "auto";
        menu.classList.remove('fixed');
        faked.style.display = "none";
        rect = menu.getBoundingClientRect();
        top = rect.top + scrollY();
        faked.style.width = rect.width + "px";
        faked.style.height = rect.height + "px";
        faked.style.display = "block";
        onScroll();
    };

    // Listeners
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

})();

