

module.exports = (parent,data,make_wrapper,vals)=>{

  // const font =

  if(!vals){vals = [];}
  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(parent,data);

  const message_cont = engine.make.div({
    parent:wrapper.body,
  });

  let message;

  function new_message(m){
    if(message){engine.view.remove(message);}
    message = engine.make.div({
      parent:message_cont,
      text:m,
      draw:{
        all:{
          'width': '80%',
          'margin':'auto',
          'margin-top':'10px',
          'margin-bottom':'10px',
          'padding':'10px',
          'border-radius':'10px',
          'color':'white',
          'font-family':engine.global.object.superFormCompFont,
          'background-color':engine.global.object.superFormCompFieldColorRed
        }
      }
    });
  }

  function reset_message(){
    if(message){
      engine.view.remove(message);
      message = null;
    }
  }

  const snipets_cont = engine.make.div({
    parent:wrapper.body,
    class:'comp-super_form-main-form-field-snipets_wrapper-snipets'
  });

  function add_snipet(val){
    vals.push(val);
    make_snipet(snipets_cont,val,remove_snipet);
    if(data.items){
      if(data.items.min){if(vals.length < data.items.min){wrapper.invalid();return;}}
      if(data.items.max){if(vals.length > data.items.max){wrapper.invalid();return;}}
    }
    wrapper.valid();return;
  }

  function remove_snipet(val){
    vals.splice(vals.indexOf(val),1);
    let len = vals.length;
    if(data.items){
      if(data.items.min){if(len < data.items.min){wrapper.invalid();return false;}}
      if(data.items.max){if(len > data.items.max){wrapper.invalid();return false;}}
    }
    wrapper.valid();return true;
  }

  for(let snipet of vals){
    make_snipet(snipets_cont,snipet,remove_snipet);
  }

  const input = engine.make.textarea({
    parent:wrapper.body,
    // class:'comp-super_form-main-form-field-snipets_wrapper-input',
    placeholder:data.placeholder,
    rows:3,
    event:{
      type:'keypress',
      function:(id,event)=>{
        if(event.keyCode == 13){
          const val = engine.binder.text(id);
          if(!val){wrapper.invalid();return;}
          let len = val.length;
          if(data.min){if(len < data.min){wrapper.invalid();return;}}
          if(data.max){if(len > data.max){wrapper.invalid();return;}}
          if(data.items){
            if(data.items.max){
              if(vals.length == data.items.max){
                engine.set.input.value(id,val);
                return new_message("cannot add anymore snipets");
              }
            }
          }
          engine.set.input.value(id,"");
          reset_message();
          wrapper.valid();
          add_snipet(val);
        }
      }
    },
    draw:{
      all:{
        'background-color': 'inherit',
        'width': '100%',
        'border': '0px',
        'color':'white',
        'font-size': '16px',
        'font-family': engine.global.object.superFormCompFont,
        'padding': '10px'
      }
    }
  });

  return {
    empty:()=>{
      if(!vals || vals.length === 0){
        return true;
      } else {
        return false;
      }
    },
    get:()=>{
      return vals;
    },
    id:data.id,
    wrapper_id:base_wrapper,
    input_id:input,
    control:{
      update:(val)=>{
        engine.set.input.value(input,val);
      }
    },
    verify:()=>{
      let len = vals.length;
      if(len == 0 && !data.required){wrapper.valid();return true;}
      if(data.items){
        if(data.items.min){if(len < data.items.min){wrapper.invalid();return false;}}
        if(data.items.max){if(len > data.items.max){wrapper.invalid();return false;}}
      }
      wrapper.valid();return true;
    }
  };

}

function make_snipet(parent,val,remove){

  const snipet = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-snipets_wrapper-snipets-item',
    draw:{
      all:{
        'display': 'inline-block',
        'background-color': engine.global.object.superFormCompFieldColorBgDark,
        // 'background-color':'white',
        'margin': '5px',
        'border-radius': '5px',
      }
    }
  });

    const left = engine.make.div({
      parent:snipet,
      class:'comp-super_form-main-form-field-snipets_wrapper-snipets-item-left',
      text:val,
      draw:{
        all:{
          'display': 'inline-block',
          'max-width': '200px',
          'color':'white',
          'font-family': engine.global.object.superFormCompFont,
          'vertical-align': 'top',
          'padding-left': '10px',
          'padding-right': '10px',
          'padding-top': '10px',
          'padding-bottom': '5px',
          'font-size': '14px !important',
        }
      }
    });

    const right = engine.make.div({
      parent:snipet,
      class:'comp-super_form-main-form-field-snipets_wrapper-snipets-item-right',
      draw:{
        all:{
          'vertical-align': 'top',
          'display': 'inline-block',
          'padding': '10px',
        }
      }
    });

      engine.make.image({
        parent:right,
        class:'comp-super_form-main-form-field-snipets_wrapper-snipets-item-right-img',
        type:'url',
        location:engine.global.object.superFormDeleteImage,
        function:()=>{
          engine.view.remove(snipet);
          remove(val);
        },
        draw:{
          all:{
            'height': '20px',
            'width': 'auto',
            'cursor': 'pointer',
          }
        }
      });

}

function make_wrapper_old(parent,data){

  const field = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-choice_wrappper',
    title:data.info || data.title || data.placeholder || data.anchor
  });

  const header = engine.make.div({
    parent:field,
    class:'comp-super_form-main-form-field-choice_wrappper-header'
  });

    engine.make.div({
      parent:header,
      class:'comp-super_form-main-form-field-choice_wrappper-header-tag',
      text:data.id,
    });

    const info_wrapper = engine.make.div({
      parent:header,
      class:'comp-super_form-main-form-field-choice_wrappper-header-info_wrapper'
    });

      engine.make.image({
        parent:info_wrapper,
        class:'comp-super_form-main-form-field-choice_wrappper-header-info_wrapper-img',
        type:'local',
        location:'assets/images/info.png',
        function:()=>{
          let message = '';
          if(data.id){message += "id : " + data.id + "<br/>"}
          if(data.type){message += "type : " + data.type + "<br/>"}
          if(data.min){message += "min snipet length : " + data.min + "<br/>"}
          if(data.max){message += "max snipet length : " + data.max + "<br/>"}
          if(data.items){
            if(data.items.min){message += "min no of snipets : " + data.min + "<br/>"}
            if(data.items.max){message += "max no of snipets : " + data.max + "<br/>"}
          }
          if(data.placeholder){message += "guide : " + data.placeholder + "<br/>"}
          if(data.info){message += "info : " + data.info + "<br/>"}
          if(data.anchor){message += "info : " + data.anchor + "<br/>"}
          if(data.title){message += "info : " + data.title + "<br/>"}
          engine.global.function.alert({
            header:'help',
            message:message,
            buttons:[
              {value:'ok',function:(id)=>{
                engine.view.remove(id);
              }}
            ]
          });
        }
      });

  const body = engine.make.div({
    parent:field,
    class:'comp-super_form-main-form-field-choice_wrappper-body'
  });

  return {
    body:body,
    valid:()=>{
      engine.make.addClass({id:info_wrapper,class:'comp-super_form-main-form-field-common-input_wrapper-valid'});
      engine.make.removeClass({id:info_wrapper,class:'comp-super_form-main-form-field-common-input_wrapper-invalid'});
    },
    invalid:()=>{
      engine.make.addClass({id:info_wrapper,class:'comp-super_form-main-form-field-common-input_wrapper-invalid'});
      engine.make.removeClass({id:info_wrapper,class:'comp-super_form-main-form-field-common-input_wrapper-valid'});
    }
  };

}
