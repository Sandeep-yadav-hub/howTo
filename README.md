# _howtodo_



Include these line at the bottom of your html file
```HTML
<script src="/static/assets/js/wizard.js"></script>
```

then pass the values and run the howToDoWizard  
```JavaScript
var instruction = new howToDoWizard(listofInstructions, instructionId,interval);
instruction.play();
```
