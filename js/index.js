const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const payment1El = document.querySelector("#payment1");
const payment2El = document.querySelector("#payment2");
const feeEl = document.querySelector("#fee");
const calcEl = document.querySelector("#calc");

//console.log(amountEl, yearsEl, rateEl, payment2El, payment1El, feeEl, calcEl);

//監聽(元件,function)
calcEl.addEventListener("click", calcloan);

function calcloan() {
    let amount = amountEl.value * 10000;
    let years = yearsEl.value;
    let rate = rateEl.value / 100;
    let fee = feeEl.checked ? 5000 : 0
    let payment1 = payment1El.checked ? 1 : 0
    //利息
    let totalInterest = amount * rate * years;
    document.querySelector(".totalInterest").innerText = totalInterest + "元";

    //總金額
    let totalAmount = amount + totalInterest + fee;
    document.querySelector(".totalAmount").innerText = totalAmount + "元" + (fee == 0 ? "" : "(含手續費)");

    const resultEl = document.querySelector("#result");

    resultEl.style.display = "none";
    setTimeout(function () {
        //將預設區塊為none，當初現值時會變成block(跳出)
        resultEl.style.display = "block";
    }, 100)


    //console.log(amount, years, rate, fee, payment1, totalInterest, totalAmount);
}
