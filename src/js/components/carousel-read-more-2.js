import "slick-carousel"

$(function() {
    var $carousel = $(".carousel-read-more-2");

    $carousel.slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        mobileFirst: true,
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
