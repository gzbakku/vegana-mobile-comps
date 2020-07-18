# Post Office

these are ready to use vegana comps for mobile app dev.

## Installation

copy the comps in the comps directory where required within vegana app directory.

### menuComp

simple menu comp, a div comes out of left side on click or gesture to open is performed.

```js
const menuComp = require("./comps/menuComp/comp");
menuComp.init('parentId',{
    draw:{
         top:null,                   //top div
         bottom:null,                //bottom div
         buttons:null,               //buttons div
         border_radius:null,         //default is 20px
    },
    font_family:engine.sketch.fonts.get("menuButton")   //default font is button
});
```

### floatsComp

floats button fixed to 10vh from bottom

```js
const floatsComp = require("./comps/floatsComp/comp");
floatsComp.init('parentId',{
    color:'#eb7434',                    //default is blue
    font_color:'#eb7434',               //default is white
    padding_top:'12px',                 //default is 10px
    font_size:'14px',                   //default is 14px
    button_size:'100px',                //default is 50px
    buttons:[
      {
        text:'+',
        function:()=>{
          console.log('more');
        }
      },
      {
        text:'more',
        function:()=>{
          console.log('more');
        }
      },
      {
        image:'assets/images/home.png',
        function:()=>{
          console.log('less');
        }
      },
      {
        image:'assets/images/pc.png',
        function:()=>{
          console.log('less');
        }
      },
    ]
});
```

### popupComp

simple popup comp with a header which inlcudes a back arraow image.

```js
const popupComp = require("./comps/popupComp/comp");
popupComp.init('parentId',{
    tag:'settings page',
    //all properties below are optional
    background_color:'#72e06e',
    font_family:engine.sketch.fonts.get("menuButton"),
    font_color:'white',
    font_size:'24px',
    white_arrow:true,
    arrow_size:'30px',
    body_draw:DRAW(),
    arrow_padding_top:'10px',
    arrow_padding_left:'10px',
    arrow_padding_right:'10px',
    header_height:'60px',
    header_text_padding:'10px',
    header_text_margin_right:'10px',
    header_text_margin_top:'10px',
    header_text_margin_bottom:'10px',
    header_text_margin_left:'10px',
});
```

all are free to use and customizable to your needs.

feel free to add your own to this collection just make pull requests.

## License
MIT
