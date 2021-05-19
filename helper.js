export const giveInstruction = function (
  example,
  eleId,
  typeWriterSpeed,
  imgInput
) {
  var eleid = eleId;
  var textInput = document.querySelector(".instructionTextExample");

  if (example.text) {
    textInput.style.display = "block";
    textInput.innerHTML = example.text;
  } else {
    textInput.style.innerHTML = "";
    textInput.style.display = "none";
  }
  // plcaeholder typewriter
  var s = 0;
  function typeWriter() {
    if (s < example.placeholder.length) {
      document.getElementById(eleid).placeholder += example.placeholder.charAt(
        s
      );
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
    getEleToSetAudioSrc.addEventListener("ended", function () {
      setTimeout(() => {
        document.getElementById("nextStep").click();
      }, 1500);
    });
  }

  imgInput.style.display = "none"; // to avoid white space if there is none
  // checking before initializing
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
};


export const moveWidget = function (elementId, instructionsModal) {
  //  to move modal to the same position
  var elementId = elementId;
  var  element = document.getElementById(elementId);

  // element height,width and position
  const elementPositionTop = element.offsetTop;
  const elementPositionLeft = element.offsetLeft;
  const getElementHeight = element.offsetHeight;
  const getElement_width = element.offsetWidth;

  const triangleDown = document.querySelector(".triangle-down");
  const triangleUp = document.querySelector(".triangle-up");
  const triangleLeft = document.querySelector(".triangle-left");
  const triangleRight = document.querySelector(".triangle-right");

  const windowWidth = window.screen.width;
  const instructionsModalWidth = instructionsModal.offsetWidth;
  const windowHight = document.body.clientHeight;

  const imgInput = document.querySelector(".instructionImg");

  setTimeout(() => {
    if (
      // widget can not be placed right or left
      windowWidth - (elementPositionLeft + getElement_width) <
        instructionsModalWidth && // widget can not be placed on the right
      elementPositionLeft - instructionsModalWidth < 0 
    ) {
      triangleUp.classList.remove("hide");
      triangleLeft.classList.add("hide");
      triangleRight.classList.add("hide");
      triangleDown.classList.add("hide");
      if (imgInput.style.display === "block") {
        imgInput.addEventListener("load",  () => {
          console.log(windowHight < (getElementHeight + elementPositionTop) + instructionsModal.offsetHeight)
          if (
            windowHight < (getElementHeight + elementPositionTop) + instructionsModal.offsetHeight // but after img load can not be placed below the elment
          ) {
            instructionsModal.style.top = String(  Number(elementPositionTop - instructionsModal.offsetHeight - 20) ) + "px";
            triangleDown.classList.remove("hide")
            triangleDown.style.position = "absolute"
            triangleDown.style.bottom = `-15px`
            triangleDown.style.left ="45%"
            triangleUp.classList.add("hide")
          }
        });
      } 
      if (
        windowHight < getElementHeight + elementPositionTop + instructionsModal.offsetHeight //can not be placed below the element
      ){
        instructionsModal.style.top = String(  Number(elementPositionTop - instructionsModal.offsetHeight - 20) ) + "px";
        triangleDown.classList.remove("hide")
        triangleDown.style.position = "absolute"
        triangleDown.style.bottom = `-15px`
        triangleDown.style.left ="45%"
        triangleUp.classList.add("hide")
      }else{
        instructionsModal.style.top = String( Number(elementPositionTop + getElementHeight + 25) + "px");
        triangleUp.style.top = `-15px`;
      }
      instructionsModal.style.left =0;
      instructionsModal.style.right =0;
      instructionsModal.style.marginLeft ="auto";
      instructionsModal.style.marginRight ="auto";
    }
    else if (
      // widget can be placed right but not on the left
      windowWidth - (elementPositionLeft + getElement_width) >
        instructionsModalWidth && // widget can  be placed on the right
      elementPositionLeft - instructionsModalWidth < windowWidth // widget can not be placed on the left
    ) {
      triangleUp.classList.add("hide");
      triangleLeft.classList.remove("hide");
      triangleRight.classList.add("hide");
      triangleDown.classList.add("hide");
      triangleLeft.style.top = "25px";

      if (imgInput.style.display === "block") {
        // if there is img src as we checked while giving instruction
        console.log("img")
        imgInput.addEventListener("loading",()=>{
          console.log("loading")
        })
        imgInput.addEventListener("load", () => {
          console.log("loaded")
          if (
            windowHight < getElementHeight + elementPositionTop + instructionsModal.offsetHeight // but after img load can not be placed below the elment
          ) {
            console.log("this one img load");
            instructionsModal.style.top = String(  Number(elementPositionTop+70 - instructionsModal.offsetHeight) ) + "px";
            triangleLeft.style.top = "";
            triangleLeft.style.bottom = "30px";
            triangleLeft.style.right = "100%";
          }
        });
      }
      if(windowHight < getElementHeight + elementPositionTop + instructionsModal.offsetHeight){
        instructionsModal.style.top = String(  Number(elementPositionTop+70- instructionsModal.offsetHeight ) ) + "px";
        triangleLeft.style.top = "";
        triangleLeft.style.bottom = "30px";
        triangleLeft.style.right = "100%";
      }else{
        instructionsModal.style.top = String( Number(elementPositionTop-15 ) ) + "px";
      }
      instructionsModal.style.left = String( Number(elementPositionLeft + getElement_width) + 20 ) + "px";
    }
    else if(
      // widget can not be placed right but can be on left
      windowWidth - (elementPositionLeft + getElement_width) < instructionsModalWidth &&  // widget can not  be placed on the right
      elementPositionLeft - instructionsModalWidth < windowWidth // widget can  be placed on the left
    ){
      triangleUp.classList.add("hide");
      triangleLeft.classList.add("hide");
      triangleRight.classList.remove("hide");
      triangleDown.classList.add("hide");
      triangleRight.style.top = "25px";
      if (imgInput.style.display === "block") {
        // if there is img src as we checked while giving instruction
        imgInput.addEventListener("load", () => {
          if (
            windowHight < getElementHeight + elementPositionTop + instructionsModal.offsetHeight // but after img load can not be placed below the elment
          ) {
            instructionsModal.style.top = String(  Number(elementPositionTop - instructionsModal.offsetHeight+70) ) + "px";
            triangleRight.style.top = "";
            triangleRight.style.bottom = "30px";
            triangleRight.style.left = "100%";
          }
        });
      }
      if(windowHight < getElementHeight + elementPositionTop + instructionsModal.offsetHeight){
        console.log("big")
        instructionsModal.style.top = String(  Number(elementPositionTop - instructionsModal.offsetHeight+70) ) + "px";
        triangleRight.style.top = "";
        triangleRight.style.bottom = "30px";
        triangleRight.style.right = "100%";
      }else{
        instructionsModal.style.top = String( Number(elementPositionTop - 20) ) + "px";
      }
      instructionsModal.style.left = String( Number(elementPositionLeft - instructionsModalWidth) - 20 ) + "px";

    }
    instructionsModal.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    instructionsModal.style.animation = "slide-up 0.5s ease"
  }, 0);
};