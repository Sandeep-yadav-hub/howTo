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

    this.instructions = this.array[this.id];
    var eleId = this.instructions.instruction[this.step].id;
    var currentInstructionElement = document.getElementById(eleId);
    console.log(currentInstructionElement);

    const instructions = JSON.stringify(this.array[this.id].instruction);

    this.text = this.instructions.instruction[this.step].step;
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
      if (i < example.length) {
        document.getElementById(eleId).placeholder += example.charAt(i);
        i++;
        setTimeout(typeWriter, typeWriterSpeed);
      }
    }
    // checking before initializing typeWriter
    if (example != undefined) {
      typeWriter();
    }

    var elementId = this.instructions.instruction[this.step].id;
    // getting the position to put the instruction at
    var elementPositionTop = document.getElementById(elementId).offsetTop;
    var elementPositionLeft = document.getElementById(elementId).offsetLeft;
    var getElement = document.getElementById(elementId);

    // getting the width the put the instruction window at a suitable distance
    var getElement_width = getElement.offsetWidth;

    // get the div to put html code
    var widgetWindow = document.getElementById("instructionsModal");

    // positioning the window
    widgetWindow.style.top = String(Number(elementPositionTop + 15)) + "px";
    widgetWindow.style.left =
      String(Number(elementPositionLeft) + Number(getElement_width) + 45) +
      "px";

    // styling the window
    widgetWindow.style.maxWidth = "400px";
    widgetWindow.style.minHeight = "50px";
    widgetWindow.style.background = "#7b97db";
    widgetWindow.style.borderRadius = "8px";
    widgetWindow.style.alignContent = "center";
    widgetWindow.style.position = "absolute";
    widgetWindow.style.display = "grid";
    widgetWindow.style.boxShadow = "0px 0px 5px #999";

    // html code to put in window
    var divElement = `
    <style>
        .boxEdgeInstWidget {
            position: absolute;
            left: -44px;
            width: 0;
            height: 0;
            border-top: 0px solid transparent;
            border-right: 50px solid #7b97db;
            border-bottom: 30px solid transparent;
            z-index: -1;
        }
    </style>
    <div class="boxEdgeInstWidget"></div>
    <div>
        <p id="closeInstWindow" style="margin-bottom: 0;margin-bottom: 0;position: absolute;color: #FFF;right: 14px;cursor: pointer;">x</p>
        <p class=" instructionText" style="margin-bottom:0 ;padding: 1.5rem;font-size: 18px;color:#fff">${this.text}</p>
        <div  style="display: flex;justify-content: space-between;">
            <p id="backStep" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #fff; cursor: pointer;">Back</p>
            <p id="nextStep" class="" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #fff; cursor: pointer;">Next</p>
        </div>
    </div>
        <script>
            // strigifing the list (jugad)
            var strLi = JSON.stringify(${instructions})

            // parsing 
            var li = JSON.parse(strLi)

            // getting the current step into the script and saving into a var
            var step = ${this.step}

            // interval for the autoplay steps
            var timeOut = ${this.timeOut}
            var i = 0

            var typeWriterSpeed = 100

            // for moving the window widget to its place
            function moveWidget(elementId){
              var elementId = elementId
              var elementPositionTop = document.getElementById(elementId).offsetTop
              var elementPositionLeft = document.getElementById(elementId).offsetLeft
              var getElement = document.getElementById(elementId);
              document.getElementById(elementId);
              var getElement_width = getElement.offsetWidth;
              
              var instructionsModal = document.querySelector("#instructionsModal")
              instructionsModal.style.top = String(Number(elementPositionTop)+15)+"px"
              instructionsModal.style.left = String(Number(elementPositionLeft) + Number(getElement_width) +45)+"px"
            }
            // for closing the instruction window
            document.getElementById("closeInstWindow").addEventListener("click",function(){
              var clear = document.getElementById("instructionsModal");
              for (var j = 0; j < li.length; j++) {
                  var eleid = li[j].id;
                  document.getElementById(eleid).placeholder = "";
              }
              clear.innerHTML = "";
            });

            // going back a step
            document.getElementById("backStep").addEventListener("click",function(){
              // decrease a step
              step=step-1

              // checking if the step is not less then 0 (the first instruction)
              if(step>=0){
                var liInst = li[step]
                var instructionText = document.querySelector(".instructionText")
                instructionText.innerHTML = liInst.step
                moveWidget(liInst.id)
                var eleId = liInst.id;
                var example = liInst.example;
                document.getElementById(eleId).placeholder = ""
                var s = 0
                function typeWriter() {
                  if (s < example.length) {
                    document.getElementById(eleId).placeholder += example.charAt(s);
                    s++;
                    setTimeout(typeWriter, typeWriterSpeed);
                  }
                }
                
                document.getElementById("nextStep").innerHTML = "Next"
                if(example!=undefined){
                    typeWriter()
                }
              }
            })

            // going to next step
            document.getElementById("nextStep").addEventListener("click",function(){

                var preStep = document.getElementById("nextStep").dataset.prestepid
                console.log(preStep)
                
                // checking if it is not 0 or less
                if(step >0){
                  // checking if it is the the last step to clear and remove the instruction window
                  if(step>=li.length-1){
                    document.getElementById("instructionsModal").style.display = "none"
                    document.getElementById("instructionsModal").innerHTML = ""
                    
                  }else{
                    step = step+1
                    if(step+1 >= li.length-1){
                      document.getElementById("nextStep").innerHTML = "Done"
                    }else{
                      document.getElementById("nextStep").innerHTML = "Next"
                    }
                    var liInst = li[step]
                    var instructionText = document.querySelector(".instructionText")
                    instructionText.innerHTML = liInst.step
                    moveWidget(liInst.id)
                    var eleId = liInst.id;
                    var example = liInst.example;
                    document.getElementById(eleId).placeholder = ""
                    var s = 0
                    function typeWriter() {
                      if (s < example.length) {
                        document.getElementById(eleId).placeholder += example.charAt(s);
                        s++;
                        setTimeout(typeWriter, typeWriterSpeed);
                      }
                    }
                    if(example!=undefined){
                      typeWriter()
                    }
                  }
                }else{
                  step = step+1
                  var liInst = li[step]
                  console.log(liInst)
                  var instructionText = document.querySelector(".instructionText")
                  instructionText.innerHTML = liInst.step
                  moveWidget(liInst.id) 
                  var eleId = liInst.id;
                  var example = liInst.example;
                  document.getElementById(eleId).placeholder = ""
                  var s = 0
                  function typeWriter() {
                    if (s < example.length) {
                      document.getElementById(eleId).placeholder += example.charAt(s);
                      s++;
                      setTimeout(typeWriter, typeWriterSpeed);
                    }
                  }
                  if(example!=undefined){
                      typeWriter()
                    }
                  
                }
                
            });
    </script>`;
    $("#instructionsModal").append(divElement);
  }
}
module.exports(Wizard);
