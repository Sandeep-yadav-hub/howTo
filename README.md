# How to do

## Installation

#### Use NPM
```
npm i howtodo
```

#### Or use CDN

When you only need to include Howtodo's compiled JS, you can use [jsDelivr](https://www.jsdelivr.com/). 

```
<script src="https://cdn.jsdelivr.net/npm/howtodo@1.0.34/wizard.min.js"></script>
```

## About this Project
The library is an advanced tool that also assists you in a simple and time saving onboarding of new members to your company. In the new era of Work from Home Culture, a lot of platforms have emerged to assist your user while they are working to ensure a consistent and hassle free flow, for example Gramarly assist you while typing instantly to point out errors and the tone of your text.

With '**_How To Do_**', you can include this library in your system to explain the functioning of your website to your users and customers in an interactive and self explanatory manner.

![previewImg](https://bucket--001.s3.ap-south-1.amazonaws.com/preview.gif)


## Usage
Just By these simple steps you can show anyone ```"How to do this?"``` Anywhere in you website.

#### HTML

Include the wizard.js file at the bottom of your html file
```HTML
<script src="https://cdn.jsdelivr.net/npm/howtodo@1.0.32/wizard.min.js"></script>
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


If you dont have the generated id then you can pass your instruction like this:

```JavaScript
var myInput = {
  title: "How To Fill This Form ?",
  instruction: [
    {
      id: 1,
      title: "Enter your Emil Id here ..",
      elementId: "emailId",
      example: { placeholder: "john@example.com", text: "" },
    },
    {
      id: 2,
      title: "Enter your password here",
      elementId: "password",
      example: {
        placeholder: "ab@12hs",
        text: "Do not tell or Share this with anyone.",
        imageUrl: "",
        audioUrl: "",
      },
    },
  ],
};

var instruction = new howToDoWizard();

// to start a fun session
instruction.play({myInput, autoplay, interval,navigation});

```

Otherwise you can create and manage all your topics in one place. With only few steps you will be able to guide your user anywhere in you website.

To create [Click here](http://howtodo-env.eba-qfag845f.ap-south-1.elasticbeanstalk.com/)



 A simple Example showing how the Widget will look with diffrent ```example options```

With Image in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/Screen+Shot+2021-04-27+at+12.52.11+AM.png)

With Text in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/Screen+Shot+2021-04-27+at+12.59.23+AM.png)


### Thank You

Contact me if you have any issue.

mobile : ```+91 9506370145``` <br>
email : ```y.sandeep@outlook.com```