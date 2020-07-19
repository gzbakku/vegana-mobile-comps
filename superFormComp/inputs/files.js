

module.exports = (parent,data,make_wrapper,vals)=>{

  if(!vals){vals = [];}
  const base_wrapper = engine.make.div({
    parent:parent,
  });
  const wrapper = make_wrapper(parent,data);

  let accepted = '';
  if(data.options){
    for(let file of data.options){
      if(accepted.length == 0){
        accepted = file;
      } else {
        accepted += ", " + file;
      }
    }
  }

  let multiple;
  if(data.min || data.max){
    multiple = true;
  }

  const input = engine.make.input({
    parent:wrapper.body,
    class:'comp-super_form-main-form-field-files_input-input',
    type:'file',
    multiple:multiple,
    accept:accepted,
    function:(id,files)=>{
      controller.make_files(files);
    },
    draw:{
      all:{
        'color':'white',
        'font-size': '18px',
        'font-family': engine.global.object.superFormCompFont,
        'text-decoration': 'none',
        'background-color': 'inherit',
        'border': '0px',
      }
    }
  });

  const controller = make_control(wrapper.body,data,wrapper);
  if(false){
    controller.make_files([{name:'this.png',size:758999999}]);
  } else {
    controller.make_files(vals);
  }

  return {
    id:data.id,
    wrapper_id:base_wrapper,
    input_id:input,
    get:()=>{
      return controller.validate();
    },
    verify:()=>{
      if(controller.verify()){
        return true;
      } else {
        return false;
      }
    },
    empty:()=>{
      if(engine.binder.files(input).length === 0){
        return true;
      } else {
        return false;
      }
    }
  };

}

function make_control(parent,data,wrapper){

  let message_wrapper = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-files_input-files-message_wrapper',
  });
  let message;
  function make_message(m){
    if(message){engine.view.remove(message);}
    message = engine.make.div({
      parent:message_wrapper,
      class:'comp-super_form-main-form-field-files_input-files-message_wrapper-m',
      text:m,
      draw:{
        all:{
          'background-color':engine.global.object.superFormCompFieldColorRed,
          'color':'white',
          'margin': '10px',
          'border-radius': '5px',
          'font-size': '16px',
          'font-family': engine.global.object.superFormCompFont,
          'padding': '10px',
        }
      }
    });
  }

  const main = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-files_input-files',
  });

  // make_message("something failed");

  let files = [],valid = true;

  const controller =  {
    get:()=>{
      let collect = [];
      for(let file of files){
        let valid = file.valid();
        if(valid){collect.push(valid);}
      }
      return collect;
    },
    make_files:(collection)=>{
      for(let file of collection){
        files.push(make_file(main,file,data,wrapper,validate));
      }
      if(data.function){data.function(parent,files);}
      validate();
    },
    validate:()=>{
      let ok = true;
      let collect = [];
      let names = [];
      for(let file of files){
        let valid = file.valid();
        if(valid === null){} else //none} else
        if(valid === false){ok = false;} else {
          if(names.indexOf(valid.name) >= 0){
            file.invalid();
            ok = false;break;
          } else {
            names.push(valid.name);
          }
          collect.push(valid);
        }
      }
      if(ok){wrapper.valid();return collect} else {wrapper.invalid();return false;}
    },
    verify:validate
  };

  function validate(){
    if(message){engine.view.remove(message);message = null;}
    let get = controller.validate();
    if(!get){
      valid = false;
      make_message("please remove incompatible files");
      wrapper.invalid();return false;
    }
    let len = get.length;
    if(len == 0 && !data.required){
      wrapper.valid();return true;
    }
    if(data.required && len == 0){
      valid = false;
      make_message("please provide a valid file");
      wrapper.invalid();return false;
    }
    if(data.max){
      if(len > data.max){
        valid = false;
        make_message("only " + data.max + " files can be submitted at once.");
        wrapper.invalid();return false;
      }
    }
    if(data.min){
      if(len < data.min){
        valid = false;
        make_message("atleast " + data.max + " files can be submitted.");
        wrapper.invalid();return false;
      }
    }
    let total_size = 0;
    for(let file of files){
      total_size += file.size;
    }
    if(data.size){
      if(data.size.total){
        if(data.size.total.min < total_size){
          valid = false;
          make_message("you cannot upload less then " + data.size.total.min + " MB in one request");
          wrapper.invalid();return false;
        }
        if(data.size.total.max > total_size){
          valid = false;
          make_message("you cannot upload more then " + data.size.total.max + " MB in one request");
          wrapper.invalid();return false;
        }
      }
    }
    valid = true;
    wrapper.valid();return true;
  }

  // validate();

  return controller;

}

function make_file(parent,file,data,wrapper,validate){

  const card = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-files_input-files-file',
    draw:{
      all:{
        'background-color': engine.global.object.superFormCompFieldColorBgDark,
        'color':'white',
        'font-family': engine.global.object.superFormCompFont,
        'display': 'inline-block',
        'border-radius': '5px',
        'margin-top': '10px',
        'margin-right': '10px',
        'overflow': 'auto',
        'padding': '10px',
      }
    }
  });

  const fileContObject = engine.get.element(card);

  const left = engine.make.div({
    parent:card,
    class:'comp-super_form-main-form-field-files_input-files-file-left',
    draw:{
      all:{
        'min-width': '100px',
        'float': 'left',
      }
    }
  });

    engine.make.div({
      parent:left,
      class:'comp-super_form-main-form-field-files_input-files-file-left-name',
      text:file.name,
      draw:{
        all:{
          'padding': '5px',
        }
      }
    });

    let mem_unit = 'Bytes',calc = file.size;
    if(file.size > 1000){
      calc = file.size / 1000;
      if(calc < 1000){
        mem_unit = 'KB';
      } else {
        calc = calc / 1000;
        if(calc < 1000){
          mem_unit = 'MB';
        } else {
          mem_unit = 'GB';
        }
      }
    }

    engine.make.div({
      parent:left,
      class:'comp-super_form-main-form-field-files_input-files-file-left-size',
      text:Math.ceil(calc) + ' ' + mem_unit,
      draw:{
        all:{
          padding: '5px',
        }
      }
    });

    let valid = true;
    function invalid(){
      valid = false;
      wrapper.invalid();
      fileContObject.style["background-color"] = engine.global.object.superFormCompFieldColorRed;
    }

    if(data.options){
      let split = file.name.split(".")
      let ext = split[split.length - 1];
      if(!ext){
        invalid();
      } else if(data.options.indexOf(ext) < 0){
        invalid();
      }
    }
    if(data.size){
      if(data.size.file){
        let size_in_mb = file.size / 1000 / 1000;
        if(size_in_mb > data.size.file.max){invalid();}
        if(size_in_mb < data.size.file.min){invalid();}
      }
    }

  const right = engine.make.div({
    parent:card,
    class:'comp-super_form-main-form-field-files_input-files-file-right',
    draw:{
      all:{
        'width': '50px',
        'float': 'left',
        'padding': '10px',
      }
    }
  });

    engine.make.image({
      parent:right,
      class:'comp-super_form-main-form-field-files_input-files-file-right-img',
      type:'url',
      location:engine.global.object.superFormDeleteImage,
      function:()=>{
        valid = null;
        engine.view.remove(card);
        validate();
      },
      draw:{
        all:{
          'height': '30px',
          'width': 'auto',
          'cursor': 'pointer',
        }
      }
    });

    return {
      invalid:invalid,
      delete:()=>{
        valid = null;
      },
      valid:()=>{
        if(valid){
          return file;
        } else {
          return valid;
        }
      }
    };

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
          if(data.min){message += "min no of files : " + data.min + "<br/>"}
          if(data.max){message += "max no of files : " + data.max + "<br/>"}
          if(data.size){
            if(data.size.file){
              if(data.size.file.min){message += "min file size : " + data.min + " in MB<br/>"}
              if(data.size.file.min){message += "max file size : " + data.max + " in MB<br/>"}
            }
            if(data.size.total){
              if(data.size.total.min){message += "min total upload size : " + data.min + " in MB<br/>"}
              if(data.size.total.max){message += "max total upload size : " + data.max + " in MB<br/>"}
            }
          }
          if(data.options){
            let ext = '';
            for(let hold of data.options){
              if(ext.length === 0){
                ext = hold;
              } else {
                ext += ', ' + hold
              }
            }
            message += "valid file extensions : " + ext + "<br/>"
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
