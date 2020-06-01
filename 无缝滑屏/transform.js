(function(w){
  w.tool = {}

  function css(node,type,val){
    if(arguments.length === 3){
      //设置
      var text = ''

      if(!node.transform){
        node.transform = {}
      }
      node.transform[type] = val
      
      for(let key in node.transform){
        switch(key){
          case 'translate':
          case 'translateX':
          case 'translateY':
          case 'translateZ':
            text += `${key}(${node.transform[key]}px)`
            break

          case 'rotate':
          case 'rotateX':
          case 'rotateY':
          case 'rotateZ':
          text += `${key}(${node.transform[key]}deg)`
            break

          case "scale":
          case "scaleX":
          case "scaleY":
              text+= `${key}(${node.transform[key]})`
              break;
        }
      }
      
      node.style.transform = text
    }else if(arguments.length === 2){
      //读取
      val = node.transform && node.transform[type];
        if(val === undefined){
            if(type === "scale" || type === "scaleX" || type === "scaleY"){
                val =1; //缩放 默认值:1
            }else if(type === "translateX" || type === "translateY" || type === "translateZ"){
                val = 0; //位移 旋转 默认值:0
            }else if(type === "rotate" || type === "rotateX" || type === "rotateY" || type === "rotateZ"){
                val = 0; //位移 旋转 默认值:0
            }
        }
      return val;
    }else{
      throw new Error('至少两个参数')
    }
  }    

  w.tool.css = css
  
  })(window)