Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "category",
            currentYearListIndex: 0,

            expenseList: [],
            categoryText: "",
            amountText: "",
            dateText: "",
            showEmptyFieldsPopup: false,

            universalMonthList: [
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

            yearList: [
                {
                    year: "All", monthList: [
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
                    ]
                }],

            currMonthList: [
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
            // checks for errors, which would indicate corrupted data, and deletes it if a problem occurs
            try {
                this.expenseList = JSON.parse(localStorage.getItem('savedList'));
            } catch (e) {
                localStorage.deleteExpense('savedList');
            }

            for (let expenseListItem of this.expenseList) {
                let expenseDate = expenseListItem.date.split('-'); // splits date string at - and puts the values in an array
                let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
                let parsedAmount = parseFloat(expenseListItem.amount); // have to parse expense.amount otherwise later use of += will concat instead of add

                this.findYears();

                let expenseYear = expenseDate[0]; // This puts the expenses on the right year.
                const index = this.yearList.findIndex(item => item.year === expenseYear);
                this.currentYearListIndex = index;

                this.updateDiagram(expenseMonth, parsedAmount, this.currentYearListIndex)
            }
            this.sortHandler();
            this.currentYearListIndex = 0;
            this.updateDiagram(0, 0, this.currentYearListIndex)
        }
    },
    methods: {
        // Enter all methods/functions here
        saveInLocal() {
            const parsedList = JSON.stringify(this.expenseList);
            localStorage.setItem('savedList', parsedList)
        },
        addData() {
            //Push data into the site with a button press.
            const data = [
                { category: "Bread", amount: 2000, date: "2023-01-15" },
                { category: "Cookies", amount: 5000, date: "2023-02-15" },
                { category: "Tea", amount: 3000, date: "2023-05-15" },
                { category: "Book", amount: 2500, date: "2022-10-15" },
                { category: "Pencile", amount: 1600, date: "2020-08-15" },
                { category: "Paper", amount: 1300, date: "2020-06-15" },
                { category: "Comic sans rights", amount: 200000, date: "2021-07-15" },
            ]
            for (const dataOBJ of data) {
                let expenseObject = {
                    category: dataOBJ.category,
                    amount: dataOBJ.amount,
                    date: dataOBJ.date
                };
                this.expenseList.push(expenseObject);
                this.saveInLocal();

                this.sortHandler();
                this.findYears();
                this.monthDiagram(expenseObject);
            }
            this.currentYearListIndex = 0;
            this.updateDiagram(0, 0, this.currentYearListIndex)
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

            this.sortHandler();
            this.findYears();
            this.monthDiagram(expenseObject);

            this.categoryText = "";
            this.amountText = "";
            this.dateText = "";
        },
        deleteExpense(index) {
            // This updates the diagram when a expense is deleted.
            let date = this.expenseList[index].date.split("-");
            let monthIndex = parseInt(date[1] - 1);
            this.universalMonthList[monthIndex].amount -= (this.expenseList[index].amount);

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
            for (let i = 0; i < this.universalMonthList.length; i++) {
                this.universalMonthList[i].amount = 0;
            }

            this.yearList.splice(1) // Empties the drop down box except the "all" option.
            this.expenseList.splice(0);
            this.saveInLocal();
        },
        calcTotalExpense() {
            let total = 0;
            for (let expense of this.expenseList) {
                let parsedAmount = parseInt(expense.amount);
                total += parsedAmount;
            }
            return total;
        },
        // detects if there is an entry in expenseList with a year that hasn't previously been entered and adds it to yearList
        findYears() {
            for (let expense of this.expenseList) {
                let dateArray = expense.date.split('-');
                let expenseYear = dateArray[0];
                if (!this.yearList.some(y => y['year'] === expenseYear)) {
                    let yearObject = {
                        year: expenseYear,
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
                    this.yearList.push(yearObject);
                }
            }
        },
        currentYearListChange(event) {
            this.currentYearListIndex = event.target.selectedIndex;
            this.updateDiagram(0, 0, this.currentYearListIndex);
        },
        monthDiagram(expenseObject) {
            let expenseDate = expenseObject.date.split('-'); // splits date string at - and puts the values in an array
            let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
            let parsedAmount = parseFloat(expenseObject.amount); // have to parse expense.amount otherwise later use of += will concat instead of add

            let expenseYear = expenseDate[0]; // This puts the expenses on the right year.
            const index = this.yearList.findIndex(item => item.year === expenseYear);
            this.currentYearListIndex = index;

            this.updateDiagram(expenseMonth, parsedAmount, 0) // This is to add the expense to the "All" category.
            this.updateDiagram(expenseMonth, parsedAmount, this.currentYearListIndex)
        },
        updateDiagram(expenseMonth, parsedAmount, yearListIndex) {
            // When switching tabs, the current shown diagram is differant. But the "amount" does not get put on the right year. 
            // Should be put in "All" and their own respectiv year.
            // The if statement descides if the current diagram shall show all the expenses or only for the selected year.

            if (yearListIndex === 0) {
                //This for loop blocks a bug where data is added to the universalMonthList when there shouldent by zeroing all the "amount"s in it.
                for (let i = 0; i < this.universalMonthList.length; i++) {
                    this.universalMonthList[i].amount = 0;
                }
                this.currMonthList = this.universalMonthList;
                
                //Goes through all the amounts in every month object in year objects in the year list and combines them.
                for (const yearOBJ of this.yearList) {
                    if (yearOBJ.year === "All") {}
                    else {      
                        for (const monthOBJ of yearOBJ.monthList) {
                            if (monthOBJ.name === "Jan") {
                                this.currMonthList[0].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Feb") {
                                this.currMonthList[1].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Mar") {
                                this.currMonthList[2].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Apr") {
                                this.currMonthList[3].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "May") {
                                this.currMonthList[4].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Jun") {
                                this.currMonthList[5].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Jul") {
                                this.currMonthList[6].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Aug") {
                                this.currMonthList[7].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Sep") {
                                this.currMonthList[8].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Oct") {
                                this.currMonthList[9].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Nov") {
                                this.currMonthList[10].amount += monthOBJ.amount;
                            }
                            else if (monthOBJ.name === "Dec") {
                                this.currMonthList[11].amount += monthOBJ.amount;
                            }
                        }
                    }
                }
            }
            //Adds the amounts to their respective years.
            else {
                this.currMonthList = this.yearList[yearListIndex].monthList;

                if (expenseMonth === "01") {
                    this.currMonthList[0].amount += parsedAmount;
                }
                else if (expenseMonth === "02") {
                    this.currMonthList[1].amount += parsedAmount;
                }
                else if (expenseMonth === "03") {
                    this.currMonthList[2].amount += parsedAmount;
                }
                else if (expenseMonth === "04") {
                    this.currMonthList[3].amount += parsedAmount;
                }
                else if (expenseMonth === "05") {
                    this.currMonthList[4].amount += parsedAmount;
                }
                else if (expenseMonth === "06") {
                    this.currMonthList[5].amount += parsedAmount;
                }
                else if (expenseMonth === "07") {
                    this.currMonthList[6].amount += parsedAmount;
                }
                else if (expenseMonth === "08") {
                    this.currMonthList[7].amount += parsedAmount;
                }
                else if (expenseMonth === "09") {
                    this.currMonthList[8].amount += parsedAmount;
                }
                else if (expenseMonth === "10") {
                    this.currMonthList[9].amount += parsedAmount;
                }
                else if (expenseMonth === "11") {
                    this.currMonthList[10].amount += parsedAmount;
                }
                else if (expenseMonth === "12") {
                    this.currMonthList[11].amount += parsedAmount;
                }
                
                this.yearList[yearListIndex].monthList = this.currMonthList;
            }
        },
    }
}).mount('#app');