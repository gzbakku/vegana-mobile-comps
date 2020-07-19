

module.exports = {
  make_info:make_info,
  make_wrapper:make_wrapper
};

function make_info(parent,val){

  const wrapper = make_wrapper(parent);

  const infoCont = engine.make.div({
    parent:wrapper.body,
    draw:{
      all:{
        'padding':'10px',
      }
    }
  });

  const itemCont = engine.make.div({
    parent:infoCont,
    draw:{
      all:{
        'max-width':'400px',
        'margin':'auto',
        'border-radius':'10px',
        'border-top':'0.5px solid ' + engine.global.object.superFormCompFieldColorGrey,
        'border-left':'0.5px solid ' + engine.global.object.superFormCompFieldColorGrey,
        'border-right':'0.5px solid ' + engine.global.object.superFormCompFieldColorGrey,
      }
    }
  });

  const sectionCont = engine.make.div({
    parent:infoCont,
    draw:{
      all:{
        'max-width':'400px',
        'margin':'auto',
      }
    }
  });

  const item_tags = [
    'id','type','min','max'
  ];
  const section_tags = [
    'info','anchor','title'
  ];

  for(let tag of item_tags){
    if(val[tag]){
      make_info_item(itemCont,tag,val[tag]);
    }
  }

  for(let tag of section_tags){
    if(val[tag]){
      make_info_section(sectionCont,tag,val[tag]);
    }
  }

}

function make_info_section(parent,tag,val){

  const body = engine.make.div({
    parent:parent,
    draw:{
      all:{
        'padding':'10px',
        'font-family':engine.global.object.superFormCompFont,
        'text-align':'left'
      }
    }
  });

    engine.make.div({
      parent:body,
      text:tag,
      draw:{
        all:{
          'color':engine.global.object.superFormCompFieldColor,
          'font-size':'18px'
        }
      }
    });

    engine.make.div({
      parent:body,
      text:val,
      draw:{
        all:{
          'font-size':'24px'
        }
      }
    });

}

function make_info_item(parent,tag,val){

  const body = engine.make.div({
    parent:parent,
    draw:{
      all:{
        'display':'flex',
        'font-family':engine.global.object.superFormCompFont,
        'border-bottom':'0.5px solid ' + engine.global.object.superFormCompFieldColorGrey,
      }
    }
  });

    engine.make.div({
      parent:body,
      text:tag,
      draw:{
        all:{
          'flex':'1',
          'font-size':'16px',
          'border-right':'0.5px solid ' + engine.global.object.superFormCompFieldColorGrey,
        }
      }
    });

    engine.make.div({
      parent:body,
      text:val,
      draw:{
        all:{
          'flex':'1',
          'font-size':'18px'
        }
      }
    });

}

function make_wrapper(parent){

  const wrapper = engine.make.div({
    parent:parent,
    draw:{
      all:{
        'position': 'fixed',
        'height': '100vh',
        'width': '100vw',
        'top':'0px',
        'left':'0px',
        'z-index': 1
      }
    }
  });

  engine.make.div({
    parent:wrapper,
    function:()=>{
      engine.view.remove(wrapper);
    },
    draw:{
      all:{
        'position': 'absolute',
        'height': '100vh',
        'width': '100vw',
        'top':'0px',
        'left':'0px',
        'background-color': engine.global.object.superFormCompFieldColorBlue,
        'opacity': 0.1
      }
    }
  });

  const card_mobile_draw = {
    height:'100vh',
    width:'100vw',
    top:'0px',
    'border-radius':'0px'
  };

  const card = engine.make.div({
    parent:wrapper,
    draw:{
      all:{
        // 'border':'5px solid red',
        'overflow': 'hidden',
        'border-radius': '10px',
        'position': 'relative',
        'background-color': 'white',
        'height':'70vh',
        'max-width': '600px',
        'top':'20vh',
        'margin': 'auto'
      },
      browser:{
        mobile:card_mobile_draw
      },
      cordova:{
        all:card_mobile_draw
      }
    }
  });

    const top = engine.make.div({
      parent:card,
      draw:{
        all:{
          'text-align': 'right',
          'padding': '10px',
          'height':'15%'
        }
      }
    });

      engine.make.button({
        parent:top,
        value:'close',
        function:()=>{
          engine.view.remove(wrapper);
        },
        draw:{
          all:{
            'background-color': engine.global.object.superFormCompFieldColor,
            'color':'white',
            'border': '0px',
            'border-radius': '5px',
            'padding': '5px',
            'font-size': '18px',
            'font-family': engine.global.object.superFormCompFont,
            'cursor':'pointer'
          }
        }
      });

    const body = engine.make.div({
      parent:card,
      draw:{
        all:{
          'padding-top': '3vh',
          'padding-bottom': '3vh',
          'text-align': 'center',
          'overflow': 'auto',
          'height':'85%',
        }
      }
    });

    return {
      body:body,
      close:close
    };

}
