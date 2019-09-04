$(document).ready(() => {
    const $mobileMenu = $('.mobile-menu');
    const $menuButton = $('.mobile-menu-icon');
    const menu = '<nav class="menu menu_display_flex menu_width_100"><ul class="menu-items menu-items_display_block menu-items_height_auto"><li class="menu-items__item menu-items__item_display_block menu-items__item_line-height_5"><a href="#" class="link">Home</a></li><li class="menu-items__item menu-items__item_display_block menu-items__item_line-height_5"><a href="#anchor-features" class="link">Features</a></li><li class="menu-items__item menu-items__item_display_block menu-items__item_line-height_5"><a href="#anchor-reviews" class="link">Reviews</a></li><li class="menu-items__item menu-items__item_display_block menu-items__item_line-height_5"><a href="#anchor-downloads" class="link">Downloads</a></li></ul></nav>';

    $(() => {
        $('a[href^="#"]').click(function anchorScroll() {
            const href = $(this).attr('href');

            $('html, body').animate({
                scrollTop: `${$(href).offset().top}px`,
            });

            return false;
        });
    });

    $menuButton.click(() => {
        $mobileMenu.html(menu);
        $mobileMenu.slideToggle();
        $('.mobile-menu .menu-items__item').addClass('menu-items__item_display_block');
    });
});
