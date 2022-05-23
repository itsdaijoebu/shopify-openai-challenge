/*********************************
*DOM ELEMENTS AND GLOBAL VARS
**********************************/
const worstDayHaver = document.querySelector('#worst-day-haver');
const responseHistory = document.querySelector('#response-history');
const mcName = document.querySelector('#name');
const submitName = document.querySelector('#submit-name');
const resetName = document.querySelector('#reset-name');



/*********************************
*DEFAULT BEHAVIORS
**********************************/
resetName.disabled = true;

/*********************************
*EVENT LISTENERS
**********************************/
worstDayHaver.addEventListener('submit', haveABadDay);
worstDayHaver.addEventListener('reset', resetForm);

/*********************************
*BUTTON BEHAVIOR
**********************************/
function haveABadDay(e) {
    e.preventDefault();

    resetName.disabled = false;
    getWorstDay(mcName.value);
}

function resetForm() {
    resetName.disabled = true;
}

/*****************************************************
 * FUNCTIONS
*****************************************************/
// Query OpenAi API to generate a story about a person's worst day
function getWorstDay(name) {
    const apiKey = config.OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/engines/text-curie-001/completions";

    const data = {
        prompt: `Write a story about the worst day in ${name}'s life`,
        max_tokens: 257,
        temperature: 0.9
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        let worstDay = data.choices[0].text;
        console.log(worstDay)
        let worstDayString = JSON.stringify(worstDay).replace(/\\n/g, '<br>').replace(/\\/g, '');
        console.log(worstDayString)
        worstDayString = worstDayString.substring(9, worstDayString.length-1);
        console.log(worstDayString);
        addResponse(name, worstDayString);
    });
}


// prepends a response to the history of worst days
function addResponse(name, response) {
    // Create elements for response
    let item = document.createElement('section');
    let title = document.createElement('p');
    let badDay = document.createElement('p');
    item.appendChild(title)
    item.appendChild(badDay)

    title.textContent = name;
    // badDay.textContent = response;
    badDay.innerHTML = response;

    item.classList.add('history-item')
    title.classList.add('response-title');
    badDay.classList.add('response');

    responseHistory.prepend(item)
}