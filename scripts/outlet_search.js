var outletsList;

function item_in_list_found(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Show.toLowerCase() === item) {
          $('.rt-btn.rt-btn-next').show(); 
          return true;
        }
      }
    }
  }
  $('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_outlets_list() {
  
  var area_survey  = api.fn.answers().Q0A_DST;
  var temp_data = JSON.parse(search_list);
 
  var Landsdel = area_survey;

  switch(area_survey) {
    case 7:          
    case 8:              
    Landsdel = 7;
      break;

    case 9:          
    Landsdel = 8;
      break;
  
    case 10:          
    case 11:              
    Landsdel = 9;    
      break;

    case 12:          
    Landsdel = 10;
      break;

    case 13:          
    case 14:              
      Landsdel = 11;    
      break;
  
      
    default:
      Landsdel = area_survey;   
      break;
  }

  console.log("load_outlet_code started...");
  console.log("area_survey...", area_survey);
  console.log("area ...", Landsdel);

  outletsList = [];

  var i;
  for (i = 0; i<temp_data.length; i++ )
  {
    item = temp_data[i];
    var selected = false;
    if ((item["Landsdel"] == Landsdel))
    { 
      switch(area_survey) {
        case 7:   
          if (item["Kommune"] != "ODENSE") selected = true;
          break;

        case 8:   
          if (item["Kommune"] == "ODENSE") selected = true;
          break;

        case 10:   
          if (item["Kommune"] != "AARHUS") selected = true;
          break;

        case 11:   
          if (item["Kommune"] == "AARHUS") selected = true;
          break;

        case 13:   
          if (item["Kommune"] != "AALBORG") selected = true;
          break;

        case 14:   
          if (item["Kommune"] == "AALBORG") selected = true;
          break;
      
        default:
          selected = true;
          break;
      }

      if (selected)
      {
        item.Show = item.Navn;
        outletsList.push(item);
      }  
    }
  }

  console.log("outletCode: ", outletsList);
  console.log("load_outlet_code done!");
}


function select_data(currentOutlet) {
  console.log('selected outlet:', currentOutlet);
  if (item_in_list_found(outletsList, currentOutlet.Show))
  {
    console.log('saving outlet data...');
    api.fn.answers({Q0B:  currentOutlet.Navn});
    api.fn.answers({Q0C:  currentOutlet.Identifikationsnummer});
    api.fn.answers({Q0D:  currentOutlet.Otype}); //Overnatningsform
    api.fn.answers({Kommune:  currentOutlet.Kommune});
    api.fn.answers({destination_name:  currentOutlet.Dest});
    api.fn.answers({Landsdel_DST:  currentOutlet.Landsdel});

    api.fn.answers({urlVar20:  currentOutlet.Navn});
    api.fn.answers({urlVar19:  currentOutlet.Identifikationsnummer});
    api.fn.answers({urlVar18:  currentOutlet.Otype}); //Overnatningsform
    api.fn.answers({urlVar17:  currentOutlet.Kommune});
    api.fn.answers({urlVar16:  currentOutlet.Dest});
    api.fn.answers({urlVar15:  currentOutlet.Landsdel});    
    
  }
  else
  {
    console.log('outlet not found: ', currentOutlet);

  }
}


// Important: Make sure to return true when your filter
// receives an empty string as a search term.

function contains(str1, str2) {
  return new RegExp(str2, "i").test(str1);
}


function show_outlet_search_box() {
  load_outlets_list();  
   
  if (data) { // clear data
    delete data;
  }
  var data = $.map(outletsList, function (obj) {
    obj.id = obj.id || outletsList.indexOf(obj); // replace pk with your identifier
    obj.text = obj.Show;
    return obj;
  });

  $('.rt-body.slt-page-container main').find('section').hide(500);
  if ($('.post-code').length) {
    $('.post-code').show();
    $('.post-code #post-code-select2').select2("destroy");
  }
  else
  {
    $('.rt-body.slt-page-container main').append(`<section class='post-code'>
  <sha-interview-page-renderer>
      <sha-interview-page-item-renderer>
        <sha-rt-element>
            <div class="sv-rt-element-container rt-element rt-sc-container q1 rt-element-active">
              <sha-basic-single-choice>
                  <div class="rt-qtext fr-view" id="1-text">Vælg venligst:</div>
                  <div class="rt-qelement">
                    <div class="rt-form-group">
                        <sha-basic-single-item>
                          <div class="rt-control rt-answer-option rt-has-input">
                              <input type="radio" class="rt-control-input ng-untouched ng-pristine ng-valid" id="single_1_1" name="single_1" aria-labelledby="1-text label-1-0" tabindex="100000" onchange="save_answer()"><label class="rt-control-label rt-radio-button fr-view" id="label-1-0" for="single_1_1"><span>Overnatningssted:</span></label>
                              <sha-validated-text-input>
                                <div class="rt-semi-open-container">
                                    <sha-list-autocomplete>
                                      <sha-drop-down class="ng-untouched ng-pristine ng-valid">
                                          <div >
                                            <dx-drop-down-box  class="rt-drop-down-container dx-show-invalid-badge dx-dropdownbox dx-textbox dx-texteditor dx-show-clear-button dx-dropdowneditor-button-visible dx-editor-outlined dx-widget dx-texteditor-empty dx-dropdowneditor dx-dropdowneditor-field-clickable dx-dropdowneditor-active">
                                                <div class="dx-dropdowneditor-input-wrapper" id="post-code-select2">
                                                  <div class="dx-dropdowneditor-field-template-wrapper">
                                                      <div  class="rt-dropdown-choice-container dx-template-wrapper">
                                                        <div class="fr-view" title=""></div>
                                                        <dx-text-box class="rt-sr-only dx-show-invalid-badge dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-state-readonly dx-widget">
                                                            <div class="dx-texteditor-container">
                                                              <div class="dx-texteditor-input-container">
                                                                  <input id="inputOutletID" autocomplete="off" placeholder=" " class="dx-texteditor-input" type="text" readonly="" aria-readonly="true" spellcheck="false" tabindex="0" role="combobox">
                                                                  <div data-dx_placeholder="" class="dx-placeholder"></div>
                                                              </div>
                                                              <div class="dx-texteditor-buttons-container">
                                                                  <div></div>
                                                              </div>
                                                            </div>
                                                        </dx-text-box>
                                                      </div>
                                                  </div>
                                                  <input type="hidden" value="">
                                                  <div class="dx-texteditor-buttons-container">
                                                      <span class="dx-clear-button-area"><span class="dx-icon dx-icon-clear"></span></span>
                                                      <div role="button" class="dx-widget dx-button-mode-contained dx-button-normal dx-dropdowneditor-button" aria-label="Select">
                                                        <div class="dx-button-content">
                                                            <div class="dx-dropdowneditor-icon"></div>
                                                        </div>
                                                      </div>
                                                  </div>
                                                </div>
                                            </dx-drop-down-box>
                                          </div>
                                      </sha-drop-down>
                                    </sha-list-autocomplete>
                                </div>
                              </sha-validated-text-input>
                          </div>
                        </sha-basic-single-item>
                        
                    </div>
                  </div>
              </sha-basic-single-choice>
            </div>
        </sha-rt-element>
      </sha-interview-page-item-renderer>
  </sha-interview-page-renderer>
  </section>
  `);

  }
  $('#post-code-select2').on('select2:select', function (e) {
    var data = e.params.data;
    document.getElementById('inputOutletID').value = data.Show;
    $('#select2-post-code-select2-container').prop('title', data.Show);
    $('#select2-post-code-select2-container').html(data.Show);
    $('#single_1_1').prop('checked', true);
    
    select_data(data);
  });
  var currentValue  = api.fn.answers().Outlet_ID;
  console.log("currentValue", currentValue);
  if (currentValue) {
    if (currentValue !== "") {
      document.getElementById('inputOutletID').value = currentValue;
      $('#single_1_1').prop('checked', true);
    }
  }
  $('.post-code #post-code-select2').select2({
    // allowClear: true,
    // placeholder: "",
    data: data,
    query: function(q) {
      var pageSize = 50,
          results = this.data.filter(function(e) {
            return contains(e.text, q.term);
          });
          
      // Get a page sized slice of data from the results of filtering the data set.
      var paged = results.slice((q.page - 1) * pageSize, q.page * pageSize);
      
      q.callback({
        results: paged,
        more: results.length >= q.page * pageSize
      });
    }
  });
  $('.post-code').show(); 
  $('.rt-btn.rt-btn-next').hide(); 
}

function dontanswer(){
  console.log('Press do not want to answer')
  clear_data_select2();
  //set value don't answer
}

function save_answer(){ //doesnt works???
  console.log('saving data via event...');
  clear_data_select2();
  //store detail data here
}

function clear_data_select2(){
  $('#post-code-select2').val(null).trigger('change');
  document.getElementById('inputOutletID').value = "";
  $('#select2-post-code-select2-container').prop('title', "");
  $('#select2-post-code-select2-container').html("");
}

function hide_outlet_search_box() {
  $('.rt-body.slt-page-container main').find('section').show();
  $('.post-code').hide();
  $('#post-code-select2').find("[data-select2-id]").remove();
}
