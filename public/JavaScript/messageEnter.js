//Pressing enter while the message textbox is active sends your message!

document.getElementById('txtSend').onkeydown = function(e){
    if(e.key=='Enter')
        document.getElementById('btnSend').click();
}