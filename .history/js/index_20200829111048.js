$(function() {

    init();

    let $plan = $.Callbacks(); //用来实现发布订阅

    $plan.add((_, baseInfo) => {
        console.log(baseInfo);
        //渲染用户信息和实现退出登录
        // console.log("渲染用户信息和实现退出登录:", baseInfo);
        $(".baseBox>span").html(`你好，${baseInfo.data.name||''}`)
    })
    $plan.add((power) => {
        //渲染菜单
        console.log("渲染菜单:", power);
    });

    async function init() {
        //判断当前用户有没有登录
        let result = await axios.get("/user/login");
        // console.log(result);
        if (result.code != 0) {
            alert("你还没有登录，请先登录。。。")
            window.location.href = "login.html";
            return;
        }
        //代表你登录成功了
        let [power, baseInfo] = await axios.all([
                axios.get("/user/power"),
                axios.get("/user/info")
            ])
            // console.log(power);
            // console.log(baseInfo);

        baseInfo.code === 0 ? baseInfo = baseInfo.data

        $plan.fire(power, baseInfo)
    }
})