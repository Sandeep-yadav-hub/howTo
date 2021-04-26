

export default class howToDoWizard {
  constructor() {
    this.array = [];
    this.navigation = Boolean;
    this.timeOut=String ;
    this.id = String ;
    this.step = 0;
    this.instructions = this.array;
    this.text = String;
    this.autoplay = Boolean;
    this.takeInput = false;
  }

  
  async play({topicId, autoplay, interval, navigation,InstructionBackgroundColor, fontColor,myInput}) {
    this.navigation = navigation;
    this.timeOut = interval;
    this.id = topicId;
    this.step = 0;
    // this.instructions;
    // this.text;
    this.autoplay = autoplay;
    if(!myInput && topicId){
      const response = await fetch(
        `http://howtodo-env.eba-qfag845f.ap-south-1.elasticbeanstalk.com//api/v1/topics/user/topic?id=${topicId}`
        // `http://localhost:8000/api/v1/topics/user/topic?id=${topicId}`
      );
      this.array = await response.json();
    }else if (myInput && !topicId){
      this.array = myInput;
    }
    
    
      // userId
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    function checkCookie() {
      var howtodoWizardUser = getCookie("howtodoWizardUser");
      if (howtodoWizardUser != "") {
        var user = JSON.parse(howtodoWizardUser);
        let i = user.topicId.length
        var returnObjectByAttr = function (arr, attr, value) {
          var i = arr.length;
          while (i--) {
            if (
              arr[i] &&
              arr[i].hasOwnProperty(attr) &&
              arguments.length > 2 &&
              arr[i][attr] === value
            ) {
              return arr[i];
            }
          }
          // return arr;
        };
        var topic = returnObjectByAttr(user.topicId,"topicId",topicId);
        if(!topic){
          user.topicId.push({topicId})
          setCookie("howtodoWizardUser", JSON.stringify(user), 30);
          var data = {
            user:user,
            userAgent:navigator.userAgent
          }
          var post = async()=>{
            var xhr = new XMLHttpRequest();
            xhr.open(
              "POST",
              "http://localhost:8000/api/v1/clientUser/edit?api=09cdd950-91a2-4f7b-8342-15f7885c8683",
              true
            );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
            xhr.onload = function () {
              // var data = JSON.parse(this.responseText);
              
            };
            
          }
          post()
        }
      } else {
        function uuidv4() {
          return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (
              c ^
              (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
          );
        }
        howtodoWizardUser = {
          id:uuidv4(),
          topicId:[{topicId}]
        }
        if (howtodoWizardUser != "" && howtodoWizardUser != null) {
          setCookie("howtodoWizardUser", JSON.stringify(howtodoWizardUser), 30);
          var data = {
            user:howtodoWizardUser,
            userAgent:navigator.userAgent
          }
          var post = async()=>{
            var xhr = new XMLHttpRequest();
            xhr.open(
              "POST",
              "http://localhost:8000/api/v1/clientUser/create?api=09cdd950-91a2-4f7b-8342-15f7885c8683",
              true
            );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(
              JSON.stringify(data)
            );
            xhr.onload = function () {
              // var data = JSON.parse(this.responseText);
            };
          }
          post()
        }
      }
    }

    checkCookie();

    
    var elm = document.body;
    elm.insertAdjacentHTML("afterend", "<div id='instructionsModal'></div>");
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
    var returnObjectByAttr = function (arr, attr, value) {
      var i = arr.length;
      while (i--) {
        if (
          arr[i] &&
          arr[i].hasOwnProperty(attr) &&
          arguments.length > 2 &&
          arr[i][attr] === value
        ) {
          return arr[i];
        }
      }
      // return arr;
    };

    // document.querySelector(".focus-increse-index").classList.remove("focus-increse-index");
    // const instructions = returnObjectByAttr(this.array, "topicId", this.id).instruction;
    const instructions = this.array.instruction;
    // const instructions = this.array[this.id].instruction;

    // html code to put in window
    var divElement = `
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet">
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
            border-bottom: 50px solid transparent;
            z-index: -1;            
        }
        
        // .blurB{
        //     background:#999;
        //     opacity:0.4;
        //     width:100%;
        //     height:${document.body.clientHeight}px;
        //     position:absolute;
        //     left:0;
        //     top:0;
        //     z-index:99

        // }
        // .focus-increse-index{
        //     z-index:100;
        //     border-radius: 8px;
        //     background: #fff;
        //     background-size: cover;
        //     position: relative;
        //     // box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
        // }
        // .focus-increse-index:before {
        //   position: absolute;
        //   content: "";
        //   top: -3px;
        //   bottom: -3px;
        //   left: -3px;
        //   right: -3px;
        //   box-shadow: 0 0 rgba(0, 0, 0, 0.2), 0 0 0 16px rgba(0, 0, 0, 0.2),
        //     0 0 0 32px rgba(0, 0, 0, 0.2), 0 0 0 48px rgba(0, 0, 0, 0.2);
        //   z-index: -1;
        //   animation: ripples 1s linear infinite;
        //   animation-play-state: paused;
        //   opacity: 0;
        //   visibility: hidden;
        //   transition: 0.5s;
        //   transform: scale(0.5);
        //   border-radius: 15%;
        // }
        // .focus-increse-index:before {
        //   animation-play-state: running;
        //   opacity: 1;
        //   visibility: visible;
        //   transform: scale(1);
        // }
        // @keyframes ripples {
        //   to {
        //     box-shadow: 0 0 0 16px rgba(0, 0, 0, 0.2), 0 0 0 32px rgba(0, 0, 0, 0.2),
        //       0 0 0 48px rgba(0, 0, 0, 0.2), 0 0 0 64px rgba(0, 0, 0, 0);
        //   }
        // }
        #instructionsModal{
          max-width:400px;
          min-width:400px;
          min-height:50px;
          background:${InstructionBackgroundColor};
          // border-radius:8px;
          alighn-content:center;
          position:absolute;
          display:grid;
          // box-shadow:0px 0px 5px #999;
          z-index:99999999999;
          font-family: 'Raleway', sans-serif;
        }
        
    </style>
    
    <div class="boxEdgeInstWidget" style="left: -20px;"></div>
    <div style="color:${fontColor}">
        <button  id="closeInstWindow" type="button"  data-bs-dismiss="modal" aria-label="Close" style="color: ${fontColor};background-color: transparent;border: none;margin-bottom: 0;margin-bottom: 0;position: absolute;right: 14px;cursor: pointer;top:10px">X</button>
        
        <p class=" instructionText" style="margin-bottom:0 ;padding-left: 1rem;padding-right: 1rem;padding-bottom: 1.5rem;margin-top:2rem;font-size: 18px;max-width:100%;" >${this.text}</p>
        <div style="width:95%;margin:auto;background:#fff">
          <img class="instructionImg" src="" alt="" style="max-width:100%;border-radius:8px;margin-bottom: 1rem;">
        </div>
        <div style="width:95%;margin:auto;">
          <p class="instructionTextExample" style="margin-bottom:0 ;padding-left: 0.4rem;padding-bottom:0;font-size: 14px;color:${fontColor};max-width:100%;"></p>
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

      imgInput.style.display = "none";
      if (example.placeholder) {
        typeWriter();
      }
      if (example.imageUrl) {
        imgInput.style.display = "block";
        setImgUrl();
      }
      if (example.audioUrl) {
        setAudioUrl();
      }
    }
    // interval for the autoplay steps
    var i = 0;

    var typeWriterSpeed = 100;
    // for moving the window widget to its place
    function moveWidget(elementId) {
      document
        .getElementById(elementId)
        .scrollIntoView({
          behavior: "smooth",
        });

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
          getElement_width === window.screen.width &&
          document.body.clientHeight >
            getElement_height + elementPositionTop + modal.offsetHeight
        ) {
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
          getElement_width === window.screen.width &&
          document.body.clientHeight <
            getElement_height + elementPositionTop + modal.offsetHeight
        ) {
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
          elementPositionLeft + getElement_width >window.screen.width - modal.offsetWidth &&
          document.body.clientHeight > getElementHeight + elementPositionTop + modal.offsetHeight
        ) {
          

          var modal = document.getElementById("instructionsModal");
          modal.style.top = String(Number(elementPositionTop + 25)) + "px";
          modal.style.left = String(elementPositionLeft - modal.offsetWidth - 40) + "px";
          var getEdge = document.querySelector(".boxEdgeInstWidget");
          getEdge.style.right = "-20px";
          if (getEdge.style.removeProperty) {
            getEdge.style.removeProperty("left");
            getEdge.style.removeProperty("bottom");
            getEdge.style.removeProperty("transform");
          } else {
            getEdge.style.removeAttribute("left");
            getEdge.style.removeAttribute("bottom");
            getEdge.style.removeAttribute("transform");
          }
          getEdge.classList.add("invertBoxEdgeInstWidget");
          document.querySelector(".instructionImg").addEventListener("load", function () {
            
            if (document.body.clientHeight < getElementHeight + elementPositionTop + document.getElementById("instructionsModal").offsetHeight) {
                
                document.getElementById("instructionsModal").style.top =
                  String(Number(elementPositionTop - document.getElementById("instructionsModal").offsetHeight + 15)) +
                  "px";
                document.querySelector(".boxEdgeInstWidget").style.bottom = 0;
                document.querySelector(".boxEdgeInstWidget").style.transform =
                  "rotate(180deg)";
              }
            });
        } else if (
          elementPositionLeft + getElement_width <
            window.screen.width - modal.offsetWidth &&
          document.body.clientHeight >
            getElementHeight + elementPositionTop + modal.offsetHeight
        ) {
          function getPos(el) {
            var rect = el.getBoundingClientRect();
            return { x: rect.left, y: rect.top };
          }
          let el = document.getElementById(elementId);
          var instructionsModal = document.querySelector("#instructionsModal");
          var boxEdgeInstWidget = document.querySelector(".boxEdgeInstWidget");
          instructionsModal.style.top = String(Number(elementPositionTop) + 15) + "px";
          instructionsModal.style.left =
            String(Number(elementPositionLeft) + Number(getElement_width) + 40) + "px";
          boxEdgeInstWidget.classList.remove("invertBoxEdgeInstWidget");
          boxEdgeInstWidget.style.left = "-20px";
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
            window.screen.width - modal.offsetWidth &&
          document.body.clientHeight <
            getElement_height + elementPositionTop + modal.offsetHeight
        ) {

          var widgetWindow = document.getElementById("instructionsModal");
          widgetWindow.style.top =
            String(
              Number(elementPositionTop - widgetWindow.offsetHeight + 15)
            ) + "px";
          widgetWindow.style.left =
            String(Number(elementPositionLeft + getElement_width + 40)) + "px";
          var invertBoxEdgeInstWidget = document.querySelector(
            ".boxEdgeInstWidget"
          );
          invertBoxEdgeInstWidget.classList.add("bottomleftBoxEdgeInstWidget");
          invertBoxEdgeInstWidget.style.left = "-20px";
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
            window.screen.width - modal.offsetWidth &&
          document.body.clientHeight <
            getElementHeight + elementPositionTop + modal.offsetHeight
        ) {

          var widgetWindow = document.getElementById("instructionsModal");
          widgetWindow.style.top =
            String(
              Number(elementPositionTop - widgetWindow.offsetHeight + 15)
            ) + "px";
          widgetWindow.style.left =
            String(Number(elementPositionLeft - modal.offsetWidth - 40)) + "px";
          var invertBoxEdgeInstWidget = document.querySelector(
            ".boxEdgeInstWidget"
          );
          invertBoxEdgeInstWidget.classList.add(
            "invertBottomleftBoxEdgeInstWidget"
          );
          invertBoxEdgeInstWidget.classList.remove("topLeftboxEgdeInstWidget");
          invertBoxEdgeInstWidget.style.right = "-20px";
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
      var audioPlace = document.querySelectorAll(".instructionAudioExample");
      if(audioPlace.length!=0){
        var a = audioPlace.length
        while(a--){
          audioPlace[a].removeEventListener("ended", () => {});
        }
      }
      function autoplay(timeOut) {
        k++;
        setTimeout(() => {
          var next = document.getElementById("nextStep")
          if(next){
            next.click();
          }
        }, timeOut * k);
      }
      for (var l = 0; l < instructions.length; l++) {
        if(l<instructions.length){
          autoplay(this.timeOut);
        }
      }
    }

    // this.instructions = returnObjectByAttr(this.array, "topicId", this.id);
    this.instructions = this.array;
    // returnObjectByAttr(this.array,"topicId",this.id).instruction
    var elementId = this.instructions.instruction[this.step].elementId;
    // getting the position to put the instruction at
    var getElement = document.getElementById(elementId);
    if (getElement === null) {
      this.step++
      elementId = this.instructions.instruction[this.step].elementId;
      getElement = document.getElementById(elementId);
    }
      var eleId = this.instructions.instruction[this.step].elementId;
      document.querySelector(
        ".instructionText"
      ).innerHTML = this.instructions.instruction[this.step].title;
      // this.text = this.instructions.instruction[this.step].step;
      var example = this.instructions.instruction[this.step].example;

      var typeWriterSpeed = 100;

      // clear placeholder before initiating the instruction
      for (var j = 0; j < this.instructions.instruction.length; j++) {
        var eleid = this.instructions.instruction[j].elementId;
        if (document.getElementById(eleid)) {
          document.getElementById(eleid).placeholder = "";
        } else {
          document.querySelector("#nextStep").click();
        }
      }
      
      if (
        getElement.tagName === "INPUT" ||
        getElement.tagName === "LABEL" ||
        getElement.tagName === "BUTTON" ||
        getElement.tagName === "TEXTAREA" ||
        getElement.tagName === "SELECT"
      ) {
        getElement.classList.add("focus-increse-index");
      } else {
        getElement.classList.add("focus-increse-index");
      }
      const takeInput = this.takeInput;
      if (
        (takeInput == true && getElement.tagName === "INPUT") ||
        getElement.tagName === "TEXTAREA" ||
        getElement.tagName.tagName === "SELECT"
      ) {
        getElement.focus();
        getElement.style.zIndex = 100;
        getElement.style.position = "relative";
        getElement.setAttribute("autocomplete", "off");
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
      if (step + 1 >= li.length) {
        document.getElementById("nextStep").innerHTML = "Done";
      } else {
        document.getElementById("nextStep").innerHTML = "Next";
      }
      giveInstruction(example, eleId);

      // moving for the first time(step==0)
      moveWidget(li[step].elementId);

    // for closing the instruction window
    document.getElementById("closeInstWindow").addEventListener("click", function () {
        var clear = document.getElementById("instructionsModal");
        for (var j = 0; j < instructions.length; j++) {
          var eleid = instructions[j].elementId;
          var elem = document.getElementById(eleid)
          if (elem!=null) document.getElementById(eleid).placeholder = "";
        }
        clear.innerHTML = "";
        clear.removeAttribute("style");
        document.getElementById("instructionsModal").innerHTML = "";
        clear.parentNode.removeChild(clear);
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
        var getElement = document.getElementById(liInst.elementId);
        if (preStep >= 0) {
          var preInst = li[preStep];
          document
            .getElementById(preInst.elementId)
            .classList.remove("focus-increse-index");
        }
        var eleId = liInst.elementId;
        if (
          getElement.tagName === "INPUT" ||
          getElement.tagName === "LABEL" ||
          getElement.tagName === "BUTTON" ||
          getElement.tagName === "SELECT" ||
          getElement.tagName === "TEXTAREA"
        ) {
          getElement.classList.add("focus-increse-index");
        } else {
          getElement.classList.add("focus-increse-index");
        }
        if (
          (takeInput == true && getElement.tagName === "INPUT") ||
          getElement.tagName === "TEXTAREA" ||
          getElement.tagName === "SELECT"
        ) {
          getElement.focus();
          getElement.style.zIndex = 100;
          getElement.style.position = "relative";
          getElement.setAttribute("autocomplete", "off");
        }
        var instructionText = document.querySelector(".instructionText");
        instructionText.innerHTML = liInst.title;
        var example = liInst.example;
        getElement.placeholder = "";
        var s = 0;
        var getEleToInstertImg = document.querySelector(".instructionImg");
        var getEleToSetAudioSrc = document.querySelector(
          ".instructionAudioExample"
        );
        getEleToInstertImg.src = "";
        getEleToSetAudioSrc.src = "";

        giveInstruction(example, eleId);

        document.getElementById("nextStep").innerHTML = "Next";
        moveWidget(eleId);
      }
    });

    // going to next step
    document.getElementById("nextStep").addEventListener("click", function () {
      // checking if it is not 0 or less
      if (step > 0) {
        // checking if it is the the last step to clear and remove the instruction window
        if (step >= li.length - 1) {
          var elem = document.getElementById("instructionsModal");
          document.getElementById("instructionsModal").innerHTML = "";
          elem.parentNode.removeChild(elem);
          var element = document.querySelector(".backgroundBlurDiv");
          if (element) {
            element.parentNode.removeChild(element);
          }
          var preStep = step;
          if (preStep != 0) {
            var preInst = li[preStep];
            document
              .getElementById(preInst.elementId)
              .classList.remove("focus-increse-index");
            document.getElementById(preInst.elementId).style.zIndex = 0;
          }
        } else {
          step = step + 1;
          var liInst = li[step];
          var preStep = step - 1;
          var getElement = document.getElementById(liInst.elementId);
          if(getElement==null){
            step++
            liInst = li[step]
            getElement=document.getElementById(liInst.elementId)
          }
          if (preStep != 0) {
            var preInst = li[preStep];
            document
              .getElementById(preInst.elementId)
              .classList.remove("focus-increse-index");
            document.getElementById(preInst.elementId).style.zIndex = 0;
          }
          var eleId = liInst.elementId;
          if (
            getElement.tagName === "INPUT" ||
            getElement.tagName === "LABEL" ||
            getElement.tagName === "TEXTAREA" ||
            getElement.tagName === "SELECT" ||
            getElement.tagName === "BUTTON"
          ) {
            getElement.classList.add("focus-increse-index");
          } else {
            getElement.classList.add("focus-increse-index");
          }
          if (
            (takeInput == true && getElement.tagName === "INPUT") ||
            getElement.tagName === "TEXTAREA" ||
            getElement.tagName === "SELECT"
          ) {
            getElement.focus();
            getElement.style.zIndex = 100;
            getElement.style.position = "relative";
            getElement.setAttribute("autocomplete", "off");
          }
          if (step + 1 >= li.length) {
            document.getElementById("nextStep").innerHTML = "Done";
          } else {
            document.getElementById("nextStep").innerHTML = "Next";
          }
          var instructionText = document.querySelector(".instructionText");
          instructionText.innerHTML = liInst.title;

          var example = liInst.example;
          getElement.placeholder = "";
          var s = 0;

          var getEleToInstertImg = document.querySelector(".instructionImg");
          var getEleToSetAudioSrc = document.querySelector(
            ".instructionAudioExample"
          );
          getEleToInstertImg.src = "";
          getEleToSetAudioSrc.src = "";

          giveInstruction(example, eleId);
          moveWidget(liInst.elementId);
        }
      } else {                        //FIRST STEP
        step = step + 1;
                      
        if (step >= li.length) {  
          // if there is no next step                                                    
          var elem = document.getElementById("instructionsModal");
          document.getElementById("instructionsModal").innerHTML = "";
          elem.parentNode.removeChild(elem);
          var element = document.querySelector(".backgroundBlurDiv");
          if (element) {
            element.parentNode.removeChild(element);
          }
        } else {
          // if there is next step
          var liInst = li[step];
          console.log(li)
          var preStep = step - 1;
          var getElement = document.getElementById(liInst.elementId);
          if (getElement == null) {
            // if element is null skip this
            step++;
            // get the instruction
            liInst = li[step];
            if (!liInst) {
              // if no next step
              //clear dom
              var elem = document.getElementById("instructionsModal");
              document.getElementById("instructionsModal").innerHTML = "";
              elem.parentNode.removeChild(elem);
              var element = document.querySelector(".backgroundBlurDiv");
              if (element) {
                element.parentNode.removeChild(element);
              }
            } else {
              // else there is next step
              getElement = document.getElementById(liInst.elementId);
              if (preStep >= 0) {
                var preInst = li[preStep];
                document
                  .getElementById(preInst.elementId)
                  .classList.remove("focus-increse-index");
                document.getElementById(preInst.elementId).style.zIndex = 0;
              }

              if (step + 1 >= li.length) {
                document.getElementById("nextStep").innerHTML = "Done";
              } else {
                document.getElementById("nextStep").innerHTML = "Next";
              }
              if (
                getElement.tagName === "INPUT" ||
                getElement.tagName === "LABEL" ||
                getElement.tagName === "TEXTAREA" ||
                getElement.tagName === "SELECT" ||
                getElement.tagName === "BUTTON"
              ) {
                document
                  .getElementById(liInst.elementId)
                  .classList.add("focus-increse-index");
              } else {
                document
                  .getElementById(liInst.elementId)
                  .classList.add("focus-increse-index");
              }
              if (
                (this.takeInput == true && getElement.tagName === "INPUT") ||
                getElement.tagName === "TEXTAREA" ||
                getElement.tagName === "SELECT"
              ) {
                getElement.focus();
                getElement.style.zIndex = 100;
                getElement.style.position = "relative";
                getElement.setAttribute("autocomplete", "off");
              }
              var instructionText = document.querySelector(".instructionText");
              instructionText.innerHTML = liInst.title;
              var eleId = liInst.elementId;
              var example = liInst.example;
              document.getElementById(eleId).placeholder = "";
              var s = 0;
              var getEleToInstertImg = document.querySelector(
                ".instructionImg"
              );
              var getEleToSetAudioSrc = document.querySelector(
                ".instructionAudioExample"
              );
              getEleToInstertImg.src = "";
              getEleToSetAudioSrc.src = "";

              giveInstruction(example, eleId);
              moveWidget(liInst.elementId);
            }
          } else {
            //else there is next step
              if (preStep >= 0) {
                var preInst = li[preStep];
                document
                  .getElementById(preInst.elementId)
                  .classList.remove("focus-increse-index");
                document.getElementById(preInst.elementId).style.zIndex = 0;
              }

              if (step + 1 >= li.length) {
                document.getElementById("nextStep").innerHTML = "Done";
              } else {
                document.getElementById("nextStep").innerHTML = "Next";
              }
              if (
                getElement.tagName === "INPUT" ||
                getElement.tagName === "LABEL" ||
                getElement.tagName === "TEXTAREA" ||
                getElement.tagName === "SELECT" ||
                getElement.tagName === "BUTTON"
              ) {
                document
                  .getElementById(liInst.elementId)
                  .classList.add("focus-increse-index");
              } else {
                document
                  .getElementById(liInst.elementId)
                  .classList.add("focus-increse-index");
              }
              if (
                (this.takeInput == true && getElement.tagName === "INPUT") ||
                getElement.tagName === "TEXTAREA" ||
                getElement.tagName === "SELECT"
              ) {
                getElement.focus();
                getElement.style.zIndex = 100;
                getElement.style.position = "relative";
                getElement.setAttribute("autocomplete", "off");
              }
              var instructionText = document.querySelector(".instructionText");
              instructionText.innerHTML = liInst.title;
              var eleId = liInst.elementId;
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
              moveWidget(liInst.elementId);
            }   
          }
          
      }
    });
  }
  
}
