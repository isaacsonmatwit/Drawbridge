function CopyToLabel() {
    //Reference the TextBox.
    var txtName = document.getElementById("txtName");

    //Reference the Label.
    document.getElementById("mytextarea").innerHTML +=
      "&#13;&#10; You: " + txtName.value;

    //Copy the TextBox value to Label.
  }