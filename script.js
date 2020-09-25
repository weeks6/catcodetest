const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "2647b9513ac064651d67ed80de786451cc5afa3e";

const options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: ""
}

const suggestions = document.getElementById('suggestions')
const input = document.getElementById('input')
input.addEventListener('keyup', (e) => requestSuggestion(e))

function requestSuggestion(e) {
    const query = e.target.value
    options.body = JSON.stringify({query: query})

    if (query != '' || query != ' ') {
       fetch(url, options)
        .then(response => response.json())
        .then(result => {
            // creating new list element and filling it with adresses
            const suggestionsList = document.createElement('ul')
            for (let i = 0; i < result['suggestions'].length; i++) {

                const newItem = document.createElement('li')
                newItem.classList.add('suggestions-list__item')
                newItem.tabIndex = i + 3
                newItem.innerHTML = result['suggestions'][i].value
                suggestionsList.append(newItem)
            }
            suggestions.innerHTML = suggestionsList.innerHTML

            // setting up click listeners for every list item in the adresses list
            for (let i = 0; i < suggestions.childElementCount; i++) {
                const listItem = suggestions.children[i]
                listItem.addEventListener('click', () => {
                    input.value = listItem.innerHTML
                    document.activeElement.blur()
                })
            }
        })
        .catch(error => console.log("error", error));  
    } else {
        suggestions.innerHTML = ""
    }
}