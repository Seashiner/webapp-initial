(function(w){
  w.scroll = {}

  function init({wrap,content}){
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

    move(wrap,content)
  }

  function move(nav,content){
    // transform.css(content,'translateZ',0)
    
    var minY = nav.clientHeight - content.offsetHeight
    var touchX = 0
    var touchY = 0
    var touchDisY = 0

    var eleX = 0
    var eleY = 0

    var lastPoint = 0;
    var pointDisY = 0;
    var timeX = 0
    var timeDis = 0

    var isFirst = true
    var isY = true
    //及点及停
    var timer = null

    nav.addEventListener('touchstart',function(e){
      minY = nav.clientHeight - content.offsetHeight
      e = e || event
      var touchC = e.changedTouches[0]
      touchX = touchC.clientX
      touchY = touchC.clientY
      lastPoint =  touchC.clientY;
      timeX = new Date().getTime()

      eleX = transform.css(content,'translateX')
      eleY = transform.css(content,'translateY')

      content.style.transition = ''
      content.handMove = false;
      isFirst = true
      isY = true
      timeDis = 1
      pointDisY = 0
      clearInterval(timer)
      start && typeof start === 'Function'
    })

    nav.addEventListener('touchmove',function(e){
      if(!isY){
        return
      }

      e = e || event
      var touchC = e.changedTouches[0]
      var touchE = touchC.clientX
      var touchF = touchC.clientY
      var touchDis = touchE - touchX
      touchDisY = touchF - touchY
      
      var eleF = eleY + touchDisY
      var nowPoint = touchC.clientY;
      pointDisY = nowPoint - lastPoint
      var timeE= new Date().getTime()
      timeDis = timeE - timeX
      timeX = timeE
      lastPoint = nowPoint;
      //橡皮筋效果
      var scale = 1
      if(eleF  >0){
        content.handMove = true;
        scale = document.documentElement.clientWidth /( (document.documentElement.clientWidth + touchDisY)*2)
        eleF = eleY + touchDisY*scale
      }else if(eleF < minY){
        content.handMove = true;
        var overY = minY - eleF
        scale = document.documentElement.clientWidth /( (document.documentElement.clientWidth + overY)*2)
        eleF = eleY + touchDisY*scale
      }


      if(isFirst){
        isFirst = false
        if(Math.abs(touchDisY) > Math.abs(touchDis)){
          isY = true
        }else{
          isY = false
          return
        }
      }

      transform.css(content,'translateY',eleF)
    })

    nav.addEventListener('touchend',function(e){
      if(content.handMove){
        //手动滑屏
        var eleF = transform.css(content,"translateY");
        if(eleF  >0){
          eleF = 0
        }else if(eleF < minY){
          eleF = minY
        }
        transform.css(content,'translateY',eleF)
        content.style.transition = `2s transform`

      }else{
        fast()
      }


      function fast(){
        //及点及停
        var Tween ={
          Linear: function(t,b,c,d){ return c*t/d + b; },
          Back: function(t,b,c,d,s){
              if (s == undefined) s = 1.70158;
              return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
          }
      }

        function moveTween(type,eleF,time){
          clearInterval(timer)
          var t = 0
          var b = transform.css(content,'translateY')
          var c = eleF-b
          var d = (time*1000)/(1000/60)
          timer = setInterval(() => {
            t++
            if(t>d){
              clearInterval(timer)
            }
            transform.css(content,'translateY',Tween[type](t,b,c,d))
          }, 1000/60);
          
        }


        var time = 1
        var speed = pointDisY / timeDis
        speed = Math.abs(speed) < 0.5 ? 0 : speed;
        var eleF = transform.css(content,'translateY')
        eleF = eleF +speed*400
  
        
        var type = 'Linear'
        // var bsr = "";
        if(eleF  >0){
          eleF = 0
          type = 'Back'
          // transform.css(content,'translateY',0)
          // bsr = "cubic-bezier(.06,1.85,.83,1.75)";
        }else if(eleF < minY){
          eleF = minY
          type = 'Back'
          // bsr = "cubic-bezier(.06,1.85,.83,1.75)";
          // transform.css(content,'translateY',minY)
        }
        // content.style.transition = `2s ${bsr} transform`
        moveTween(type,eleF,time)
      }
      
    

    })
    
  }

  w.scroll.init = init

})(window)