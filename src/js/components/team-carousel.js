import "slick-carousel"

$(function() {

    $(".team-carousel").slick({
        slidesToShow: 2,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    })
})