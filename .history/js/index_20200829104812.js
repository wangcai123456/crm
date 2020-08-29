$(function() {

    init();

    async function init() {
        //判断当前用户有没有登录
        let result = await axios.get("/user/login");
        console.log(result);
        if (result.code != 0) {
            alert("你还没有登录，请先登录。。。")
            window.location.href = "login.html";
            return;
        }
        //代表你登录成功了
        let [] = await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        console.log(xx);
    }
})