let selected_items = [];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Q22_get_selection()
{
  
  $('.rt-btn.rt-btn-next').hide(); 
  
  let Q22_value = [];
  
  for (i = 0; i <= 15; i++) {
    Q22_value.push(0);  // default value
  }

  if ((api.fn.answers().Q22_1) && (api.fn.answers().Q22_1 !=6)) Q22_value[1]= ((api.fn.answers().Q22_1));
  if ((api.fn.answers().Q22_2) && (api.fn.answers().Q22_2 !=6)) Q22_value[2] = ((api.fn.answers().Q22_2));
  if ((api.fn.answers().Q22_3) && (api.fn.answers().Q22_3 !=6)) Q22_value[3] = ((api.fn.answers().Q22_3));
  if ((api.fn.answers().Q22_4) && (api.fn.answers().Q22_4 !=6)) Q22_value[4] = ((api.fn.answers().Q22_4));
  if ((api.fn.answers().Q22_5) && (api.fn.answers().Q22_5 !=6)) Q22_value[5] = ((api.fn.answers().Q22_5));
  if ((api.fn.answers().Q22_6) && (api.fn.answers().Q22_6 !=6)) Q22_value[6] = ((api.fn.answers().Q22_6));
  if ((api.fn.answers().Q22_7) && (api.fn.answers().Q22_7 !=6)) Q22_value[7] = ((api.fn.answers().Q22_7));
  if ((api.fn.answers().Q22_8) && (api.fn.answers().Q22_8 !=6)) Q22_value[8] = ((api.fn.answers().Q22_8));
  if ((api.fn.answers().Q22_9) && (api.fn.answers().Q22_9 !=6)) Q22_value[9] = ((api.fn.answers().Q22_9));
  if ((api.fn.answers().Q22_10) && (api.fn.answers().Q22_10 !=6)) Q22_value[10] = ((api.fn.answers().Q22_10));
  if ((api.fn.answers().Q22_11) && (api.fn.answers().Q22_11 !=6)) Q22_value[11] = ((api.fn.answers().Q22_11));
  if ((api.fn.answers().Q22_12) && (api.fn.answers().Q22_12 !=6)) Q22_value[12] = ((api.fn.answers().Q22_12));
  if ((api.fn.answers().Q22_13) && (api.fn.answers().Q22_13 !=6)) Q22_value[13] = ((api.fn.answers().Q22_13));
  if ((api.fn.answers().Q22_14) && (api.fn.answers().Q22_14 !=6)) Q22_value[14] = ((api.fn.answers().Q22_14));
  if ((api.fn.answers().Q22_Other_1) && (api.fn.answers().Q22_Other_1 !=6) && (api.fn.answers().Q22_Other_1 !=1)) Q22_value[15] = ((api.fn.answers().Q22_Other_1));

  var count_equal_5 = 0;
  var count_less_than_5 =0;
  var count_all = 0;

  let Q22_value_equal_5 = [];
  let Q22_value_less_than_5 = [];

  for (i = 1; i <= 15; i++) {
    if (Q22_value[i] == 5 ) {
      count_equal_5++;
      count_all++;
      Q22_value_equal_5.push(i);
    }
    else if ((Q22_value[i] > 1) && (Q22_value[i] < 5)) {
      count_less_than_5++;
      count_all++;
      Q22_value_less_than_5.push(i);
    }
  }

  if (count_all > 0 )  // only proces if there is answers in Q22
  {
    if (count_all<=3) // if the total number of answers in Q22 is <= 3 then Q22A will not be asked
    {
      Q22A_clear_all_selection();
    }
    else  //count_all>3
    {
      if (count_equal_5 > 3) //if the total number of “5” answers is > 3 then only show answers “5” of Q22 in Q22A
      {
        Q22A_clear_all_selection();
        for (i = 0; i < Q22_value_equal_5.length; i++) {
          Q22A_set_default_selection(Q22_value_equal_5[i]);
        }
      }
      else if (count_equal_5 == 3) //if the total number of “5” answers is = 3 then Q22A will not be asked
      {
        Q22A_clear_all_selection();
      }
      else if (count_equal_5 < 3) //if the total number of “5” answers is < 3 then only show answers < “5” of Q22 in Q22A
      {
        Q22A_clear_all_selection();
        for (i = 0; i < Q22_value_less_than_5.length; i++) {
          Q22A_set_default_selection(Q22_value_less_than_5[i]);
        }
        api.fn.answers({Q22A_number_of_selection: 3-count_equal_5});
      }
    }
  }

  //console.log("count_5: ", count_equal_5, Q22_value_equal_5); 
  //console.log("count_less_than_5: ", count_less_than_5, Q22_value_less_than_5); 
  //console.log("count_all: ", count_all); 

  $('.rt-btn.rt-btn-next').show(); 
}

function Q22A_set_default_selection(id)
{
  if ((id==1)  ||(id==99)) api.fn.answers({Q22A_selected_1:"1"});
  if ((id==2)  ||(id==99))  api.fn.answers({Q22A_selected_2:"1"});
  if ((id==3)  ||(id==99))  api.fn.answers({Q22A_selected_3:"1"});
  if ((id==4)  ||(id==99))  api.fn.answers({Q22A_selected_4:"1"});
  if ((id==5)  ||(id==99))  api.fn.answers({Q22A_selected_5:"1"});
  if ((id==6)  ||(id==99))  api.fn.answers({Q22A_selected_6:"1"});
  if ((id==7)  ||(id==99))  api.fn.answers({Q22A_selected_7:"1"});
  if ((id==8)  ||(id==99))  api.fn.answers({Q22A_selected_8:"1"});
  if ((id==9)  ||(id==99))  api.fn.answers({Q22A_selected_9:"1"});
  if ((id==10)  ||(id==99))  api.fn.answers({Q22A_selected_10:"1"});
  if ((id==11)  ||(id==99)) api.fn.answers({Q22A_selected_11:"1"});
  if ((id==12)  ||(id==99)) api.fn.answers({Q22A_selected_12:"1"});
  if ((id==13)  ||(id==99)) api.fn.answers({Q22A_selected_13:"1"});
  if ((id==14)  ||(id==99)) api.fn.answers({Q22A_selected_14:"1"});
  if ((id==15)  ||(id==99)) api.fn.answers({Q22A_selected_15:"1"}); // Other

  api.fn.answers({Q22A_selected_99:1}); //None of the above

  //console.log("show: ", id); 
}

function Q22A_clear_all_selection()
{
  api.fn.answers({Q22A_selected_1:0});
  api.fn.answers({Q22A_selected_2:0});
  api.fn.answers({Q22A_selected_3:0});
  api.fn.answers({Q22A_selected_4:0});
  api.fn.answers({Q22A_selected_5:0});
  api.fn.answers({Q22A_selected_6:0});
  api.fn.answers({Q22A_selected_7:0});
  api.fn.answers({Q22A_selected_8:0});
  api.fn.answers({Q22A_selected_9:0});
  api.fn.answers({Q22A_selected_10:0});
  api.fn.answers({Q22A_selected_11:0});
  api.fn.answers({Q22A_selected_12:0});
  api.fn.answers({Q22A_selected_13:0});
  api.fn.answers({Q22A_selected_14:0});
  api.fn.answers({Q22A_selected_15:0}); //Other

  api.fn.answers({Q22A_selected_99:0}); //None of the above

}

function _Q22_set_test_value()
{
  api.fn.answers({Q22_1:5});
  api.fn.answers({Q22_2:5});
  //api.fn.answers({Q22_3:5});
  api.fn.answers({Q22_4:5});
  api.fn.answers({Q22_5:5});
  api.fn.answers({Q22_6:1});
  api.fn.answers({Q22_7:1});
  api.fn.answers({Q22_8:1});
  api.fn.answers({Q22_9:1});
  api.fn.answers({Q22_10:1});
  api.fn.answers({Q22_11:1});
  api.fn.answers({Q22_12:1});
  api.fn.answers({Q22_13:6});
  api.fn.answers({Q22_14:6});
  api.fn.answers({Q22_15:1});
}