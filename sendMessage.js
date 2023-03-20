function CopyToLabel() {
    //Reference the TextBox.
    var txtName = document.getElementById("txtSend");

    //Reference the Label.
    document.getElementById("mytextarea").innerHTML +=
      "&#13;&#10; You: " + txtSend.value;

    //Copy the TextBox value to Label.
  }