// document.getElementById("count-el").innerText = 5
// building into objects
let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

/*
const container_div = document.getElementById("container")
const imgs = [
    "icon.png",
    "icon.png",
    "icon.png"
]

function renderImages(){
    let imagss=""
    for (let i = 0; i<imgs.length;i++){
        imagss += `<img src=${imgs[i]}>`
    }
    container_div.innerHTML=imagss
}
renderImages()
*/

if  (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Grab the url of the current tab - Chrome API
tabBtn.addEventListener("click", function(){
    //console.log(tabs[0].url)
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     let activeTab = tabs[0]
    //     let activeTabId = activeTab.id
    // })
    // chrome.tabs will only be working in chrome browser due to API
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// check on console-application-localStorage: living in window object
// localStorage.setItem(key, value) / getItem(key) / clear() both key, value are strings
// localStorage.setItem("myLeads", "www.examplelead.com")
// stringify array -> string / parse string -> array
/*

let myLeads = `["www.1.com"]`
myLeads = JSON.parse(myLeads)
myLeads.push("www.2.com")
console.log(typeof myLeads)

let myLeads2 = ["www.1.com"]
myLeads2 = JSON.stringify(myLeads2)
console.log(typeof myLeads2)

*/

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads) {
    let listItems = ""
    for (i = 0; i < leads.length; i++){
        // Dom manipulation comes with cost - best to manipulate just once
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>"  + myLeads[i] + "</a></li>"
        
        // instead of double quote strings - let's use template string & literals - backtick 
        listItems += `
                <li>
                    <a target='_blank' 
                        href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `

        //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
        
        // create element
        // const li = document.createElement("li")
        // set text Content
        // li.textContent = myLeads[i]
        // append to ul
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

/*
let player = {
    playerName: "Alex",
    playerChips: 145,
    sayHello: function() {
        console.log("HEHEHEHEHEH")
    }
}

// push(), pop(), shift() == popleft, unshift() == appendleft

let person = {
    name: "Alex",
    age: "27",
    country: "Korea"
}

function logData(){ 
    console.log(person.name + person.age + person.country)
}

logData()

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("card-el")



let playerEl = document.getElementById("player-el")
playerEl.textContent = player.playerName + ": $" + player.playerChips

function getRandomCard() {
    let number = Math.floor(Math.random()*13) + 1
    if (number > 10) {
        return 10
    } else if (number === 1) {
        return 11 
    } else {
        return number
    }
}

function startGame(){
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    card = [firstCard,secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    if (sum <= 20){
        messageEl.textContent = "Draw a new card?"

        cardEl.textContent = "Cards: "
        for (i = 0; i < cards.length; i++){
            cardEl.textContent += " " + cards[i]
        }
        //cardEl.textContent = "Cards: " + cards[0] + " " + cards[1]
        sumEl.textContent = "Sum: " + sum
    } else if (sum === 21){
        hasBalckJack = true
        messageEl.textContent = "You've got a blackjack!"

        cardEl.textContent = "Cards: "
        for (i = 0; i < cards.length; i++){
            cardEl.textContent += " " + cards[i]
        }
        sumEl.textContent = "Sum: " + sum

    } else {
        messageEl.textContent = "You lost"

        cardEl.textContent = "Cards: "
        for (i = 0; i < cards.length; i++){
            cardEl.textContent += " " + cards[i]
        }
        sumEl.textContent = "Sum: " + sum
        isAlive = false
    }
}

function newGame(){
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
}
*/