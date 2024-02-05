const soldeText = document.getElementById('solde');
const content = document.getElementById('content');
const submit = document.getElementById('submit');
const open = document.getElementById('open');
const achatWindow = document.getElementById('window');
const allAdd = document.querySelectorAll('#add');

var num = localStorage.getItem('NUM');

if (localStorage.length == 0) {
    localStorage.setItem('solde', 0)
    localStorage.setItem('NUM', 0)
}

open.addEventListener('click', () => {
    console.log('click');
    achatWindow.style.display = 'flex';
})

document.addEventListener('keydown', () => {
    if (event.key == 'Escape') {
        achatWindow.style.display = 'none';
    }
})

submit.addEventListener('click', () => {
    let name = document.getElementById('Name');
    let prix = document.getElementById('Prix');

    if (name.value != '' && prix.value != '') {
        addAchat(name.value, prix.value)
        name.value = ''
        prix.value = ''
        achatWindow.style.display = 'none';
    }
})

allAdd.forEach(element => {
    element.addEventListener('click', () => {
        signe = element.children[0].children[0].textContent
        value = element.children[0].children[1].textContent
        addMoney(signe, value);
    })    
});
function updateAcheter(){
    const acheter = document.querySelectorAll('#acheter');
    acheter.forEach(element => {
        element.addEventListener('click', () => {
            if(element.parentNode.children[3].children[0].textContent == 100){
                value = element.parentNode.children[1].children[0].textContent
                addMoney("-" , value)
                element.parentNode.remove()
            }
        })
    })
}

function updateSupprimer(){
    const supprimer = document.querySelectorAll('#supprimer');
    supprimer.forEach(element => {
        element.addEventListener('click', () => {
            element.parentNode.remove()
        })
    })
}

function addAchat(name, prix){
    var tab = [[name], [prix], [0], [0]]
    num = localStorage.getItem('NUM')
    id = "Achat" + num
    localStorage.setItem(id, JSON.stringify(tab))
    num++
    localStorage.setItem("NUM", num)
    drawAchat()
}

function drawAchat(){
    const box = document.querySelectorAll('#box');
    box.forEach(element => {
        element.remove()
    })
    console.log(num)
    for( var i = 0; i < num; i++){
        var tab = JSON.parse(localStorage.getItem("Achat" + i))

        let newBox = document.createElement("div")
        newBox.setAttribute("class", "box")
        newBox.setAttribute("id", "box")
    
        newTitre = document.createElement("div")
        newTitre.setAttribute("class", "titre")
        newTitre.innerHTML = tab[0]
        newBox.appendChild(newTitre)
    
        var symbole = document.createElement('span')
        symbole.innerHTML = "€"
    
        let newPrix = document.createElement("div")
        newPrix.setAttribute("class", "prix")
        let spanPrix = document.createElement("span")
        spanPrix.innerHTML = tab[1]
        newPrix.appendChild(spanPrix) 
        newPrix.appendChild(symbole)
        newBox.appendChild(newPrix)
    
        var symbole = document.createElement('span')
        symbole.innerHTML = "€"
    
        let newManque = document.createElement("div")
        newManque.setAttribute("class", "manque")
        let spanManque = document.createElement("span")
        spanManque.innerHTML = tab[2]
        newManque.appendChild(spanManque) 
        newManque.appendChild(symbole)
        newBox.appendChild(newManque)
    
        var symbole = document.createElement('span')
        symbole.innerHTML = "%"
    
        let newPourcentage = document.createElement("div")
        newPourcentage.setAttribute("class", "pourcentage")
        let spanPourcentage = document.createElement("span")
        spanPourcentage.innerHTML = tab[3]
        newPourcentage.appendChild(spanPourcentage) 
        newPourcentage.appendChild(symbole)
        newBox.appendChild(newPourcentage)
    
        newButton = document.createElement('button')
        newButton.setAttribute("id", "acheter")
        newButton.innerHTML = "<i class='bx bx-check'></i>"
        newBox.appendChild(newButton)
        newButton = document.createElement('button')
        newButton.setAttribute("id", "supprimer")
        newButton.innerHTML = "<i class='bx bx-x'></i>"
        newBox.appendChild(newButton)
    
        content.appendChild(newBox)
    }

    update()
}

function updateBox(){
    const box = document.querySelectorAll('#box');
    currentSolde = parseInt(localStorage.getItem('solde'));
    box.forEach(element => {
        boxPrix = element.children[1].children[0].textContent
        boxManque = boxPrix - currentSolde
        boxPourcentage = Math.round((currentSolde / boxPrix) * 100)

        if (boxPourcentage < 100){
            element.children[2].children[0].textContent = boxManque
            element.children[3].children[0].textContent = boxPourcentage
        }else{
            element.children[2].children[0].textContent = 0
            element.children[3].children[0].textContent = 100
        }


        if (boxPourcentage >= 100){
            element.style.backgroundColor = "green"
        }else{
            element.style.backgroundColor = "red"
        }

    })
}

function addMoney(signe, value) {
    currentSolde = parseInt(localStorage.getItem('solde'));
    value = parseInt(value);
    if(signe == "+"){
        newSolde = currentSolde + value;
        localStorage.setItem('solde', newSolde);
    }else{
        newSolde = currentSolde - value;
        localStorage.setItem('solde', newSolde);
    }
    update()
}

function updateSolde(){
    currentSolde = localStorage.getItem('solde');
    soldeText.innerHTML = currentSolde.toString()
}


function update(){
    updateAcheter()
    updateSupprimer()
    updateSolde()
    updateBox()
}
update()
drawAchat()