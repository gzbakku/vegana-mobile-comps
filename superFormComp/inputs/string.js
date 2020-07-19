

module.exports = {
  string:(parent,data,make_wrapper,val)=>{
    return common(parent,data,make_wrapper,val,'string');
  },
  password:(parent,data,make_wrapper,val)=>{
    return common(parent,data,make_wrapper,val,'password');
  },
  date:(parent,data,make_wrapper,val)=>{
    return common(parent,data,make_wrapper,val,'date');
  },
  time:(parent,data,make_wrapper,val)=>{
    return common(parent,data,make_wrapper,val,'time');
  },
  email:(parent,data,make_wrapper,val)=>{
    return common(parent,data,make_wrapper,val,'email');
  }
};

function common(parent,data,make_wrapper,val,type){

  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(base_wrapper,data);

  const input = engine.make.input({
    parent:wrapper.input,
    class:'comp-super_form-main-form-field-common-input_wrapper-input',
    type:type,
    placeholder:data.placeholder,
    value:val,
    function:(id,val)=>{
      if(!val){
        wrapper.invalid();
        return;
      }
      let len = val.length;
      if(data.min){if(len < data.min){wrapper.invalid();return;}}
      if(data.max){if(len > data.max){wrapper.invalid();return;}}
      if(type === "email"){
        if(!engine.validate.email(val)){wrapper.invalid();return;}
      }
      if(data.function){data.function(input,val);}
      wrapper.valid();return;
    },
    draw:engine.global.object.superFormInputDraw
  });

  return {
    empty:()=>{
      if(!engine.binder.text(input)){
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
      return engine.binder.text(input);
    },
    verify:()=>{
      let val = engine.binder.text(input);
      let validate = verify_type(type,val,data);
      if(!validate){wrapper.invalid();return false;}
      else {wrapper.valid();return true;}
    }
  };

}

function verify_type(type,val,data){
  if(!val && data.required){return false;}
  let len = val.length;
  if(!data.required && len == 0){return true;}
  if(data.min){if(len < data.min){return false;}}
  if(data.max){if(len > data.max){return false;}}
  let control;
  if(type === "string"){
    control = true;
  }
  if(type === "email"){
    control = engine.validate.email(val);
  }
  if(type === "time"){
    control = verify_time(val);
  }
  if(type === "date"){
    control = validate_date(val);
  }
  if(!control){return false;} else {return true;}
}

// y-m-d

function validate_date(val){
  let hold = val.split("-");
  if(hold.length !== 3){return false;}
  if(isNaN(hold[0]) || isNaN(hold[1]) || isNaN(hold[2])){return false;}
  if(hold[0].length !== 4 || hold[1].length !== 2 || hold[2].length !== 2){return false;}
  return true;
}

function verify_time(val){
  if(!val.includes(":")){return false;}
  if(val.length !== 5){return false;}
  let hold = val.split(":");
  if(hold.length !== 2){return false;}
  if(isNaN(hold[0]) || isNaN(hold[1])){return false;}
  return true;
}

// verify:()=>{
//   let val = engine.binder.text(input);
//   if(!val){val = ''}
//   let len = val.length;
//   if(!data.required && len == 0){wrapper.valid();return true;}
//   if(data.min){if(len < data.min){wrapper.invalid();return false;}}
//   if(data.max){if(len > data.max){wrapper.invalid();return false;}}
//   wrapper.valid();return true;
// }
