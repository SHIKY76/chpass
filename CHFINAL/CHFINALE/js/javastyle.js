
function validate(){
    var valid = true;    
    $(".overpanel").css('background-color','');
    var message = "";

    var firstNameRegex = /^[a-z ,.'-]+$/i;
    var lastNameRegex = /^[a-z ,.'-]+$/i;
    var CVCRegex = /^[0-9]{3,3}$/;
    var ExxDateRegex = /^[A-Za-z0-9'\.\-\s\,]/;

    
    var firstName = $("#first-Name").val();
    var lastName = $("#last-Name").val();
    var CardNumber = $("#CardNumber").val();
    var CVC = $("#CVC").val();
    var ExxDate = $("#ExxDate").val();


    if(firstName == "" || lastName == "" || CardNumber == "" || CVC == "" || ExxDate == "") {
           message  += "<div>Alle Felder sind erforderli.</div>";  
           if(firstName == "") {
               $("#first-Name").css('background-color');
           }
           if(lastName == "") {
               $("#last-Name").css('background-color');
           }
           if(CardNumber == "") {
               $("#CardNumber").css('background-color');
           }
           if (CVC == "") {
               $("#CVC").css('background-color');
           }
           if (ExxDate == "") {
               $("#ExxDate").css('background-color');
           }


       valid = false;
    }
    
    
    
    if(CardNumber != "") {
            $('#CardNumber').validateCreditCard(function(result){
            if(!(result.valid)){
                    message  += "<div>Kartennummer ist ungültig</div>";    
                    $("#CardNumber").css('background-color');
                    valid = false;
            }
        });
    }
    
    if (CVC != "" && !CVCRegex.test(CVC)) {
        message  += "<div>CVV ist ungültig</div>";    
        $("#CVC").css('background-color');
            valid = false;
    }

    if (ExxDate != "" && !ExxDateRegex.test(ExxDate)) {
        message  += "<div>Ablaufdatum ist ungültig</div>";    
        $("#ExxDate").css('background-color');
            valid = false;
    }

    if (firstName != "" && !firstNameRegex.test(firstName)) {
        message  += "<div>Vorname ist ungültig</div>";    
            $("#first-Name").css('background-color');
            valid = false;
    }

    if (lastName != "" && !lastNameRegex.test(lastName)) {
        message  += "<div>Nachname ist ungültig</div>";    
            $("#last-Name").css('background-color');
            valid = false;
    }


    
    if(message != "") {
        $("#error-message").show();
        $("#error-message").html(message);
    }
    return valid;
}





