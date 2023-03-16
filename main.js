Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "category",

            expenseList: [],
            categoryText: "",
            amountText: "",
            dateText: "",
            showEmptyFieldsPopup: false,

            monthList: [
                { name: "Jan", amount: 0, textAmountPos: 14, },
                { name: "Feb", amount: 0, textAmountPos: 0, },
                { name: "Mar", amount: 0, textAmountPos: 14, },
                { name: "Apr", amount: 0, textAmountPos: 0, },
                { name: "May", amount: 0, textAmountPos: 14, },
                { name: "Jun", amount: 0, textAmountPos: 0, },
                { name: "Jul", amount: 0, textAmountPos: 14, },
                { name: "Aug", amount: 0, textAmountPos: 0, },
                { name: "Sep", amount: 0, textAmountPos: 14, },
                { name: "Oct", amount: 0, textAmountPos: 0, },
                { name: "Nov", amount: 0, textAmountPos: 14, },
                { name: "Dec", amount: 0, textAmountPos: 0, }
            ],
        }
    },
    created() {
        if (localStorage.getItem('savedList')) {
            try {
                this.expenseList = JSON.parse(localStorage.getItem('savedList'));
            } catch (e) {
                localStorage.deleteExpense('savedList');
            }

            for (let expense of this.expenseList) {
                let expenseDate = expense.date.split('-'); // splits date string at - and puts the values in an array
                let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
                let parsedAmount = parseFloat(expense.amount); // have to parse expense.amount otherwise later use of += will concat instead of add
    
                if (expenseMonth === "01") {
                    this.monthList[0].amount += parsedAmount;
                }
                else if (expenseMonth === "02") {
                    this.monthList[1].amount += parsedAmount;
                }
                else if (expenseMonth === "03") {
                    this.monthList[2].amount += parsedAmount;
                }
                else if (expenseMonth === "04") {
                    this.monthList[3].amount += parsedAmount;
                }
                else if (expenseMonth === "05") {
                    this.monthList[4].amount += parsedAmount;
                }
                else if (expenseMonth === "06") {
                    this.monthList[5].amount += parsedAmount;
                }
                else if (expenseMonth === "07") {
                    this.monthList[6].amount += parsedAmount;
                }
                else if (expenseMonth === "08") {
                    this.monthList[7].amount += parsedAmount;
                }
                else if (expenseMonth === "09") {
                    this.monthList[8].amount += parsedAmount;
                }
                else if (expenseMonth === "10") {
                    this.monthList[9].amount += parsedAmount;
                }
                else if (expenseMonth === "11") {
                    this.monthList[10].amount += parsedAmount;
                }
                else if (expenseMonth === "12") {
                    this.monthList[11].amount += parsedAmount;
                }
            }
            this.sortHandler();
        }
    },
    methods: {
        // Enter all methods/functions here
        saveInLocal() {
            const parsedList = JSON.stringify(this.expenseList);
            localStorage.setItem('savedList', parsedList)
        },
        addExpense() {
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
            this.saveInLocal();
            this.categoryText = "";
            this.amountText = "";
            this.dateText = "";

            this.sortHandler();
            this.monthDiagram();
        },
        deleteExpense(index) {
            // This updates the diagram when a expense is deleted.
            let date = this.expenseList[index].date.split("-");
            let monthIndex = parseInt(date[1]-1);
            this.monthList[monthIndex].amount -= (this.expenseList[index].amount);

            this.expenseList.splice(index, 1);
            this.saveInLocal();
        },
        sortHandler() {
            if (this.activeTab == "category") {
                this.sortByCategory();
            }
            else if (this.activeTab == "amount") {
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
            let total = 0;
            for (let expense of this.expenseList) {
                let parsedAmount = parseInt(expense.amount);
                total += parsedAmount;
            }
            return total;
        },
        monthDiagram() {
            let last = 0; // This exsist so that we can get the last object in the list.
            for (let i = 1; i < this.expenseList.length; i++) {
                last += 1;
            }
            
            let expenseDate = this.expenseList[last].date.split('-'); // splits date string at - and puts the values in an array
            let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
            let parsedAmount = parseFloat(this.expenseList[last].amount); // have to parse expense.amount otherwise later use of += will concat instead of add

            if (expenseMonth === "01") {
                this.monthList[0].amount += parsedAmount;
            }
            else if (expenseMonth === "02") {
                this.monthList[1].amount += parsedAmount;
            }
            else if (expenseMonth === "03") {
                this.monthList[2].amount += parsedAmount;
            }
            else if (expenseMonth === "04") {
                this.monthList[3].amount += parsedAmount;
            }
            else if (expenseMonth === "05") {
                this.monthList[4].amount += parsedAmount;
            }
            else if (expenseMonth === "06") {
                this.monthList[5].amount += parsedAmount;
            }
            else if (expenseMonth === "07") {
                this.monthList[6].amount += parsedAmount;
            }
            else if (expenseMonth === "08") {
                this.monthList[7].amount += parsedAmount;
            }
            else if (expenseMonth === "09") {
                this.monthList[8].amount += parsedAmount;
            }
            else if (expenseMonth === "10") {
                this.monthList[9].amount += parsedAmount;
            }
            else if (expenseMonth === "11") {
                this.monthList[10].amount += parsedAmount;
            }
            else if (expenseMonth === "12") {
                this.monthList[11].amount += parsedAmount;
            }
        }
    }
}).mount('#app');