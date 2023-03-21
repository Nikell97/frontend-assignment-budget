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

            updateDiagramAfterYear: false,

            selectedYearIndex: 0,

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

            currentMonthList: [
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
                localStorage.deleteItem('savedList');
            }

            for (let expenseListItem of this.expenseList) {
                let expenseDate = expenseListItem.date.split('-'); // splits date string at - and puts the values in an array
                let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
                let parsedAmount = parseFloat(expenseListItem.amount); // have to parse expense.amount otherwise later use of += will concat instead of add

                this.findYears();

                let expenseYear = expenseDate[0]; // This puts the expenses on the right year.
                const index = this.yearList.findIndex(item => item.year === expenseYear);
                this.currentYearListIndex = index;

                this.updateDiagram(expenseMonth, parsedAmount, this.currentYearListIndex, true)
            }
            this.sortHandler();
            this.currentYearListIndex = 0;
            this.updateDiagram(0, 0, this.currentYearListIndex, true)
        }
    },
    methods: {
        saveInLocal() {
            const parsedList = JSON.stringify(this.expenseList);
            localStorage.setItem('savedList', parsedList)
        },
        addData() {
            //Push data into the site with a button press.
            const data = [
                { category: "Bread", amount: 2000, date: "2023-01-15", hidden: false },
                { category: "Cookies", amount: 5000, date: "2023-02-15", hidden: false },
                { category: "Tea", amount: 3000, date: "2023-05-15", hidden: false },
                { category: "Book", amount: 2500, date: "2022-10-15", hidden: false },
                { category: "Pencile", amount: 1600, date: "2020-08-15", hidden: false },
                { category: "Paper", amount: 1300, date: "2020-06-15", hidden: false },
                { category: "Comic sans rights", amount: 200000, date: "2021-07-15", hidden: false },
            ]
            for (const dataOBJ of data) {
                let expenseObject = {
                    category: dataOBJ.category,
                    amount: dataOBJ.amount,
                    date: dataOBJ.date,
                    hidden: dataOBJ.hidden
                };
                this.expenseList.push(expenseObject);
                this.saveInLocal();

                this.sortHandler();
                this.findYears();
                this.monthDiagram(expenseObject);
            }
            this.currentYearListIndex = 0;
            this.updateDiagram(0, 0, this.currentYearListIndex, true)
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
                date: this.dateText,
                hidden: false
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
        // activates relevant sort function when activeTab, the variable that tracks how the list is sorted, is changed
        sortHandler() {
            if (this.activeTab == "category") {
                this.sortByCategory();
            }
            else if (this.activeTab == "amount") {
                this.sortByAmount();
            }
            else {
                this.sortByDate();
            }
        },
        sortByCategory() {
            // Sorts Catagory alphabetically from A-Z
            this.expenseList.sort((e1, e2) => e1.category > e2.category ? 1 : -1);
            this.activeTab = "category";
        },
        sortByAmount() {
            // Sorts by amount from highest to lowest
            this.expenseList.sort((e1, e2) => e1.amount < e2.amount ? 1 : -1);
            this.activeTab = "amount";
        },
        sortByDate() {
            // Sorts by date from newest to oldest
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
            this.updateDiagram(0, 0, this.currentYearListIndex, true);
            this.filterByYear();
        },
        // filters the displayed list of expenses by the year currently chosen in the drop down menu
        // uses the dynamic class feature in Vue to add a class to an object based on a condition, in this case whether hidden is true or false
        // class is then hidden by setting display: none in CSS
        filterByYear() {
            for (expense of this.expenseList) {
                let expenseDate = expense.date.split('-');
                let expenseYear = expenseDate[0];
                let viewedDate = this.yearList[this.currentYearListIndex].year.split('-');
                let viewedYear = viewedDate[0];
                if (this.currentYearListIndex === 0) { // currentYearListIndex 0 is All in dropdown list
                    expense.hidden = false;
                }
                else if (expenseYear === viewedYear) {
                    expense.hidden = false;
                }
                else {
                    expense.hidden = true;
                }
            }
        },
        monthDiagram(expenseObject) {
            let expenseDate = expenseObject.date.split('-'); // splits date string at - and puts the values in an array
            let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
            let parsedAmount = parseFloat(expenseObject.amount); // have to parse expense.amount otherwise later use of += will concat instead of add

            let expenseYear = expenseDate[0]; // This puts the expenses on the right year.
            const index = this.yearList.findIndex(item => item.year === expenseYear);
            this.currentYearListIndex = index;

            this.updateDiagram(expenseMonth, parsedAmount, 0, true) // This is to add the expense to the "All" category.
            this.updateDiagram(expenseMonth, parsedAmount, this.currentYearListIndex, true)
        },
        updateDiagram(expenseMonth, parsedAmount, yearListIndex, updateDiagramAfterYear) {

            if (yearListIndex === 0) {
                //This for loop blocks a bug where data is added to the universalMonthList when there shouldent by zeroing all the "amount"s in it.
                for (let i = 0; i < this.universalMonthList.length; i++) {
                    this.universalMonthList[i].amount = 0;
                }
                this.currentMonthList = this.universalMonthList;

                //Goes through all the amounts in every month object in year objects in the year list and combines them.
                // Loop through each year object in yearList
                for (const yearOBJ of this.yearList) {
                    // Check if the current year is "All"
                    if (yearOBJ.year != "All") {
                        // Loop through each month object in the current year's monthList
                        for (const monthOBJ of yearOBJ.monthList) {
                            // Get the index of the current month in the monthIndex array
                            const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(monthOBJ.name);
                            // If the month is found in the monthIndex array
                            if (monthIndex >= 0) {
                                // Add the current month's amount to the corresponding element in currentMonthList
                                this.currentMonthList[monthIndex].amount += monthOBJ.amount;
                            }
                        }
                    }
                }
            }
            //Adds the amounts to their respective years.
            else {
                this.currentMonthList = this.yearList[yearListIndex].monthList;

                //Zero is used to update which list to show in the diagram.
                if (expenseMonth != 0) {
                    const i = parseInt(expenseMonth) - 1; // Subtract 1 from the month number to get the zero-based index
                    this.currentMonthList[i].amount += parsedAmount;
                }

                this.yearList[yearListIndex].monthList = this.currentMonthList;
            }
            if (updateDiagramAfterYear) {
                this.updateDiagram(0, 0, this.currentYearListIndex, false)
                this.filterByYear();
                this.selectedYearIndex = this.currentYearListIndex;
            }
        },
    }
}).mount('#app');