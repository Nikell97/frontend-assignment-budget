Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "month",
            expenseList: [],
            categoryText: "",
            amountText: "",
            dateText: "",

        }
    },
    methods: {
        // Enter all methods/functions here
        addExpense(){
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
        }
    }
}).mount('#app');