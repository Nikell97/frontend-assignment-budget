Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "month",
            categoryText: "",
            expenseText: "",
            dateText: "",
            expenseList: [] 
        }
    },
    methods: {
        // Enter all methods/functions here
        addExpense(){
            let expenseObject = {
                category: this.categoryText,
                expense: this.expenseText,
                date: this.dateText
            };
            this.expenseList.push(expenseObject);
            this.categoryText = "";
            this.expenseText = "";
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