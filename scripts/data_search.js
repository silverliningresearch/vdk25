
function parse_location_info(question, value) {

  var location_id = api.fn.answers().Q0C_1_text;

  let location_info = location_id.split("♦");
  console.log(location_info); 

  console.log("location_info:", location_info);
  api.fn.answers({Q0A_DST:  Number(location_info[4])}); //Landsdel
  api.fn.answers({Q0A_old:  Number(location_info[4])}); //Landsdel
  api.fn.answers({Q0B:  location_info[1]});  //Overnatningssted - accomodation name
  api.fn.answers({Q0D: Number(location_info[2])});               //accomodation type


  api.fn.answers({Landsdel_DST: (location_info[5])});              
  api.fn.answers({Landsdelnavn_VDK: (location_info[7])});          

  api.fn.answers({destination_name: (location_info[8])});               //accomodation type
  api.fn.answers({destination_size: (location_info[9])});               //accomodation type

  console.log("location_info[4]:", location_info[4]); 

  //Q0A_area


  console.log("parse location_info  done!");
}
