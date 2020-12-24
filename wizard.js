class howToDoWizard {
  constructor(array, instructionId,autoplay, interval) {
    if (!array || !id) {
      console.log(
        `"listOfInstruction":${array},"helpId":${instructionId},"instructionInterval":${interval},autoplay:${autoplay}`
      );
    }
    this.array = array;
    this.timeOut = interval;
    this.id = instructionId;
    this.step = 0;
    this.steps;
    this.instructions;
    this.text;
    this.autoplay = autoplay

  }

  play() {
    

    // just to make sure it is empty to insert NEW DOM elements
    const clear = document.getElementById("instructionsModal");
    var element = document.querySelector(".backgroundBlurDiv");
    if(element){
        element.parentNode.removeChild(element);
    }
    clear.innerHTML = "";
    clear.insertAdjacentHTML("afterend", "<div class='backgroundBlurDiv' style='background:#999;opacity:0.4;width:100vw;height:100%;position:absolute;left:0;top:0'></div>");
    var focused_area = document.querySelector(".focus-increse-index");
    if(focused_area){
      focused_area.classList.remove("focus-increse-index");
    }
    // document.querySelector(".focus-increse-index").classList.remove("focus-increse-index");

    const instructions = this.array[this.id].instruction;
    

    // html code to put in window
    var divElement = `
    <style>
        .invertBoxEdgeInstWidget{
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
        }
        .bottomleftBoxEdgeInstWidget{
          -webkit-transform: scaleX(-1);
          transform: scaleY(-1);
        }
        .invertBottomleftBoxEdgeInstWidget{
          -webkit-transform: scaleX(-1);
          transform: scaleY(-1) scaleX(-1);
        }
        .boxEdgeInstWidget {
            position: absolute;
            
            width: 0;
            height: 0;
            border-top: 0px solid transparent;
            border-right: 50px solid #fff;
            border-bottom: 30px solid transparent;
            z-index: -1;
        }
        .blurB{
            background:#999;
            opacity:0.4;
            width:100%;
            height:100vh;
            position:absolute;
            left:0;
            top:0;

        }
        .focus-increse-index{
            z-index:200;
            box-shadow: 0 0 10px 30px #fff;
            border-radius: 8px;
            background: #fff;
        }
    </style>
    <div class="boxEdgeInstWidget" style="left: -44px;"></div>
    <div>
        <p id="closeInstWindow" style="margin-bottom: 0;margin-bottom: 0;position: absolute;color: #000;right: 14px;cursor: pointer;">x</p>
        <p class=" instructionText" style="margin-bottom:0 ;padding: 1.5rem;font-size: 18px;color:#000;max-width:100%;" >${this.text}</p>
        <div style="width:95%;margin:auto;">
          <img class="instructionImg" src="" alt="" style="max-width:100%;border-radius:8px">
        </div>
        <div style="width:95%;margin:auto;">
            <audio class="instructionAudioExample" src="" autoplay></audio>
        </div>
        <div  style="display: flex;justify-content: space-between;">
            <p id="backStep" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #000; cursor: pointer;">Back</p>
            <p id="nextStep" class="" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #000; cursor: pointer;">Next</p>
        </div>
    </div>`;
    
    document.getElementById("instructionsModal").innerHTML=divElement
    // $("#instructionsModal").append(divElement);


    if(this.autoplay!=false){
      var k = 0
      document.querySelector(".instructionAudioExample").removeEventListener("ended",()=>{})
      function autoplay(timeOut) {
        k++;
        setTimeout(() => {
          document.getElementById("nextStep").click();
        }, timeOut * k);
      }
      for(var l = 0;l<instructions.length;l++){
        autoplay(this.timeOut)
      }
    }

    // get the div to style
    var widgetWindow = document.getElementById("instructionsModal");

    // styling the window
    widgetWindow.style.maxWidth = "350px";
    widgetWindow.style.minWidth = "350px";
    widgetWindow.style.minHeight = "50px";
    widgetWindow.style.maxHeight = "350px";
    widgetWindow.style.background = "#fff";
    widgetWindow.style.borderRadius = "8px";
    widgetWindow.style.alignContent = "center";
    widgetWindow.style.position = "absolute";
    widgetWindow.style.display = "grid";
    widgetWindow.style.boxShadow = "0px 0px 5px #999";
    widgetWindow.style.zIndex = "3";

    this.instructions = this.array[this.id];
    var eleId = this.instructions.instruction[this.step].id;
    document.querySelector(".instructionText").innerHTML = this.instructions.instruction[this.step].step;
    // this.text = this.instructions.instruction[this.step].step;
    var example = this.instructions.instruction[this.step].example;
    var s = 0;
    var typeWriterSpeed = 100;
    

    // clear placeholder before initiating the instruction
    for (var j = 0; j < this.instructions.instruction.length; j++) {
      var eleid = this.instructions.instruction[j].id;
      document.getElementById(eleid).placeholder = "";
    }

    // typeWriter() gives typing Effect for the example
    function typeWriter(){
        if (s < example.placeholder.length) {
          document.getElementById(eleId).placeholder += example.placeholder.charAt(s);
          s++;
          setTimeout(typeWriter, typeWriterSpeed);
        }
    }
    function setImgUrl(){
        var getEleToInstertImg = document.querySelector(".instructionImg");
        getEleToInstertImg.src = "";
        getEleToInstertImg.src = example.imageUrl;
    }
    function setAudioUrl(){
      var getEleToSetAudioSrc = document.querySelector(".instructionAudioExample" );
      getEleToSetAudioSrc.src = ""
      getEleToSetAudioSrc.src = example.audioUrl
      // getEleToSetAudioSrc.addEventListener("ended", function () {
      //   document.getElementById("nextStep").click();
      // });
    }

    // checking before initializing typeWriter
    if (example.placeholder != undefined && !example.imageUrl && !example.audioUrl) {
      typeWriter();
    } else if (example.imageUrl != undefined && !example.placeholder && !example.audioUrl) {
      setImgUrl();
    } else if (!example.imageUrl && !example.placeholder && example.audioUrl!=undefined) {
      setAudioUrl();
    } else if (example.imageUrl != undefined && example.placeholder !=undefined && !example.audioUrl) {
      typeWriter();
      setImgUrl();
    } else if (example.imageUrl != undefined && !example.placeholder  && example.audioUrl !=undefined) {
      setAudioUrl();
      setImgUrl();
      setAudioUrl();
    } else if (!example.imageUrl && example.placeholder !=undefined  && example.audioUrl !=undefined) {
      setAudioUrl();
      typeWriter();
    } else if (example.imageUrl && example.placeholder && example.audioUrl) {
      typeWriter();
      setImgUrl();
      setAudioUrl();
    }

    var elementId = this.instructions.instruction[this.step].id;
    // getting the position to put the instruction at
    var getElement = document.getElementById(elementId);
    getElement.classList.add("focus-increse-index");
    var elementPositionTop = getElement.offsetTop;
    var elementPositionLeft = getElement.offsetLeft;

    // getting the width the put the instruction window at a suitable distance
    var getElement_width = getElement.offsetWidth;
    var getElement_height = getElement.offsetHeight;
    console.log(elementPositionLeft + getElement_width);

    // gputting insteuctions in a variable
    var li = instructions;
    // getting the current step into the script and saving into a var
    var step = this.step;

    // interval for the autoplay steps
    var i = 0;

    var typeWriterSpeed = 100;

    // for moving the window widget to its place
    function moveWidget(elementId) {
      var removeClass = document.querySelector(".boxEdgeInstWidget");
      if (removeClass.style.removeProperty) {
        removeClass.style.removeProperty("bottom");
      } else {
        removeClass.style.addAttribute("bottom");
      }
      removeClass.classList.remove("invertBoxEdgeInstWidget");
      removeClass.classList.remove("invertBottomleftBoxEdgeInstWidget");
      removeClass.classList.remove("bottomleftBoxEdgeInstWidget");
      var elementId = elementId;
      var elementPositionTop = document.getElementById(elementId).offsetTop;
      var elementPositionLeft = document.getElementById(elementId).offsetLeft;
      var getElement = document.getElementById(elementId);
      document.getElementById(elementId);
      var getElement_width = getElement.offsetWidth;
      var getElementHeight = getElement.offsetHeight;
      var invertBoxEdgeInstWidget = document.querySelector(".invertBoxEdgeInstWidget");
      document
        .querySelector(".instructionImg")
        .addEventListener("load", function () {
          if (screen.height < getElement_height + elementPositionTop + 400) {
            document.getElementById("instructionsModal").style.top =
              String(
                Number(
                  elementPositionTop -
                    document.getElementById("instructionsModal").offsetHeight +
                    15
                )
              ) + "px";
          }else if(screen.height>getElement_height + elementPositionTop +400){
              document.getElementById("instructionsModal").style.top =
                String(Number(elementPositionTop + 15)) + "px";
          }
        });
      if (
        elementPositionLeft + getElement_width > screen.width - 400 &&
        screen.height > getElementHeight + elementPositionTop + 550 
      ) {
        console.log("there is sapce down and and no sapce on the right on the right direction")
        var modal = document.getElementById("instructionsModal");
        modal.style.top = String(Number(elementPositionTop + 15)) + "px";
        modal.style.left = String(elementPositionLeft - 400 -50)+"px";
        var getEdge = document.querySelector(".boxEdgeInstWidget");
        getEdge.style.right = "-44px";
        if (getEdge.style.removeProperty) {
            getEdge.style.removeProperty("left");
        } else {
            getEdge.style.removeAttribute("left");
        }
        getEdge.classList.add("invertBoxEdgeInstWidget");
        document.querySelector(".instructionImg").addEventListener("load", function () {
            console.log("loaded")
            if (screen.height > getElementHeight + elementPositionTop + 550 ) {
                modal.style.top = String(Number(elementPositionTop +15 )) +
                "px";
            }
        });
      }else if (
            elementPositionLeft + getElement_width > screen.width - 400 &&
            screen.height < getElement_height + elementPositionTop + 550 
      ) {
            console.log("there is no sapce down and no sapce on the right");
            var modal = document.getElementById("instructionsModal");
            modal.style.top =String(Number(elementPositionTop - modal.offsetHeight +15) + "px");
            modal.style.left = String(Number(elementPositionLeft - 400 - 50)) + "px";
            var getEdge = document.querySelector(".boxEdgeInstWidget");
            getEdge.style.bottom = "0";
            getEdge.classList.add("invertBottomleftBoxEdgeInstWidget");
            document.querySelector(".instructionImg").addEventListener("load", function () {
            if (screen.height < getElementHeight + elementPositionTop + 550 ) {
                modal.style.top = String(Number(elementPositionTop - modal.offsetHeight +15 )) +
                "px";
            }
        });
            
      } else if (
        elementPositionLeft + getElement_width < screen.width - 400 &&
        screen.height > getElementHeight + elementPositionTop + 550
      ) {
        console.log("there is sapce down and sapce on the right");
        var instructionsModal = document.querySelector("#instructionsModal");
        var boxEdgeInstWidget = document.querySelector(".boxEdgeInstWidget");
        instructionsModal.style.top = String(Number(elementPositionTop) + 15) + "px";
        instructionsModal.style.left =String(Number(elementPositionLeft) + Number(getElement_width) + 80) + "px";
        boxEdgeInstWidget.classList.remove("invertBoxEdgeInstWidget");
        boxEdgeInstWidget.style.left = "-44px";
        if (boxEdgeInstWidget.style.removeProperty) {
          boxEdgeInstWidget.style.removeProperty("right");
        } else {
          boxEdgeInstWidget.style.removeAttribute("right");
        }
        document.querySelector(".instructionImg").addEventListener("load", function () {
            if (screen.height < getElement_height + elementPositionTop + 550) {
              instructionsModal.style.top = (Number(elementPositionTop - instructionsModal.offsetHeight + 15)) + "px";
            }
          });
      } else if (
        elementPositionLeft + getElement_width < screen.width - 400 &&
        screen.height < getElement_height + elementPositionTop + 500
      ) {
        console.log("there is no sapce down and there is sapce on the right");
        var widgetWindow = document.getElementById("instructionsModal");
        widgetWindow.style.top = String(Number(elementPositionTop - widgetWindow.offsetHeight + 15)) + "px";
        widgetWindow.style.left = String(Number(elementPositionLeft + getElement_width + 80 )) + "px";
        var invertBoxEdgeInstWidget = document.querySelector(".boxEdgeInstWidget");
        invertBoxEdgeInstWidget.classList.add("bottomleftBoxEdgeInstWidget");
        invertBoxEdgeInstWidget.style.left = "-44px";
        invertBoxEdgeInstWidget.style.bottom = "0";
        if (invertBoxEdgeInstWidget.style.removeProperty) {
          invertBoxEdgeInstWidget.style.removeProperty("right");
        } else {
          invertBoxEdgeInstWidget.style.removeAttribute("right");
        }
        document.querySelector(".instructionImg").addEventListener("load", function () {
            if (screen.height < getElement_height + elementPositionTop + 550) {
              widgetWindow.style.top = String(Number(elementPositionTop - widgetWindow.offsetHeight + 15)) + "px";
            }
          });
      }
    }

    // moving for the first time(step==0)
    moveWidget(li[step].id);

    // for closing the instruction window
    document.getElementById("closeInstWindow").addEventListener("click", function () {
        var clear = document.getElementById("instructionsModal");
        for (var j = 0; j < li.length; j++) {
          var eleid = li[j].id;
          document.getElementById(eleid).placeholder = "";
        }
        clear.innerHTML = "";
        clear.removeAttribute("style");
        var element = document.querySelector(".backgroundBlurDiv");
        if (element) {
          element.parentNode.removeChild(element);
        }
      });

    // going back a step
    document.getElementById("backStep").addEventListener("click", function () {
      // decrease a step
      step = step - 1;
      // checking if the step is not less then 0 (the first instruction )
      if (step >= 0) {
        var liInst = li[step];
        var preStep = step + 1;
        if (preStep >= 0) {
            console.log({preStep})
          var preInst = li[preStep];
          console.log({ preInst });
          document.getElementById(preInst.id).classList.remove("focus-increse-index");
        }
        var eleId = liInst.id;
        document.getElementById(eleId).classList.add("focus-increse-index");
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.step;
        var example = liInst.example;
        document.getElementById(eleId).placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        var getEleToSetAudioSrc = document.querySelector(".instructionAudioExample" );
        getEleToInstertImg.src = "";
        getEleToSetAudioSrc.src = "";
        

        if (example.placeholder != undefined && !example.imageUrl && !example.audioUrl) {
          typeWriter();
        } else if (example.imageUrl != undefined && !example.placeholder && !example.audioUrl) {
          setImgUrl();
        } else if (!example.imageUrl && !example.placeholder && example.audioUrl!=undefined) {
          setAudioUrl();
        } else if (example.imageUrl != undefined && example.placeholder !=undefined && !example.audioUrl) {
          typeWriter();
          setImgUrl();
        } else if (example.imageUrl != undefined && !example.placeholder  && example.audioUrl !=undefined) {
          setAudioUrl();
          setImgUrl();
          setAudioUrl();
        } else if (!example.imageUrl && example.placeholder !=undefined  && example.audioUrl !=undefined) {
          setAudioUrl();
          typeWriter();
        } else if (example.imageUrl && example.placeholder && example.audioUrl) {
          typeWriter();
          setImgUrl();
          setAudioUrl();
        }
        document.getElementById("nextStep").innerHTML = "Next";
        moveWidget(liInst.id);
      }
    });

    // going to next step
    document.getElementById("nextStep").addEventListener("click", function () {
      

      // checking if it is not 0 or less
      if (step > 0) {
        // checking if it is the the last step to clear and remove the instruction window
        if (step >= li.length - 1) {
          document.getElementById("instructionsModal").style.display = "none";
          document.getElementById("instructionsModal").innerHTML = "";
          var element = document.querySelector(".backgroundBlurDiv");
          if (element) {
            element.parentNode.removeChild(element);
          }
          var preStep = step;
          if (preStep != 0) {
            var preInst = li[preStep];
            console.log({ preInst });
            document
              .getElementById(preInst.id)
              .classList.remove("focus-increse-index");
          }
          docume
        } else {
          step = step + 1;
          var liInst = li[step];
          var preStep = step - 1;
          if (preStep != 0) {
            var preInst = li[preStep];
            console.log({preInst})
            document
              .getElementById(preInst.id)
              .classList.remove("focus-increse-index");
          }
          var eleId = liInst.id;
          document
            .getElementById(liInst.id)
            .classList.add("focus-increse-index");
          
          if (step + 1 >= li.length) {
            document.getElementById("nextStep").innerHTML = "Done";
          } else {
            document.getElementById("nextStep").innerHTML = "Next";
          }
          var instructionText = document.querySelector(".instructionText");
          instructionText.innerHTML = liInst.step;

          var example = liInst.example;
          document.getElementById(eleId).placeholder = "";
          var s = 0;

          var getEleToInstertImg = document.querySelector(".instructionImg");
          var getEleToSetAudioSrc = document.querySelector(".instructionAudioExample" );
          getEleToInstertImg.src = "";
          getEleToSetAudioSrc.src = "";
          

          if (example.placeholder != undefined && !example.imageUrl && !example.audioUrl) {
            typeWriter();
          } else if (example.imageUrl != undefined && !example.placeholder && !example.audioUrl) {
            setImgUrl();
          } else if (!example.imageUrl && !example.placeholder && example.audioUrl!=undefined) {
            setAudioUrl();
          } else if (example.imageUrl != undefined && example.placeholder !=undefined && !example.audioUrl) {
            typeWriter();
            setImgUrl();
          } else if (example.imageUrl != undefined && !example.placeholder  && example.audioUrl !=undefined) {
            setAudioUrl();
            setImgUrl();
            setAudioUrl();
          } else if (!example.imageUrl && example.placeholder !=undefined  && example.audioUrl !=undefined) {
            setAudioUrl();
            typeWriter();
          } else if (example.imageUrl && example.placeholder && example.audioUrl) {
            typeWriter();
            setImgUrl();
            setAudioUrl();
          }
          moveWidget(liInst.id);
        }
      } else {
        step = step + 1;
        var liInst = li[step];
        var preStep = step - 1;
        if (preStep >= 0) {
          var preInst = li[preStep];
          console.log(preInst.id);
          document.getElementById(preInst.id).classList.remove("focus-increse-index");
        }
        document.getElementById(liInst.id).classList.add("focus-increse-index");
        
        
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.step;
        var eleId = liInst.id;
        var example = liInst.example;
        document.getElementById(eleId).placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        var getEleToSetAudioSrc = document.querySelector(".instructionAudioExample" );
        getEleToInstertImg.src = "";
        getEleToSetAudioSrc.src = "";
        

        if (example.placeholder != undefined && !example.imageUrl && !example.audioUrl) {
            typeWriter();
        } else if (example.imageUrl != undefined && !example.placeholder && !example.audioUrl) {
          setImgUrl();
        } else if (!example.imageUrl && !example.placeholder && example.audioUrl!=undefined) {
          setAudioUrl();
        } else if (example.imageUrl != undefined && example.placeholder !=undefined && !example.audioUrl) {
          typeWriter();
          setImgUrl();
        } else if (example.imageUrl != undefined && !example.placeholder  && example.audioUrl !=undefined) {
          setAudioUrl();
          setImgUrl();
          setAudioUrl();
        } else if (!example.imageUrl && example.placeholder !=undefined  && example.audioUrl !=undefined) {
          setAudioUrl();
          typeWriter();
        } else if (example.imageUrl && example.placeholder && example.audioUrl) {
          typeWriter();
          setImgUrl();
          setAudioUrl();
        }
        moveWidget(liInst.id);
      }
    });
  }
}
module.exports(howToDoWizard);
