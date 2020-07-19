

module.exports = (parent,data,make_wrapper,val,make_country)=>{

  if(!val){val = {};}

  const base_wrapper = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-common-address',
    draw:{
      all:{
        'padding': '10px',
        'margin': '10px',
        'border-radius': '10px'
      }
    }
  });

  engine.make.div({
    parent:base_wrapper,
    class:'comp-super_form-main-form-field-common-address-title',
    text:'Address : ' + data.id,
    draw:{
      all:{
        'font-size': '24px',
        'font-family': engine.global.object.superFormCompFont,
        'color':engine.global.object.superFormCompFieldColor,
        'text-align': 'center'
      }
    }
  });

  let fields = [
    {type:'string',id:'house',placeholder:'House no, Floor, Building no',required:data.required},
    {type:'string',id:'street',placeholder:'Street, Landmark',required:false},
    {type:'string',id:'locality',placeholder:'Locality',required:false},
    {type:'string',id:'city',placeholder:'City',required:data.required},
    {type:'string',id:'state',placeholder:'State',required:data.required},
    {type:'country',id:'country',placeholder:'Country',required:data.required},
    {type:'number',id:'zip code',placeholder:'Zip Code',required:data.required},
  ];

  let controllers = {};

  let addressFunc;
  if(data.function){
    addressFunc = ()=>{
      if(validate()){
        data.function(base_wrapper,compile());
      }
    }
  }

  for(let field of fields){
    if(field.type === 'string'){
      let hold = make_string_field(
        make_wrapper,base_wrapper,
        field.placeholder,val[field.id],field.id,data.required,addressFunc
      );
      controllers[field.id] = hold;
    }
    else if(field.type === 'number'){
      let hold = make_number_field(
        make_wrapper,base_wrapper,
        field.placeholder,val[field.id],field.id,data.required,addressFunc
      );
      controllers[field.id] = hold;
    }
    else if(field.type === 'country'){
      controllers[field.id] = make_country(base_wrapper,field,make_wrapper,val[field.id]);
    }
  }

  function all_empty(){
    let empty = true;
    for(let key in controllers){
      if(!controllers[key].empty()){
        empty = false;
      }
    }
    return empty;
  }
  function all_valid(after){
    let valid = true;
    for(let key in controllers){
      let control = controllers[key];
      if(key === "street" || key === "locality"){
        if(!control.empty()){
          if(!control.validate()){valid = false;}
        }
      } else {
        if(!control.validate(after)){valid = false;}
      }
    }
    return valid;
  }
  function validate(){
    if(all_empty() && !data.required){
      return true;
    }
    if(all_valid(true)){return true;} else  {return false;}
  }
  function compile(){
    let build = {};
    // console.log(controllers);
    for(let key of Object.keys(controllers)){
      // console.log(key);
      let control = controllers[key];
      if(key === "street" || key === "locality"){
        if(!control.empty()){
          build[key] = control.get();
        }
      } else {
        build[key] = control.get();
      }
    }
    return build;
  }

  return {
    empty:all_empty,
    wrapper_id:base_wrapper,
    control:{},
    get:()=>{
      return compile();
    },
    verify:()=>{
      return validate();
    }
  };

};

function make_string_field(make_wrapper,parent,placeholder,val,id,required,addressFunc){

  const wrapper = make_wrapper(parent,{
    id:id,
    info:placeholder
  });

  const input = engine.make.input({
    parent:wrapper.input,
    class:'comp-super_form-main-form-field-common-input_wrapper-input',
    type:'string',
    placeholder:placeholder,
    value:val,
    function:(id,val)=>{
      if(!val){wrapper.invalid();return;}
      let len = val.length;
      if(len < 1){wrapper.invalid();return;}
      if(len > 512){wrapper.invalid();return;}
      if(addressFunc){addressFunc();}
      wrapper.valid();return;
    },
    draw:engine.global.object.superFormInputDraw
  });

  return {
    empty:()=>{
      let val = engine.binder.text(input);
      if(!val || val.length == 0){return true} else {return false;}
    },
    get:()=>{
      return engine.binder.text(input);
    },
    validate:(required_now)=>{
      let val = engine.binder.text(input);
      if(!required_now){
        if(!val){if(!required){wrapper.valid();return true;}}
      }
      if(val.length > 1 && val.length < 512){
        wrapper.valid();
        return true;
      } else {
        wrapper.invalid();
        return false;
      }
    },
    update:(v)=>{
      engine.set.input.value(input,v);
    },
    wrapper:wrapper,
    input:input
  };

}

function make_number_field(make_wrapper,parent,placeholder,val,id,required,addressFunc){

  const wrapper = make_wrapper(parent,{
    id:id,
    info:placeholder
  });

  const input = engine.make.input({
    parent:wrapper.input,
    class:'comp-super_form-main-form-field-common-input_wrapper-input',
    type:'number',
    placeholder:placeholder,
    value:val,
    function:(id,val)=>{
      if(!val){wrapper.invalid();return;}
      if(val < 100){wrapper.invalid();return;}
      if(val > 99909990999099909990){wrapper.invalid();return;}
      if(addressFunc){addressFunc();}
      wrapper.valid();return;
    },
    draw:engine.global.object.superFormInputDraw
  });

  return {
    empty:()=>{
      if(!engine.binder.number(input)){return true;} else {return false;}
    },
    get:()=>{
      return engine.binder.number(input);
    },
    validate:(required_now)=>{
      let val = engine.binder.number(input);
      if(!required_now){
        if(!val && !required){wrapper.valid();return true;}
      }
      if(val > 1 && val < 99909990999099909990){
        wrapper.valid();
        return true;
      } else {
        wrapper.invalid();
        return false;
      }
    },
    update:(v)=>{
      engine.set.input.value(input,v);
    },
    wrapper:wrapper,
    input:input
  };

}
