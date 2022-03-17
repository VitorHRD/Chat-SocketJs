

const room = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:3000/${room}`);

let user = "";

socket.on('update_messages', (message) => {
    updateMessagesOnScrenn(message)

})
function updateMessagesOnScrenn(message) {
    const div_messages = document.querySelector('#messages');
    let list_messages = '<ul id ="lista">'
    message.forEach(messages => {
        if (messages == ""){return;}
         if(messages.user == user){
            list_messages += `<li id="${messages.id}" class="msg right backBlack"><h3>${messages.user}<img src="lixo.png" onclick="remove('${messages.id}')"></h3><p>${messages.msg}</p> </li>`
        }
        else{
            list_messages += `<li class="msg left backGrenn"><h3>${messages.user}</h3><p>${messages.msg}</p> </li>`
        }
    

    });
    list_messages += '</ul>'

    div_messages.innerHTML = list_messages
    var messages = $('#messages')[0];
    messages.scrollTop = messages.scrollHeight;
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {

        e.preventDefault();

        if (!user) {
            alert('Defina Um Usuario')
            return;
        }
        

        const message = document.forms["message_form_name"]['msg'].value;
        if (message != "") {
            socket.emit('new_messages', { id:Math.floor(Date.now() * Math.random()).toString(36) , user: user, msg: message  })
            document.forms["message_form_name"]['msg'].value = "";
        }

    })
    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e) => {

        e.preventDefault();

        user = document.forms["user_form_name"]['user'].value;
        socket.emit('check-user' , user);
        socket.on('check-fail',()=>{
            alert('O nome '+ user +' já foi escolhido');
            user="";
        })
        socket.on('check-success',()=>{
             userForm.parentNode.removeChild(userForm)
        })
    })
            
        
})
function remove(id){
    socket.emit('deleteMsg' , id)
    let msg = document.getElementById(id);
    msg.remove();
    
}
