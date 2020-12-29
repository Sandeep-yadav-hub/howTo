"use strict";
class howToDoWizard {
  constructor(array, id, autoplay, interval, navigation) {
    this.array = array;
    this.navigation = navigation;
    this.timeOut = interval;
    this.id = id;
    this.step = 0;
    this.steps;
    this.instructions;
    this.text;
    this.autoplay = autoplay;
  }

  play(InstructionBackgroundColor, fontColor) {
    // alert(document.body.clientHeight);
    if (!fontColor && !InstructionBackgroundColor) {
      fontColor = "#000";
      InstructionBackgroundColor = "#fff";
    }
    // just to make sure it is empty to insert NEW DOM elements
    const clear = document.getElementById("instructionsModal");
    var element = document.querySelector(".backgroundBlurDiv");
    if (element) {
      element.parentNode.removeChild(element);
    }
    clear.innerHTML = "";
    clear.insertAdjacentHTML(
      "afterend",
      "<div class='backgroundBlurDiv' style='background:#999;opacity:0.4;width:100vw;height:${document.body.clientHeight};position:absolute;left:0;top:0'></div>"
    );
    document.querySelector(".backgroundBlurDiv").classList.add("blurB");
    var focused_area = document.querySelector(".focus-increse-index");
    if (focused_area) {
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
        .topLeftboxEgdeInstWidget{
          -webkit-transform: scaleX(-1);
          transform: scaleY(-2) scaleX(-1);
        }
        .boxEdgeInstWidget {
            position: absolute;
            
            width: 0;
            height: 0;
            border-top: 0px solid transparent;
            border-right: 50px solid ${InstructionBackgroundColor};
            border-bottom: 30px solid transparent;
            z-index: -1;
        }
        .blurB{
            background:#999;
            opacity:0.4;
            width:100%;
            height:${document.body.clientHeight}px;
            position:absolute;
            left:0;
            top:0;

        }
        .focus-increse-index{
            z-index:200;
            box-shadow: 0 0 10px 30px #fff;
            border-radius: 8px;
            background: #fff;
            position:relative;
        }
        #instructionsModal{
          max-width:400px;
          min-width:400px;
          min-height:50px;
          background:${InstructionBackgroundColor};
          border-radius:8px;
          alighn-content:center;
          position:absolute;
          display:grid;
          box-shadow:0px 0px 5px #999;
          z-index:3;
        }
    </style>
    <div class="boxEdgeInstWidget" style="left: -44px;"></div>
    <div style="color:${fontColor}">
        <p id="closeInstWindow" style="margin-bottom: 0;margin-bottom: 0;position: absolute;right: 14px;cursor: pointer;">x</p>
        
        <p class=" instructionText" style="margin-bottom:0 ;padding-left: 1rem;padding-right: 1rem;padding-bottom: 1.5rem;margin-top:2rem;font-size: 18px;max-width:100%;" >${this.text}</p>
        <div style="width:95%;margin:auto;">
          <img class="instructionImg" src="" alt="" style="max-width:100%;border-radius:8px;padding-bottom:1rem;">
        </div>
        <div style="width:95%;margin:auto;">
          <p class="instructionTextExample" style="margin-bottom:0 ;padding-left: 0.4rem;padding-bottom:0;font-size: 14px;color:#000;max-width:100%;"></p>
        </div>
        <div style="width:95%;margin:auto;">
            <audio class="instructionAudioExample" src="" autoplay hidden></audio>
        </div>
        <div class="wiz-navigation"  style="display: flex;justify-content: space-between;">
            <p id="backStep" style="margin-bottom:0; padding-left: 1rem;padding-top: 1.5rem;padding-bottom:1.5rem;text-align: right;font-size: 14px; cursor: pointer;">Back</p>
            <p id="nextStep" class="" style="margin-bottom:0 ;padding-right: 1rem;padding-top: 1.5rem;padding-bottom:1.5rem;text-align: right;font-size: 14px;cursor: pointer;">Next</p>
        </div>
    </div>`;

    document.getElementById("instructionsModal").innerHTML = divElement;
    // $("#instructionsModal").append(divElement);

    // checking if the user want navigation
    if (this.navigation != false) {
      document.querySelector(".wiz-navigation").style.display = "flex";
    } else {
      document.querySelector(".wiz-navigation").style.display = "none";
      document.querySelector(".instructionImg").style.marginBottom = "1.5rem";
    }

    //checking if user want autoplay and gave timeOut

    if (this.autoplay != false && this.timeOut != undefined) {
      var k = 0;
      document
        .querySelector(".instructionAudioExample")
        .removeEventListener("ended", () => {});
      function autoplay(timeOut) {
        k++;
        setTimeout(() => {
          document.getElementById("nextStep").click();
        }, timeOut * k);
      }
      for (var l = 0; l < instructions.length; l++) {
        autoplay(this.timeOut);
      }
    }

    this.instructions = this.array[this.id];
    var eleId = this.instructions.instruction[this.step].id;
    document.querySelector(
      ".instructionText"
    ).innerHTML = this.instructions.instruction[this.step].step;
    // this.text = this.instructions.instruction[this.step].step;
    var example = this.instructions.instruction[this.step].example;

    var typeWriterSpeed = 100;

    // clear placeholder before initiating the instruction
    for (var j = 0; j < this.instructions.instruction.length; j++) {
      var eleid = this.instructions.instruction[j].id;
      document.getElementById(eleid).placeholder = "";
    }

    function giveInstruction(example, eleId) {
      // function ngFor(){
      //   for(var z =0 ;z<example.audioUrl.length;z++){
      //   }
      // }
      // ngFor();
      var imgInput = document.querySelector(".instructionImg");
      var textInput = document.querySelector(".instructionTextExample");

      if (example.text) {
        textInput.style.display = "block";
        textInput.innerHTML = example.text;
      } else {
        textInput.style.innerHTML = "";
        textInput.style.display = "none";
      }
      var s = 0;
      var eleid = eleId;
      // typeWriter() gives typing Effect for the example
      function typeWriter() {
        if (s < example.placeholder.length) {
          document.getElementById(
            eleid
          ).placeholder += example.placeholder.charAt(s);
          s++;
          setTimeout(typeWriter, typeWriterSpeed);
        }
      }
      function setImgUrl() {
        var getEleToInstertImg = document.querySelector(".instructionImg");
        getEleToInstertImg.src = "";
        getEleToInstertImg.src = example.imageUrl;
      }
      function setAudioUrl() {
        var getEleToSetAudioSrc = document.querySelector(
          ".instructionAudioExample"
        );
        getEleToSetAudioSrc.src = "";
        getEleToSetAudioSrc.src = example.audioUrl;
        // getEleToSetAudioSrc.src = example.audioUrl[0].url
        // document.querySelector(".exampleAudioLanguage").innerHTML =
        //   example.audioUrl[0].language;
        getEleToSetAudioSrc.addEventListener("ended", function () {
          document.getElementById("nextStep").click();
        });
      }
      // checking before initializing
      if (
        example.placeholder != undefined &&
        !example.imageUrl &&
        !example.audioUrl
      ) {
        imgInput.style.display = "none";
        typeWriter();
      } else if (
        example.imageUrl != undefined &&
        !example.placeholder &&
        !example.audioUrl
      ) {
        imgInput.style.display = "block";
        setImgUrl();
      } else if (
        !example.imageUrl &&
        !example.placeholder &&
        example.audioUrl != undefined
      ) {
        imgInput.style.display = "none";
        setAudioUrl();
      } else if (
        example.imageUrl != undefined &&
        example.placeholder != undefined &&
        !example.audioUrl
      ) {
        imgInput.style.display = "block";
        typeWriter();
        setImgUrl();
      } else if (
        example.imageUrl != undefined &&
        !example.placeholder &&
        example.audioUrl != undefined
      ) {
        imgInput.style.display = "block";
        setAudioUrl();
        setImgUrl();
      } else if (
        !example.imageUrl &&
        example.placeholder != undefined &&
        example.audioUrl != undefined
      ) {
        imgInput.style.display = "none";
        setAudioUrl();
        typeWriter();
      } else if (example.imageUrl && example.placeholder && example.audioUrl) {
        imgInput.style.display = "block";
        typeWriter();
        setImgUrl();
        setAudioUrl();
      }
    }

    giveInstruction(example, eleId);

    var elementId = this.instructions.instruction[this.step].id;
    // getting the position to put the instruction at
    var getElement = document.getElementById(elementId);
    console.log({ getElement });
    if (getElement.tagName === "INPUT") {
      getElement.classList.remove("focus-increse-index");
    } else {
      getElement.classList.add("focus-increse-index");
    }
    var elementPositionTop = getElement.offsetTop;
    var elementPositionLeft = getElement.offsetLeft;

    // getting the width the put the instruction window at a suitable distance
    var getElement_width = getElement.offsetWidth;
    var getElement_height = getElement.offsetHeight;

    // gputting insteuctions in a variable
    var li = instructions;
    // getting the current step into the script and saving into a var
    var step = this.step;

    // interval for the autoplay steps
    var i = 0;

    var typeWriterSpeed = 100;

    // for moving the window widget to its place
    function moveWidget(elementId) {
      document.getElementById(elementId).scrollIntoView(false);
      // console.log(findPosition(document.getElementById(elementId)))

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
      var elementPositionHeight = document.getElementById(elementId)
        .offsetHeight;
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
          if (
            document.body.clientHeight <
            getElement_height + elementPositionTop + 400
          ) {
            document.getElementById("instructionsModal").style.top =
              String(
                Number(
                  elementPositionTop -
                    document.getElementById("instructionsModal").offsetHeight +
                    15
                )
              ) + "px";
          } else if (
            document.body.clientHeight >
            getElement_height + elementPositionTop + 400
          ) {
            document.getElementById("instructionsModal").style.top =
              String(Number(elementPositionTop + 15)) + "px";
          }
        });
      setTimeout(() => {
        var modal = document.getElementById("instructionsModal");
        if (
          getElement_width === screen.width &&
          document.body.clientHeight >
            getElement_height + elementPositionTop + modal.offsetHeight
        ) {
          console.log("there is  sapce down and no sapce on the right or left");
          console.log("6");

          console.log(
            elementPositionLeft + getElement_width >
              screen.width - modal.offsetWidth
          );
          var modal = document.getElementById("instructionsModal");
          modal.style.top = String(
            Number(elementPositionTop + getElement_height + 80) + "px"
          );
          modal.style.left = String(Number(elementPositionLeft + 50)) + "px";
          document.querySelector(".blurB").style.height = String(
            Number(document.body.clientHeight + modal.offsetHeight + 50) + "px"
          );
          var getEdge = document.querySelector(".boxEdgeInstWidget");
          getEdge.classList.add("topLeftboxEgdeInstWidget");
          getEdge.style.top = "-15px";
          getEdge.style.left = "0px";
          // getEdge.style.transform = "rotate(90deg)";
          if (getEdge.style.removeProperty) {
            getEdge.style.removeProperty("right");
            getEdge.style.removeProperty("bottom");
          } else {
            getEdge.style.removeAttribute("right");
            getEdge.style.removeAttribute("bottom");
          }
          getEdge.classList.add("invertBottomleftBoxEdgeInstWidget");
          document
            .querySelector(".instructionImg")
            .addEventListener("load", function () {
              if (
                document.body.clientHeight <
                getElementHeight + elementPositionTop + 550
              ) {
                modal.style.top =
                  String(Number(elementPositionTop - modal.offsetHeight + 15)) +
                  "px";
              }
            });
        } else if (
          getElement_width === screen.width &&
          document.body.clientHeight <
            getElement_height + elementPositionTop + modal.offsetHeight
        ) {
          console.log("there is no sapce down and no sapce on the right");
          console.log("2");

          console.log(
            elementPositionLeft + getElement_width >
              screen.width - modal.offsetWidth
          );
          var modal = document.getElementById("instructionsModal");
          modal.style.top = String(
            Number(elementPositionTop - modal.offsetHeight - 80) + "px"
          );
          modal.style.left = String(Number(elementPositionLeft + 50)) + "px";
          document.querySelector(".blurB").style.height = String(
            Number(document.body.clientHeight + modal.offsetHeight + 50) + "px"
          );
          var getEdge = document.querySelector(".boxEdgeInstWidget");
          getEdge.style.bottom = "-30px";
          getEdge.style.left = "-10px";
          getEdge.style.transform = "rotate(270deg)";
          if (getEdge.style.removeProperty) {
            getEdge.style.removeProperty("right");
          } else {
            getEdge.style.removeAttribute("right");
          }
          getEdge.classList.add("invertBottomleftBoxEdgeInstWidget");
          document
            .querySelector(".instructionImg")
            .addEventListener("load", function () {
              if (
                document.body.clientHeight <
                getElementHeight + elementPositionTop + 550
              ) {
                modal.style.top =
                  String(Number(elementPositionTop - modal.offsetHeight + 15)) +
                  "px";
              }
            });
        } else if (
          elementPositionLeft + getElement_width >
            screen.width - modal.offsetWidth &&
          document.body.clientHeight >
            getElementHeight + elementPositionTop + modal.offsetHeight
        ) {
          console.log("there is sapce down and and no sapce on the right ");
          console.log("1");
          var modal = document.getElementById("instructionsModal");
          modal.style.top = String(Number(elementPositionTop + 15)) + "px";
          modal.style.left = String(elementPositionLeft - 400 - 80) + "px";
          var getEdge = document.querySelector(".boxEdgeInstWidget");
          getEdge.style.right = "-44px";
          if (getEdge.style.removeProperty) {
            getEdge.style.removeProperty("left");
            getEdge.style.removeProperty("transform");
          } else {
            getEdge.style.removeAttribute("left");
            getEdge.style.removeAttribute("transform");
          }
          getEdge.classList.add("invertBoxEdgeInstWidget");
          document
            .querySelector(".instructionImg")
            .addEventListener("load", function () {
              console.log("loaded");
              if (
                document.body.clientHeight >
                getElementHeight + elementPositionTop + 550
              ) {
                modal.style.top =
                  String(Number(elementPositionTop + 15)) + "px";
              }
            });
        } else if (
          elementPositionLeft + getElement_width <
            screen.width - modal.offsetWidth &&
          document.body.clientHeight >
            getElementHeight + elementPositionTop + modal.offsetHeight
        ) {
          console.log("there is sapce down and sapce on the right");
          console.log("3");

          var instructionsModal = document.querySelector("#instructionsModal");
          var boxEdgeInstWidget = document.querySelector(".boxEdgeInstWidget");
          instructionsModal.style.top =
            String(Number(elementPositionTop) + 15) + "px";
          instructionsModal.style.left =
            String(
              Number(elementPositionLeft) + Number(getElement_width) + 80
            ) + "px";
          boxEdgeInstWidget.classList.remove("invertBoxEdgeInstWidget");
          boxEdgeInstWidget.style.left = "-44px";
          if (boxEdgeInstWidget.style.removeProperty) {
            boxEdgeInstWidget.style.removeProperty("right");
            boxEdgeInstWidget.style.removeProperty("transform");
          } else {
            boxEdgeInstWidget.style.removeAttribute("right");
            boxEdgeInstWidget.style.removeAttribute("transform");
          }
          document
            .querySelector(".instructionImg")
            .addEventListener("load", function () {
              if (
                document.body.clientHeight <
                getElement_height + elementPositionTop + modal.offsetHeight
              ) {
                instructionsModal.style.top =
                  Number(
                    elementPositionTop - instructionsModal.offsetHeight + 15
                  ) + "px";
              }
            });
        } else if (
          elementPositionLeft + getElement_width <
            screen.width - modal.offsetWidth &&
          document.body.clientHeight <
            getElement_height + elementPositionTop + modal.offsetHeight
        ) {
          console.log("there is no sapce down and there is sapce on the right");
          console.log("4");

          var widgetWindow = document.getElementById("instructionsModal");
          widgetWindow.style.top =
            String(
              Number(elementPositionTop - widgetWindow.offsetHeight + 15)
            ) + "px";
          widgetWindow.style.left =
            String(Number(elementPositionLeft + getElement_width + 80)) + "px";
          var invertBoxEdgeInstWidget = document.querySelector(
            ".boxEdgeInstWidget"
          );
          invertBoxEdgeInstWidget.classList.add("bottomleftBoxEdgeInstWidget");
          invertBoxEdgeInstWidget.style.left = "-44px";
          invertBoxEdgeInstWidget.style.bottom = "0";
          if (invertBoxEdgeInstWidget.style.removeProperty) {
            invertBoxEdgeInstWidget.style.removeProperty("right");
            invertBoxEdgeInstWidget.style.removeProperty("transform");
          } else {
            invertBoxEdgeInstWidget.style.removeAttribute("right");
            invertBoxEdgeInstWidget.style.removeAttribute("transform");
          }
          document
            .querySelector(".instructionImg")
            .addEventListener("load", function () {
              if (
                document.body.clientHeight <
                getElement_height + elementPositionTop + 550
              ) {
                widgetWindow.style.top =
                  String(
                    Number(elementPositionTop - widgetWindow.offsetHeight + 15)
                  ) + "px";
              }
            });
        } else if (
          elementPositionLeft + getElement_width >
            screen.width - modal.offsetWidth &&
          document.body.clientHeight <
            getElementHeight + elementPositionTop + modal.offsetHeight
        ) {
          console.log("there is no sapce down and there is sapce on the left");
          console.log("5");

          var widgetWindow = document.getElementById("instructionsModal");
          widgetWindow.style.top =
            String(
              Number(elementPositionTop - widgetWindow.offsetHeight + 15)
            ) + "px";
          widgetWindow.style.left =
            String(Number(elementPositionLeft - modal.offsetWidth - 80)) + "px";
          var invertBoxEdgeInstWidget = document.querySelector(
            ".boxEdgeInstWidget"
          );
          invertBoxEdgeInstWidget.classList.add(
            "invertBottomleftBoxEdgeInstWidget"
          );
          invertBoxEdgeInstWidget.classList.remove("topLeftboxEgdeInstWidget");
          invertBoxEdgeInstWidget.style.right = "-44px";
          invertBoxEdgeInstWidget.style.bottom = "0";
          if (invertBoxEdgeInstWidget.style.removeProperty) {
            invertBoxEdgeInstWidget.style.removeProperty("left");
            invertBoxEdgeInstWidget.style.removeProperty("top");
            invertBoxEdgeInstWidget.style.removeProperty("transform");
          } else {
            invertBoxEdgeInstWidget.style.removeAttribute("left");
            invertBoxEdgeInstWidget.style.removeAttribute("transform");
            invertBoxEdgeInstWidget.style.removeAttribute("top");
          }
          document
            .querySelector(".instructionImg")
            .addEventListener("load", function () {
              if (
                document.body.clientHeight <
                getElement_height + elementPositionTop + 550
              ) {
                widgetWindow.style.top =
                  String(
                    Number(elementPositionTop - widgetWindow.offsetHeight + 15)
                  ) + "px";
              }
            });
        }
      }, 0);
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
          console.log({ preStep });
          var preInst = li[preStep];
          console.log({ preInst });
          document
            .getElementById(preInst.id)
            .classList.remove("focus-increse-index");
        }
        var eleId = liInst.id;
        if (document.getElementById(eleId).tagName === "INPUT") {
          document
            .getElementById(eleId)
            .classList.remove("focus-increse-index");
        } else {
          document.getElementById(eleId).classList.add("focus-increse-index");
        }
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.step;
        var example = liInst.example;
        document.getElementById(eleId).placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        var getEleToSetAudioSrc = document.querySelector(
          ".instructionAudioExample"
        );
        getEleToInstertImg.src = "";
        getEleToSetAudioSrc.src = "";

        giveInstruction(example, eleId);

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
          document.getElementById("instructionsModal").innerHTML = "";
          console.log(document.getElementById("instructionsModal"));
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
        } else {
          step = step + 1;
          var liInst = li[step];
          var preStep = step - 1;
          if (preStep != 0) {
            var preInst = li[preStep];
            console.log({ preInst });
            document
              .getElementById(preInst.id)
              .classList.remove("focus-increse-index");
          }
          var eleId = liInst.id;
          if (document.getElementById(eleId).tagName === "INPUT") {
            document
              .getElementById(eleId)
              .classList.remove("focus-increse-index");
          } else {
            document.getElementById(eleId).classList.add("focus-increse-index");
          }

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
          var getEleToSetAudioSrc = document.querySelector(
            ".instructionAudioExample"
          );
          getEleToInstertImg.src = "";
          getEleToSetAudioSrc.src = "";

          giveInstruction(example, eleId);
          moveWidget(liInst.id);
        }
      } else {
        step = step + 1;
        var liInst = li[step];
        var preStep = step - 1;
        if (preStep >= 0) {
          var preInst = li[preStep];
          console.log(preInst.id);
          document
            .getElementById(preInst.id)
            .classList.remove("focus-increse-index");
        }
        if (document.getElementById(liInst.id).tagName === "INPUT") {
          document
            .getElementById(liInst.id)
            .classList.remove("focus-increse-index");
        } else {
          document
            .getElementById(liInst.id)
            .classList.add("focus-increse-index");
        }
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.step;
        var eleId = liInst.id;
        var example = liInst.example;
        document.getElementById(eleId).placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        var getEleToSetAudioSrc = document.querySelector(
          ".instructionAudioExample"
        );
        getEleToInstertImg.src = "";
        getEleToSetAudioSrc.src = "";

        giveInstruction(example, eleId);
        moveWidget(liInst.id);
      }
    });
  }
}
module.exports.howToDoWizard;

