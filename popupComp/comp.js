//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-popup';             //dont worry about this
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
  return build(data);                      //start build you can also start fetch here.

}

function build(data){

  let background_color = '#72e06e',font_color = 'white',font_size = '24px',
  font_family = engine.sketch.fonts.get("heading"),white_arrow = true,
  arrow_size = '25px',body_draw,arrow_padding_top = '10px',
  arrow_padding_left = '10px',arrow_padding_right = '20px',header_height = '60px',
  header_text_padding = '10px',header_text_margin_right,header_text_margin_top,header_text_margin_bottom,header_text_margin_left;
  if(data.background_color){background_color = data.background_color;}
  if(data.font_color){font_color = data.font_color;}
  if(data.font_size){font_size = data.font_size;}
  if(data.font_family){font_family = data.font_family;}
  if(data.white_arrow){white_arrow = data.white_arrow;}
  if(data.arrow_size){arrow_size = data.arrow_size;}
  if(data.body_draw){body_draw = data.body_draw;}
  if(data.arrow_padding_top){arrow_padding_top = data.arrow_padding_top;}
  if(data.arrow_padding_left){arrow_padding_left = data.arrow_padding_left;}
  if(data.arrow_padding_right){arrow_padding_right = data.arrow_padding_right;}
  if(data.header_height){header_height = data.header_height;}
  if(data.header_text_padding){header_text_padding = data.header_text_padding;}
  if(data.header_text_margin_right){header_text_margin_right = data.header_text_margin_right;}
  if(data.header_text_margin_top){header_text_margin_top = data.header_text_margin_top;}
  if(data.header_text_margin_bottom){header_text_margin_bottom = data.header_text_margin_bottom;}
  if(data.header_text_margin_left){header_text_margin_left = data.header_text_margin_left;}

  const main = engine.make.div({
    parent:compId,
    draw:{
      all:{

      }
    }
  });

  function close(){
    engine.view.remove(main);
    if(data.closeFunction){
      data.closeFunction();
    }
  }

  const header = engine.make.div({
    parent:main,
    draw:{
      all:{
        // border:'5px solid red',
        'background-color':background_color,
        color:font_color,
        'font-family':font_family,
        // padding:'10px',
        position:'fixed',
        width:'100vw',
        height:header_height,
        top:'0px',
        left:'0px'
      }
    }
  });

    const header_button_cont = engine.make.div({
      parent:header,
      draw:{
        all:{
          // border:'5px solid purple',
          'vertical-align':'top',
          // width:'20%',
          'display':'inline-block',
          'padding-left':arrow_padding_left,
          'padding-top':arrow_padding_top,
          'padding-right':arrow_padding_right
        }
      }
    });

    const arraow_svg_base64 = "data:image/png;base64,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";

    let img_draw = {
      height:arrow_size,
      width:arrow_size
    };
    if(white_arrow){
      img_draw.filter = 'invert(100%)';
    }

    engine.make.image({
      parent:header_button_cont,
      type:'url',
      location:arraow_svg_base64,
      draw:{
        all:img_draw
      },
      function:close
    });

    //---------------------------------------------
    //header tag

    const header_tag = engine.make.div({
      parent:header,
      draw:{
        all:{
          // border:'5px solid blue',
          'vertical-align':'top',
          // width:'80%',
          'display':'inline-block',
          'padding':header_text_padding
          // border:'5px solid red'
        }
      }
    });

      engine.make.div({
        parent:header_tag,
        text:data.tag || "popup",
        draw:{
          all:{
            'font-family':font_family,
            'font-size':font_size,
            'text-align':'center',
            'margin-left':header_text_margin_left,
            'margin-right':header_text_margin_right,
            'margin-top':header_text_margin_top,
            'margin-bottom':header_text_margin_bottom
          }
        }
      });

  const body = engine.make.div({
    parent:main,
    draw:{
      all:body_draw || {
        'margin-top':header_height
      }
    }
  });

  return {
    body:body,
    close:close
  };

}

module.exports = {init:init,ref:compRef,type:type,trackers:null}
