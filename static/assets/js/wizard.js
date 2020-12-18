class Wizard {
  constructor(array, id,interval) {
    if(!array||!id){
      console.log(`"listOfInstruction":${array},"helpId":${id},"interval":${interval}`)
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
    this.instructions = this.array[this.id];
    for (var j = 0; j < this.instructions.instruction.length; j++) {
      var eleid = this.instructions.instruction[j].id;
      document.getElementById(eleid).placeholder = "";
    }
    const instructions = JSON.stringify(this.array[this.id].instruction)
    this.text = this.instructions.instruction[this.step].step;
    var eleId = this.instructions.instruction[this.step].id;
    var example = this.instructions.instruction[this.step].example;
    var i = 0;
    var speed = 100;
    function typeWriter() {
      if (i < example.length) {
        document.getElementById(eleId).placeholder += example.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
    
    const clear = document.getElementById("instructionsModal");
    clear.innerHTML = "";
    var elementId =  this.instructions.instruction[this.step].id;
    var elementPositionTop = document.getElementById(elementId).offsetTop;
    var elementPositionLeft = document.getElementById(elementId).offsetLeft;
    var getElement = document.getElementById(elementId);
    document.getElementById(elementId);
    var getElement_width = getElement.offsetWidth;
    var widgetWindow = document.getElementById("instructionsModal");
    widgetWindow.style.top = String(Number(elementPositionTop + 15))+"px";
    widgetWindow.style.left = String(Number(elementPositionLeft) + Number(getElement_width) + 45) + "px";
    widgetWindow.style.maxWidth = "400px";
    widgetWindow.style.minHeight = "50px";
    widgetWindow.style.background = "#7b97db";
    widgetWindow.style.borderRadius = "8px";
    widgetWindow.style.alignContent = "center";
    widgetWindow.style.position = "absolute";
    widgetWindow.style.display = "grid";
    widgetWindow.style.boxShadow = "0px 0px 5px #999";
    var divElement = `
    <style>
        .boxEdge {
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
    <div class="boxEdge"></div>
    <div>
        <p id="closeInstWindow" style="margin-bottom: 0;margin-bottom: 0;position: absolute;color: #FFF;right: 14px;cursor: pointer;">x</p>
        <p class=" instructionText" style="margin-bottom:0 ;padding: 1.5rem;font-size: 18px;color:#fff">${this.text}</p>
        <div  style="display: flex;justify-content: space-between;">
            <p style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #fff; cursor: pointer;">Back</p>
            <p id="nextStep" class="" style="margin-bottom:0 ;padding: 1.5rem;text-align: right;font-size: 14px;color: #fff; cursor: pointer;">Next</p>
        </div>
    </div>
        <script>
        
            var strLi = JSON.stringify(${instructions})
            var li = JSON.parse(strLi)
            var step = ${this.step}
            var timeOut = ${this.timeOut}
            var i = 0
            var speed = 100
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
            document.getElementById("closeInstWindow").addEventListener("click",function(){
              var clear = document.getElementById("instructionsModal");
              for (var j = 0; j < li.length; j++) {
                  var eleid = li[j].id;
                  document.getElementById(eleid).placeholder = "";
              }
              clear.innerHTML = "";
            });

            

            document.getElementById("nextStep").addEventListener("click",function(){
              var preStep = document.getElementById("nextStep").dataset.prestepid
                  console.log(preStep)
                if(step !=0){

                  if(step>=li.length){
                    document.getElementById("instructionsModal").style.display = "none"
                    document.getElementById("instructionsModal").innerHTML = ""
                    
                  }else{
                    step = step+1
                    var liInst = li[step]
                    var instructionText = document.querySelector(".instructionText")
                    instructionText.innerHTML = liInst.step
                    moveWidget(liInst.id)
                    var eleId = liInst.id;
                    var example = liInst.example;
                    function typeWriter() {
                      if (i < example.length) {
                        document.getElementById(eleId).placeholder += example.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                      }
                    }
                    typeWriter()
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
                  function typeWriter() {
                    if (i < example.length) {
                      document.getElementById(eleId).placeholder += example.charAt(i);
                      i++;
                      setTimeout(typeWriter, speed);
                    }
                  }
                  typeWriter()
                  
                }
                
            });
    </script>`;
    $("#instructionsModal").append(divElement);
    
    
    }
};
module.exports(Wizard);
