const btnElem = document.querySelector('button')
const date = new Date()
let dateNow = date.toDateString()
let timestamp = date.setDate(date.getDate() + 7)
let finalDate = new Date(timestamp).toDateString()

function setID(){
    let id = 1
    return function(){
        return id++
    }
}
let id = setID()

const events = [
    {
        start_date: dateNow,
        final_date: finalDate,
        overview: 'Описание не больше 240 символов!',
        state: true,
        id: id()
    }
];

btnElem.addEventListener('click', event => {
    event.preventDefault()
    const rootElem = document.querySelector('.root')
    rootElem.classList.add('root')
    const modalElem = document.createElement('div');
    modalElem.classList.add('events');
    const closeModalElem = document.createElement('div')
    closeModalElem.classList.add('closeModal')
    const formElem = document.createElement('form')
    formElem.classList.add('form');
    const inputDateElem = document.createElement('input')
    inputDateElem.classList.add('inputDate')
    inputDateElem.setAttribute('type', 'date' )
    inputDateElem.setAttribute('name', 'date' )
    const inputTextElem = document.createElement('input')
    inputTextElem.setAttribute('type', 'text' )
    inputTextElem.setAttribute('name', 'text' )
    inputTextElem.classList.add('inputText')
    const formBtn = document.createElement('button')
    formBtn.innerText= 'Добавить'
    formElem.append(inputDateElem,inputTextElem, formBtn)
    modalElem.append(closeModalElem, formElem)
    closeModalElem.innerText = '❌'

    formElem.addEventListener('submit', e => {
        e.preventDefault()
        let dateValue = formElem.date.value
        let textValue = formElem.text.value
        events.push({
            start_date: dateValue,
            final_date: finalDate,
            overview:  textValue,
            state: true,
            id: id()
        })
    })

    closeModalElem.addEventListener('click', () => {
        modalElem.remove()
    })

    events.map((elem) => {
        const {start_date,final_date,  overview} = elem
        const eventElem = document.createElement('div');
        eventElem.classList.add('event');
        const dateElem = document.createElement('p');
        dateElem.classList.add('date');
        const finalDateElem = document.createElement('p')
        finalDateElem.classList.add('finalDate')
        const overviewElem = document.createElement('p');
        overviewElem.classList.add('overview');
        const closeEventElem = document.createElement('div')
        closeEventElem.classList.add('closeModal')
        closeEventElem.innerText = '❌'
        closeEventElem.addEventListener('click', () => {
            eventElem.remove()
        })
        rootElem.append(modalElem);
        modalElem.append(eventElem);
        eventElem.append(dateElem, overviewElem, finalDateElem, closeEventElem)
        dateElem.innerText = `Начало события: 
        ${start_date}`;
        overviewElem.innerText = overview;
        finalDateElem.innerText = `Конец события:
        ${final_date}`
    })
})


