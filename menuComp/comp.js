//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-menu';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,options) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  return build(options);                      //start build you can also start fetch here.

}

function build(options){

  let bottom_draw,top_draw,buttons_draw,border_radius = '20px',font_family = engine.sketch.fonts.get("button");
  if(options.draw){
    if(options.draw.bottom){bottom_draw = options.draw.bottom;}
    if(options.draw.top){top_draw = options.draw.top;}
    if(options.draw.buttons){buttons_draw = options.draw.buttons;}
    if(options.draw.border_radius){border_radius = options.draw.border_radius;}
  }

  const main = engine.make.div({
    parent:compId,
    draw:{
      all:{
        position:'fixed'
      }
    }
  });

  const menuCont = engine.make.div({
    parent:main,
    draw:{
      all:{
        // border:'5px solid purple',
        display:'inline-block',
        'vertical-align':'top',
        transition:'0s'
      }
    }
  });

  const opener = engine.make.div({
    parent:main,
    draw:{
      all:{
        // border:'5px solid red',
        display:'inline-block',
        height:'0px',
        width:'0px',
        position:'fixed',
        top:'0px',
        left:'0px',
        'z-index':'99',
        'vertical-align':'top'
      },
    },
    touch:(id,move)=>{
      if(move.type === "end"){
        if(move.dirX === "left"){
          closeMenuFull();
        } else {
          openMenuFull();
        }
        hide_opener();
      } else {
        wrapperObject.style.width = (move.posX + 50) + 'px';
      }
    },
    function:()=>{
      openMenuFull();
    }
  });

  const openerObject = engine.get.element(opener);

  function show_opener(){
    openerObject.style.height = '100vh';
    openerObject.style.width = '5vw';
  }
  function hide_opener(){
    openerObject.style.height = '0px';
    openerObject.style.width = '0px';
  }

  //************************************
  //menu starts here

  const wrapper = engine.make.div({
    parent:menuCont,
    draw:{
      all:{
        // border:'5px solid red',
        display:'inline-block',
        display:'flex',
        height:'100vh',
        width:'100vw',
        'position':'fixed',
        top:'0px',
        left:'0px'
      },
    },
    touch:(id,move)=>{
      if(move.type === "end"){
        if(move.dirX === "left"){
          closeMenuFull();
        } else {
          openMenuFull();
        }
      } else {
        wrapperObject.style.width = (move.posX + 50) + 'px';
      }
    }
  });



  const menu = engine.make.div({
    parent:wrapper,
    draw:{
      all:{
        // border:'5px solid green',
        // width:'60%',
        // 'border-right':'0.5px solid grey',
        flex:5,
        display:'inline-block',
        overflow:'hidden',
        'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.2)',
        'border-top-right-radius':border_radius,
        'border-bottom-right-radius':border_radius,
      }
    }
  });

  const wrapperObject = engine.get.element(wrapper);

  let closed = true;
  if(closed){
    closeMenuFull();
  }
  function closeMenuFull(){
    wrapperObject.style.width = '0px';
    closed = true;
    show_opener();
  }
  function openMenuFull(){
    wrapperObject.style.width = '100vw';
    closed = false;
    hide_opener();
  }

  const top = engine.make.div({
    parent:menu,
    draw:top_draw
  });

  const buttons = engine.make.div({
    parent:menu,
    draw:buttons_draw
  });

  if(options.buttons){
    if(options.buttons.length > 0){

      for(let btn of options.buttons){

        const button = engine.make.div({
          parent:buttons,
          draw:{
            all:{
              'border-bottom':'0.5px solid grey',
              'min-width':'100px'
            }
          },
          function:()=>{
            if(btn.function){
              btn.function();
            }
          }
        });

          if(btn.icon){

            const buttonIcon = engine.make.div({
              parent:button,
              draw:{
                all:{
                  width:'40%',
                  display:'inline-block',
                  'vertical-align':'middle',
                  // border:'5px solid yellow',
                  'text-align':'center',
                  'padding-top':'25px',
                  'padding-bottom':'25px',
                }
              }
            });

              engine.make.image({
                parent:buttonIcon,
                type:'local',
                location:btn.icon,
                draw:{
                  all:{
                    height:'25px',
                    width:'25px'
                  }
                }
              });

          }

          engine.make.div({
            parent:button,
            text:btn.tag,
            draw:{
              all:{
                width:'60%',
                'vertical-align':'middle',
                display:'inline-block',
                'font-family':font_family
                // border:'5px solid blue'
              }
            }
          });

      }

    }
  }

  const bottom = engine.make.div({
    parent:menu,
    draw:bottom_draw
  });

  const slider = engine.make.div({
    parent:wrapper,
    draw:{
      all:{
        // border:'5px solid purple;',
        // width:'40%',
        flex:2,
        display:'inline-block',
        'min-height':'100%',
        'vertical-align':'top'
      }
    },
    function:()=>{
      closeMenuFull();
    }
  });

  return {
    wrapper:wrapper,
    menu:menu,
    top:top,
    bottom:bottom,
    close:closeMenuFull,
    open:openMenuFull
  };

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
