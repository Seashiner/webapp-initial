(function(w){
  w.swipe = {}

  function init(wrap){
    //rem适配
    var styleNode = document.createElement('style')
    document.head.appendChild(styleNode)
    var w = document.documentElement.clientWidth / 16;
    styleNode.innerHTML = `html{fontSize:${w}px !important}`
    //阻止默认行为
    wrap.addEventListener('touchstart',(e)=>{
      e = e || event;
      e.preventDefault();
    })
  }

  function slide(imgArr){
    //滑屏区域
    const swipeWrap = document.querySelector('.swipe-wrap')
    //滑屏元素
    const ulNode = document.createElement('ul')
    swipeWrap.appendChild(ulNode)

    var needWF = swipeWrap.getAttribute('needWF')
    if(needWF !== null){
      imgArr=imgArr.concat(imgArr)
    }

    ulNode.classList.add("list"); 
    for(let i = 0; i < imgArr.length;i++ ){
      ulNode.innerHTML += `<li><img src=${imgArr[i]}></li>`
    }

    //动态设置滑屏区域、滑屏元素宽高
    var styleNode = document.createElement('style')
    document.head.appendChild(styleNode)
    styleNode.innerHTML =`.swipe-wrap .list{width:${imgArr.length*100}%} .swipe-wrap .list li{width:${1/imgArr.length*100}%}`
    const liNode = document.querySelector('.swipe-wrap .list li')
    setTimeout(() => {
      swipeWrap.style.height = liNode.offsetHeight + 'px'
    }, 200);

    //小圆点
    const swipeIcon = document.querySelector('.swipe-wrap .swipe-icon')
    if(swipeIcon){
      for(let i = 0; i < imgArr.length/2;i++ ){
        swipeIcon.innerHTML += `<span></span>`
      }
    }
    const spanNodes = document.querySelectorAll('.swipe-wrap .swipe-icon span')
    spanNodes[0].classList.add("active"); 
    
    move(swipeWrap,ulNode,imgArr,spanNodes,needWF)
  }

  function move(wrap,node,imgArr,spanNodes,needWF){

    let touchStart,eleStart,touchDis;
    let index = 0;
    // let translateX = 0

    wrap.addEventListener('touchstart',function(e){
      node.style.transition = ''
      //手指的初始位置
      e = e || event
      
      if(needWF !== null){
        //第二组的最后一张，跳到第一组的最后一张
        //第一组的第一张，跳到第二组的第一张
        var whichPic = tool.css(node,"translateX") / document.documentElement.clientWidth
        if(whichPic === 1-imgArr.length){
          whichPic = 1-imgArr.length/2
        }else if(whichPic === 0){
          whichPic = -imgArr.length/2
        }

        tool.css(node,"translateX",whichPic*document.documentElement.clientWidth)
      }

      touchStart = e.changedTouches[0].clientX
      //元素的初始位置
      // eleStart = translateX
      eleStart = tool.css(node,"translateX")
    })

    wrap.addEventListener('touchmove',function(e){
      node.style.transition = '.5s left'
      //手指滑动后的位置
      e = e || event
      touchNow = e.changedTouches[0].clientX
      //手指滑动的距离
      touchDis = touchNow - touchStart
      //元素最终的位置
      // translateX = eleStart + touchDis
      // node.style.transform = "translateX("+(translateX)+"px)";
      tool.css(node,"translateX",eleStart + touchDis)
    })

    wrap.addEventListener('touchend',function(){

      // index = Math.round(translateX/document.documentElement.clientWidth)
      index = Math.round(tool.css(node,"translateX")/document.documentElement.clientWidth)

      if(index > 0){
        index = 0
      }else if(index < (1-imgArr.length)){
        index = 1-imgArr.length
      }

      node.style.transition = '.5s transform'
      // translateX = index*document.documentElement.clientWidth
      // node.style.transform = "translateX("+(translateX)+"px)"; 

      tool.css(node,"translateX",index*document.documentElement.clientWidth)

      //小圆点
      for(let i = 0; i < spanNodes.length ; i++){
        if(i === -index%spanNodes.length){
          spanNodes[i].classList.add("active"); 
        }else{
          spanNodes[i].classList.remove("active"); 
        }
      }
      

    })
  }

  w.swipe.init = init
  w.swipe.slide = slide
})(window)