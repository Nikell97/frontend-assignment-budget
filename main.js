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
            if (!this.dateText) {
                return; // exit early if dateText is undefined
            }
            
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
    }
}).mount('#app');