$(document).ready(function () {

    let clickedNavbar = "";
/*    $('#home').addClass('active');
    $('#home-content').addClass('content-box');
    $('#home').css('pointer-events','none');*/

    $('.icon-bar').on('click','.button', function () {
        $(this).addClass('active').siblings().removeClass('active');
        clickedNavbar = this.id + "-content";
        if(parseInt($(window).width()) > 1280) {
            $('#' + clickedNavbar).toggleClass('content-box');
        }

        $(this).css('pointer-events','none');
        $(this).siblings().css('pointer-events','auto');
        $('#'+clickedNavbar).siblings().attr('class','fade-in');
    });

/*    if(parseInt($(window).width()) < 1080) {
        $('.fade-in .fade-in.content-box').css('width','500px');
        $('.profile-card').css('width','400px')
    }*/
});
