//Calculations
var obj, age, income, provider, maritalStatus, balance, savingsPerPeriod, payPeriods, retirementAge, rateOfReturn;
// Retrieving data:
obj = JSON.parse(localStorage.getItem("infoJSON"));
//document.getElementById("demo").innerHTML = obj.name;

age = obj.age;
income = obj.annualIncome;
provider = obj.currentProvider;
maritalStatus = obj.maritalStatus;
balance = obj.currentBalance;
savingsPerPeriod = obj.savingsPerPayPeriod;
payPeriods = obj.savingsPerPayPeriod;
retirementAge = obj.retireAge;
rateOfReturn = obj.rateOfReturn;


// Functions
function calcMonthlyIncome(income) {
    return income/12;
}



function calcSavingRate(income, payPeriods, savingsPerPeriod) {
    var payPerPeriod  = income/payPeriods;
    return (savingsPerPeriod/payPerPeriod)*100;
}



function calcInflation(income, retirementAge, age) {
    var avgInflation = 0.025; // average over the past 20 years
    return income + (income*avgInflation)*(retirementAge - age);
}



function calcRetirementMoney(retirementAge, maritalStatus, income, incomeAtRetirement, rateOfReturn) {
    var adjusted = incomeAtRetirement*.80; // adjusted income based on not spending as much after retirement
    var socialAmount; // This is based on an estimated income calculations and if you anticipate living into the 90s. It's also based on male stats due to living less to make it so people can overestimate a little bit on how much they need to save.
    if (maritalStatus === 'Single' || maritalStatus === 'single') { // stats from 2017. Anticipating living till 90, a male and at an age of 47 in 2017 (this gives a rough estimate)
        if (income >= 110000) {
            if (retirementAge <= 65) {
                socialAmount = 2050;
            } else if (retirementAge > 65 && retirementAge < 69) {
                socialAmount = 2929;
            } else {
                socialAmount = 3632;
            }
        } else if (income >= 89000 && income < 110000) {
            if (retirementAge <= 65) {
                socialAmount = 1881;
            } else if (retirementAge > 65 && retirementAge < 69) {
                socialAmount = 2687;
            } else {
                socialAmount = 3332;
            }
        } else if (income >= 70000 && income < 89000) {
            if (retirementAge <= 65) {
                socialAmount = 1706;
            } else if (retirementAge > 65 && retirementAge < 69) {
                socialAmount = 2437;
            } else {
                socialAmount = 3022;
            }
        } else if (income >= 50000 && income < 70000) {
          if (retirementAge <= 65) {
              socialAmount = 1483;
          } else if (retirementAge > 65 && retirementAge < 69) {
              socialAmount = 2119;
          } else {
              socialAmount = 2628;
          }
        } else if (income >= 30000 && income < 50000) {
          if (retirementAge <= 65) {
              socialAmount = 1110;
          } else if (retirementAge > 65 && retirementAge < 69) {
              socialAmount = 1586;
          } else {
              socialAmount = 1967;
          }
        } else {
          if (retirementAge <= 65) {
              socialAmount = 737;
          } else if (retirementAge > 65 && retirementAge < 69) {
              socialAmount = 1053;
          } else {
              socialAmount = 1305;
          }
        }
    } else if (maritalStatus === 'Married' || maritalStatus === 'married' || maritalStatus === 'Widowed' || maritalStatus === 'widowed' || maritalStatus === 'Divorced' || maritalStatus === 'divorced') {
        if (income >= 110000) {
            if (retirementAge <= 65) {
                socialAmount = 2050;
            } else if (retirementAge > 65 && retirementAge < 69) {
                socialAmount = 2929;
            } else {
                socialAmount = 3632;
            }
        } else if (income >= 90000 && income < 110000) {
            if (retirementAge <= 65) {
                socialAmount = 1881;
            } else if (retirementAge > 65 && retirementAge < 69) {
                socialAmount = 2687;
            } else {
                socialAmount = 3332;
            }
        } else if (income >= 70000 && income < 90000) {
            if (retirementAge <= 65) {
                socialAmount = 1706;
            } else if (retirementAge > 65 && retirementAge < 69) {
                socialAmount = 2437;
            } else {
                socialAmount = 3022;
            }
        } else if (income >= 50000 && income < 70000) {
          if (retirementAge <= 65) {
              socialAmount = 1483;
          } else if (retirementAge > 65 && retirementAge < 69) {
              socialAmount = 2119;
          } else {
              socialAmount = 2628;
          }
        } else if (income >= 30000 && income < 50000) {
          if (retirementAge <= 65) {
              socialAmount = 1110;
          } else if (retirementAge > 65 && retirementAge < 69) {
              socialAmount = 1586;
          } else {
              socialAmount = 1967;
          }
        } else {
          if (retirementAge <= 65) {
              socialAmount = 737;
          } else if (retirementAge > 65 && retirementAge < 69) {
              socialAmount = 1053;
          } else {
              socialAmount = 1305;
          }
        }
    }
    var afterSocialSecurity = adjusted - (socialAmount*12); // how much your annual social security  amount should be after social security
    return afterSocialSecurity/rateOfReturn; // equation to get the expected goal for retirement
}



function calcMoneyNeeded(totalSavings, balance) {
    return totalSavings - balance;
}



function calcShortFall(age, retirementAge, needToSaveMoney, payPeriods, savingsPerPeriod, saveMoney, rateOfReturn) { // Calculates how much more, or less, money is needed to to be saved per pay period in order to reach your goal.
    
    var yearsUntilRetirement = retirementAge - age;
    
    for (var ii = 1; ii <= yearsUntilRetirement; ii++) { //This finds the projected amount of money you will have in your 401k at your current rate of savings by the time you want to retire (considering inflation)
        saveMoney = saveMoney + savingsPerPeriod*payPeriods;
        saveMoney = saveMoney*(1 + rateOfReturn); // Inflation add-in saveMoney*(1 + rateOfReturn)*(1 + .025);
    }
    
    var leftNeedToSave = needToSaveMoney - saveMoney;
    var leftNeedPerYear = leftNeedToSave/yearsUntilRetirement;
    return leftNeedPerYear/payPeriods;
}



function shortFallCases(shortFall, retirementAge, age, retireMoney, needToSaveMoney, payPeriods) { //This is to help display the data in a more friendly way as well as making a plan for them to save less per pay period while retiring a little later
    if (shortFall < 500 && shortFall >= 0) {
        return console.log('Your shortfall per pay period is: $' + shortFall);
    } else {
        var savingMore, newAge, ageDiff;
        ageDiff = retirementAge - age;
        newAge = retirementAge;
        savingMore = shortFall;
        
        while (savingMore > 300) {
            if (newAge < 75) {
                ageDiff = ageDiff + 1;
                newAge = newAge + 1;
                
                savingMore = (needToSaveMoney/ageDiff)/payPeriods;
            } else {
                break;
            }
        }
        
        return console.log('In order to meet your goal, save $' + savingMore + ' more per pay period and retire at age ' + newAge + ' instead.')
    }
}



//Variables from functions
var monthlyIncome = calcMonthlyIncome(income);
var savingsRate = calcSavingRate(income, payPeriods, savingsPerPeriod);
var inflation = calcInflation(income, retirementAge, age);
var retireMoney = calcRetirementMoney(retirementAge, maritalStatus, income, inflation, rateOfReturn);
var needToSaveMoney = calcMoneyNeeded(retireMoney, balance);
var shortFall = calcShortFall(age, retirementAge, needToSaveMoney, payPeriods, savingsPerPeriod, balance, rateOfReturn);

//Logging the outputs to the console
/*
console.log('Your company is ' + provider + '.');
console.log('Your monthly income is: $' + monthlyIncome);
console.log('Your savings rate per pay period is: ' + savingsRate + '%');
console.log('Your annual income at retirement after inflation is: $' + inflation);
console.log('Your expected total savings for retirement is: $' + retireMoney);
console.log('Your total amount left needed for retirement: $' + needToSaveMoney)
var shortFallCase = shortFallCases(shortFall, retirementAge, age, retireMoney, needToSaveMoney, payPeriods);
*/

document.querySelector('.btn-reset').addEventListener('click', function() {
    
    //erases values
    document.getElementById("provider").innerHTML = "";
    document.getElementById("income").innerHTML = "";
    document.getElementById("savingsRate").innerHTML = "";
    document.getElementById("incomeRetire").innerHTML = "";
    document.getElementById("expectedSavings").innerHTML = "";
    document.getElementById("needMoney").innerHTML = "";
    document.getElementById("shortfall").innerHTML = "";
    
})

document.querySelector('.btn-enter').addEventListener('click', function() {
    
    document.getElementById("provider").innerHTML = provider;
    document.getElementById("income").innerHTML = monthlyIncome.toFixed(2);
    document.getElementById("savingsRate").innerHTML = savingsRate.toFixed(2);
    document.getElementById("incomeRetire").innerHTML = inflation.toFixed(2);
    document.getElementById("expectedSavings").innerHTML = retireMoney.toFixed(2);
    document.getElementById("needMoney").innerHTML = needToSaveMoney.toFixed(2);
    document.getElementById("shortfall").innerHTML = shortFall.toFixed(2);
    
})






