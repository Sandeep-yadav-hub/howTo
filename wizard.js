class howToDoWizard {
  constructor(array, id, interval) {
    if (!array || !id) {
      console.log(
        `"listOfInstruction":${array},"helpId":${id},"interval":${interval}`
      );
    }
    this.array = array;
    this.timeOut = interval;
    this.id = id;
    this.step = 0;
    this.steps;
    this.instructions;
    this.text;
  }

  play() {
    // just to make sure it is empty to inster NEW DOM elements
    const clear = document.getElementById("instructionsModal");
    clear.innerHTML = "";

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
            border-right: 50px solid #7b97db;
            border-bottom: 30px solid transparent;
            z-index: -1;
        }
    </style>
    <div class="boxEdgeInstWidget" style="left: -44px;"></div>
    
    <div>
        <p id="closeInstWindow" style="margin-bottom: 0;margin-bottom: 0;position: absolute;color: #FFF;right: 14px;cursor: pointer;">x</p>
        <p class=" instructionText" style="margin-bottom:0 ;padding: 1.5rem;font-size: 18px;color:#fff;max-width:100%;" >${this.text}</p>
        <div style="width:95%;margin:auto;">
          <img class="instructionImg" src="" alt="" style="max-width:100%;border-radius:8px">
        </div>
        <div  style="display: flex;justify-content: space-between;">
            <p id="backStep" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #fff; cursor: pointer;">Back</p>
            <p id="nextStep" class="" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #fff; cursor: pointer;">Next</p>
        </div>
    </div>`;

    document.getElementById("instructionsModal").innerHTML = divElement;
    // $("#instructionsModal").append(divElement);
    // get the div to style
    var widgetWindow = document.getElementById("instructionsModal");

    // styling the window
    widgetWindow.style.maxWidth = "400px";
    widgetWindow.style.minWidth = "400px";
    widgetWindow.style.minHeight = "50px";
    widgetWindow.style.maxHeight = "400px";
    widgetWindow.style.background = "#7b97db";
    widgetWindow.style.borderRadius = "8px";
    widgetWindow.style.alignContent = "center";
    widgetWindow.style.position = "absolute";
    widgetWindow.style.display = "grid";
    widgetWindow.style.boxShadow = "0px 0px 5px #999";

    this.instructions = this.array[this.id];

    var eleId = this.instructions.instruction[this.step].id;
    document.querySelector(
      ".instructionText"
    ).innerHTML = this.instructions.instruction[this.step].step;
    // this.text = this.instructions.instruction[this.step].step;
    var example = this.instructions.instruction[this.step].example;
    var i = 0;
    var typeWriterSpeed = 100;

    // clear placeholder before initiating the instruction
    for (var j = 0; j < this.instructions.instruction.length; j++) {
      var eleid = this.instructions.instruction[j].id;
      document.getElementById(eleid).placeholder = "";
    }

    // typeWriter() gives typing Effect for the example
    function typeWriter() {
      if (example.placeholder && !example.imageUrl) {
        if (i < example.placeholder.length) {
          document.getElementById(
            eleId
          ).placeholder += example.placeholder.charAt(i);
          i++;
          setTimeout(typeWriter, typeWriterSpeed);
        }
      } else if (example.imageUrl && !example.placeholder) {
        var getEleToInstertImg = document.querySelector(".instructionImg");
        getEleToInstertImg.src = example.imageUrl;
      } else if (example.imageUrl && example.placeholder) {
        if (i < example.placeholder.length) {
          document.getElementById(
            eleId
          ).placeholder += example.placeholder.charAt(i);
          i++;
          setTimeout(typeWriter, typeWriterSpeed);
        }
        var getEleToInstertImg = document.querySelector(".instructionImg");
        getEleToInstertImg.src = example.imageUrl;
      }
    }
    // checking before initializing typeWriter
    if (example != undefined) {
      typeWriter();
    }

    var elementId = this.instructions.instruction[this.step].id;
    // getting the position to put the instruction at
    var getElement = document.getElementById(elementId);
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
      var invertBoxEdgeInstWidget = document.querySelector(
        ".invertBoxEdgeInstWidget"
      );
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
          } else if (
            screen.height >
            getElement_height + elementPositionTop + 400
          ) {
            document.getElementById("instructionsModal").style.top =
              String(Number(elementPositionTop + 15)) + "px";
          }
        });
      if (
        elementPositionLeft + getElement_width > screen.width - 400 &&
        screen.height > getElementHeight + elementPositionTop + 400
      ) {
        console.log(
          "there is sapce down and and no sapce on the right on the right direction"
        );
        var modal = document.getElementById("instructionsModal");
        modal.style.top = String(Number(elementPositionTop + 15)) + "px";
        modal.style.left = String(elementPositionLeft - 400 - 50) + "px";
        var getEdge = document.querySelector(".boxEdgeInstWidget");
        getEdge.style.right = "-44px";
        if (getEdge.style.removeProperty) {
          getEdge.style.removeProperty("left");
        } else {
          getEdge.style.removeAttribute("left");
        }
        getEdge.classList.add("invertBoxEdgeInstWidget");
        document
          .querySelector(".instructionImg")
          .addEventListener("load", function () {
            console.log("loaded");
            if (screen.height > getElementHeight + elementPositionTop + 400) {
              modal.style.top = String(Number(elementPositionTop + 15)) + "px";
            }
          });
      } else if (
        elementPositionLeft + getElement_width > screen.width - 400 &&
        screen.height < getElement_height + elementPositionTop + 400
      ) {
        console.log("there is no sapce down and no sapce on the right");
        var modal = document.getElementById("instructionsModal");
        modal.style.top =
          String(Number(elementPositionTop - modal.offsetHeight + 15)) + "px";
        modal.style.left =
          String(Number(elementPositionLeft - 400 - 50)) + "px";
        var getEdge = document.querySelector(".boxEdgeInstWidget");
        getEdge.style.bottom = "0";
        getEdge.classList.add("invertBottomleftBoxEdgeInstWidget");
      } else if (
        elementPositionLeft + getElement_width < screen.width - 400 &&
        screen.height > getElementHeight + elementPositionTop + 400
      ) {
        console.log("there is sapce down and sapce on the right");
        var instructionsModal = document.querySelector("#instructionsModal");
        var boxEdgeInstWidget = document.querySelector(".boxEdgeInstWidget");
        instructionsModal.style.top =
          String(Number(elementPositionTop) + 15) + "px";
        instructionsModal.style.left =
          String(Number(elementPositionLeft) + Number(getElement_width) + 50) +
          "px";
        boxEdgeInstWidget.classList.remove("invertBoxEdgeInstWidget");
        boxEdgeInstWidget.style.left = "-44px";
        if (boxEdgeInstWidget.style.removeProperty) {
          boxEdgeInstWidget.style.removeProperty("right");
        } else {
          boxEdgeInstWidget.style.removeAttribute("right");
        }
        document
          .querySelector(".instructionImg")
          .addEventListener("load", function () {
            if (screen.height < getElement_height + elementPositionTop + 400) {
              instructionsModal.style.top =
                Number(
                  elementPositionTop - instructionsModal.offsetHeight + 15
                ) + "px";
            }
          });
      } else if (
        elementPositionLeft + getElement_width < screen.width - 400 &&
        screen.height < getElement_height + elementPositionTop + 400
      ) {
        console.log("there is no sapce down and there is sapce on the right");
        var widgetWindow = document.getElementById("instructionsModal");
        widgetWindow.style.top =
          String(Number(elementPositionTop - widgetWindow.offsetHeight + 15)) +
          "px";
        widgetWindow.style.left =
          String(Number(elementPositionLeft + getElement_width + 50)) + "px";
        var invertBoxEdgeInstWidget = document.querySelector(
          ".boxEdgeInstWidget"
        );
        invertBoxEdgeInstWidget.classList.add("bottomleftBoxEdgeInstWidget");
        invertBoxEdgeInstWidget.style.left = "-44px";
        invertBoxEdgeInstWidget.style.bottom = "0";
        if (invertBoxEdgeInstWidget.style.removeProperty) {
          invertBoxEdgeInstWidget.style.removeProperty("right");
        } else {
          invertBoxEdgeInstWidget.style.removeAttribute("right");
        }
        document
          .querySelector(".instructionImg")
          .addEventListener("load", function () {
            if (screen.height < getElement_height + elementPositionTop + 400) {
              widgetWindow.style.top =
                String(
                  Number(elementPositionTop - widgetWindow.offsetHeight + 15)
                ) + "px";
            }
          });
      }
    }

    // moving for the first time(step==0)
    moveWidget(li[step].id);

    // for closing the instruction window
    document
      .getElementById("closeInstWindow")
      .addEventListener("click", function () {
        var clear = document.getElementById("instructionsModal");
        for (var j = 0; j < li.length; j++) {
          var eleid = li[j].id;
          document.getElementById(eleid).placeholder = "";
        }
        clear.innerHTML = "";
        clear.removeAttribute("style");
      });

    // going back a step
    document.getElementById("backStep").addEventListener("click", function () {
      // decrease a step
      step = step - 1;

      // checking if the step is not less then 0 (the first instruction )
      if (step >= 0) {
        var liInst = li[step];
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.step;
        var eleId = liInst.id;
        var example = liInst.example;
        document.getElementById(eleId).placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        getEleToInstertImg.src = "";
        function typeWriter() {
          if (s < example.placeholder.length) {
            document.getElementById(
              eleId
            ).placeholder += example.placeholder.charAt(s);
            s++;
            setTimeout(typeWriter, typeWriterSpeed);
          }
        }
        function setImgUrl() {
          var getEleToInstertImg = document.querySelector(".instructionImg");
          getEleToInstertImg.src = example.imageUrl;
        }

        if (example.placeholder != undefined && !example.imageUrl) {
          typeWriter();
        } else if (example.imageUrl != undefined && !example.placeholder) {
          setImgUrl();
        } else if (example.imageUrl && example.placeholder) {
          typeWriter();
          setImgUrl();
        }
        document.getElementById("nextStep").innerHTML = "Next";
        moveWidget(liInst.id);
      }
    });

    // going to next step
    document.getElementById("nextStep").addEventListener("click", function () {
      var preStep = document.getElementById("nextStep").dataset.prestepid;
      console.log(preStep);

      // checking if it is not 0 or less
      if (step > 0) {
        // checking if it is the the last step to clear and remove the instruction window
        if (step >= li.length - 1) {
          document.getElementById("instructionsModal").style.display = "none";
          document.getElementById("instructionsModal").innerHTML = "";
        } else {
          step = step + 1;
          if (step + 1 >= li.length) {
            document.getElementById("nextStep").innerHTML = "Done";
          } else {
            document.getElementById("nextStep").innerHTML = "Next";
          }
          var liInst = li[step];
          var instructionText = document.querySelector(".instructionText");
          instructionText.innerHTML = liInst.step;
          var eleId = liInst.id;
          var example = liInst.example;
          document.getElementById(eleId).placeholder = "";
          var s = 0;

          var getEleToInstertImg = document.querySelector(".instructionImg");
          getEleToInstertImg.src = "";
          function typeWriter() {
            if (s < example.placeholder.length) {
              document.getElementById(
                eleId
              ).placeholder += example.placeholder.charAt(s);
              s++;
              setTimeout(typeWriter, typeWriterSpeed);
            }
          }
          function setImgUrl() {
            var getEleToInstertImg = document.querySelector(".instructionImg");
            getEleToInstertImg.src = example.imageUrl;
          }

          if (example.placeholder != undefined && !example.imageUrl) {
            typeWriter();
          } else if (example.imageUrl != undefined && !example.placeholder) {
            setImgUrl();
          } else if (example.imageUrl && example.placeholder) {
            typeWriter();
            setImgUrl();
          }
          moveWidget(liInst.id);
        }
      } else {
        step = step + 1;
        console.log({
          step,
          listLength: li.length,
          "step+1": step + 1,
          list: li[step],
        });
        console.log(step + 1);
        console.log(step + 1, li.length);
        var liInst = li[step];
        console.log({ li });
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.step;
        var eleId = liInst.id;
        var example = liInst.example;
        document.getElementById(eleId).placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        console.log(getEleToInstertImg.src);
        getEleToInstertImg.src = "";
        function typeWriter() {
          if (s < example.placeholder.length) {
            document.getElementById(
              eleId
            ).placeholder += example.placeholder.charAt(s);
            s++;
            setTimeout(typeWriter, typeWriterSpeed);
          }
        }
        function setImgUrl() {
          var getEleToInstertImg = document.querySelector(".instructionImg");
          getEleToInstertImg.src = example.imageUrl;
        }

        if (example.placeholder != undefined && !example.imageUrl) {
          typeWriter();
        } else if (example.imageUrl != undefined && !example.placeholder) {
          setImgUrl();
        } else if (example.imageUrl && example.placeholder) {
          typeWriter();
          setImgUrl();
        }
        moveWidget(liInst.id);
      }
    });
  }
}
module.exports(Wizard);
