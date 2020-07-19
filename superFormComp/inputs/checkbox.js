

module.exports = (parent,data,make_wrapper,val)=>{

  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(parent,data);

  let active = val;
  if(!active){
    active = false;
  }

  const main = engine.make.div({
    parent:wrapper.center,
    class:'comp-super_form-main-form-field-check_box_wrapper-switch',
    function:(id)=>{
      if(data.function){data.function(main,active);}
      if(active){
        deactivate();
      } else {
        activate();
      }
      check();
    },
    draw:{
      all:{
        'height': '30px',
        'width': '50px',
        'margin-top': '10px',
        'border': '5px solid ' + engine.global.object.superFormCompFieldColorGrey,
        'border-radius': '25px',
        'overflow': 'auto',
        'display': 'inline-block',
        'cursor': 'pointer',
      }
    }
  });

  const ballWrapperObject = engine.get.element(main);

  function activate(){
    ballObject.style["float"] = 'right';
    ballObject.style["background-color"] = engine.global.object.superFormCompFieldColorGreen;
    active = true;
    if(data.function){data.function(active);}
  }

  function deactivate(){
    ballObject.style["float"] = 'left';
    ballObject.style["background-color"] = engine.global.object.superFormCompFieldColor;
    active = false;
    if(data.function){data.function(active);}
  }

  const ball = engine.make.div({
    parent:main,
    class:'comp-super_form-main-form-field-check_box_wrapper-switch-ball',
    draw:{
      all:{
        'height': '20px',
        'width': '20px',
        'border-radius': '100%',
        'transition': '0.5s ease',
        'background-color':engine.global.object.superFormCompFieldColor
      }
    }
  });

  const ballObject = engine.get.element(ball);

  return {
    id:data.id,
    wrapper_id:base_wrapper,
    get:()=>{
      return active;
    },
    control:{
      deactivate:deactivate,
      activate:activate,
      switch:(hold)=>{
        if(hold){
          activate();
        } else {
          deactivate();
        }
      },
      toggle:()=>{
        if(active){
          deactivate();
        } else {
          activate();
        }
      }
    },
    verify:()=>{
      return check();
    }
  };

  function check(){
    if(data.hasOwnProperty('check_val')){
      if(data.check_val === active){
        wrapper.valid();
        return true;
      } else {
        wrapper.invalid();
        return false;
      }
    } else {
      wrapper.valid();
      return true;
    }
  }

}
