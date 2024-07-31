
let removeRow = (oButton, e) => {
    oButton.parentNode.parentNode.remove();
  };
  //staffPhone ADDD (START)
  let staffPhonecount = 0;
  const addstaffPhone = document.getElementById("add-staffPhone");
  const staffPhoneTable = document.getElementById("staffPhone-table");
  addstaffPhone.addEventListener("click", () => {
      staffPhonecount++;
      const staffPhoneRow = `
      <div class="uk-margin uk-grid uk-child-width-expand" uk-grid>
        <div class="uk-width-1-2@s">
          <label class="uk-form-label uk-width-1-1" for="staffname[${staffPhonecount}]">Staff Name</label>
          <div class="uk-form-controls uk-width-1-1 uk-form-width-large"> 
              <input class="uk-input uk-width-1-1 uk-form-width-large" name="staffname[${staffPhonecount}]" id="staffname[${staffPhonecount}]" type="text" placeholder="Staff Name" required>
          </div>
        </div>
        <div class="uk-width-1-3@s uk-width-2-3">
          <label class="uk-form-label uk-width-1-1" for="staffmobile[${staffPhonecount}]">Staff Mobile</label>
          <div class="uk-form-controls uk-width-1-1 uk-form-width-large"> 
              <input class="uk-input uk-width-1-1 uk-form-width-large" name="staffmobile[${staffPhonecount}]" id="staffmobile[${staffPhonecount}]" type="text" placeholder="Staff Mobile" required>
          </div>
        </div>
        <div class="uk-width-1-6">
          <label class="uk-form-label uk-width-1-1"> &nbsp; </label>
          <button class="remove-row uk-text-danger uk-button uk-button-link" type="button"  onclick="removeRow(this,event)">
            <span uk-icon="trash"></span>
          </button>
        </div>
      </div>
  `;
  
      staffPhoneTable.insertAdjacentHTML("beforeend", staffPhoneRow);
  });
  