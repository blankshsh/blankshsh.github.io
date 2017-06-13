$(document).ready(function() {
    //获取localStorage默认
    if (localStorage.user) {
        $("#endscore").show();
        $("#endscore h3 span").text(localStorage.user);
        if (localStorage.score) {
            $("#endscore h4 span").text('您一共答对了' + localStorage.score + '道题目')
        } else {
            $("#endscore h4 span").text('暂未查询到你的分数')
        }
    } else {
        $("#userin").show();
    };
    $("#goform").click(function() {
        var user_ = $("#userin input").val();
        if (user_ == "") {
            alert("请输入名字")
        } else {
            $("#form").show();
            $("#userin").hide();
        }
        localStorage.user = user_;
    });
    $("#answer_radio").delegate(".item .choices li input", "click", function() {
        // console.log($(this));
        $(this).parent("li").siblings().removeClass("cur");
        $(this).parent("li").addClass("cur");
    });
    $("#answer_judgment").delegate(".item .choices li input", "click", function() {
        $(this).parent("li").siblings().removeClass("cur");
        $(this).parent("li").addClass("cur");
    });
    $("#answer_checkbox").delegate(".item .choices_check li input", "click", function() {
        if ($(this).parent("li").hasClass("cur")) {
            $(this).parent("li").removeClass("cur")
        } else {
            $(this).parent("li").addClass("cur");
        }
    });
    $("#answer_radio .item li,#answer_judgment .item li").on("click", function() {
        // console.log($(this));
        // console.log($(this).next().offset().top);
        //答题滚动至下一题
        if ($(this).parents(".item").nextAll().length == 0) {
            var top_ = $(this).parents("ul").next().offset().top;
            $("body,html").animate({
                scrollTop: top_ - 100 + "px"
            });
        } else {
            var top_ = $(this).parents(".item").next().offset().top;
            $("body,html").animate({
                scrollTop: top_ - 100 + "px"
            });
        }
    });
    $("#submit").click(function(e) {
        e.preventDefault();
        // var serialize_=$("form").serialize();
        var radio_score = 0; //单选题分数
        var jud_score = 0; //判断题分数
        //遍历单选题
        //判断value是否正确
        $("#answer_radio .item").each(function() {
            var firstscore = radio_score;
            var radio_input = $(this).find("input");
            for (var i = 0, length_ = 3; i < length_; i++) {
                if (radio_input[i].checked) {
                    //获取选中项
                    $(radio_input[i]).addClass("cur"); //选中项添加cur
                    if (radio_input[i].value == 1) {
                        //如果选中项的value=1，分数+1
                        radio_score = radio_score + 1;
                    }
                }
            }
            //如果分数不变，判断为此题错误
            if (firstscore == radio_score) {
                $(this).addClass("wrongbox");
            }
        });
        console.log(radio_score);
        $("#answer_judgment .item").each(function() {
            var jud_input = $(this).find("input");
            var firstscore = jud_score;
            for (var i = 0, length_ = 2; i < length_; i++) {
                if (jud_input[i].checked) {
                    //获取选中项
                    $(jud_input[i]).addClass("cur"); //选中项添加cur
                    if (jud_input[i].value == 1) {
                        //如果选中项的value=1，分数+1
                        jud_score = jud_score + 1;
                    }
                }
            }
            //如果分数不变，判断为此题错误
            if (firstscore == jud_score) {
                $(this).addClass("wrongbox");
            }
        });
        console.log(jud_score);
        var score = 0;
        $("#answer_checkbox .item").each(function() {
            var checkd_index = 0; //选中答案的个数
            var checkd_value = []; //选中答案的value
            var check_yes = 0; //正确答案的个数
            var firstscore = score;
            var checkbox_input = $(this).find("input"); //获取所有的input
            var checkbox_score = 0; //本题得分
            var length_ = 4;
            for (var i = 0; i < length_; i++) {
                if (checkbox_input[i].checked) {
                    //获取选中项
                    checkd_index++; //多选题选中答案的个数
                    checkd_value.push(checkbox_input[i].value); //把选中答案的值创建新数组。
                    $(checkbox_input[i]).addClass("cur"); //选中项添加cur
                }
                if (checkbox_input[i].value == 1) {
                    check_yes++; //如果value是1 此题正确答案数+1
                }
            }
            if (checkd_index == check_yes) {
                //如果选择数=正确选项的
                if (checkd_value.indexOf(0) == -1) {
                    //选择答案中不含0 判本题分数为1
                    checkbox_score = 1;
                } else {
                    //选择答案中包含0 判分数为0
                    checkbox_score = 0
                }
            }
            if (checkbox_score == 1) {
                //如本体分数为1 那么总分+1
                score = score + 1;
            }
            //如果分数不变，判断为此题错误
            if (firstscore == score) {
                $(this).addClass("wrongbox");
            }
        });
        console.log(score);
        var endscore = radio_score + jud_score + score; //最终成绩
        localStorage.score = endscore;
        $("input").each(function() {
            // console.log($(this).val());
            if ($(this).val() == 1) {
                $(this).parent().addClass("right");
            }
        });
        $(".wrp").addClass("answer_after");
        $("input").attr("disabled", true); //禁止input的选择功能
        $("#endscore").show();
        if (localStorage.user) {
            $("#endscore h3 span").text(localStorage.user);
        };
        if (localStorage.score) {
            $("#endscore h4 span").text('您一共答对了' + localStorage.score + '道题目')
        } else {
            $("#endscore h4 span").text('暂未查询到你的分数')
        };
        $("body,html").animate({
            scrollTop: 0
        });
        $("#submit").hide();
        $("#newanswer_after").show();
    });
    $("#newanswer,#newanswer_after").click(function() {
        if (localStorage.user) {
            localStorage.removeItem("user");
        }
        if (localStorage.score) {
            localStorage.removeItem("score");
        }
        window.location.reload();
    });
})
