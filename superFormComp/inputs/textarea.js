

module.exports = (parent,data,make_wrapper,val)=>{

  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(base_wrapper,data);

  if(!data.rows){
    data.rows = 5;
  }

  const input = engine.make.textarea({
    parent:wrapper.body,
    class:'comp-super_form-main-form-field-textarea_wrapper-input',
    placeholder:data.placeholder,
    rows:data.rows,
    value:val,
    function:(id,val)=>{
      if(!val){
        wrapper.invalid();
        return;
      }
      let len = val.length;
      if(data.min){if(len < data.min){wrapper.invalid();return;}}
      if(data.max){if(len > data.max){wrapper.invalid();return;}}
      wrapper.valid();return;
    },
    draw:{
      all:{
        'background-color': 'inherit',
        'width': '99%',
        'border': '0px',
        'padding': '10px',
        'color':'white',
        'font-family': engine.global.object.superFormCompFont,
        'font-size': '18px'
      }
    }
  });

  make_control(wrapper.body,input);

  return {
    empty:()=>{
      if(!engine.binder.text(input)){
        return true;
      } else {
        return false;
      }
    },
    id:data.id,
    wrapper_id:wrapper,
    input_id:input,
    control:{
      update:(val)=>{
        engine.set.input.value(input,val);
      }
    },
    get:()=>{
      return engine.binder.text(input);
    },
    verify:()=>{
      let val = engine.binder.text(input);
      if(!val){val = ''}
      let len = val.length;
      if(!data.required && len == 0){wrapper.valid();return true;}
      if(data.min){if(len < data.min){wrapper.invalid();return false;}}
      if(data.max){if(len > data.max){wrapper.invalid();return false;}}
      wrapper.valid();return true;
    }
  };

};

function make_control(parent,input){

  let obj = document.getElementById(input);

  const field = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-textarea_wrapper-control',
    draw:{
      all:{
        'text-align': 'right',
        'padding': '5px',
      }
    }
  });

  const button_draw = {
    'color':'white',
    'font-size': '24px',
    'font-family': engine.global.object.superFormCompFont,
    'display': 'inline-block',
    'padding': '5px',
    'background-color': engine.global.object.superFormCompFieldColorBgDark,
    'border-radius': '5px',
    'min-width': '50px',
    'margin': '5px',
    'text-align': 'center',
    'cursor': 'pointer',
    'border': '0px',
  };

  engine.make.button({
    parent:field,
    class:'comp-super_form-main-form-field-textarea_wrapper-control-button',
    value:'-',
    function:()=>{
      obj.rows -= 1;
    },
    draw:{
      all:button_draw
    }
  });

  engine.make.button({
    parent:field,
    class:'comp-super_form-main-form-field-textarea_wrapper-control-button',
    value:'+',
    function:()=>{
      obj.rows += 1;
    },
    draw:{
      all:button_draw
    }
  });

}
