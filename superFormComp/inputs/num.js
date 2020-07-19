

module.exports = (parent,data,make_wrapper,val)=>{

  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(base_wrapper,data);

  const input = engine.make.input({
    parent:wrapper.input,
    class:'comp-super_form-main-form-field-common-input_wrapper-input',
    type:'string',
    placeholder:data.placeholder,
    value:val,
    function:(id,val)=>{
      val = Number(val);
      if(!val || isNaN(val)){
        wrapper.invalid();
        return;
      }
      if(data.function){data.function(input,val);}
      let len = val;
      if(data.min){if(len < data.min){wrapper.invalid();return;}}
      if(data.max){if(len > data.max){wrapper.invalid();return;}}
      wrapper.valid();return;
    },
    draw:engine.global.object.superFormInputDraw
  });

  return {
    empty:()=>{
      if(!engine.binder.text){
        return true;
      } else {
        return false;
      }
    },
    id:input,
    wrapper_id:base_wrapper,
    input_id:input,
    control:{
      update:(val)=>{
        engine.set.input.value(input,val);
      }
    },
    get:()=>{
      return engine.binder.number(input);
    },
    verify:()=>{
      val = engine.binder.number(input);
      if(!val || isNaN(val)){
        if(!data.required){wrapper.valid();return true;}
        wrapper.invalid();
        return false;
      }
      let len = val;
      if(data.min){if(len < data.min){wrapper.invalid();return false;}}
      if(data.max){if(len > data.max){wrapper.invalid();return false;}}
      wrapper.valid();return true;
    }
  };



};
