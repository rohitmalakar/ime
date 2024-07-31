import $ from "jquery";
// import 'uikit/dist/css/uikitmin.css';
// import * as uikitmin from 'uikit/dist/js/uikit';
// import * as uikit from 'uikit/dist/js/uikit-icons';
// function solve(){
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("data").innerHTML = xhttp.responseText;
//       }
//   };
//   xhttp.open("GET", "https://cors-anywhere.herokuapp.com/corsdemo/https://onboarding.imeremit.com.np/api/get-provinces", true);
//   xhttp.send()
// }
// solve();

// const myAPI = () => {
//   fetch("https://onboarding.imeremit.com.np/api/get-provinces")
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//   })
// }
// myAPI();


$(document).ready(function(){
  const apiurl = "https://onboarding.imeremit.com.np/api";
  // get the province 
  $.ajax({
    url: apiurl+'/get-provinces',
    method: 'get',
    dataType: 'json',
    success: function(data){
      
      // console.log(data.response);
      
      $.each(data.response, function(key, value) {  
            $('#provinceSelect').append('<option value='+ value.id +'>'+value.name+'</option>');
      });

    },
    error: function (err){
      // console.log(err);
    }
  });  

  // on change on province select
  $('#provinceSelect').on('change', function() {
    $('#districtsSelect').empty();
    // alert( $(this).find(":selected").val() );
     // show districts
      $.ajax({
        url: apiurl+'/get-districts?province_id='+ $(this).find(":selected").val(),
        method: 'get',
        dataType: 'json',
        success: function(data){
          
          // console.log(data.response);
          // console.log(data.response);
          
          $.each(data.response, function(key, value) {  
            $('#districtsSelect').append('<option value='+ value.id +'>'+value.name+'</option>');
          });
          
          
        },
        error: function (err){
          // console.log(err);
        }
      });
  });
 
  // on change on district select
  $('#districtsSelect').on('change', function() {
    $('#citySelect').empty();
    // alert( $(this).find(":selected").val() );
     // show districts
      $.ajax({
        url: apiurl+'/get-districts?province_id='+ $(this).find(":selected").val(),
        method: 'get',
        dataType: 'json',
        success: function(data){
          
          // console.log(data.response);
          // console.log(data.response);
          
          $.each(data.response, function(key, value) {  
            $('#citySelect').append('<option value='+ value.id +'>'+value.name+'</option>');
          });
          
          
        },
        error: function (err){
          // console.log(err);
        }
      });
  });

  // for agent type
  $.ajax({
    url: apiurl+'/get-categories',
    method: 'get',
    dataType: 'json',
    success: function(data){
      
      // console.log(data.response);
      
      $.each(data.response, function(key, value) {  
        $('#agent_type').append('<option value='+ value.id +' name='+ value.name +'>'+value.name+'</option>');
      });

    },
    error: function (err){
      // console.log(err);
    }
  });
  
   // on change on agent type
   $('#agent_type').on('change', function() {
    $('#category_form').empty();
    $('#agent_subcategories').empty();
      // alert( $(this).find(":selected").val() );
     // show districts
      $.ajax({
        url: apiurl+'/get-sub-categories/'+ $(this).find(":selected").val(),
        method: 'get',
        dataType: 'json',
        success: function(data){
          
          // console.log(data.response);
          // console.log(data.response);
          $('#agent_subcategories').append('<option>Select Subcategories</option>');
          $.each(data.response, function(key, value) {  
            $('#agent_subcategories').append('<option value='+ value.id + ' name='+ value.name +'>'+value.name+'</option>');
          });
          
          
        },
        error: function (err){
          // console.log(err);
        }
      });

    // show form 
      $.ajax({
        url: apiurl+'/get-category-forms/'+ $(this).find(":selected").val(),
        method: 'get',
        dataType: 'json',
        success: function(data){
          
          // console.log(data.response);
          
          $.each(data.response, function(key, value) {
            var required;   
            if(value.is_required == "Y"){
              required = "required";
            }

            if(value.type == 'file'){
              $('#category_form').append(`
                  <div class="uk-width-1-2@s">
                    <label class="uk-form-label uk-width-1-1" for="${value.id}">${value.label}</label>
                    <div uk-form-custom="target: true" class="${value.type}UploadFields">
                      <input name="dynamic[${value.id}]" type="${value.type}" aria-label="Custom controls" id="${value.id}" ${required}>
                      <input class="uk-input uk-form-width-large" type="text" placeholder="Upload File" aria-label="Custom controls" disabled>
                    </div> 
                  </div>
                `);
            }else{
              $('#category_form').append(`
                <div class="uk-width-1-2@s">
                  <label class="uk-form-label uk-width-1-1" for="${value.id}">${value.label}</label>
                  <div uk-form-custom="target: true" class="">
                    <input name="${value.id}" class="uk-input" type="${value.type}" id="${value.id}" placeholder="${value.placeholder}" aria-label="Input">  
                  </div> 
                </div>
              `);
            }
          });
          
          
        },
        error: function (err){
          // console.log(err);
        }
      });

  });
   
  // on change on agent sub category type first empyt the subcatagory form and append on it
   $('#agent_subcategories').on('change', function() {
    $('#subcategory_form').empty();
      // alert( $(this).find(":selected").val() );

    // show sub category form 
      $.ajax({
        url: apiurl+'/get-sub-category-forms/'+ $(this).find(":selected").val(),
        method: 'get',
        dataType: 'json',
        success: function(data){
          
          console.log(data.response);
          
          $.each(data.response, function(key, value) {
            var required;   
            if(value.is_required == "Y"){
              required = "required";
            }

            if(value.type == 'file'){
              $('#subcategory_form').append(`
                  <div class="uk-width-1-2@s">
                    <label class="uk-form-label uk-width-1-1" for="${value.id}">${value.label}</label>
                    <div uk-form-custom="target: true" class="${value.type}UploadFields">
                      <input name="${value.id}" type="${value.type}" aria-label="Custom controls" id="${value.id}" ${required}>
                      <input class="uk-input uk-form-width-large" type="text" placeholder="Upload File" aria-label="Custom controls" disabled>
                    </div> 
                  </div>
                `);
            }else{
              $('#subcategory_form').append(`
                <div class="uk-width-1-2@s">
                  <label class="uk-form-label uk-width-1-1" for="${value.id}">${value.label}</label>
                  <div uk-form-custom="target: true" class="">
                    <input class="uk-input" name="dynamic[${value.id}]" type="${value.type}" id="${value.id}" placeholder="${value.placeholder}" aria-label="Input">  
                  </div> 
                </div>
              `);
            }

          });
        },
        error: function (err){
          // console.log(err);
        }
      });
  });


  // for form submit 
  $('#formsubmit').on('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser


    // var formData = new FormData(this);
    var formData = new FormData(this);    

    if($('#mobile_no').val().length == '' && $('#landline_no').val().length == '' ){
      $("#mobileOrLandline").append("<div>Please fill the mobile or landline</div>");
    }else{
      $(this).serializeArray().forEach(function(field) {
          formData[field.name] = field.value;
      });
      // console.log(formData);
      // return;
      $.ajax({
          url: apiurl+'/post-application',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
              console.log(response);
              $('#response').html('<p>Form submitted successfully!</p>');
          },
          error: function(xhr, status, error) {
              console.log(error);
              $('#response').html('<p>An error occurred: ' + error + '</p>');
          }
      });
    }
  });
});
