const worstDayHaver = document.querySelector('#worst-day-haver');
const responseHistory = document.querySelector('#response-history');
const mcName = document.querySelector("#name");

worstDayHaver.addEventListener('submit', haveABadDay);

function haveABadDay(e) {
    e.preventDefault();
    addResponse('test');
}

function addResponse(response) {
    // Create elements for response
    let item = document.createElement('section');
    let title = document.createElement('p');
    let badDay = document.createElement('p');
    item.appendChild(title)
    item.appendChild(badDay)

    title.textContent = mcName.value;
    badDay.textContent = response;
    
    item.classList.add('history-item')
    title.classList.add('response-title');
    badDay.classList.add('response');

    responseHistory.prepend(item)
}