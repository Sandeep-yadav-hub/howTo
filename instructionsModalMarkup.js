export const divElement = function (
  InstructionBackgroundColor,
  btnBgcolorhover,
  btntxtcolorhover,
  fontColor,
  text,
  currentStep,
  totalStep
) {
  return `
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet">
        <style>
            
        
            #instructionsModal{
            max-width:400px;
            min-width:400px;
            min-height:50px;
            background:${InstructionBackgroundColor};
            alighn-content:center;
            position:absolute;
            display:grid;
            box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24);
            z-index:99999999999;
            font-family: 'Raleway', sans-serif;
            
            }
            @keyframes slide-up {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            #instructionsModal .triangle-up {
            width: 30px;
            height:30px;
            margin: auto;
            position: absolute;
            overflow:hidden;
            right: 45%;
            }
            #instructionsModal .triangle-up:before {
            content: "";
            width: 30px;
            height: 30px;
            background: ${InstructionBackgroundColor};
            box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24);
            transform: rotate(45deg);
            position: absolute;
            top: 6px;
            }
            #instructionsModal .triangle-right {
            width: 30px;
            height:30px;
            margin: auto;
            position: absolute;
            overflow:hidden;
            left:100%
            }
            #instructionsModal .triangle-right:after {
            content: "";
            width: 30px;
            height: 30px;
            background: ${InstructionBackgroundColor};
            box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24);
            transform: rotate(45deg);
            position: absolute;
            right: 20px;
            margin: auto;
            }
            #instructionsModal .triangle-left {
            width: 30px;
            height:30px;
            margin: auto;
            position: absolute;
            overflow:hidden;
            right:100%;
            }
            #instructionsModal .triangle-left:after {
            content: "";
            width: 30px;
            height: 30px;
            background: ${InstructionBackgroundColor};
            box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24);
            transform: rotate(45deg);
            position: absolute;
            left: 20px;
            margin: auto;
            }

            #instructionsModal .triangle-down {
            width: 30px;
            height:30px;
            margin: auto;
            position: absolute;
            overflow:hidden;
            right:100%;
            }
            #instructionsModal .triangle-down:after {
            content: "";
            width: 30px;
            height: 30px;
            background: ${InstructionBackgroundColor};
            box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24);
            transform: rotate(45deg);
            position: absolute;
            bottom: 6px;
            }
            
            .hide{
            display:none;
            }
            
            #instructionsModal #nextStep{
            border-radius:6px;
            }
            #instructionsModal #nextStep:hover ,#instructionsModal #nextStep:active{
            background-color:${btnBgcolorhover};
            color:${btntxtcolorhover}
            }
            // #backStep{
            //   border-radius:6px;
            // }
            // #backStep:hover{
            //   background-color:${btnBgcolorhover};
            //   color:${btntxtcolorhover}
            // }
            
        </style>
        
        <div class="triangle-up "></div>
        <div class="triangle-down "></div>
        <div class="triangle-right "></div>
        <div class="triangle-left "></div>
        <div style="color:${fontColor}">
            <button  id="closeInstWindow" type="button"  data-bs-dismiss="modal" aria-label="Close" style="color: ${fontColor};background-color: transparent;border: none;margin-bottom: 0;margin-bottom: 0;position: absolute;right: 14px;cursor: pointer;top:10px">X</button>
            
            <p class=" instructionText" style="margin-bottom:0 ;padding-left: 1rem;padding-right: 1rem;padding-bottom: 1.5rem;font-size: 18px;max-width:100%;padding-top: 1rem;" >${text}</p>
            <div style="width:95%;margin:auto;background:#fff">
            <img class="instructionImg" src="" alt="" style="max-width:100%;border-radius:8px;margin-bottom: 1rem;">
            </div>
            <div style="width:95%;margin:auto;">
            <p class="instructionTextExample" style="margin-bottom:0 ;padding-left: 0.4rem;padding-bottom:0;font-size: 14px;color:${fontColor};max-width:100%;"></p>
            </div>
            <div style="width:95%;margin:auto;">
                <audio class="instructionAudioExample" src="" autoplay hidden></audio>
            </div>
            <div class="wiz-navigation"  style="display: flex;justify-content: space-between;padding:5px;margin-top:10px">
                <p id="backStep" style="margin-bottom:0; padding:15px;align-slef:center:text-align: right;font-size: 14px; cursor: pointer;">Back</p>
                <p class="" style="margin-bottom:0 ;padding:15px;align-slef:center;margin-left:auto;text-align: right;font-size: 14px;cursor: pointer;"><span class="currentStep">${currentStep}</span>/${totalStep}</p>
                <p id="nextStep" class="" style="margin-bottom:0 ;padding:15px;align-slef:center;text-align: right;font-size: 14px;cursor: pointer;">Got it</p>
            </div>
        </div>`;
};