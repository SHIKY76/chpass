var paymentPage = new function() {

    this.extensions = [];
    this.applePayAvailable = false;
    this.googlePayAvailable = false;
    this.paymentMethodPresent = false;

    this.init = function(params)
    {
        this.iframed = params.iframed;
        this.view = params.view;
        this.transactionId = params.transactionId;
        this.merchantId = params.merchantId;
        this.contextPath = params.contextPath;
        this.checkBrandArr = params.checkBrandArr;
        this.mandatoryCVV = params.mandatoryCVV;
        this.startOnTop = params.startOnTop;
        this.uppReturnTarget = params.uppReturnTarget;
        this.translations = params.translations;
        this.testMode = params.testMode;
        this.cancelTimeout = params.cancelTimeout;
        this.autoFocusFirstInputField = params.autoFocusFirstInputField;
        this.availablePaymentMethodCodes = params.availablePaymentMethodCodes;
        this.stripeMap = params.stripeMap; // TODO - remove this assignment to DT2015.js since its only needed there
        this.previewOnly = params.previewOnly; // TODO - remove this assignment to DT2015.js since its only needed there
        this.precheck = params.precheck;
        this.googlePayConfig = params.googlePayConfig;
        this.amazonPayConfig = params.amazonPayConfig;
        this.applePayConfig = params.applePayConfig;
        this.walletDirectCall = params.walletDirectCall;
        this.paymentMethod = params.paymentMethod;
        this.usesPayPalRestApi = params.usesPayPalRestApi;
        this.authenticationOnly = params.authenticationOnly;
        this.forbiddenCharacters = params.forbiddenCharacters || "";
        if(params.optionalPaymentCharge){
            this.optionalPaymentCharge = params.optionalPaymentCharge;
        }
        this.visaCtpConfig = params.visaCtPConfig;

        for ( var i = 0; i < this.extensions.length; i++ )
        {
            this.extensions[i].apply(this);
        }

        this.startAutoCancelTimeout();
    };

    this.log = function( message )
    {
        if ( this.testMode && window.console != null )
            console.log( message );
    };

    this.startAutoCancelTimeout = function() {
        if ( this.autoCancelTimer != null )
            clearTimeout( this.autoCancelTimer );

        paymentPage.log( "Current view: " + this.view );

        if ( this.view === "list" || this.view === "form" ) {

            paymentPage.log("Starting cancel timeout: " + this.cancelTimeout );

            this.autoCancelTimer = setTimeout(function () {
                var timeoutUrl = paymentPage.contextPath + "/payment/timeout?" + paymentPage.getDatatransTrxId();
                if(paymentPage.uppReturnTarget != null  && paymentPage.uppReturnTarget.length > 0){
                    timeoutUrl = timeoutUrl + "&uppReturnTarget=" + paymentPage.uppReturnTarget;
                }
                self.location.href = timeoutUrl;
            }, this.cancelTimeout );
        }
    };

    this.extend = function( extension )
    {
        this.extensions.push(extension);
    };

    this.getDatatransTrxId = function()
    {
        return "datatransTrxId=" + this.transactionId;
    };

    this.getTranslation = function( key )
    {
        var translation = this.translations[key];
        if ( translation == null ) {
            this.log("Missing translation: " + key );
            return key;
        }

        return translation;
    }

    this.hasOnScreenWallet = function () {
        if((this.googlePayConfig) || (this.applePayConfig && window.ApplePaySession)){
            return true;
        }

        return false;
    }

    this.getNumberOfOnScreenWallets = function () {
        var onScreenWallets = 0;
        if(this.googlePayConfig){
            onScreenWallets++;
        }

        if(this.applePayConfig && window.ApplePaySession){
            onScreenWallets++;
        }

        return onScreenWallets;
    }

    this.returnError = function (errorCode,errorMessage,errorDetail) {
        var targetFrame = paymentPage.startOnTop ? top : self;
        targetFrame.location.href = paymentPage.contextPath + "/jsp/upReturn.jsp?" +
            paymentPage.getDatatransTrxId() + "&uppActionResult=error" +
            "&errorCode=" + errorCode +
            "&errorMessage=" + errorMessage +
            "&errorDetail=" + errorDetail;

    }
};


