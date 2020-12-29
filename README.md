# How to do

## Installation
```
npm i howtodo
```
## About this Project
A simple JavaScript libarary (**_howtodo_**) which can give you a power to create the instruction session more fun and easy for all your **_Web And Mobile Products_** .

![previewImg](https://bucket--001.s3.ap-south-1.amazonaws.com/preview.gif)


## Usage
Just By these simple steps you can show anyone ```"How to do this?"``` Anywhere in you website.

#### HTML

Include the wizard.js file at the bottom of your html file
```HTML
<script src="../../wizard.js"></script>
```

Create div with the id ```"instructionsModal"```
```html
<div id="instructionsModal">

</div>
```

#### JavaScript

Make a new instance ```howToDoWizard``` and pass the values.

```JavaScript
var instruction = new howToDoWizard(array, id, autoplay, interval,navigation); //id = topic id from the array

// to start a fun session
instruction.play(); 
```


||Description|     
|----|-----|      
|```array```|list of topics with their instructions   |
|```id```|topic ```id``` from the array|
|```autoplay```|By default it is :```false```|
|```interval```| time in which the next step will be executed. By default it is :```3000ms```|
|```navigation```|By default it is :```true``` (```back``` and ```next```) |

Example of a session with multiple topics and multiple instruction.

```JavaScript
var listOfInstruction = [
{
    id: 0,
    title: "how to fill the form",
    instruction: [
            {
                stepId: 0,
                step: "Enter Your Email id Here",
                id: "emailId",
                example: {
                    placeholder: "example@gmail.com",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste rem vitae minima, dignissimos",
                    imageUrl:
                    "https://techcrunch.com/wp-content/uploads/2018/01/giphy1.gif?w=730&crop=1",
                    audioUrl: "/static/assets/audio/waterfall.mp3",
                }
            },
            {
                stepId: 1,
                step: "Enter Your Password here Here",
                id: "password",
                example: {
                    placeholder: "a2@bcqwe",
                }
            }
        ],
    },
    id: 1,
    title: "how to do this",
    instruction: [
            {
                stepId: 0,
                step: "Do Something Here",
                id: "eleId",
                example: {
                    placeholder: "example@gmail.com",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste rem vitae minima, dignissimos",
                    imageUrl:
                    "https://techcrunch.com/wp-content/uploads/2018/01/giphy1.gif?w=730&crop=1",
                    audioUrl: "/static/assets/audio/waterfall.mp3",
                }
            }
        ],
    },
];
```
> * ```id``` : Must be  unique . For initializing the correct topic from the array.```Important```
> * ```title``` : As the name suggest title/topic of the session. 
> * ```instruction``` : It is a array in which every object is instruction of the perticular topic. 
>     * ```step``` : Title of the instruction. 
>     * ```id```: Element ```id``` where you want to show the instruction. (Unique)
>     * ```example```: .
>          * ```placeholder``` : for input elments to mimic form filling , ```audioUrl``` : To play audio in the background,```imageUrl``` : add image ,```text``` : add text below the image or just add text.

 A simple Example showing how the Widget will look with diffrent ```example options```

>With Image in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/preview.png)

>With only Text in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/Screen+Shot+2020-12-28+at+6.19.55+PM.png)

>With only Text and Image in it

![previewOFaWidget](https://bucket--001.s3.ap-south-1.amazonaws.com/Screen+Shot+2020-12-28+at+6.19.47+PM.png)

## Customization
You can also change the background and font color of the instruction window just by passing these in ```.play()```


```JavaScript
var backgroundColor = "#000"
var fontColor = "#fff"
instruction.play(backgroundColor,fontColor);

```

![changeBackgroundPreview](https://bucket--001.s3.ap-south-1.amazonaws.com/colorChange.png)


Available for freelance Work 
Contact me: +91 9506370145