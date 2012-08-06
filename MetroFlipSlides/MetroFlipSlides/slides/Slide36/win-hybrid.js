(function () {
    "use strict";

    WinJS.UI.Pages.define("/slides/Slide36/win-hybrid.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            document.getElementById("executeCPlusPlusCode").addEventListener("click", executeCPlusPlusCodeClicked, false);
            document.getElementById("executeCSharpCode").addEventListener("click", executeCSharpCodeClicked, false);
        }
    });

    function executeCPlusPlusCodeClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        var nativeComponent = new MetroCPlusPlusComponent.Class1();
        document.getElementById("cPlusPlusOutput").innerText = "Is 31 Prime? " + nativeComponent.isPrime(31);

    }

    function executeCSharpCodeClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        var clrComponent = new MetroCSharpComponent.Class1();
        document.getElementById("cSharpOutput").innerText = "Is 31 Prime? " + clrComponent.isPrime(31);
    }

})();
