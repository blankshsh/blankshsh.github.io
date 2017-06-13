//随机抽取
function extract(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
//随机抽取
function extract02(arr, count) {
    var temp_arr = arr;
    temp_arr.sort(function() {
        return 0.5 - Math.random();
    });
    var length = temp_arr.length,
        shuffled = [];
    if (length >= count) {
        for (var i = 0; i < count; i++) {
            shuffled.push(temp_arr[i]);
        }
    } else {
        for (var i = 0; i < length; i++) {
            shuffled.push(temp_arr[i]);
        }
    }
    return shuffled;
}

function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = [];
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = [];
    for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}

radio_ = extract02(radio_, 50);
// console.log(radio_);
judgment_ = extract02(judgment_, 40);
checkbox_ = extract02(checkbox_, 10);
//radio_.sort(function() {return 0.5 - Math.random()});//打乱数组

function addradio_(rad_data) {
    var length_ = rad_data.length;
    // var answerlength = data[0][1].length;
    for (var i = 0; i < length_; i++) {
        var innerdata = rad_data[i];
        rad_data[i][1].sort(function() {
            return 0.5 - Math.random()
        }); //打乱数组
        // console.log(data[i][1]);
        add_div_rad(innerdata, i);
    }
    // console.log(answerlength);

    function add_div_rad(data, datanum) {
        //num答案length,data答案内容,datanum记录数组内的编码
        datanum = datanum + 1;
        var answer_radio_ = $('#answer_radio');
        var li_ = $('<li class="item">'),
            div_ = $('<div class="title">'),
            div_p = $('<p>').text(datanum + "." + data[0]),
            ul_ = $('<ul class="choices">');
        for (var i = 0; i < 3; i++) {
            var ul_li = $('<li>'),
                ul_li_input = $('<input type="radio" name="rad_' + datanum + '" value="' + data[1][i][1] + '">'),
                ul_li_label = $('<label>'),
                ul_li_label_p = $("<p>").text(data[1][i][0]),
                ul_li_label_i = $("<i>").text(ABC_[i]);
            ul_.append(ul_li.append(ul_li_input).append(ul_li_label.append(ul_li_label_i).append(ul_li_label_p)));
        }
        answer_radio_.append(li_.append(div_.append(div_p)).append(ul_));
    }
}

function addjudgment_(jud_data) {
    var length_ = jud_data.length,
        answerlength = 2;
    for (var i = 0; i < length_; i++) {
        var innerdata = jud_data[i];
        add_div_jud(innerdata, i);
    }

    function add_div_jud(data, datanum) {
        datanum = datanum + 1;
        var answer_jud_ = $('#answer_judgment');
        var num_ = data.length;
        var li_ = $('<li class="item">'),
            div_ = $('<div class="title">'),
            div_p = $('<p>').text(datanum + "." + data[0]),
            ul_ = $('<ul class="choices cf">');
        for (var i = 0; i < 2; i++) {
            // console.log(i);
            var ul_li = $('<li>'),
                ul_li_input = $('<input type="radio" name="jud_' + datanum + '" value="' + data[1][i] + '">'),
                ul_li_label = $('<label>');
            if (i == 0) {
                var ul_li_label_p = $("<p>").text("对"),
                    ul_li_label_i = $("<i>").text("✓");
            } else {
                var ul_li_label_p = $("<p>").text("错"),
                    ul_li_label_i = $("<i>").text("☓");
            }
            ul_.append(ul_li.append(ul_li_input).append(ul_li_label.append(ul_li_label_i).append(ul_li_label_p)));
        }
        answer_jud_.append(li_.append(div_.append(div_p)).append(ul_));
    }
};

function addcheckbox_(check_data) {
    var length_ = check_data.length;
    // var answerlength = data[0][1].length;
    for (var i = 0; i < length_; i++) {
        var innerdata = check_data[i];
        check_data[i][1].sort(function() {
            return 0.5 - Math.random()
        }); //打乱数组
        // console.log(data[i][1]);
        add_div_check(innerdata, i);
    }
    // console.log(answerlength);

    function add_div_check(data, datanum) {
        //num答案length,data答案内容,datanum记录数组内的编码
        datanum = datanum + 1;
        var answer_check_ = $('#answer_checkbox');
        var li_ = $('<li class="item">'),
            div_ = $('<div class="title">'),
            div_p = $('<p>').text(datanum + "." + data[0]),
            ul_ = $('<ul class="choices_check">');
        for (var i = 0; i < 4; i++) {
            //console.log(i);
            var ul_li = $('<li>'),
                //ul_li_input = $('<input type="checkbox" name="check_' + datanum + '" value="check_' + datanum +'_'+ data[1][i][1] + '">'),
                ul_li_input = $('<input type="checkbox" name="check_' + datanum + '" value="' + data[1][i][1] + '">'),
                ul_li_label = $('<label>'),
                ul_li_label_p = $("<p>").text(data[1][i][0]),
                ul_li_label_i = $("<i>").text(ABC_[i]);
            ul_.append(ul_li.append(ul_li_input).append(ul_li_label.append(ul_li_label_i).append(ul_li_label_p)));
        }
        answer_check_.append(li_.append(div_.append(div_p)).append(ul_));
    }
}

$(document).ready(function() {
    addradio_(radio_);
    addjudgment_(judgment_);
    addcheckbox_(checkbox_);
});
