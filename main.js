Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "category",
            expenseList: [ {category: "1", amount: "1", date: "1"}],
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
        },
        deleteExpense(index) {
            this.expenseList.splice(index, 1);
        },
        sortHandler() {
            if (this.activeTab == "category"){
                sortByCategory();
            }
            else if (this.activeTab == "amount"){
                sortByAmount();
            }
            else {
                sortByMonth();
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
        }
    }
}).mount('#app');