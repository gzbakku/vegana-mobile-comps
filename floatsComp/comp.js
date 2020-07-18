//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-floats';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build(data);                      //start build you can also start fetch here.

}

function build(data){

  let button_color = '#348feb',button_size = '50px',button_align = 'right',
  font_color = 'white',font_family = engine.sketch.fonts.get("button") || "sans-serif",font_size = '14px',padding_top = '10px';
  if(data.color){button_color = data.color;}
  if(data.size){button_size = data.size;}
  if(data.align){button_align = data.align;}
  if(data.font_color){font_color = data.font_color;}
  if(data.font_family){font_family = data.font_family;}
  if(data.font_size){font_size = data.font_size;}
  if(data.padding_top){padding_top = data.padding_top;}
  if(data.button_size){button_size = data.button_size;}

  const buttons = engine.make.div({
    parent:compId,
    draw:data.mainContDraw || {
      all:{
        // border:'5px solid red',
        'max-height':'400px',
        width:'100vw',
        position:'fixed',
        bottom:'10vh',
        left:'0px',
        'text-align':button_align
      }
    }
  });

  if(!data.buttons){
    return;
  }

  for(let button of data.buttons){

    const btn = engine.make.div({
      parent:buttons,
      draw:{
        all:data.button_draw || {
          'vertical-align':'top',
          cursor:'pointer',
          'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.2)',
          'background-color':button_color,
          'border-radius':'100%',
          height:button_size,
          width:button_size,
          display:'inline-block',
          margin:'10px',
          'padding-top':padding_top,
          'text-align':'center'
        }
      },
      function:button.function
    });

    if(button.text){
      engine.make.div({
        parent:btn,
        text:button.text,
        draw:{
          all:data.button_text_draw || {
            'font-family':font_family,
            'font-size':font_size,
            color:font_color,
          }
        }
      });
    }
    if(button.image){
      engine.make.image({
        parent:btn,
        type:'local',
        location:button.image,
        draw:{
          all:data.button_image_draw || {
            width:'60%',
            height:'auto',
            // border:'5px solid red'
          }
        }
      });
    }

  }

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
