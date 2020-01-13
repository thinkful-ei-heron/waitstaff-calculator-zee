const store = {
  myInfo: {
    numberOfMeals: 0,
    tipTotal: 0,
    averageTip: 0,
    update: function(tip){
      this.numberOfMeals++;
      this.tipTotal= Math.round((this.tipTotal+tip)*100)/100;
      this.averageTip = Math.round(this.tipTotal/this.numberOfMeals*100)/100;
    }
  },
  customerInfo: {
    basePrice: 0,
    taxRate: 0,
    tipPercent: 0,
    subtotal: 0,
    tip: 0,
    total: 0,
    calculate: function(){
      this.subtotal = Math.round(this.basePrice*(1+this.taxRate/100)*100)/100;
      this.tip = Math.round((this.subtotal*(this.tipPercent/100))*100)/100;
      this.total = this.subtotal + this.tip;
    }
  },
  mealArray: [],
  reset: function() {
    this.myInfo.numberOfMeals = 0;
    this.myInfo.tipTotal = 0;
    this.myInfo.averageTip = 0;
    this.customerInfo.basePrice = 0;
    this.customerInfo.taxRate = 0;
    this.customerInfo.tipPercent = 0;
    this.customerInfo.calculate();
  }
};

function onSubmit() {
  $('.mealDetail').on('submit', '#mealDetail', event => {
    event.preventDefault();
    render();
    let currentMeal = Object.assign({}, store.customerInfo);
    storeMeal(currentMeal);
    formReset();
  });
}

function updateCustomerInfo(document) {
  const infoArray = document.serializeArray();
  store.customerInfo.basePrice = infoArray[0].value;
  store.customerInfo.taxRate = infoArray[1].value;
  store.customerInfo.tipPercent = infoArray[2].value;
  store.customerInfo.calculate();
}

function updateMyInfo(){
  store.myInfo.update(store.customerInfo.tip);
}

function storeMeal(currentMeal){
  store.mealArray.push(currentMeal);
}

function updateCustomerCharges(){
  $('.customerCharges').html(
    `
    <h2>Customer Charges</h2>
    <p>Subtotal: ${store.customerInfo.subtotal}</p>
    <p>Tip: ${store.customerInfo.tip}</p>
    <p>Total: ${store.customerInfo.total}</p>
    `
  );
}

function updateMyEarnings(){
  $('.myEarnings').html(
    `
    <h2>My Earnings Info</h2>
    <p>Tip Total: ${store.myInfo.tipTotal}</p>
    <p>Meal count: ${store.myInfo.numberOfMeals}</p>
    <p>Average Tip per Meal: ${store.myInfo.averageTip}</p>
    `
  );
}

function reset(){
  $('.reset').on('click', event => {
    formReset();
    store.reset();
    updateCustomerCharges();
    updateMyEarnings(); 
  });
}

function render(){
  updateCustomerInfo($('#mealDetail'));
  updateMyInfo();
  updateCustomerCharges();
  updateMyEarnings();
}

function formReset(){
  $('.baseMealPrice').val('');
  $('.taxRate').val('');
  $('.tipPercent').val('');
}

onSubmit();
reset();