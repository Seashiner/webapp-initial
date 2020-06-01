(function(w){
  w.nav = {}

  function init({wrap,arr}){
    //挑选一个适配方案
    var styleNode = document.createElement("style");
    var w = document.documentElement.clientWidth/16;
    styleNode.innerHTML = `html{font-size:${w}px!important}`;
    document.head.appendChild(styleNode)
    //禁止移动端事件的默认行为
    wrap.addEventListener("touchstart",(ev)=>{
        ev = ev || event;
        ev.preventDefault();
    })

    layout(arr)
  }

  function layout(arr){
    //滑动区域
    var nav = document.querySelector('.nav')
    //滑块
    // var list = document.querySelector('.nav .list')
    

    var list = document.createElement('ul')
    nav.appendChild(list)
    list.classList.add('list')
    for(var i = 0 ; i < arr.length ; i++){
      list.innerHTML += `<li><a href="javascript:;">${arr[i]}</a></li>`
    }
    
    transform.css(list,'translateZ',0)
    move(nav,list)
  }

  function move(nav,list){

    var minX = nav.clientWidth - list.offsetWidth
    var touchX = 0
    var touchE = 0
    var touchDis = 0
    var eleX = 0
    var eleE = 0
    var speed = 0
    var timeX = 0
    var timeE = 0 
    var timeDis = 1

    nav.addEventListener('touchstart',function(e){
      e = e || event
      var touchC = e.changedTouches[0]
      touchX = touchC.clientX
      timeX = new Date().getTime()
      eleX = transform.css(list,'translateX')

      list.style.transition = ''
    })

    nav.addEventListener('touchmove',function(e){
      e = e || event
      var touchC = e.changedTouches[0]
      touchE = touchC.clientX
      touchDis = touchE - touchX
      eleE = eleX + touchDis

      timeE= new Date().getTime()
      timeDis = timeE - timeX


      //橡皮筋效果
      if(eleE  >0){
        var scale = document.documentElement.clientWidth /( (document.documentElement.clientWidth + touchDis)*2)
        eleE = eleX + touchDis*scale
      }else if(eleE < minX){
        var overX = minX - eleE
        var scale = document.documentElement.clientWidth /( (document.documentElement.clientWidth + overX)*2)
        eleE = eleX + touchDis*scale
      }

      transform.css(list,'translateX',eleE)
    })

    nav.addEventListener('touchend',function(e){

      speed = touchDis / timeDis
      eleE = eleX + touchDis
      transform.css(list,'translateX',eleE)

      if(Math.abs(speed)>.5){
        eleE = eleE +speed*400
        transform.css(list,'translateX',eleE)

        var bsr = "";
        if(eleE  >0){
          transform.css(list,'translateX',0)
          bsr = "cubic-bezier(.06,1.85,.83,1.75)";
        }else if(eleE < minX){
          bsr = "cubic-bezier(.06,1.85,.83,1.75)";
          transform.css(list,'translateX',minX)
        }
        list.style.transition = `.5s ${bsr} transform`

      }else{

        if(eleE  >0){
          transform.css(list,'translateX',0)
        }else if(eleE < minX){
          transform.css(list,'translateX',minX)
        }
        list.style.transition = `.5s transform`
      }
      
    

    })
    
  }

  w.nav.init = init

})(window)