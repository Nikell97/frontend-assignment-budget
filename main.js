Vue.createApp({
    data() {
        return {
            // Enter data here
            activeTab: "month",
        }
    },
    methods: {
        // Enter all methods/functions here
        addExpense(){
            let expenseObject = {
                category: this.categoryText,
                //expense: this.expenseText,
                //date: this.dateText
            };
            this.expenseList.push(expenseObject);
            this.categoryText = "";
            this.expenseText = "";
            this.dateText = "";
        },
    }
}).mount('#app');