/**
 * @description random array
 * @param array
 * @return {*}
 */
// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
* @description append classname to 'i'
* @param $card
* @param cards_all
*/
function addDom($card,cards_all) {
  $card.each(function(i) {
    $(this).find('.fa').addClass(cards_all[i]);
  });
}
/**
* @description display the symbol of click card
* @param $card
* @param index
*/
function displaySymbol($card,index) {
   $card[index].className += ' open show';
}
/**@description check the situation of two cards
 * @param openCard
 * @param matchlength
 * @param counter
 * @param startnum
 * @param clearid
 * @param mydate
 * @param $card
 */
 function checkMatch(openCard,matchlength,counter,startnum,clearid,mydate,$card) {
    let second;
    let card1 = $card[openCard[0]].children[0].className;
    let card2 = $card[openCard[1]].children[0].className;
    if(card1 === card2){
      lockCard($card,openCard);
      matchlength.push(openCard[0]);
      matchlength.push(openCard[1]);
    }
    else {
      removeCard($card,openCard);
    }
    if(matchlength.length === 16){
      second = second(mydate);
      addMessage(counter,startnum,second);
      clearTimeout(clearid);
    }
 }
 /**
 *@description diaplay the information when player is win
 *@param counter
 *@param startnum
 *@param second
 */
 function addMessage(counter,startnum,second) {
   $('.container').remove();
   let html = $('<div class ="result"><div>');
   let html = $('<p class ="re-won">Congratulations! you won !</p>');
   let info2 = $('<p class="re-moves">With&nbsp;'+counter+'&nbsp;Moves&nbsp;&nbsp;,&nbsp;&nbsp;'+second+'&nbsp;seconds&nbsp;&nbsp;and&nbsp;&nbsp;'+startnum+'&nbsp;Stars. </p>');
   let info3 = $('<p class="re-moves">Woooooo!</p>');
   let button = $('<p class="re-button">Play again!</p>');
   html.append(info1,info2,info3,button);
   $(document.body).append(html);
   restart('.re-button');
 }
 /**@description play function
 * @param $card
 */
 function play($card) {
   let openCard = [];
   let matchLength = [];
   let counter = 0;
   let startnum, clearid,mydate;
   let time = true;
   $card.bind("click",funtion() {
    if(time){
      let beDate = new Date();
      myDate = beDate.getTime();
      clearid = timer(0);
      time = false;
    }
    let n = $card.index(this);
    openCard.push(n);
    if (openCard[0]!=openCard[1]){
      displaySymbol($card,n);
    }
    else{
      openCard.pop();
    }
    if(openCard.length === 2){
      counter +=1;
      displayNum(counter);
      startnum = displayStar(counter);
      checkMatch(openCard,matchlength,counter,startnum,clearid,myDate,$card);
      openCard.splice(0,openCard.length);
    }
   })
 }
 /**@description display the pace of player
 * @param counter
 */
 functin displayNum(counter) {
   $('.moves').text("").append(counter);
 }
 /**@description display the starts of player
 *@param counter
 *@return {jQuery}
 */
 function displayStar(counter) {
   if(counter >12 && counter <=16) {
     $('.stars>li:eq(2)').remove();
   }
   else if(counter>16) {
     $('.starts >li:eq(1)').remove();
   }
   let starnum = $(".stars>li").length;
   return starnum;
 }

 /**@description when the two cards are not match,display the wrong color and remover the card's classname
 *@param $card
 *@param openCard
 */
 function removeCard($card,openCard) {
   $.each(openCard,function(i,data) {
     $card[data].className = 'card notm animates wobble';
     (function(n) {
       function f() {
         n.className = 'card';
       }
       setTimeout(f,1000);
     })($card[data])
   })
 }

 /**@description when the two cards are match,change card's classname and cancel the click event
 *@param $card
 *@param openCard
 */
 function lockCard($card,openCard) {
   let match =[];
   $.each(openCard,function(i,data) {
     $card[data].className = 'card match animated bounce';
     match.push(data);
   });
   $.each($card,function(index) {
     for(let j = 0;j < match.length;j++) {
       if(index == match[j]) {
         let cancel = $card[index];
         $(cancel).unbind("click");
       }
     }
   })
 }
/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
