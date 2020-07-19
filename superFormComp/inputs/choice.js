

module.exports = (parent,data,make_wrapper,vals)=>{

  if(!vals){vals = [];}
  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(parent,data);

  let collect = [];
  let buttons = {};

  for(let option of data.options){

    let button_draw = {
      'background-color': engine.global.object.superFormCompFieldColorBgDark,
      'display': 'inline-block',
      'padding': '10px',
      'color':'white',
      'font-family': engine.global.object.superFormCompFont,
      'border-radius': '5px',
      'margin': '5px',
      'cursor': 'pointer',
      'border': '0px',
    };

    if(vals.indexOf(option) >= 0){
      button_draw["background-color"] = engine.global.object.superFormCompFieldColorGreen;
      collect.push(option);
    }

    const button = engine.make.button({
      parent:wrapper.body,
      class:'comp-super_form-main-form-field-choice_wrappper-body-item',
      value:option,
      function:(id)=>{
        const buttonObject = engine.get.element(id);
        if(collect.indexOf(option) >= 0){
          buttonObject.style["background-color"] = engine.global.object.superFormCompFieldColorBgDark;
          collect.splice(collect.indexOf(option), 1);
        } else {
          buttonObject.style["background-color"] = engine.global.object.superFormCompFieldColorGreen;
          collect.push(option);
        }
        if(data.function){data.function(base_wrapper,collect);}
        check();
      },
      draw:{
        all:button_draw
      }
    });

    buttons[option] = button;
  }

  return {
    get:()=>{
      return collect;
    },
    id:data.id,
    wrapper_id:base_wrapper,
    control:{
      activate:(option)=>{
        if(data.options.indexOf(option) < 0){
          console.log("!!! failed-activate_option-choice-form => not a valid option : " + option);
          return false;
        }
        if(collect.indexOf(option) >= 0){
          console.log("!!! failed-activate_option-choice-form => already activated : " + option);
          return true;
        }
        engine.make.addClass({id:buttons[option],class:'comp-super_form-main-form-field-choice_wrappper-body-item-active'});
        collect.push(option);
        return true;
      },
      deactivate:(option)=>{
        if(vals.indexOf(option) < 0){
          return false;
        }
        if(collect.indexOf(option) < 0){
          return true;
        }
        engine.make.removeClass({id:buttons[option],class:'comp-super_form-main-form-field-choice_wrappper-body-item-active'});
        collect.splice(collect.indexOf(option), 1);
        return true;
      }
    },
    verify:()=>{
      return check();
    },
    empty:()=>{
      if(collect.length === 0){
        return true;
      } else {
        return false;
      }
    }
  };

  function check(){
    let len = collect.length;
    if(!data.required && len == 0){
      wrapper.valid();return true;
    }
    if(data.min){if(len < data.min){wrapper.invalid();return false;}}
    if(data.max){if(len > data.max){wrapper.invalid();return false;}}
    wrapper.valid();return true;
  }

};
