$(function() {
    //登录功能
    $(".submit").click(function(e) {
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();

        if (account === "" || password === "") {
            alert()
        }

    })
})