# How to do

## Installation

#### Use NPM
```
npm i howtodo
```

#### Or use CDN

When you only need to include Howtodo's compiled JS, you can use [jsDelivr](https://www.jsdelivr.com/). 

```
<script src="https://cdn.jsdelivr.net/npm/howtodo@1.0.28/wizard.min.js"></script>
```

## About this Project
A simple JavaScript libarary (**_howtodo_**) which can give you a power to create the instruction session more fun and easy for all your **_Web And Mobile Products_** .

![previewImg](https://bucket--001.s3.ap-south-1.amazonaws.com/preview.gif)


## Usage
Just By these simple steps you can show anyone ```"How to do this?"``` Anywhere in you website.

#### HTML

Include the wizard.js file at the bottom of your html file
```HTML
<script src="https://cdn.jsdelivr.net/npm/howtodo@1.0.28/wizard.min.js"></script>
```

#### JavaScript

Make a new instance ```howToDoWizard``` and pass the values.

```JavaScript
var instruction = new howToDoWizard();

// to start a fun session
instruction.play(topicId, autoplay, interval,navigation); 
```
Now You dont have to create a DIV with id ```instructionsModal```




||Description|     
|----|-----|      
|```id```|Generated topic ```id``` |
|```autoplay```|By default it is :```false```|
|```interval```| time in which the next step will be executed. By default it is :```3000ms```|
|```navigation```|By default it is :```true``` (```back``` and ```next```) |



 A simple Example showing how the Widget will look with diffrent ```example options```

With Image in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/imageExample.png)

With Text in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/textexample.png)


### Thank You
Available for freelance Work or you want to add something in this.

Contact me: ```+91 9506370145```