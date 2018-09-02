var startBtn = document.getElementsByClassName('btn')[0];
var chessbord = document.getElementsByClassName('chessbord')[0];
var flagbox = document.getElementsByClassName('flagbox')[0];
var score = document.getElementById('score');
var alertImg = document.getElementsByClassName('alertImg')[0];
var alertbox = document.getElementsByClassName('alertbox')[0];
var closeBtn = document.getElementsByClassName('close')[0];
var startGameBoo = true;
var minesNum;//雷的数量
var minesOver;//被标记的雷的数量
var minesMap = [];
var wrapper = document.getElementsByClassName('wrapper')[0];


bindEvent();
function bindEvent(){
    startBtn.onclick = function(){
        if(startGameBoo){
            startGameBoo = false;
            chessbord.style.display = 'block';
            flagbox.style.display = 'block';
            init();
        }
        
    }
    closeBtn.onclick = function(){
        alertbox.style.display = 'none';
        flagbox.style.display = 'none';
        chessbord.style.display = 'none';
        chessbord.innerHTML = '';
        startGameBoo = true;
       
    }
}

//棋盘中的格子出现：
function init(){
    minesNum = 10;
    minesOver = 10;
    score.innerHTML = minesOver;
    
    for(var i = 0;i < 10; i++){
        for(var j =0; j < 10; j++){
            var  con = document.createElement('div');
                con.classList.add('block');
                con.setAttribute('id', i + '-' + j);
                chessbord.appendChild(con);
                minesMap.push({mine:0});
        }
    }
    var block = document.getElementsByClassName('block');
   // 标记雷区
   while(minesNum){
       var mineIndex = Math.floor(Math.random()*100);//从1-100随机生成一个数
       if(minesMap[mineIndex].mine === 0){
           minesMap[mineIndex].mine = 1;
           block[mineIndex].classList.add('isLei');
           minesNum --;
       }
   }
    
    
}
//取消右键的默认事件
wrapper.oncontextmenu = function(){
    return false;
}

chessbord.onmousedown = function(e){
    var event = e.target; // 获取到当前点的是哪个小格
    if(e.which == 1){
        leftClick(event);
    }
    else if(e.which == 3){
        rightClick(event);
    }
}
function leftClick(dom){
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if(dom && dom.classList.contains('isLei')){
        for(var i = 0;i < isLei.length; i++){
            isLei[i].classList.add('show');
        }
        setTimeout(function(){
            alertbox.style.display = 'block';
            alertImg.style.backgroundImage = "url(./img/over.jpg)";
            
        },1000);
    } else{
        var n = 0;//用n来记旁边有多少个雷
        var posArr = dom && dom.getAttribute('id').split('-')//dom存在的前提下，定义一个数组来存点击到的格子的行和列
        var posX = posArr && +posArr[0]; //容错处理，在posArr存在的前提下
        var  posY = posArr && +posArr[1]; //+是为了隐式类型转换,因为posArr得到的是一个字符串的数组
            dom && dom.classList.add('num');
        for(var i = posX - 1;i <= posX + 1;i++){
            for(var j = posY - 1;j <= posY + 1;j ++){
                var aroundBox = document.getElementById(i + '-' +j);
                if(aroundBox && aroundBox.classList.contains('isLei')){
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if(n == 0){ //扩散，递归
            for(var i = posX - 1;i <= posX + 1;i++){
                for(var j = posY - 1; j <= posY + 1; j++){
                    var nearBox = document.getElementById(i + '-' +j);
                    if(nearBox && nearBox.length != 0){
                        if(!nearBox.classList.contains('checked')){
                            nearBox.classList.add('checked');
                            leftClick(nearBox);
                        }
                        
                    }
                }
            }
        }
    }
    
    

}

function rightClick(dom){
   if(dom.classList.contains('num')){
       return;
   }
    dom && dom.classList.toggle('flag');
    if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
        minesOver --;
    }
    if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
        minesOver ++;
    }
    score.innerHTML = minesOver;
    if(minesOver == 0){
        dom.oncontextmenu = function(){
            false;
        }
        alertbox.style.display = 'block';
        alertImg.style.backgroundImage = 'url(./img/success.png)';
    }
    
}

