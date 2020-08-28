$(function() {
    //登录功能
    $(".submit").click(async function(e) {
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();

        if (account === "" || password === "") {
            alert("账号和密码不能为空~");
            return;
        }
        //可以自己通过正则自己校验你的用户名和密码的规则
        password = md5(password);
        // console.log(account, password);

        //发出Ajax请求
        axios.post("/user/login", {
            account,
            password
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })

        let res = await axios.post("/user/login", { account, password })
    });
})