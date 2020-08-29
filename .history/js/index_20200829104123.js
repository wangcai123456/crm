$(function() {

    init();

    async function init() {
        //判断当前用户有没有登录
        let result = await axios.get("/user/login");
        console.log(result);
        if (result.code != 0)
    }
})