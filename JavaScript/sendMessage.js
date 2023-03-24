function CopyToLabel() {
    //Reference the TextBox.
    var txtName = document.getElementById("txtSend");

    //Reference the Label.
    if (txtSend.value != 0){
      document.getElementById("mytextarea").innerHTML +=
      "&#13;&#10; You: " + txtSend.value;
    }
    

    //Copy the TextBox value to Label.
  }