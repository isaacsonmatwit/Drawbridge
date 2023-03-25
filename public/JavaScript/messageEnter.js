//Pressing enter while the message textbox is active sends your message!
const txt = document.getElementById("txtSend");
const btn = document.getElementById("btnSend");

txt.onkeydown = function(e){
    if(e.key=='Enter'){
        btn.click();
        txt.value='';
    }
}