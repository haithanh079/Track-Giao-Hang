
function onloadCallback() {
    var orderInfo = document.getElementById('orderInfo');
    var orderId = document.getElementById('orderId').value;
    var response = grecaptcha && grecaptcha.getResponse && grecaptcha.getResponse();
    
    orderInfo.innerHTML = '';
    grecaptcha.execute();
    
    if(response && response.length == 0) {
        grecaptcha.execute();
    } else {
        jQuery.ajax({
            type:"GET",
            url: "//khachhang.giaohangtietkiem.vn/khach-hang/tracking/order",
            //                url: "http://ecom.example.com/khach-hang/tracking/order",
            beforeSend: function (request) {
                request.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
            },
            data: 'orderId=' + orderId + '&t=' + new Date().getTime() + '&g-recaptcha-response=' + response ,
            dataType: 'html',
            success: function(data){
                grecaptcha && grecaptcha.reset();
                orderInfo.innerHTML = data;
            },
            error: function() {
                grecaptcha && grecaptcha.reset();
                orderInfo.innerHTML = '<div class="alert alert-warning" role="alert">Có lỗi trong quá trình kiểm tra vận đơn. Hãy liên hệ GHTK qua email admin@ghtk.vn để được hỗ trợ.</div>';
            }
        });
    }
    
}
