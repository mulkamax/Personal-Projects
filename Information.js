var information;



document.querySelector('.btn-enter').addEventListener('click', function() {
    
    //Gather values in form input in an object and Print to log
    information = {
        age: parseFloat(document.getElementById("age").value),
        currentProvider: document.getElementById("currentProvider").value,
        maritalStatus: document.getElementById("maritalStatus").value,
        currentBalance: parseFloat(document.getElementById("currentBalance").value),
        savingsPerPayPeriod: parseFloat(document.getElementById("savingsPerPayPeriod").value),
        annualIncome: parseFloat(document.getElementById("annualIncome").value),
        payPeriodsPerYear: parseFloat(document.getElementById("payPeriodsPerYear").value),
        retireAge: parseFloat(document.getElementById("retireAge").value),
        rateOfReturn: parseFloat(document.getElementById("rateOfReturn").value),
    };
    
    //Save data in local JSON storage
    myJSON = JSON.stringify(information);
    localStorage.setItem("infoJSON", myJSON);
    
    
    console.log(information);
    
    onloadCallback();
    
    //reset values to nothing
    /*
    document.getElementById("age").value = "";
    document.getElementById("currentProvider").value = "";
    document.getElementById("maritalStatus").value = "";
    document.getElementById("currentBalance").value = "";
    document.getElementById("savingsPerPayPeriod").value = "";
    document.getElementById("annualIncome").value = "";
    document.getElementById("payPeriodsPerYear").value = "";
    document.getElementById("retireAge").value = "";
    document.getElementById("rateOfReturn").value = "";
    */
})


//when form is submit
function onloadCallback() {
    // we stoped it
    event.preventDefault();
    
    /*
    var verifyCallback = function(response) {
        alert(response);
      };
      var widgetId1;
      var widgetId2;
      var onloadCallback = function() {
        // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
        // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
        widgetId1 = grecaptcha.render('first', {
          'sitekey' : '6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf',
          'theme' : 'light'
        });
        widgetId2 = grecaptcha.render(document.getElementById('last'), {
          'sitekey' : '6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf'
        });
        grecaptcha.render('email', {
          'sitekey' : '6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf',
          'callback' : verifyCallback,
          'theme' : 'dark'
        });
      };*/
    
    
    
    
    /*
    grecaptcha.ready(function() {
        grecaptcha.execute('6LcwspUUAAAAAI5lFFsGSsQLwGMNcMp4fIUgu4Hf', {action: 'homepage'}).then(function(token) {
            if(result.success) {
                alert('Thank you for your input!')
            } else {
                alert('Not valid!')
            }
        });
    });
    */
    
  };


