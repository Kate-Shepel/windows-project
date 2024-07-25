const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');
    const width = document.querySelector('#width');
    const height = document.querySelector('#height');
    const select = document.querySelector('#view_type');
    const checkboxes = document.querySelectorAll('.checkbox');
    const checkboxesCustom = document.querySelectorAll('.checkbox-custom');
    const scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (item == document.querySelector('.popup_calc_button')) {
          if (!width.value) {
            width.style.border = '1px solid red';
            return;
          } else if (!height.value) {
            height.style.border = '1px solid red';
            return;
          } else {
            width.style.border = 'none';
            height.style.border = 'none';
          }
        }

        if (item == document.querySelector('.popup_calc_profile_button')) {
          let isChecked = false;
          checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
              isChecked = true;
            }
          });

          if (!select.value) {
            select.style.border = '1px solid red';
            return;
          } else if (!isChecked) {
            checkboxesCustom.forEach(item => {
              item.style.border = '1px solid red';
            })
            return;
          } else {
            select.style.border = 'none';
            checkboxesCustom.forEach(item => {
              item.style.border = '2px solid #ccc';
            })
          }
        }

        windows.forEach(item => {
          item.style.display = 'none'
        })

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
      })
    })
    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none'
      })
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    })
    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none'
        })
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
      }
    })
  }

  function showModalByTime(selector, time) {
    setTimeout(function() {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, time);
  }

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  //showModalByTime('.popup', 60000)
};

export default modals;