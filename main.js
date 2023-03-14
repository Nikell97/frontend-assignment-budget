Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "category",
            expenseList: [],
            categoryText: "",
            amountText: "",
            dateText: "",
            showEmptyFieldsPopup: false
        }
    },
    methods: {
        // Enter all methods/functions here
        addExpense(){
            if (this.categoryText == "" || this.amountText == "" || this.dateText == "") {
                this.showEmptyFieldsPopup = true;
                return; // There has to be something in all input fields for an item to be created.
            }
            this.showEmptyFieldsPopup = false;

            let expenseObject = {
                category: this.categoryText,
                amount: this.amountText,
                date: this.dateText
            };
            this.expenseList.push(expenseObject);
            this.categoryText = "";
            this.amountText = "";
            this.dateText = "";

            this.sortHandler();
        },
        deleteExpense(index) {
            this.expenseList.splice(index, 1);
        },
        sortHandler() {
            if (this.activeTab == "category"){
                this.sortByCategory();
            }
            else if (this.activeTab == "amount"){
                this.sortByAmount();
            }
            else {
                this.sortByMonth();
            }
        },
        sortByCategory() {
            // Add sorting logic here
            this.expenseList.sort((e1, e2) => e1.category > e2.category ? 1 : -1);
            this.activeTab = "category";
        },
        sortByAmount() {
            // Add sorting logic here
            this.expenseList.sort((e1, e2) => e1.amount < e2.amount ? 1 : -1);
            this.activeTab = "amount";
        },
        sortByMonth() {
            // Add sorting logic here
            this.expenseList.sort((e1, e2) => e1.date < e2.date ? 1 : -1);
            this.activeTab = "month";
        },
        clearExpenseList() {
            this.expenseList.splice(0);
        },
        calcTotalExpense() {
            for (let amount of this.expenseList){
                let total = total + amount;
            }
        },
        calcTotalExpenseByMonth() {
            for (let expense of this.expenseList){
                // creates an object/"dictionary" of all the months with a connected numerical value that starts at 0
                const months = {
                    'Jan' : 0,
                    'Feb' : 0,
                    'Mar' : 0,
                    'Apr' : 0,
                    'May' : 0,
                    'Jun' : 0,
                    'Jul' : 0,
                    'Aug' : 0,
                    'Sep' : 0,
                    'Oct' : 0,
                    'Nov' : 0,
                    'Dec' : 0,
                }
                let jan = 0;
                let feb = 0;
                let mar = 0;
                let apr = 0;
                let may = 0;
                let jun = 0;
                let jul = 0;
                let aug = 0;
                let sep = 0;
                let oct = 0;
                let nov = 0;
                let dec = 0;

                let expenseDate = expense.date.split('-');
                let expenseMonth = expenseDate[1];

                if (expenseMonth === "01"){
                    months.Jan += expense.amount;
                }
                else if (expenseMonth === "02"){
                    months.Feb += expense.amount;
                }
                else if (expenseMonth === "03"){
                    mar += expense.amount;
                }
                else if (expenseMonth === "04"){
                    months.Apr += expense.amount;
                }
                else if (expenseMonth === "05"){
                    months.May += expense.amount;
                }
                else if (expenseMonth === "06"){
                    months.Jun += expense.amount;
                }
                else if (expenseMonth === "07"){
                    months.Jul += expense.amount;
                }
                else if (expenseMonth === "08"){
                    months.Aug += expense.amount;
                }
                else if (expenseMonth === "09"){
                    months.Sep += expense.amount;
                }
                else if (expenseMonth === "10"){
                    months.Oct += expense.amount;
                }
                else if (expenseMonth === "11"){
                    months.Nov += expense.amount;
                }
                else if (expenseMonth === "12"){
                    months.Dec += expense.amount;
                }
            }
        }
    }
}).mount('#app');

/*
function drawGraph(){
    const w = 200;
    const h = 200;
    const svg = createSvg(w, h);

    const background = createSvgRect(0, 0, w, h);
    background.style.fill = black;
    svg.append(background);

    const vertical = createSvgRect(w * (5 / 16), 0, w * (2/ 16), h)
}

function createSvg(width, height) {
    const svg = createSvgElement('svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    document.body.append(svg);
    return svg;
}

function createSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}

function createSvgRect(x, y, width, height) {
    const rect = createSvgElement('rect');
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    return rect;
}*/