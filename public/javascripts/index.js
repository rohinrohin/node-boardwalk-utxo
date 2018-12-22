setTimeout(alert("The page has been autofilled with the following data: username-karthiknishant1997@gmail.com, pass-0 and Group1. Please feel free to change the information. "), 1500);

$('input[type="submit"]').click(function () {
    $('.login').addClass('test')
    setTimeout(function () {
        $('.login').addClass('testtwo')
    }, 300);
    setTimeout(function () {
        $(".authent").show().animate({
            right: -320
        }, {
            easing: 'easeOutQuint',
            duration: 600,
            queue: false
        });
        $(".authent").animate({
            opacity: 1
        }, {
            duration: 200,
            queue: false
        }).addClass('visible');
    }, 500);

    var data = {
        username: $('#username').val(),
        password: $('#password').val(),
        group_no: $('#group_no').val(),
    }

    
    $.ajax({
        type: 'POST',
        url: '/api/balance',
        data: JSON.stringify(data),
        success: function (data) {
            $("#balance").text(data.finalSum)
            setTimeout(function () {
                $(".authent").show().animate({
                    right: 90
                }, {
                    easing: 'easeOutQuint',
                    duration: 600,
                    queue: false
                });
                $(".authent").animate({
                    opacity: 0
                }, {
                    duration: 200,
                    queue: false
                }).addClass('visible');
                $('.login').removeClass('testtwo')
            }, 10);

            setTimeout(function () {
                $(".login").css("height", "143px")
                $('.login').removeClass('test')
                $('.login div').fadeOut(123);
            }, 310);
            setTimeout(function () {
                $('.success').fadeIn();
            }, 510);

            // data = JSON.parse(data);
        },
        fail: function (xhr, textStatus, errorThrown) {
            location.reload();
            alert('Incorrect information please try again');
        },
        contentType: "application/json",
        dataType: 'json'
    });

   
});

(function ($) {
    $(document).on('ajaxError', function (event, xhr) {
        if (xhr.status === 401 || xhr.status === 403) {
            window.location.reload();
            alert("AUTHENTICATION FAILED! Please enter correct details and try again. ")
        }
    });
})(jQuery);


$('input[type="text"],input[type="password"]').focus(function () {
    $(this).prev().animate({
        'opacity': '1'
    }, 200)
});
$('input[type="text"],input[type="password"]').blur(function () {
    $(this).prev().animate({
        'opacity': '.5'
    }, 200)
});

$('input[type="text"],input[type="password"]').keyup(function () {
    if (!$(this).val() == '') {
        $(this).next().animate({
            'opacity': '1',
            'right': '30'
        }, 200)
    } else {
        $(this).next().animate({
            'opacity': '0',
            'right': '20'
        }, 200)
    }
});

var open = 0;
$('.tab').click(function () {
    $(this).fadeOut(200, function () {
        $(this).parent().animate({
            'left': '0'
        })
    });
});