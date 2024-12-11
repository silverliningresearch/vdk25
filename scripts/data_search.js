
function parse_location_info(question, value) {

  var location_id = api.fn.answers().Q0C_1_text;

  let location_info = location_id.split("♦");
  console.log(location_info); 

  console.log("location_info:", location_info);
  api.fn.answers({flight_show:  location_info[0]});

  api.fn.answers({terminal: value.TER});
  api.fn.answers({flight_number:   value.Flight});

  console.log("parse location_info  done!");
}
