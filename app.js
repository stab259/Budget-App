/** Select elements **/

var totalEl = document.querySelector(".total__value");

// Category

var categoryPreBtn = document.querySelector(".category__pre-btn");
var categoryNextBtn = document.querySelector(".category__next-btn");

var categoryItemAdd = document.querySelector(".category__item--add");
var categoryFormAdd = document.querySelector(".category__add");

var categoryList = document.querySelector(".category__list");
var categoryItem = document.querySelector(".category__item");
var createList = document.querySelector(".create__list");

var categoryItems = document.querySelectorAll(".category__item");
var categoryFormItems = document.querySelectorAll(".category-item__create-box");

var cancelCategory = document.querySelector(".create--no");
var addCategory = document.querySelector(".create--yes");

var incomeList = document.querySelector(".income__list");
var costList = document.querySelector(".cost__list");

var incmListBox = document.querySelector(".incm__list-box");
var cstListBox = document.querySelector(".cst__list-box");

// Variables
var ENTRY_LIST, INCOME_LIST, COST_LIST, CATEGORY_LIST;
var balance = 0, income = 0, outcome = 0;
var current = 0;
var detailCurrent = 0;

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
INCOME_LIST = JSON.parse(localStorage.getItem("income_list")) || [];
COST_LIST = JSON.parse(localStorage.getItem("cost_list")) || [];
CATEGORY_LIST = ["salary", "gift", "friend", "shopping", "cooking", "invoice"];
console.log(INCOME_LIST);
console.log(CATEGORY_LIST);
updateUI();

categoryPreBtn.addEventListener("click", function () {
    current--;
    showCategory();
});

categoryNextBtn.addEventListener("click", function () {
    current++;
    showCategory();
});

function showCategory() {
    if (current > categoryItems.length - 5) {
        current = categoryItems.length - 5;
    }
    if (current < 0) {
        current = 0;
    }
    categoryItems.forEach((item, index) => {
        if (index >= current && index < current + 5) {
            show(item);
        } else {
            hide(item);
        }
    })
    if (current == 0) {
        disableBtn(categoryPreBtn);
        enableBtn(categoryNextBtn);
    } else if (current == categoryItems.length - 5) {
        disableBtn(categoryNextBtn);
        enableBtn(categoryPreBtn);
    } else {
        enableBtn(categoryPreBtn);
        enableBtn(categoryNextBtn);
    }
}

function disableBtn(btn) {
    btn.classList.add("disable-btn");
}

function enableBtn(btn) {
    btn.classList.remove("disable-btn");
}

incmListBox.addEventListener("click", function (event) {
    targetBtn = event.target;
    let list;
    if (targetBtn.classList.contains("incm__pre")) {
        detailCurrent--;
        console.log("incm pre");
        list = targetBtn.parentNode.children[1].children[1];
        anotherBtn = targetBtn.parentNode.children[2];
        console.log(list);
        showDetailList(list, targetBtn, anotherBtn);
    } else if (targetBtn.classList.contains("incm__next")) {
        detailCurrent++;
        console.log("incm next");
        list = targetBtn.parentNode.children[1].children[1];
        anotherBtn = targetBtn.parentNode.children[0];
        showDetailList(list, targetBtn, anotherBtn);
    }
})

cstListBox.addEventListener("click", function (event) {
    targetBtn = event.target;
    let list;
    if (targetBtn.classList.contains("cst__pre")) {
        detailCurrent--;
        console.log("cst pre");
        list = targetBtn.parentNode.children[1].children[1];
        anotherBtn = targetBtn.parentNode.children[2];
        console.log(list);
        showDetailList(list, targetBtn, anotherBtn);
    } else if (targetBtn.classList.contains("cst__next")) {
        detailCurrent++;
        console.log("cst next");
        list = targetBtn.parentNode.children[1].children[1];
        anotherBtn = targetBtn.parentNode.children[0];
        showDetailList(list, targetBtn, anotherBtn);
    }
})

function showDetailList(list, btn, anotherBtn) {
    let len = list.children.length;
    let max = Math.ceil(len / 3);
    let min = Math.floor(len / 3);
    if (min == max) min--;
    console.log(max + " " + detailCurrent);
    if (detailCurrent > min) {
        detailCurrent = min;
    }
    if (detailCurrent < 0) {
        detailCurrent = 0;
    }
    for (let i = 0; i < len; i++) {
        console.log(i);
        console.log(list.children[i]);
        if (i >= detailCurrent * 3 && i < detailCurrent * 3 + 3) {
            console.log(list.children[i]);
            show(list.children[i]);
        } else {
            console.log(list.children[i]);
            hide(list.children[i]);
        }
    }

    if (detailCurrent == 0) {
        disableBtn(btn);
        enableBtn(anotherBtn)
    }
    if (detailCurrent == min) {
        disableBtn(btn);
        enableBtn(anotherBtn);
    }
    if (detailCurrent != 0 && detailCurrent != min) {
        enableBtn(btn);
        enableBtn(anotherBtn);
    }
    if (detailCurrent == 0 && detailCurrent == min) {
        disableBtn(btn);
        disableBtn(anotherBtn);
    }
}

categoryFormAdd.addEventListener("click", function (event) {
    let targetBtn = event.target;
    let name;

    if (targetBtn.className === "add--no") {
        while (targetBtn.className !== "add__form") {
            targetBtn = targetBtn.parentNode;
        }
        name = targetBtn.children[0].children[1].children[0];
        console.log(name);
        while (!targetBtn.classList.contains("category__add")) {
            targetBtn = targetBtn.parentNode;
        }
        clearInput([name]);
        hide(targetBtn);
    }
})

categoryFormAdd.addEventListener("click", function (event) {
    let targetBtn = event.target;
    let name;

    if (targetBtn.className === "add--yes") {
        while (targetBtn.className !== "add__form") {
            targetBtn = targetBtn.parentNode;
        }
        name = targetBtn.children[0].children[1].children[0];
        console.log(name);
        CATEGORY_LIST.push(name.value);
        console.log(CATEGORY_LIST);
        while (!targetBtn.classList.contains("category__add")) {
            targetBtn = targetBtn.parentNode;
        }
        addNewCategory(name.value);
        addNewCategoryForm(name.value);
        updateUI();
        clearInput([name]);
        hide(targetBtn);
    }
})

function addNewCategoryForm(name) {
    const entry = `<div class="hide category-item__create-box">
                        <div class="category-item__create">
                            <div class="create__header">
                                Create new: <span class="create__title">${name}</span>
                            </div>
                            <div class="create__form">
                                <div class="form__input-box--half">
                                    <input class="form__input" type="number" id="${name}-amount-input" name="amount" placeholder="0">
                                    <input class="form__input" type="text" id="${name}-title-input" name="title" placeholder="Title">
                                </div>
                                <textarea class="form__textarea" name="description" id="${name}-description-input" cols="30" rows="10"></textarea>
                                <div class="form__input-box">
                                    <div class="form__input-header">Choose type:</div>
                                    <div class="form__input-group">
                                        <input class="form__radio-input" type="radio" name="type" id="${name}-income-yes">
                                        <label class="form__label" for="${name}-income--yes">Is this your income?</label>
                                    </div>
                                    <div class="form__input-group">
                                        <input class="form__radio-input" type="radio" name="type" id="${name}-cost-yes">
                                        <label class="form__label" for="${name}-cost--yes">Is this your cost?</label>
                                    </div>
                                </div>
                                <div class="form__input-box--right">
                                    <div class="create--no">Cancel</div>
                                    <div class="create--yes">Create one</div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    const position = "afterend";
    let preItem = categoryFormItems[categoryFormItems.length - 2];
    preItem.insertAdjacentHTML(position, entry);
    updateQuery();
    console.log(categoryItems);
    console.log(categoryFormItems);
    console.log(categoryFormItems[categoryFormItems.length - 2]);
}

function addNewCategory(name) {
    let cate = ["cooking", "friend", "gift", "invoice", "other", "salary", "shopping"];
    let image = name;
    let ind = 0;
    cate.forEach(item => {
        if (name != item) {
            ind++;
        }
    })
    if (ind == cate.length) {
        image = "random";
    }
    const entry = `<div class="category__item">
                        <div class="category-item__shape"><img src="./img/${image}.png" alt="${name}" class="category-item__image"></div>
                        <div class="category-item__title">${name}</div>
                    </div>`;

    const position = "afterend";
    let preItem = categoryItems[categoryItems.length - 2];
    hide(categoryItems[categoryItems.length - 2]);
    preItem.insertAdjacentHTML(position, entry);
    updateQuery();
    current++;
    showCategory(current);
}

categoryList.addEventListener("click", function (event) {
    let targetBtn = event.target;
    while (!targetBtn.classList.contains("category__item")) {
        console.log("target" + targetBtn);

        targetBtn = targetBtn.parentNode;
    }
    console.log("target" + targetBtn);
    let parentBtn = targetBtn.parentNode;
    let index = Array.prototype.indexOf.call(parentBtn.children, targetBtn);
    let form = createList.children[index];
    show(form);
})



createList.addEventListener("click", function (event) {
    let targetBtn = event.target;
    let amount, title, description, isIncome, isCost, type, newItem;

    if (targetBtn.className === "create--no") {
        while (targetBtn.className !== "create__form") {
            targetBtn = targetBtn.parentNode;
        }
        amount = targetBtn.children[0].children[0];
        title = targetBtn.children[0].children[1];
        description = targetBtn.children[1];
        isIncome = targetBtn.children[2].children[1].children[0];
        isCost = targetBtn.children[2].children[2].children[0];
        if (isIncome.checked) {
            type = "income";
            isIncome.checked = false;
        } else if (isCost.checked) {
            type = "cost";
            isCost.checked = false;
        }
        while (targetBtn.className !== "category-item__create-box") {
            targetBtn = targetBtn.parentNode;
        }
        clearInput([amount, title, description]);
        hide(targetBtn);
    }
})

createList.addEventListener("click", function (event) {
    let targetBtn = event.target;
    let amount, title, description, isIncome, isCost, type, newItm, newItem, indexItem;
    let categoryName;

    if (targetBtn.className === "create--yes") {
        while (targetBtn.className !== "create__form") {
            targetBtn = targetBtn.parentNode;
        }
        amount = targetBtn.children[0].children[0];
        title = targetBtn.children[0].children[1];
        description = targetBtn.children[1];
        isIncome = targetBtn.children[2].children[1].children[0];
        isCost = targetBtn.children[2].children[2].children[0];
        if (isIncome.checked) {
            type = "income";
            isIncome.checked = false;
        } else if (isCost.checked) {
            type = "cost";
            isCost.checked = false;
        }
        if (!amount.value || !title.value || !description.value || !type) return;
        targetBtn = targetBtn.parentNode;
        categoryName = targetBtn.children[0].children[0];
        let d = new Date();
        console.log(d);
        console.log(d.getUTCDay());
        let weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thur";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        let month = new Array(12);
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        time = weekday[d.getUTCDay()] + " " + month[d.getUTCMonth()] + " " + d.getUTCDate() + " " + d.getUTCFullYear();
        newItm = {
            category: categoryName.innerHTML,
            type: type,
            amount: parseInt(amount.value),
            title: title.value,
            description: description.value,
            time: time
        }

        ENTRY_LIST.push(newItm);
        console.log(newItm);

        newItem = {
            total: newItm.amount,
            category: categoryName.innerHTML,
            time: time
        }

        if (type == "income") {
            INCOME_LIST.forEach((element, index) => {
                if (element.category == newItm.category) {
                    newItem.total += element.total;
                    INCOME_LIST.splice(index, 1);
                }
            })
            INCOME_LIST.push(newItem);
            console.log(INCOME_LIST);
        } else if (type == "cost") {
            COST_LIST.forEach((element, index) => {
                if (element.category == newItm.category) {
                    newItem.total += element.total;
                    COST_LIST.splice(index, 1);
                }
            })
            COST_LIST.push(newItem);
        }

        while (targetBtn.className !== "category-item__create-box") {
            targetBtn = targetBtn.parentNode;
        }
        updateUI();
        clearInput([amount, title, description]);
        hide(targetBtn);
    }
})

function show(element) {
    element.classList.remove("hide");
}

function hide(element) {
    element.classList.add("hide");
}

function clearInput(inputs) {
    inputs.forEach(input => {
        input.value = "";
    })
}


function updateUI() {
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("cost", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income, outcome));

    let sign = (income >= outcome) ? "$" : "-$";

    totalEl.innerHTML = sign + balance;
    console.log("hello");
    console.log(ENTRY_LIST);
    console.log("HI");

    clearElement([incomeList, costList, incmListBox, cstListBox]);

    let box;
    INCOME_LIST.forEach((entry, index) => {
        showIncome(incomeList, entry.category, entry.total, entry.time);
        box = incomeList.parentNode.children[2];
        showIncmBox(box, entry.total, entry.category, index);
    })

    COST_LIST.forEach((entry, index) => {
        showCost(costList, entry.category, entry.total, entry.time);
        box = costList.parentNode.children[2];
        showCstBox(box, entry.total, entry.category, index);
    })
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
    localStorage.setItem("income_list", JSON.stringify(INCOME_LIST));
    localStorage.setItem("cost_list", JSON.stringify(COST_LIST));
}

incomeList.addEventListener("click", function (event) {
    let targetBtn = event.target;
    if (targetBtn.classList.contains("income-item__delete") && confirm("delete it")) {
        console.log("delete" + targetBtn);
        while (targetBtn.className !== "income__item") {
            targetBtn = targetBtn.parentNode;
        }
        let parentBtn = targetBtn.parentNode;
        let index = INCOME_LIST.length - 1 - Array.prototype.indexOf.call(parentBtn.children, targetBtn);
        let detail = incmListBox.children[index];
        console.log(INCOME_LIST[index].category);
        removeEntry(INCOME_LIST[index].category, "income");
        INCOME_LIST.splice(index, 1);
        targetBtn.remove();
        detail.remove();
        console.log("remove");
        updateQuery();
        updateUI();
        console.log(ENTRY_LIST);
        console.log(INCOME_LIST);
        console.log(COST_LIST);
    } else {
        if (targetBtn.className == "income-item__image" || targetBtn.className == "income-item__shape") {
            detailCurrent = 0;
            while (targetBtn.className !== "income__item") {
                targetBtn = targetBtn.parentNode;
            }
            let parentBtn = targetBtn.parentNode;
            let index = Array.prototype.indexOf.call(parentBtn.children, targetBtn);
            let detail = incmListBox.children[index];
            console.log(detail);
            console.log(detail.children[0]);
            console.log(detail.children[1]);
            console.log(detail.children[2]);
            let list = detail.children[1].children[1];
            let btn = detail.children[0]
            let anotherBtn = detail.children[2];
            showDetailList(list, btn, anotherBtn);
            show(detail);
        }
    }
})

function removeEntry(category, type) {
    for (let i = 0; i < ENTRY_LIST.length; i++) {
        entry = ENTRY_LIST[i];
        console.log(entry.category);
        console.log(entry.type);
        console.log(entry);
        if (entry.category == category && entry.type == type) {
            console.log("final");
            ENTRY_LIST.splice(i, 1);
            i--;
        }
    }
}

incmListBox.addEventListener("click", function (event) {
    let targetBtn = event.target;

    if (targetBtn.className === "incm__btn") {
        while (targetBtn.className !== "incm__overlay") {
            targetBtn = targetBtn.parentNode;
        }
        hide(targetBtn);
        detailCurrent = 0;
    }
})

function showIncome(list, category, total, time) {
    let cate = ["cooking", "friend", "gift", "invoice", "other", "salary", "shopping"];
    let image = category;
    let ind = 0;
    cate.forEach(item => {
        if (category != item) {
            ind++;
        }
    })
    if (ind == cate.length) {
        image = "random";
    }
    const entry = `<li class="income__item">
                        <i class="fas fa-trash income-item__delete"></i>
                        <div class="income-item__shape">
                            <img src="./img/${image}.png" alt="${category}" class="income-item__image">
                        </div>
                        <div class="income-item__entry">
                            <div class="income-item__title">${category} Income</div>
                            <div class="income-item__total">$${total}</div>
                            <div class="income-item__time">Created at: ${time}</div>
                        </div>
                    </li>`;
    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function showIncmBox(list, total, name, index) {
    const entry = `<div class="hide incm__overlay">
                        <i class="fas fa-arrow-circle-left incm__pre"></i>
                        <div class="incm__container">
                            <div class="incm__header">
                                <div class="incm__total">$${total}</div>
                                <div class="incm__name">${name} income</div>
                            </div>
                            <ul class="incm__list">
                            </ul>
                            <div class="incm__btn">Close</div>
                        </div>
                        <i class="fas fa-arrow-circle-right incm__next"></i>
                    </div>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);

    let incmList = incmListBox.firstElementChild.children[1].children[1];
    ENTRY_LIST.forEach(entry => {
        if (entry.category == name && entry.type == "income") {
            showIncm(incmList, entry.title, entry.amount, entry.description, entry.time);
        }
    })
}

function showIncm(list, title, amount, description, time) {
    const entry = `<li class="incm__item">
                        <div class="incm-item__shape">
                            <img src="./img/calendar.png" alt="incm-photo" class="incm-item__image">
                        </div>
                        <div class="incm-item__entry">
                            <div class="incm-item__title">${title}: <span class="incm-item__amount">$${amount}</span> </div>
                            <div class="incm-item__description">${description}</div>
                            <div class="incm-item__time">Created at: ${time}</div>
                        </div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

costList.addEventListener("click", function (event) {
    let targetBtn = event.target;
    if (targetBtn.classList.contains("cost-item__delete") && confirm("Do you want to delete it permanently?")) {
        console.log("delete" + targetBtn);
        while (targetBtn.className !== "cost__item") {
            targetBtn = targetBtn.parentNode;
        }
        let parentBtn = targetBtn.parentNode;
        let index = COST_LIST.length - 1 - Array.prototype.indexOf.call(parentBtn.children, targetBtn);
        let detail = cstListBox.children[index];
        console.log(COST_LIST[index].category);
        removeEntry(COST_LIST[index].category, "cost");
        COST_LIST.splice(index, 1);
        targetBtn.remove();
        detail.remove();
        console.log("remove");
        updateQuery();
        updateUI();
        console.log(ENTRY_LIST);
        console.log(INCOME_LIST);
        console.log(COST_LIST);
    } else {
        if (targetBtn.className == "cost-item__image" || targetBtn.className == "cost-item__shape") {
            detailCurrent = 0;
            while (targetBtn.className !== "cost__item") {
                targetBtn = targetBtn.parentNode;
            }
            let parentBtn = targetBtn.parentNode;
            let index = Array.prototype.indexOf.call(parentBtn.children, targetBtn);
            let detail = cstListBox.children[index];
            console.log(detail);
            console.log(detail.children[0]);
            console.log(detail.children[1]);
            console.log(detail.children[2]);
            let list = detail.children[1].children[1];
            let btn = detail.children[0]
            let anotherBtn = detail.children[2];
            showDetailList(list, btn, anotherBtn);
            show(detail);
        }
    }
})

cstListBox.addEventListener("click", function (event) {
    let targetBtn = event.target;

    if (targetBtn.className === "cst__btn") {
        while (targetBtn.className !== "cst__overlay") {
            targetBtn = targetBtn.parentNode;
        }
        hide(targetBtn);
        detailCurrent = 0;
    }
})

function showCost(list, category, total, time) {
    let cate = ["cooking", "friend", "gift", "invoice", "other", "salary", "shopping"];
    let image = category;
    let ind = 0;
    cate.forEach(item => {
        if (category != item) {
            ind++;
        }
    })
    if (ind == cate.length) {
        image = "random";
    }
    const entry = `<li class="cost__item">
                        <i class="fas fa-trash cost-item__delete"></i>
                        <div class="cost-item__shape">
                            <img src="./img/${image}.png" alt="${category}" class="cost-item__image">
                        </div>
                        <div class="cost-item__entry">
                            <div class="cost-item__title">${category} Cost</div>
                            <div class="cost-item__total">$${total}</div>
                            <div class="cost-item__time">Created at: ${time}</div>
                        </div>
                    </li>`;
    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function showCstBox(list, total, name, index) {
    const entry = `<div class="hide cst__overlay">
                        <i class="fas fa-arrow-circle-left cst__pre"></i>
                        <div class="cst__container">
                            <div class="cst__header">
                                <div class="cst__total">$${total}</div>
                                <div class="cst__name">${name} cost</div>
                            </div>
                            <ul class="cst__list">
                            </ul>
                            <div class="cst__btn">Close</div>
                        </div>
                        <i class="fas fa-arrow-circle-right cst__next"></i>
                    </div>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);

    let cstList = cstListBox.firstElementChild.children[1].children[1];
    ENTRY_LIST.forEach(entry => {
        if (entry.category == name && entry.type == "cost") {
            showCst(cstList, entry.title, entry.amount, entry.description, entry.time);
        }
    })
}

function showCst(list, title, amount, description, time) {
    const entry = `<li class="cst__item">
                        <div class="cst-item__shape">
                            <img src="./img/calendar.png" alt="cst-photo" class="cst-item__image">
                        </div>
                        <div class="cst-item__entry">
                            <div class="cst-item__title">${title}: <span class="cst-item__amount">$${amount}</span> </div>
                            <div class="cst-item__description">${description}</div>
                            <div class="cst-item__time">Created at: ${time}</div>
                        </div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function calculateTotal(type, list) {
    let sum = 0;

    list.forEach(entry => {
        if (entry.type == type) {
            sum += entry.amount;
        }
    })

    return sum;
}

function calculateBalance(income, outcome) {
    return income - outcome;
}

function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    })
}


function updateQuery() {
    totalEl = document.querySelector(".total__value");

    categoryPreBtn = document.querySelector(".category__pre-btn");
    categoryNextBtn = document.querySelector(".category__next-btn");

    categoryItemAdd = document.querySelector(".category__item--add");
    categoryFormAdd = document.querySelector(".category__add");

    categoryList = document.querySelector(".category__list");
    categoryItem = document.querySelector(".category__item");
    createList = document.querySelector(".create__list");

    categoryItems = document.querySelectorAll(".category__item");
    categoryFormItems = document.querySelectorAll(".category-item__create-box");

    cancelCategory = document.querySelector(".create--no");
    addCategory = document.querySelector(".create--yes");

    incomeList = document.querySelector(".income__list");
    costList = document.querySelector(".cost__list");

    incmListBox = document.querySelector(".incm__list-box");
    cstListBox = document.querySelector(".cst__list-box");
}

