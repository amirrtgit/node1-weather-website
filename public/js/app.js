
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#para1');
const messageTwo = document.querySelector('#para2');

messageOne.textContent = '';
messageTwo.textContent='';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    
    
    const locationURL = '/weather?address='+location;

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
 

    fetch(locationURL).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent='Error Msg: ' + data.error;
        }
        else {
            messageOne.textContent=data.Location;
            messageTwo.textContent=data.Forecast;
        }
    })
})

})