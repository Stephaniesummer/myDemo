(function(){
    var num = 1;
    var oLi = $('li');
    var flag = true;
    getData();
   
    function getData(){
        if(flag){
        flag = false;
        $.ajax({
        type:'GET',
        url:'http://localhost/web/waterfall/js/getPics.php?cPage='+ num,
        success:addDom,
        beforeSend:function(){
            $('.loading').show();
        },
        error:function(){
            console.log('error！')
             }
        });
        num++;
        }
        
    }
    function addDom(data){
        $('.loading').hide();
        dataList = JSON.parse(data)
        // console.log(dataList);
        if(!flag && dataList.length){
            dataList.forEach(function(ele,index){
                var iDiv = $('<div class = "item"></div>');
                var imgBox = $('<div class = "image"></div>')
                var oImg = new Image(); // 创建一个img对象
                var oP = $('<p></p>');
                oP.text(ele.title);
                oImg.src = ele.preview;
                oImg.onload = function(){
                    imgBox.append(oImg);
                    iDiv.append(imgBox).append(oP);
                    var index = getMinList(oLi);
                    $(oLi[index]).append(iDiv);
                    flag = true;
                }
                
            })
        }
        
        
    }
    function getMinList(dom){
        var minHeight = parseInt($(dom[0]).css('height'));
        index = 0;
        for(var i=0;i<dom.length;i++){
            var height = parseInt($(dom[i]).css('height'));
            if(height < minHeight){
                minHeight = height;
                index = i;
            }
        }
        return index;
       
    }
    $(window).scroll(function(){
        var scrollHeight = $(window).scrollTop;
        var clientHeight = $(window).height;
        var minList = $(oLi[getMinList(oLi)]).css('height');
        if(scrollHeight + clientHeight > minList){
            getData();
        }
       
   
    })
    
}())