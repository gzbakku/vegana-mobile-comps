

module.exports = (parent,data,controller)=>{

  const main = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-button_wrapper',
    draw:{
      all:{
        'max-width': '600px',
        'margin': 'auto',
        'margin-top': '20px',
        'display': 'flex',
        'text-align': 'right',
        'display': 'block',
        'text-align': 'center'
      }
    }
  });

  const message_cont = engine.make.div({
    parent:main
  });
  let message;
  function make_message(m){
    if(message){engine.view.remove(message);}
    message = engine.make.div({
      parent:message_cont,
      text:m,
      draw:{
        all:{
          // 'border':'5px solid red',
          'width':'80%',
          'padding':'10px',
          'background-color':engine.global.object.superFormCompFieldColorRed,
          'color':'white',
          'font-family':engine.global.object.superFormCompFont,
          'font-size':'16px',
          'width':'100%',
          'border-radius':'10px',
          'margin-bottom':'10px'
        }
      }
    });
  }
  function reset_message(){
    if(message){engine.view.remove(message);message = null;}
  }

  const buttons = engine.make.div({
    parent:main,
    draw:{
      all:{

      }
    }
  });

    const button = engine.make.button({
      parent:buttons,
      class:'comp-super_form-main-form-field-button_wrapper-button',
      value:data.value,
      function:()=>{
        if(data.validate !== false){
          if(!controller.validate()){
            return make_message("please correct the required and incorrect fields.");
          }
        }
        reset_message();
        data.function(button,controller);
      },
      draw:{
        all:{
          'background-color': engine.global.object.superFormCompFieldColorGreen,
          'color':'white',
          'font-size': '24px',
          'font-family': engine.global.object.superFormCompFont,
          'padding': '10px',
          'border-radius': '5px',
          'border': '0px',
          'cursor': 'pointer',
          'min-width': '200px',
        }
      }
    });

  return {
    id:data.id,
    wrapper_id:main,
    input_id:button
  };

}
