import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll('.balcon_icons_img');
  const windowWidth = document.querySelectorAll('#width');
  const windowHeight = document.querySelectorAll('#height');
  const windowType = document.querySelectorAll('#view_type');
  const windowProfile = document.querySelectorAll('.checkbox');
  const checkboxesCustom = document.querySelectorAll('.checkbox-custom')

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionToElems (event, elem, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch(item.nodeName) {
          case 'SPAN':
            state[prop] = i;
            break;
          case 'INPUT':
            if (item.getAttribute('type') === 'checkbox') {
              checkboxesCustom.forEach(item => {
                item.style.border = '2px solid #ccc';
              });
              i === 0 ? state[prop] = "Cold" : state[prop] = "Warm";
              elem.forEach((box, j) => {
                box.checked = false;
                if (i === j) {
                  box.checked = true;
                }
              })
            } else {
              if (item.value) {
                item.style.border = 'none';
                state[prop] = item.value;
              } else {
                item.style.border = '1px solid red';
              }
              
            }
            break;
          case 'SELECT':
            if (item.value) {
              state[prop] = item.value;
              item.style.border = 'none';
            } else {
              item.style.border = '1px solid red';
            }
            break;
        }
      })

    })
    console.log(state);
  }

  bindActionToElems('click', windowForm, 'form');
  bindActionToElems('input', windowWidth, 'width');
  bindActionToElems('input', windowHeight, 'height');
  bindActionToElems('change', windowType, 'type');
  bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;