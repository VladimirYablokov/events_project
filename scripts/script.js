const btnElem = document.querySelector('button')
const rootElem = document.querySelector('.root')
const modalElem = document.createElement('div');
const eventsContainer = document.createElement('div');


const date = new Date()
let dateNow = date.toDateString()
let timestamp = date.setDate(date.getDate() + 7)
let finalDate = new Date(timestamp).toDateString()

function setID() {
    let id = 1
    return function () {
        return id++
    }
}

let id = setID()

const events = [
    // {
    //     start_date: dateNow,
    //     final_date: finalDate,
    //     overview: 'Описание не больше 240 символов!',
    //     state: true,
    //     id: id()
    // }
];

function addModal() {
    const closeModalElem = document.createElement('div')
    const formElem = document.createElement('form')
    const inputDateElem = document.createElement('input')
    const inputTextElem = document.createElement('textarea')
    const formBtn = document.createElement('button')
    modalElem.classList.add('events');
    closeModalElem.classList.add('closeModal')
    formElem.classList.add('form');
    inputDateElem.classList.add('inputDate')
    inputTextElem.classList.add('inputText')
    formBtn.classList.add('formBtn')
    eventsContainer.classList.add('eventsContainer')
    inputDateElem.setAttribute('type', 'date')
    inputDateElem.setAttribute('name', 'date')
    inputTextElem.setAttribute('type', 'text')
    inputTextElem.setAttribute('name', 'text')
    inputTextElem.setAttribute('placeholder', 'введите текст')

    rootElem.append(modalElem)
    modalElem.append(eventsContainer);
    formElem.append(inputDateElem, inputTextElem, formBtn)
    modalElem.append(closeModalElem, formElem)
    formBtn.innerText = 'Добавить'
    closeModalElem.innerText = '❌'
    closeModalElem.addEventListener('click', () => {
        modalElem.remove()
    })
    formElem.addEventListener('submit', e => {
        e.preventDefault()
        let dateValue = formElem.date.value
        let textValue = formElem.text.value
        events.push({
            start_date: dateValue,
            final_date: finalDate,
            overview: textValue,
            state: true,
            id: id()
        })
        eventsContainer.innerHTML = ''
        render(events)
        formElem.date.value = '';
        formElem.text.value = ''
    })
}

btnElem.addEventListener('click', event => {
    event.preventDefault()
    addModal()
})

function render(data){
    eventsContainer.innerHTML = ''

    data.map((elem) => {
        const {start_date,final_date, overview} = elem
        const eventElem = document.createElement('div');
        const dateElem = document.createElement('p');
        const finalDateElem = document.createElement('p');
        const overviewElem = document.createElement('p');
        const closeEventElem = document.createElement('div');

        eventElem.classList.add('event');
        dateElem.classList.add('date');
        finalDateElem.classList.add('finalDate')
        overviewElem.classList.add('overview');
        closeEventElem.classList.add('closeModal')

        eventsContainer.append(eventElem); // Исправленная строка
        eventElem.append(dateElem, overviewElem, finalDateElem, closeEventElem)

        closeEventElem.innerText = '❌'
        dateElem.innerText = `Начало события:
        ${start_date}`;
        overviewElem.innerText = overview;
        finalDateElem.innerText = `Конец события:
        ${final_date}`

        closeEventElem.addEventListener('click', () => {
            eventElem.remove()
        })
    })
}
// render(events)






