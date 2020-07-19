//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-superForm';             //dont worry about this
const type = 'comp';                      //type of app
const compName = 'superFormComp';

//ids
var parentId;
var compId;

const init = (pid,form) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  return build(form);                      //start build you can also start fetch here.

}

const auto = require('./autocomplete/index');

function build(data){

  let form_font = engine.sketch.fonts.get("text");
  if(data.font_family){
    form_font = data.font_family;
  }

  engine.add.function('superFormAutoComplete',()=>{
    return auto;
  });
  engine.add.object("superFormCompFieldColor","#22005c");
  engine.add.object("superFormCompFieldColorBgDark","#1b0049");
  engine.add.object("superFormCompFieldColorGreen","#89c61c");
  engine.add.object("superFormCompFieldColorRed","#ff3642");
  engine.add.object("superFormCompFieldColorBlue","#00519b");
  engine.add.object("superFormCompFieldColorGrey","#D3D3D3");
  engine.add.object("superFormCompFont",form_font);
  engine.add.object("superFormInfoImage"," data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA9AAAAPQBFLZpEgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOKSURBVFiFvZfLaxtXFMZ/547eluxxXKfETtMHLSUhpG52QU1qNSuXrEoJgUDXXRTcdf+JYui/UDClFAJBWbVSTdNlH1nUNGDXTeImEKhlSdbD45nTxZVUSdjRSH58MDBc5s733cc55zuiqoTCvQ/Hg0RtUZRbiswCKYQIAMoeUBN0U4Vl00gtsZAvh/mtDBLgFXNzTqBfg5wHBICogahjn+ou+EH/NAVd9Y3cjs4XfhtNQDHn+gF3BbIApGOomwA3CXEHvAA8H3myDZXdAwkU7juGG8wXSuEFfH/tUiDOfSBNMoqeHYexKGw1kFIDKk0IQh6dRdWon+X6yoPBAgrvfxSo+QZwOJNBZzJQbiJ/l2DXH4a0H76R4Ca5H787WIBd+S+IOPqaC24CeVKG5zuHIe4Vof7l7p34X0Ax5wYBj4G0vj4JiQiy/i80D7Xq/VA1hlfad8J0pAXcBdKcydiVHw85QLrFRUeAV8zNCWRJRtGZjN32EOT5jSvkN64MrUAg6xVzcx0BNs6xt73cDHXmvhrurF/lzvpVfDUDv+9Hm1M0vzAexOsl0jHRN08hfzwPfdv/3DoHwNuTj4YWAKhpJt1IkKgtoiLqJmCrMVSojUjchgSJ2mLE5nbATSKPtwfO2m6mWSvP9IxdmlojYoa/sKLciigyS9TY9FppDpz0qPoyX/3+cc/Yl9eWmIgNnysUmTVAimgrt4dIrxen1vjsnW/55Py9oQn3QcogRKyAcFsowOXph7w7/XB02kwMHANCxMZPdddWtROCnp2AdAwAg7KHH7ywpB452juu7BmgdnLMgBFraOyR14ygmycqIBO3ad4LEHTTqLB8kvzqJqBUt+/CsjGN1BIwlL0ZGTEHJhPWVYGaRmrJWPeqq4f57xc/f8rnK4v8s/PSC7/TV13Y8ayRRVdZyJcjAL6R207Ar8OQRsTn4tR6z1h9L37whOkxGI/bYtfiNHQ5Iv+H3E8dB3zUiDvohdPIsyo8rVin/EHhPehyRI7hBlA9FvI3TkGpAU8rANUWFz0CmC+UjPpZ4Oh82PQYeuE0NPaQjRJYU5rt7hF6rcz1lQdGgpuHFhFz0Lem0HMTyLMq8tcWqFpb3tcbDG5MwsIIZOI2zicTsONZb1n3YKjGpI3+1mw/ZGK2sEQdm16bPpTqNs6rtraM1pp1Yd/mtA3H2Krm+a2n06QeQXPaj2Nqz/8DuiOqrjHUflEAAAAASUVORK5CYII=");
  engine.add.object("superFormDeleteImage","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABYgAAAWIBXyfQUwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOMSURBVHic7Zo/SFtBHMe/v5c/PCNqdOsgdHHqoIGCGrFbrYODhQ4VIYpdRPHP0KHQxaVLadGmFUSoqFQQFBz7j05Wm6GQ51LoXKSTbfyXvsbkXYe0auozz4u5O4PvMyb3e/f9fe/ud3cvIQimb+wJO0/8zNh9KpYWOzSRDy8FXANUC1CNV3aHTmv6vDWDl0s/A1wDVAtQzZn22IeTM7VpRuMg1gagQrCm87ILsA+M8ODxwL2vTo0dDcgmDwOEmuLok8ZPL1D/aLDvW75GjksgO/IllzwAVKeBp06NnGtAdtqXKrecGpylCF70NZ+PSqcGl34XcA1QLUA1rgGqBajGNUC1ANVwv2/7PnxH6n2dlyvRZa6cLv0McA1QLUA1rgGqBajGNUC1ANW4BqgWoBrXABmdkMcLaJxdaVo2TjDCewi0tqOiMwKWSmFncQrmRswxRq9vQmVXP8jnx+7KHJIf3wrTJ3QGkNeHis4IyOuDFihHsHcUeiicN0YPhRHsHYVWVp6Nv90D8vqEaRRqALMyYKnUsd48CEaGTzVBD4URjAwDmufoGakUmJURplFsDbAs7CxOAccTOMUEu+RhZf7GW8IkCi+C5kYMibkJGxNGUHb9BgBAb2i2Sd7C9sLkmWrGeZDyBwnTiCFB0dwkNQ1V3QPwXa1DoOXmiZFPzEdhxteFa5N2DjDj67YzIdDabj/yEpIHJB+ETMNmORzHsrC98AK/Pq9K0yT9JGgaMSTX3tt+l1x7JzV5QIEBekNzds3bEGhpOyyMspBqgN7QjGDPSO6az1Gjoap7UKoJ0gzQQ+GTyVsZJFff/FcYs7uD04mxWEgxIN8+v7P80vGcIBLhBuj1TbYjn5h/dljwTCOGxHzUfibUNwnVJ9YATUNlV/+ZDjlmfN3GBA8q7/bzX6V5JAp7MgDSPCCf/+gDhxOenQnk94OoRA1g6QPsrsyBpQ9gJfeRmJ1wPOGZ8XUkZidgJfeP4jNpYRql/DhKHi8Ys/hudZoGIo07ed4fR6VchgoaQcsCg7hr8D/cl6KqBajGNUC1ANW4BqgWoBrXgAJi9oquonjs8AYUYsCXAmIkQdzauA0g4BVvjDQIC7wh3Abssv1pAgzeONEQYPyoxjRvHLcBdc9f/z7wUMdFMoEA48BDHdfGllLOrXMpaBeoHV/a3KqhRhANARSDmsK4B4ZPIBraqqHG2vGlzUIe8gcINjS8lc2wKgAAAABJRU5ErkJggg==");
  engine.add.object("superFormInputDraw",{
    all:{
      'width': '100%',
      'background-color': 'inherit',
      'border': '0px',
      'color':'white',
      'font-family': engine.global.object.superFormCompFont,
      'padding': '10px',
      'padding-top': '15px',
      'font-size': '18px'
    }
  });

  const main = engine.make.div({
    parent:compId,
    class:'comp-super_form-main'
  });

  let card = engine.make.div({
    parent:main,
    class:'comp-super_form-main-card'
  });

  return make_form(card,data,main);

}

const countries = require('./country_names.json');

const string = require('./inputs/string');
const num = require('./inputs/num');
const select = require('./inputs/select');
const choice = require('./inputs/choice');
const checkbox = require('./inputs/checkbox');
const textarea = require('./inputs/textarea');
const button = require('./inputs/button');
const files = require('./inputs/files');
const mobile = require('./inputs/mobile');
const snipets = require('./inputs/snipets');
const address = require('./inputs/address');
const make_wrapper = require('./common_wrapper');

function make_form(card,data,main){

  engine.add.object('countries_array',countries);

  const form = engine.make.div({
    parent:card,
    class:'comp-super_form-main-form',
    draw:{
      all:{
        'padding': '10px',
        'padding-top': '2vh',
        'padding-bottom': '5vh',
        'text-align': 'center'
      }
    }
  });

  if(!data.data){
    data.data = {};
  }

  function get(){

    let collect = {};
    for(let key in collectors){
      let verify = verifiers[key]();
      let is_empty;
      if(empty[key]){
        is_empty = empty[key]();
      }
      if(!required[key]){
        if(!is_empty && verify){
          collect[key] = collectors[key]();
        }
      } else {
        collect[key] = collectors[key]();
      }
    }
    return collect;
  }

  let collectors = {},controls = {},ids = {},verifiers = {},required = {},empty = {};
  let controller = {
    base_div:main,
    get:get,
    validate:()=>{
      let ok = true;
      for(let key of Object.keys(verifiers)){
        if(!verifiers[key]()){
          ok = false;
        }
      }
      return ok;
    },
    ids:ids,
    controls:controls,
    collectors:collectors,
    verifiers:verifiers,
    vals:get,
    reset:()=>{
      engine.view.remove(form);
      make_form(card,data);
    }
  };

  for(let input of data.form){
    let builder;
    if(input.type === "string"){
      builder = string.string(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "mobile"){
      builder = mobile(form,input,make_wrapper.small,data.data[input.id],select.make_options);
    } else if(input.type === "address"){
      builder = address(form,input,make_wrapper.small,data.data[input.id],select.country);
    } else if(input.type === "email"){
      builder = string.email(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "time"){
      builder = string.time(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "date"){
      builder = string.date(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "password"){
      builder = string.password(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "number"){
      builder = num(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "select"){
      builder = select.select(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "country"){
      builder = select.country(form,input,make_wrapper.small,data.data[input.id]);
    } else if(input.type === "checkbox"){
      builder = checkbox(form,input,make_wrapper.empty,data.data[input.id]);
    } else if(input.type === "choice"){
      builder = choice(form,input,make_wrapper.big,data.data[input.id]);
    } else if(input.type === "textarea"){
      builder = textarea(form,input,make_wrapper.big,data.data[input.id]);
    } else if(input.type === "files"){
      builder = files(form,input,make_wrapper.big,data.data[input.id]);
    } else if(input.type === "snipets"){
      builder = snipets(form,input,make_wrapper.big,data.data[input.id]);
    } else if(input.type === "button"){
      builder = button(form,input,controller);
    }
    if(builder){
      if(builder.control){controls[input.id] = builder.control;}
      if(builder.wrapper_id){ids[input.id] = builder.wrapper_id;}
      if(builder.verify){verifiers[input.id] = builder.verify;}
      if(builder.get){collectors[input.id] = builder.get;}
      if(builder.empty){empty[input.id] = builder.empty;}
      if(input.required){required[input.id] = input.required;}
    }
  }

  // console.log(empty);

  return controller;

}

let compController = {init:init,ref:compRef,type:type};
if(!engine.global.comp.hasOwnProperty(compName)){
  engine.add.comp(compName,compController);
} else {
  engine.common.error(compName + " global comp has been already been added to the global comp object.");
}
module.exports = compController;
