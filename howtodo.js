import { moveWidget, giveInstruction } from "./helper";
import { divElement } from "./instructionsModalMarkup";

export default class howToDoWizard {
  constructor() {
    this.object = {};
    this.navigation = Boolean;
    this.timeOut = String;
    this.id = String;
    this.step = 0;
    this.instructions = this.object;
    this.text = String;
    this.autoplay = Boolean;
    this.takeInput = false;
  }

  async play({
    topicId,
    autoplay,
    interval,
    navigation,
    InstructionBackgroundColor,
    fontColor,
    myInput,
    btnBgcolorhover,
    btntxtcolorhover,
  }) {
    this.navigation = navigation;
    this.timeOut = interval;
    this.id = topicId;
    this.step = 0;
    this.autoplay = autoplay;

    if (!myInput && topicId) {
      const response = await fetch(
        `http://howtodo-env.eba-qfag845f.ap-south-1.elasticbeanstalk.com/api/v1/topics/user/topic?id=${topicId}`
      );
      this.object = await response.json();
    } else if (myInput && !topicId) {
      this.object = myInput;
    }
    if (!fontColor && !InstructionBackgroundColor) {
      fontColor = "#000";
      InstructionBackgroundColor = "#fff";
    }
    if (!btnBgcolorhover && !btntxtcolorhover) {
      btntxtcolorhover = "white";
      btnBgcolorhover = "#162435";
    }

    var instructionsModal = document.createElement("div");
    instructionsModal.id = "instructionsModal";
    document.body.appendChild(instructionsModal);

    const instructions = this.object.instruction;

    instructionsModal.innerHTML = divElement(
      InstructionBackgroundColor,
      btnBgcolorhover,
      btntxtcolorhover,
      fontColor,
      this.text,
      this.step + 1,
      instructions.length
    );
    var imgInput = document.querySelector(".instructionImg");

    var typeWriterSpeed = 100;

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
      if (audioPlace.length != 0) {
        var a = audioPlace.length;
        while (a--) {
          audioPlace[a].removeEventListener("ended", () => {});
        }
      }
      function autoplay(timeOut) {
        k++;
        setTimeout(() => {
          var next = document.getElementById("nextStep");
          if (next) {
            next.click();
          }
        }, timeOut * k);
      }
      for (var l = 0; l < instructions.length; l++) {
        if (l < instructions.length) {
          autoplay(this.timeOut);
        }
      }
    } else {
      console.error({ autoplay: this, autoplay, timeout: this.timeOut });
    }

    this.instructions = this.object;
    var elementId = this.instructions.instruction[this.step].elementId;
    var getElement = document.getElementById(elementId);
    const takeInput = this.takeInput;
    var step = this.step;
    var li = instructions;

    function setUp(instructionStep, takeInput, getElement) {
      var elemId = instructionStep.elementId;
      for (var j = 0; j < instructionStep.length; j++) {
        var elemid = instructionStep[j].elementId;
        if (document.getElementById(elemid)) {
          document.getElementById(elemid).placeholder = "";
        } else {
          document.querySelector("#nextStep").click();
        }
      }
      if (
        (takeInput == true && getElement.tagName === "INPUT") ||
        getElement.tagName === "TEXTAREA" ||
        getElement.tagName === "SELECT"
      ) {
        getElement.focus();
        getElement.setAttribute("autocomplete", "off");
      }
      var instructionText = document.querySelector(".instructionText");
      var instructionCurrentStep = document.querySelector(".currentStep");
      instructionText.innerHTML = instructionStep.title;
      instructionCurrentStep.innerHTML = step + 1;
      var example = instructionStep.example;
      getElement.placeholder = "";
      var getEleToSetAudioSrc = document.querySelector(
        ".instructionAudioExample"
      );
      imgInput.src = "";
      getEleToSetAudioSrc.src = "";

      document.getElementById("nextStep").innerHTML = "Got it";

      giveInstruction(example, elemId, typeWriterSpeed, imgInput);
      moveWidget(elemId, instructionsModal);
    }
    setUp(this.instructions.instruction[this.step], takeInput, getElement);

    // for closing the instruction window
    document
      .getElementById("closeInstWindow")
      .addEventListener("click", function () {
        for (var j = 0; j < instructions.length; j++) {
          var eleid = instructions[j].elementId;
          var elem = document.getElementById(eleid);
          if (elem != null) document.getElementById(eleid).placeholder = "";
        }
        instructionsModal.parentNode.removeChild(instructionsModal);
      });

    // going back a step
    document.getElementById("backStep").addEventListener("click", function () {
      // decrease a step
      step = step - 1;
      // checking if the step is not less then 0 (the first instruction )
      if (step >= 0) {
        var instructionStep = li[step];
        var getElement = document.getElementById(instructionStep.elementId);
        if (getElement == null) {
          document.getElementById("backStep").click();
        } else {
          setUp(instructionStep, takeInput, getElement);
        }
      }
    });
    // going forward a step
    document.getElementById("nextStep").addEventListener("click", function () {
      // checking if it is not 0 or less
      if (step > 0) {
        // checking if it is the last
        if (step >= li.length - 1) {
          instructionsModal.innerHTML = "";
          instructionsModal.parentNode.removeChild(instructionsModal);
        } else {
          step = step + 1;
          var instructionStep = li[step];
          var getElement = document.getElementById(instructionStep.elementId);
          // if the element is nowhere to be found
          if (getElement == null) {
            document.getElementById("nextStep").click();
          } else {
            setUp(instructionStep, takeInput, getElement);
          }
        }
      } else {
        step = step + 1;
        if (step >= li.length) {
          // if there is no step
          instructionsModal.innerHTML = "";
          instructionsModal.parentNode.removeChild(instructionsModal);
        } else {
          var instructionStep = li[step];
          if (!instructionStep) {
            instructionsModal.innerHTML = "";
            instructionsModal.parentNode.removeChild(instructionsModal);
          } else {
            var getElement = document.getElementById(instructionStep.elementId);
            if (getElement == null) {
              document.getElementById("nextStep").click();
            } else {
              setUp(instructionStep, takeInput, getElement);
            }
          }
        }
      }
    });
  }
}