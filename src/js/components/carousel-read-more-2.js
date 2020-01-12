import "slick-carousel"

$(function() {
    var $carousel = $(".carousel-read-more-2");

    $carousel.slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        mobileFirst: true,
        prevArrow: $('.carousel-read-more-2-container .arrow-prev'),
        nextArrow: $('.carousel-read-more-2-container .arrow-next'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    dots: false
                }
            }
        ]
    })
});
