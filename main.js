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

            yearList: [ 
                {year: "All", monthList: [
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
            ]}],
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

            for (let expense of this.expenseList) {
                let expenseDate = expense.date.split('-'); // splits date string at - and puts the values in an array
                let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
                let parsedAmount = parseFloat(expense.amount); // have to parse expense.amount otherwise later use of += will concat instead of add

                this.updateDiagram(expenseMonth, parsedAmount, this.currentYearListIndex)
            }
            this.sortHandler();
            this.findYears();
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
            this.findYears();
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
            for (let i = 0; i < this.monthList.length; i++) {
                this.monthList[i].amount = 0;
            }
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
        findYears(){
            for (let expense of this.expenseList){
                let dateArray = expense.date.split('-');
                let expenseYear = dateArray[0];
                if (!this.yearList.some(y => y['year'] === expenseYear)){
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
        monthDiagram() {
            let last = 0; // This exsist so that we can get the last object in the list.
            for (let i = 1; i < this.expenseList.length; i++) {
                last += 1;
            }
            
            let expenseDate = this.expenseList[last].date.split('-'); // splits date string at - and puts the values in an array
            let expenseMonth = expenseDate[1]; // fetches value of second index, which is the month, based on the required date input format
            let parsedAmount = parseFloat(this.expenseList[last].amount); // have to parse expense.amount otherwise later use of += will concat instead of add
            
            this.updateDiagram(expenseMonth, parsedAmount, this.currentYearListIndex)
        },
        updateDiagram(expenseMonth, parsedAmount, yearListIndex) {
            // When switching tabs, the current shown diagram is differant. But the "amount" does not get put on the right year. Should be put in "All" and their own respectiv year.
            // Also... the diagram does not work. Y is now NaN for some reason. Worked before.
            if (expenseMonth === "01") {
                this.yearList[yearListIndex].monthList[0].amount += parsedAmount;
            }
            else if (expenseMonth === "02") {
                this.yearList[yearListIndex].monthList[1].amount += parsedAmount;
            }
            else if (expenseMonth === "03") {
                this.yearList[yearListIndex].monthList[2].amount += parsedAmount;
            }
            else if (expenseMonth === "04") {
                this.yearList[yearListIndex].monthList[3].amount += parsedAmount;
            }
            else if (expenseMonth === "05") {
                this.yearList[yearListIndex].monthList[4].amount += parsedAmount;
            }
            else if (expenseMonth === "06") {
                this.yearList[yearListIndex].monthList[5].amount += parsedAmount;
            }
            else if (expenseMonth === "07") {
                this.yearList[yearListIndex].monthList[6].amount += parsedAmount;
            }
            else if (expenseMonth === "08") {
                this.yearList[yearListIndex].monthList[7].amount += parsedAmount;
            }
            else if (expenseMonth === "09") {
                this.yearList[yearListIndex].monthList[8].amount += parsedAmount;
            }
            else if (expenseMonth === "10") {
                this.yearList[yearListIndex].monthList[9].amount += parsedAmount;
            }
            else if (expenseMonth === "11") {
                this.yearList[yearListIndex].monthList[10].amount += parsedAmount;
            }
            else if (expenseMonth === "12") {
                this.yearList[yearListIndex].monthList[11].amount += parsedAmount;
            }
        },
    }
}).mount('#app');