(function () {
    "use strict";

    WinJS.UI.Pages.define("/slides/Slide34/settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            document.getElementById("addSettings").addEventListener("click", addSettingsClicked, false);
        }
    });

    function addSettingsClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = { "help": { title: "Help", href: "/slides/slide34/settings-flyout.html" } };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
        
        WinJS.UI.SettingsFlyout.showSettings("help", "/slides/slide34/settings-flyout.html");
    }
})();
