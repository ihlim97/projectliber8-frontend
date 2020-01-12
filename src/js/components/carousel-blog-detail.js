$(function() {

    var $carouselContainer = $('.carousel.variant-blog-entry');

    $carouselContainer.find('.carousel-container').slick({
        arrows: true,
        slidesToShow: 1,
        nextArrow: $carouselContainer.find('.arrow-next'),
        prevArrow: $carouselContainer.find('.arrow-prev')
    })
})