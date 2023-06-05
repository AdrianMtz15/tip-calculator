class TipPercentageButton {
    constructor(node, percentage) {
        this.node = node
        this.percentage = percentage
    }

    activateButton() {
        this.node.classList.add('tip-percentage-active')
    }

    desactivateButton() {
        this.node.classList.remove('tip-percentage-active')
    }
}

//Creating five const for five btns of percentage and adding it to array
const one = new TipPercentageButton(document.querySelector('.one'), 0.05)
const two = new TipPercentageButton(document.querySelector('.two'), 0.1)
const three = new TipPercentageButton(document.querySelector('.three'), 0.15)
const four = new TipPercentageButton(document.querySelector('.four'), 0.25)
const five = new TipPercentageButton(document.querySelector('.five'), 0.5)
const six = new TipPercentageButton(document.querySelector('.six'), 0)

class Input {
    constructor(name, node, inputParent) {
        this.name = name
        this.node = node
        this.inputParent = inputParent
    }

    inputValue() {
        let num

        if (this.node.value === '') {
            num = 0
        } else {
            num = parseInt(this.node.value)
        }
        return num
    }

    hasSpanCantZero(node) {
        const childNodes = this.inputParent.parentElement.children
        const array = [...childNodes]
        let has

        if (array.some(element => element === node)) {
            has = true
        } else {
            has = false
        }
        return has
    }

    cantZero () {
        const notZeroNode = document.createElement('span')
        notZeroNode.innerText = 'Can´t be zero'
        notZeroNode.style.color = 'red'
        notZeroNode.style.fontSize = '1.8rem'
        notZeroNode.classList.add(`${this.name}__cant-zero`)
        const node = document.querySelector(`.${this.name}__cant-zero`)
        

        if (this.hasSpanCantZero(node) === false) {
            if (this.node.value === '' || this.node.value <= 0) {
                this.inputParent.parentElement.insertBefore(notZeroNode, this.inputParent)
            } else {
                return true
            }
        } else {
            if (this.node.value === '' || this.node.value <= 0) {
            }else {
                this.inputParent.parentElement.removeChild(node)
                return true
            }
        }
    }
}

let bill = 0
let tipPercentage = 0
let numPeople = 0

const values = []

const billInput = new Input('billInput', document.querySelector('.bill-input'), document.querySelector('.bill-input').parentElement)
const numPeopleInput = new Input('numPeopleInput', document.querySelector('#num-people'), document.querySelector('#num-people').parentElement)

function billValue() {
    bill = billInput.inputValue()
    values.push(bill)
}

function numPeopleValue() {
    numPeople = numPeopleInput.inputValue()
    values.push(numPeople)
}



const btnsPercentage = [one, two, three, four, five]

// This block activate or desactivate the buttons when click
btnsPercentage.forEach(element => {
    element.node.addEventListener('click', () => {
        if (six.node.value != '') {
            six.node.value = ''
        }

        if (element.node.classList.contains('tip-percentage-active')) {
            element.desactivateButton()
            tipPercentage = 0
            values.push(tipPercentage)
        } else {
            btnsPercentage.forEach(element => {
                if (element.node.classList.contains('tip-percentage-active')) {
                    element.desactivateButton()
                }
            })
            
            tipPercentage = element.percentage
            values.push(tipPercentage)
            element.activateButton()
        }
    })
})

six.node.addEventListener('click', () => {
    btnsPercentage.forEach(element => {
        if (element.node.classList.contains('tip-percentage-active')) {
            element.desactivateButton()
        }
    })
})

function valueTip(value){
    if (value === '') {
        tipPercentage = 0
        values.push(tipPercentage)
    } else {
        const tip = parseInt(value)
        const customTip = tip / 100
        tipPercentage = customTip
        values.push(tipPercentage)
    }
}

let tipPercentageCantZero = 0

function tipPercentageZero() {
    const ref = document.querySelector('#select-tip')

    const notZeroNode = document.createElement('span')
    notZeroNode.innerText = 'Can´t be zero'
    notZeroNode.style.color = 'red'
    notZeroNode.style.fontSize = '1.8rem'
    notZeroNode.classList.add(`tip-percentage__cant-zero`)

    if(tipPercentageCantZero === 0) {
        if (tipPercentage === 0) {
            ref.insertAdjacentElement('beforeend', notZeroNode)
            tipPercentageCantZero++
        } else {
            return true
        }
    }else {
        if(tipPercentage === 0) {
        }else {
            document.querySelector('.tip-percentage__cant-zero').remove()
            tipPercentageCantZero--
            return true
        }
    }

 }


function calculate() {
    billInput.cantZero()
    numPeopleInput.cantZero()
    tipPercentageZero()

    const tipAmountTitle = document.querySelector('.tip-amount__result')
    const tipAmountTotalTitle = document.querySelector('.total__result')
    const btnReset = document.querySelector('#reset-calculator')

    if (billInput.cantZero() == true && numPeopleInput.cantZero() == true && tipPercentageZero() == true) {
        const tipAmount = (bill * tipPercentage) / numPeople
        const tipAmountTotal = bill * tipPercentage

        tipAmountTitle.innerText = `$${tipAmount.toFixed(2)}`
        tipAmountTotalTitle.innerText = `$${tipAmountTotal.toFixed(2)}`


    } else {
        tipAmountTitle.innerText = `$0.00`
        tipAmountTotalTitle.innerText = `$0.00`
    }

    if (tipAmountTotalTitle.textContent != '$0.00') {
        btnReset.classList.remove('btn-desactivated')
        btnReset.classList.add('btn-active')
    } else {
        if(btnReset.classList.contains('btn-active')) {
            btnReset.classList.remove('btn-active')
            btnReset.classList.add('btn-desactivated')
        }
    }
}

function resetCalc() {
    const tipAmountTitle = document.querySelector('.tip-amount__result')
    const tipAmountTotalTitle = document.querySelector('.total__result')

    tipAmountTitle.innerText = `$0.00`
    tipAmountTotalTitle.innerText = `$0.00`
    billInput.node.value = ''
    numPeopleInput.node.value = ''

    btnsPercentage.forEach(element => {
        if(element.node.classList.contains('tip-percentage-active')) {
            element.node.classList.remove('tip-percentage-active')
        }
    })

    six.node.value = ''
    
    const btnReset = document.querySelector('#reset-calculator')

    if (btnReset.classList.contains('btn-active')) {
        tipPercentage = 0
        btnReset.classList.remove('btn-active') 
        btnReset.classList.add('btn-desactivated')
    }
}


