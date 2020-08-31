$(function() {

    init();

    let $plan = $.Callbacks(); //用来实现发布订阅

    $plan.add((_, baseInfo) => {
        console.log(baseInfo);
        //渲染用户信息和实现退出登录
        // console.log("渲染用户信息和实现退出登录:", baseInfo);
        $(".baseBox>span").html(`你好，${baseInfo.name||''}`)

        //实现退出登录
        $(".baseBox>a").click(async function() {
            let result = await axios.get("/user/signout")
            if (result.code == 0) {
                //退出登录
                window.location.href = "login.html"
                return;
            }
            //退出登录失败
            alert("网络不给力，稍后再试")
        })
    })
    $plan.add((power) => {
        //渲染菜单
        // console.log("渲染菜单:", power); //power此用户的权限
        let str = '';
        if (power.includes("userhandle")) {
            str += `
            <div class="itemBox" text="员工管理">
            <h3>
            <i class="inconfont icon-yuangong"></i>
            员工管理
            </h3>
            <nav class="item">
            <a href="page/userlist.html" target="iframe
            `
        }
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
        console.log(power); //获取此用户的权限
        // console.log(baseInfo);//获取用户的基本信息

        power.code === 0 ? power = power.power : null;
        baseInfo.code === 0 ? baseInfo = baseInfo.data : null;

        $plan.fire(power, baseInfo) //发布
    }
})