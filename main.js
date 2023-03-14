Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "month",
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
        sortByCategory() {
            // Add sorting logic here
        },
        sortByExpense() {
            // Add sorting logic here
        },
        sortByMonth() {
            // Add sorting logic here
        },
        clearExpenseList() {
            this.expenseList.splice(0);
        }
    }
}).mount('#app');