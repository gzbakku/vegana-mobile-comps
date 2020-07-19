

const infoMaker = require('./info');

module.exports = {

  small : (parent,data)=>{

    const field = engine.make.div({
      parent:parent,
      class:'comp-super_form-main-form-field-common ',
      draw:{
        all:{
          'max-height': '100px',
          'max-width': '600px',
          'margin': 'auto',
          'overflow': 'hidden',
          'margin-top': '10px',
          'text-align': 'left'
        }
      },
      title:data.info || data.title || data.placeholder || data.anchor
    });

    const title = engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-common-title',
      draw:{
        all:{
          'background-color': engine.global.object.superFormCompFieldColor,
          'display': 'inline-block',
          'padding': '5px',
          'font-size': '16px',
          'font-family': engine.global.object.superFormCompFont,
          'color':'white',
          'text-transform': 'capitalize',
          'border-top-left-radius': '5px',
          'border-top-right-radius': '5px',
          'min-width': '150px',
          'text-align': 'center',
          'display': 'none',
          'margin-left': '10px'
        }
      },
      text:data.id
    });

    const wrapper = engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-common-input_wrapper ',
      draw:{
        all:{
          'background-color': engine.global.object.superFormCompFieldColor,
          'height': '50px',
          'display': 'flex',
          'border-bottom-left-radius': '5px',
          'border-bottom-right-radius': '5px',
          'border-top-right-radius': '5px',
          'border-top-left-radius': '5px',
          'overflow': 'hidden'
        }
      },
      title:data.info || data.title || data.placeholder || data.anchor
    });

      const input_wrapper = engine.make.div({
        parent:wrapper,
        class:'comp-super_form-main-form-field-common-input_wrapper-input_wrapper',
        draw:{
          all:{
            'flex': 9
          }
        }
      });

      const info_wrapper = engine.make.div({
        parent:wrapper,
        class:'comp-super_form-main-form-field-common-input_wrapper-info_wrapper',
        events:[
          {event:'mouseenter',function:()=>{
            engine.set.div.style(title,[{
              display:'inline-block'
            }]);
          }},
          {event:'mouseleave',function:()=>{
            engine.set.div.style(title,[{
              display:'none'
            }]);
          }}
        ],
        draw:{
          all:{
            'flex': 2,
            'text-align': 'center'
          }
        }
      });

        engine.make.image({
          parent:info_wrapper,
          class:'comp-super_form-main-form-field-common-input_wrapper-info_wrapper-img',
          type:'url',
          location:engine.global.object.superFormInfoImage,
          function:()=>{
            return infoMaker.make_info(parent,data);
          },
          draw:{
            all:{
              'height': '30px',
              'width': 'auto',
              'margin-top': '10px',
              'cursor': 'pointer'
            }
          }
        });

      const infoObject = engine.get.element(info_wrapper);

      return {
        input:input_wrapper,
        valid:()=>{
          infoObject.style["background-color"] = engine.global.object.superFormCompFieldColorGreen;
        },
        invalid:()=>{
          infoObject.style["background-color"] = engine.global.object.superFormCompFieldColorRed;
        }
      };

  },

  big : (parent,data)=>{

    const field = engine.make.div({
      parent:parent,
      class:'comp-super_form-main-form-field-choice_wrappper',
      title:data.info || data.title || data.placeholder || data.anchor,
      draw:{
        all:{
          'max-width': '600px',
          'min-height': '100px',
          'margin': 'auto',
          'margin-top': '10px',
          'background-color': engine.global.object.superFormCompFieldColor,
          'border-radius': '5px',
          'overflow': 'hidden',
        }
      }
    });

    const header = engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-choice_wrappper-header',
      draw:{
        all:{
          display: 'flex'
        }
      }
    });

      engine.make.div({
        parent:header,
        class:'comp-super_form-main-form-field-choice_wrappper-header-tag',
        text:data.id,
        draw:{
          all:{
            'flex': 9,
            'font-size': '18px',
            'font-family': engine.global.object.superFormCompFont,
            'color':'white',
            'padding': '10px',
            'text-align': 'left',
            'text-transform': 'capitalize',
          }
        }
      });

      const info_wrapper = engine.make.div({
        parent:header,
        class:'comp-super_form-main-form-field-choice_wrappper-header-info_wrapper',
        draw:{
          all:{
            'flex': 2,
            'text-align': 'center',
            'border-bottom-left-radius': '5px',
          }
        }
      });

        engine.make.image({
          parent:info_wrapper,
          class:'comp-super_form-main-form-field-choice_wrappper-header-info_wrapper-img',
          type:'url',
          location:engine.global.object.superFormInfoImage,
          function:()=>{
            return infoMaker.make_info(parent,data);
          },
          draw:{
            all:{
              'height': '30px',
              'width': 'auto',
              'margin-top': '10px',
              'cursor': 'pointer',
            }
          }
        });

    const body = engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-choice_wrappper-body',
      draw:{
        all:{
          'text-align': 'left',
          'padding': '10px',
        }
      }
    });

    const infoObject = engine.get.element(info_wrapper);

    return {
      body:body,
      valid:()=>{
        infoObject.style["background-color"] = engine.global.object.superFormCompFieldColorGreen;
      },
      invalid:()=>{
        infoObject.style["background-color"] = engine.global.object.superFormCompFieldColorRed;
      }
    };

  },

  empty: (parent,data)=>{

    const field = engine.make.div({
      parent:parent,
      class:'comp-super_form-main-form-field-check_box_wrapper',
      title:data.info || data.title || data.placeholder || data.anchor,
      draw:{
        all:{
          'max-width': '600px',
          'margin': 'auto',
          'margin-top': '10px',
          'display': 'flex',
        }
      }
    });

    engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-check_box_wrapper-left',
      text:data.id,
      draw:{
        all:{
          'flex': 5,
          'color':engine.global.object.superFormCompFieldColor,
          'font-size': '20px',
          'font-family': engine.global.object.superFormCompFont,
          'text-align': 'left',
          'padding-top': '10px',
        }
      }
    });

    const center = engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-check_box_wrapper-center',
      draw:{
        all:{
          flex: 4,
        }
      }
    });

    const right = engine.make.div({
      parent:field,
      class:'comp-super_form-main-form-field-check_box_wrapper-right',
      draw:{
        all:{
          flex: 1,
        }
      }
    });

      const info_wrapper = engine.make.div({
        parent:right,
        class:'comp-super_form-main-form-field-check_box_wrapper-right-info_wrapper',
        draw:{
          all:{
            'text-align': 'center',
            'border-radius': '5px',
          }
        }
      });

        engine.make.image({
          parent:info_wrapper,
          class:'comp-super_form-main-form-field-check_box_wrapper-right-info_wrapper-img',
          type:'url',
          location:engine.global.object.superFormInfoImage,
          function:()=>{
            return infoMaker.make_info(parent,data);
          },
          draw:{
            all:{
              'height': '30px',
              'width': 'auto',
              'margin-top': '10px',
              'cursor': 'pointer',
            }
          }
        });

        const infoObject = engine.get.element(info_wrapper);

        return {
          center:center,
          valid:()=>{
            infoObject.style["background-color"] = engine.global.object.superFormCompFieldColorGreen;
          },
          invalid:()=>{
            infoObject.style["background-color"] = engine.global.object.superFormCompFieldColorRed;
          }
        };

  }

};
