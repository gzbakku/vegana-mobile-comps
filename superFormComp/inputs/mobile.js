
const country_code = require("./country_code.json");

module.exports = (parent,data,make_wrapper,val,make_options)=>{

  if(!val){val = {};}

  data.options = country_code;

  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(base_wrapper,data);

  const internal_wrapper = engine.make.div({
    parent:wrapper.input,
    class:'comp-super_form-main-form-field-mobile-internal_wrapper',
    draw:{
      all:{
        'height': '100%'
      }
    }
  });

  let code = val.code;

  const select = engine.make.div({
    parent:internal_wrapper,
    type:'string',
    class:'comp-super_form-main-form-field-mobile-internal_wrapper-select',
    text:code || 'country code',
    function:(id)=>{
      make_options(parent,data,(val)=>{
        engine.set.div.style(select,[{
          'font-size':'32px !important;'
        }]);
        engine.set.div.text(id,val);
        code = val;
      },code);
    },
    draw:{
      all:{
        'vertical-align': 'top',
        'background-color': 'inherit',
        'height': '100%',
        'width': '40%',
        'border': '0px',
        'color': 'white',
        'font-family': engine.global.object.superFormCompFont,
        'font-size': '14px',
        'padding': '10px',
        'cursor': 'pointer',
        'display': 'inline-block'
      }
    }
  });

  const input = engine.make.input({
    parent:internal_wrapper,
    class:'comp-super_form-main-form-field-mobile-internal_wrapper-input',
    type:'string',
    placeholder:data.placeholder,
    value:val.mobile,
    function:(id,val)=>{
      if(!val){
        if(!data.required){wrapper.valid();return true;}
        else{wrapper.invalid();return;}
      }
      let len = val.toString().length;
      if(isNaN(val) && len > 0){wrapper.invalid();return;}
      if(len < 5){wrapper.invalid();return;}
      if(len > 15){wrapper.invalid();return;}
      wrapper.valid();return;
    },
    draw:{
      all:{
        'vertical-align': 'top',
        'background-color': 'inherit',
        'height': '100%',
        'width': '60%',
        'border': '0px',
        'color': 'white',
        'font-family': engine.global.object.superFormCompFont,
        'font-size': '18px',
        'padding': '10px'
      }
    }
  });

  return {
    empty:()=>{
      if(!code || !engine.binder.text(input)){
        return true;
      } else {
        return false;
      }
    },
    id:input,
    wrapper_id:base_wrapper,
    input_id:input,
    control:{
      update:(cc,val)=>{
        code = cc;
        engine.set.input.value(input,val);
      }
    },
    get:()=>{
      return {
        code:code,
        mobile:engine.binder.number(input)
      };
    },
    verify:()=>{
      let val = engine.binder.text(input);
      //verify number
      if(!code){
        if(!data.required){
          wrapper.valid();return true;
        } else {
          wrapper.invalid();return false;
        }
      }
      //verify phone
      if(!val){
        if(!data.required){wrapper.valid();return true;}
        else{wrapper.invalid();return false;}
      }
      let len = val.toString().length;
      if(isNaN(val) && len > 0){wrapper.invalid();return false;}
      if(len < 5){wrapper.invalid();return false;}
      if(len > 15){wrapper.invalid();return false;}
      wrapper.valid();return true;
    }
  };

};
