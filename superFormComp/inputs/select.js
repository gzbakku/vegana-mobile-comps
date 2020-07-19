

module.exports = {
  select:make_select,
  country:make_country,
  make_options:make_options
}

function make_country(parent,data,make_wrapper,val){
  data.options = engine.global.object.countries_array;
  return make_select(parent,data,make_wrapper,val);
}

function make_select(parent,data,make_wrapper,val){

  const base_wrapper = engine.make.div({
    parent:parent,
  });

  const wrapper = make_wrapper(base_wrapper,data);

  const input = engine.make.div({
    parent:wrapper.input,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-select',
    text:val || data.placeholder,
    function:()=>{
      make_options(parent,data,update,val);
    },
    draw:{
      all:{
        'color':'white',
        'font-size': '18px',
        'font-family': engine.global.object.superFormCompFont,
        'padding': '10px',
        'margin-top': '5px',
        'cursor': 'pointer'
      }
    }
  });

  if(false){
    make_options(parent,data,update,val);
  }

  function update(v){
    val = v;
    engine.set.div.text(input,v);
    wrapper.valid();
  }

  function verify(){
    if(!data.required && !val){
      wrapper.valid();
      return true;
    }
    if(val){
      wrapper.valid();
      return true;
    } else {
      wrapper.invalid();
      return false;
    }
  }

  return {
    empty:()=>{
      if(!val){
        return true;
      } else {
        return false;
      }
    },
    id:data.id,
    wrapper_id:base_wrapper,
    input_id:input,
    get:()=>{
      return val;
    },
    control:{
      update:(v)=>{
        val = v;
      }
    },
    open:()=>{
      make_options(parent,data,update,val);
    },
    verify:verify,
    validate:verify
  };

}

function make_options(parent,data,update,active){

  const wrapper = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper',
    draw:{
      all:{
        'position': 'fixed',
        'height': '100vh',
        'width': '100vw',
        'top':'0px',
        'left':'0px',
        'z-index': 1
      }
    }
  });

  engine.make.div({
    parent:wrapper,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-background',
    function:()=>{
      engine.view.remove(wrapper);
    },
    draw:{
      all:{
        'position': 'absolute',
        'height': '100vh',
        'width': '100vw',
        'top':'0px',
        'left':'0px',
        'background-color': engine.global.object.superFormCompFieldColorBlue,
        'opacity': 0.1
      }
    }
  });

  const card_mobile_draw = {
    height:'100vh',
    width:'100vw',
    top:'0px',
    'border-radius':'0px'
  };

  const card = engine.make.div({
    parent:wrapper,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options',
    draw:{
      all:{
        // 'border':'5px solid red',
        'overflow': 'hidden',
        'border-radius': '10px',
        'position': 'relative',
        'background-color': 'white',
        'height':'70vh',
        'max-width': '600px',
        'top':'20vh',
        'margin': 'auto'
      },
      browser:{
        mobile:card_mobile_draw
      },
      cordova:{
        all:card_mobile_draw
      }
    }
  });

    const top = engine.make.div({
      parent:card,
      class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-top',
      draw:{
        all:{
          'text-align': 'right',
          'padding': '10px',
          'height':'15%'
        }
      }
    });

      engine.make.button({
        parent:top,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-top-button',
        value:'close',
        function:()=>{
          engine.view.remove(wrapper);
        },
        draw:{
          all:{
            'background-color': engine.global.object.superFormCompFieldColor,
            'color':'white',
            'border': '0px',
            'border-radius': '5px',
            'padding': '5px',
            'font-size': '18px',
            'font-family': engine.global.object.superFormCompFont
          }
        }
      });

    const middle = engine.make.div({
      parent:card,
      class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-middle',
      draw:{
        all:{
          'padding-top': '3vh',
          'padding-bottom': '3vh',
          'text-align': 'center',
          'overflow': 'auto',
          'height':'15%',
        }
      }
    });

      let little_options = [];
      let little_book = {};
      for(let option of data.options){
        little_book[option.toLowerCase()] = option;
        little_options.push(option.toLowerCase());
      }

      const Auto = engine.global.function.superFormAutoComplete();
      let autocomplete = Auto.connectAutocomplete();
      autocomplete.initialize((populate)=>{
          populate(little_options);
      });

      engine.make.input({
        parent:middle,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-middle-input',
        function:(id,val)=>{
          let matches = autocomplete.search(val);
          if(matches.length > 0){
            let hold = [];
            for(let item of matches){
              hold.push(little_book[item.key]);
            }
            reset_options(hold);
          } else {
            reset_options(little_options);
          }
        },
        draw:{
          all:{
            'border': '5px solid #D3D3D3',  //grey border
            'margin-top': '5px',
            'margin-bottom': '5px',
            'width': '50%',
            'height': '40px',
            'border-radius': '10px'
          }
        }
      });

      function choose(option){
        update(option);
        engine.view.remove(wrapper);
      }

      function reset_options(otps){
        new_bottom();
        post_options(bottom,otps,choose,active,little_book);
      }

      let bottom;
      function new_bottom(){
        if(bottom){engine.view.remove(bottom);}
        bottom = engine.make.div({
          parent:card,
          class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-bottom',
          draw:{
            all:{
              'padding-top': '3vh',
              'padding-bottom': '3vh',
              'text-align': 'center',
              'overflow': 'auto',
              'height':'70%',
            }
          }
        });
      }

      new_bottom();
      post_options(bottom,data.options,choose,active,little_book);

}

function post_options(bottom,options,choose,active){

    for(let option of options){

      let draw_option = {
        'color':engine.global.object.superFormCompFieldColor,
        'font-size': '24px',
        'font-family': engine.global.object.superFormCompFont,
        'display': 'inline-block',
        'max-width': '60%',
        'margin': 'auto',
        'margin-top': '2vh',
        'border-bottom': '5px solid white',
        'cursor': 'pointer'
      };

      if(option === active){
        draw_option.color = engine.global.object.superFormCompFieldColorGreen;
      }

      const option_wrapper = engine.make.div({
        parent:bottom,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-bottom-option',
        text:option,
        function:()=>{
          choose(option);
        },
        draw:{
          all:draw_option
        }
      });

      engine.make.div({
        parent:bottom,
        style:'width:100%;'
      });

    }

}

function make_options_old(parent,data,update,active){

  const wrapper = engine.make.div({
    parent:parent,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper'
  });

  engine.make.div({
    parent:wrapper,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-background',
    function:()=>{
      engine.view.remove(wrapper);
    }
  });

  const card = engine.make.div({
    parent:wrapper,
    class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options'
  });

    const top = engine.make.div({
      parent:card,
      class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-top'
    });

      engine.make.button({
        parent:top,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-top-button',
        value:'close',
        function:()=>{
          engine.view.remove(wrapper);
        }
      });

    const middle = engine.make.div({
      parent:card,
      class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-middle'
    });

      let little_options = [];
      let little_book = {};
      for(let option of data.options){
        little_book[option.toLowerCase()] = option;
        little_options.push(option.toLowerCase());
      }

      const Auto = engine.global.function.auto();
      let autocomplete = Auto.connectAutocomplete();
      autocomplete.initialize((populate)=>{
          populate(little_options);
      });

      engine.make.input({
        parent:middle,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-middle-input',
        function:(id,val)=>{
          let matches = autocomplete.search(val);
          if(matches.length > 0){
            let hold = [];
            for(let item of matches){
              hold.push(little_book[item]);
            }
            reset_options(hold);
          } else {
            reset_options(little_options);
          }
        }
      });

      function choose(option){
        update(option);
        engine.view.remove(wrapper);
      }

      function reset_options(otps){
        new_bottom();
        post_options(bottom,otps,choose,active,little_book);
      }

      let bottom;
      function new_bottom(){
        if(bottom){engine.view.remove(bottom);}
        bottom = engine.make.div({
          parent:card,
          class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-bottom',
        });
      }

      new_bottom();
      post_options(bottom,data.options,choose,active,little_book);

}

function post_options_old(bottom,options,choose,active){

    for(let option of options){
      const option_wrapper = engine.make.div({
        parent:bottom,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-bottom-option',
        text:option,
        function:()=>{
          choose(option);
        }
      });
      if(option === active){
        engine.make.addClass({id:option_wrapper,class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper-options_wrapper-options-bottom-option-active'});
      }
      engine.make.div({
        parent:bottom,
        style:'width:100%;'
      });
    }

}
