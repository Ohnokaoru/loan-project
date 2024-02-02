const amountEl = document.querySelector("#amount");
const yearsEl = document.querySelector("#years");
const rateEl = document.querySelector("#rate");
const payment1El = document.querySelector("#payment1");
const payment2El = document.querySelector("#payment2");
const feeEl = document.querySelector("#fee");
const calcEl = document.querySelector("#calc");
const tableEl = document.querySelector("#table tbody");



console.log(amountEl, yearsEl, rateEl, payment2El, payment1El, feeEl, calcEl, tableEl);

//監聽(元件,function)
calcEl.addEventListener("click", calcloan);

function calcloan() {
    let amount = amountEl.value * 10000;
    let years = yearsEl.value;
    let rate = rateEl.value;
    let fee = feeEl.checked ? 5000 : 0;
    let rule = payment2El.checked ? 1 : 2;

    let result;
    if (rule == 1) {
        result = rule1(amount, years, rate);
        console.log(result);
    } else {
        //result=rule2
        alert("本息攤還製作中");
        return;
    }

    //總利息
    let totalInterest = result[1];
    //總金額
    let totalAmount = amount + totalInterest + fee;
    console.log(amount, years, rate, fee, rule, totalInterest, totalAmount);
    document.querySelector(".totalInterest").innerText = totalInterest + "元";
    document.querySelector(".totalAmount").innerText = totalAmount + "元" + (fee == 0 ? "" : "(含手續費)");

    const resultEl = document.querySelector("#result");
    resultEl.style.display = "none";
    setTimeout(function () {
        //將預設區塊為none，當初現值時會變成block(跳出)
        resultEl.style.display = "block";
    }, 100)

    drawTable(result[0])
}

function drawTable(datas) {
    let tableStr = "";
    //外迴圈控制tr
    for (let i = 0; i < datas.length; i++) {
        //內迴圈控制td
        tableStr += "<tr>";
        for (let j = 0; j < datas[i].length; j++) {
            tableStr += `<td>${datas[i][j]}</td>`;

        }
        tableStr += "</tr>";
    }
    tableEl.innerHTML = tableStr
    // let tableStr = "<ul>";
    // for (let i = 0; i < datas.length; i++) {
    //     console.log(datas[i].join(","));
    //     tableStr += `<li>${datas[i].join(",")}</li>`;
    // }
    // tableStr += "</ul>";
    // console.log(tableStr);

}

function rule1(total_amount, years, rate) {
    let amount = total_amount;
    let period = years * 12;
    let month_pay = parseInt(amount / period);
    let month_rate = rate / 100 / 12;

    let datas = [];
    let totalInterest = 0;
    for (i = 0; i < period; i++) {
        interest = Math.round(amount * month_rate);
        amount -= month_pay;
        // 最後一期
        if (i == period - 1) {
            datas.push([i + 1, month_pay + amount, interest, month_pay + interest, 0]);
        } else {
            // 0 - 59期
            datas.push([i + 1, month_pay, interest, month_pay + interest, amount]);
        }
        totalInterest += interest;
    }
    //console.log(datas);
    return [datas, totalInterest];

}