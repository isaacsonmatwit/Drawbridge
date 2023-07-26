//client side javascript
//==================================================

var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    // var cipherText = encryptClient();

    if (input.value) {
        socket.emit('chat message', {
            message: encryptClient(),
            nickname: userName,
        });

        input.value = '';
        console.log("encrypted message sent")
    }

});


socket.on('chat message', function (msg) {
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
    var item = document.createElement('li');
    var itemData = document.createElement('label');

    item.classList.add('bar');
    item.setAttribute('id', 'test');
    //itemData.setAttribute('id', 'test');
    //itemData.classList.add('bar');
    item.textContent = msg.message;
    //console.log(item.textContent)
    var plainText = decryptClient(item.textContent);
    item.textContent = plainText;
    itemData.textContent = msg.nickname + ": " + formattedTime;
    messages.appendChild(item);
    messages.appendChild(itemData);
    messages.scrollTo(0, document.body.scrollHeight);
});

const inboxPeople = document.querySelector(".inbox__people");

let userName = "";

const newUserConnected = (user) => {
    userName = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit("new user", userName);
    addToUsersBox(userName);
};

const addToUsersBox = (userName) => {
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    }

    const userBox = `
    <div class="chat_ib ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    inboxPeople.innerHTML += userBox;
};

// new user is created so we generate nickname and emit event
newUserConnected();

socket.on("new user", function (data) {
    data.map((user) => addToUsersBox(user));
});

socket.on("user disconnected", function (userName) {
    document.querySelector(`.${userName}-userlist`).remove();
});