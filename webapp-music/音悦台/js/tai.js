
    window.onload = function(){

      //第一步：全面禁止默认行为
      document.addEventListener("touchstart",function(e){
        e = e || event;
        e.preventDefault()
      },{passive: false})


      //第二步：rem适配
      ;(function(){
        var styleNode = document.createElement("style");
        document.head.appendChild(styleNode);
        var w = document.documentElement.clientWidth / 16;
        styleNode.innerHTML = "html{font-size:" + w + "px!important}"
      })()

      //橡皮筋滑动
      slide()
      function slide(){
        var ulList = document.querySelector(".nav-list");
        var nav = document.querySelector(".nav");
        var minX = nav.clientWidth - ulList.offsetWidth;
        var handX = 0;
        var eleX = 0;
        var handE = 0;
        var eleE = 0;
        nav.addEventListener("touchstart",function(e){
          e = e || event;
          var touchC = e.changedTouches[0];
          handX = touchC.clientX;
          eleX = tools.trans(ulList,"translateX");
          //清除过渡
          ulList.style.transition = "none"
        })

        nav.addEventListener("touchmove",function(e){
          e = e || event;
          var touchC = e.changedTouches[0];
          handE = touchC.clientX;
          dis = handE - handX;
          translateX = eleX + dis;
          
          // 橡皮筋效果：
          //在move过程中，每一次touchmove真正的有效距离慢慢变小，手指移动的距离在慢慢变大
          if(translateX > 0){
            var scale = document.documentElement.clientWidth/((document.documentElement.clientWidth+translateX)*2)
            translateX = eleX + dis*scale
          }else if(translateX < minX){
            var overX = minX - translateX;
            var scale = document.documentElement.clientWidth/((document.documentElement.clientWidth + overX)*2)
            translateX = eleX + dis*scale
          }

          //赋值
          tools.trans(ulList,"translateX",translateX);
        })

        nav.addEventListener("touchend",function(e){
          //过渡还要再touchstart时清掉
          ulList.style.transition = "1s transform"
          
          if(translateX > 0){
            translateX = 0
            tools.trans(ulList,"translateX",translateX);
          }else if(translateX < minX){
            translateX = minX
            tools.trans(ulList,"translateX",translateX);
          }
          
        })
        
      }

      //输入框聚焦
      changeFocus()
      function changeFocus(){
        var input = document.querySelector("#wrap .header .header-bottom form input[type='text']");
        input.addEventListener("touchstart",function(e){
          e = e || event;
          this.focus();
          e.stopPropagation();
          e.preventDefault();
        })

        document.addEventListener("touchstart",function(){
          input.blur()
        })
      }


      //面包屑导航
      breadCrumbs()
      function breadCrumbs(){
        var menuBtn = document.querySelector(".menuBtn");
        var mask = document.querySelector("#wrap .header .mask");
        var ismask = false;

        menuBtn.addEventListener("touchstart",function(e){
          e = e || event;
          var classVal = this.getAttribute("class");
          if(!ismask){
            mask.style.display = "block";
            classVal = classVal.concat(" active");
            this.setAttribute("class",classVal );
          }else{
            mask.style.display = "none";
            classVal = classVal.replace(" active","");
            this.setAttribute("class",classVal );
          }
          ismask = !ismask;
          e.stopPropagation();
          e.preventDefault();
        })

        document.addEventListener("touchstart",function(e){
          e = e || event;
          var classVal = menuBtn.getAttribute("class");
          if(ismask){
            mask.style.display = "none";
            classVal = classVal.replace(" active","");
            menuBtn.setAttribute("class",classVal );
            ismask = !ismask;
          }
          e.stopPropagation();
          e.preventDefault();
        },{passive: false})

        mask.addEventListener("touchstart",function(e){
          e = e || event;
          e.stopPropagation();
          e.preventDefault();
        })
      }


    }

