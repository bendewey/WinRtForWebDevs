// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    window.app = WinJS.Application;  // global 'app' variable
    window.settings = Windows.Storage.ApplicationData.current.localSettings.values // global 'settings' variable
    
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var mainFlipView;
    var startPage = 0;

    WinJS.strictProcessing();

    app.addEventListener("activated", function (args) {
        // for testing (slide num -1)
        //startPage = 14;

        if (args.detail.kind === activation.ActivationKind.search) {
            startPage = 27; // Search Slide

            onLaunch(args);
        }

        if (args.detail.kind === activation.ActivationKind.launch) {
            onLaunch(args);
        }
    });

    function onLaunch(args) {
        if (args.detail.previousExecutionState === activation.ApplicationExecutionState.closedByUser) {
            settings.currentPage = 0;
        }

        args.setPromise(WinJS.UI.processAll().then(function () {

            mainFlipView = document.getElementById("mainSlidesFlipView").winControl;
            mainFlipView.itemTemplate = placeholderRenderer;
            mainFlipView.addEventListener("pageselected", pageSelected);

            if (!startPage && settings.currentPage) {
                startPage = settings.currentPage;
            }

            setCurrentPage(startPage);

            setupAppBar();
        }));
    }

    function pageSelected(ev) {
        settings.currentPage = mainFlipView.currentPage;

        // disable debugging when changing pages
        settings.isDebugging = false;
        updateDebuggingButton();
    }

    function placeholderRenderer(itemPromise) {
        // create a basic template for the item which doesn't depend on the data
        var element = document.createElement("div");
        element.className = "fragment";

        // return the element as the placeholder, and a callback to update it when data is available
        return {
            element: element,
            // specifies a promise that will be completed when rendering is complete
            // itemPromise will complete when the data is available. 
            renderComplete: itemPromise.then(function (item) {

                if (item.data.page) {
                    WinJS.UI.Pages.render(item.data.page, element, item.data);
                } else {
                    element.insertAdjacentHTML("afterBegin", "<img class='fullscreen' src='" + item.data.image + "' alt='" + item.data.title + "' />");
                }
            }).done()
        };
    }

    function setCurrentPage(page) {
        // Workaround for an odd issues with the flipView notification was hangs.  I'm just clearing the notification prior to navigating home.
        if (mainFlipView._pageManager && mainFlipView._pageManager._notificationsEndedSignal) {
            mainFlipView._pageManager._notificationsEndedSignal = null;
        }

        // navigate to the first page
        mainFlipView.currentPage = page;
    }

    function setupAppBar() {
        document.getElementById("home").addEventListener("click", homeClicked, false);
        document.getElementById("previous").addEventListener("click", previousClicked, false);
        document.getElementById("next").addEventListener("click", nextClicked, false);
        document.getElementById("openUri").addEventListener("click", openUriClicked, false);
        document.getElementById("toggleDebugging").addEventListener("click", toggleDebuggingClicked, false);

        updateDebuggingButton();
    }

    function homeClicked(e) {
        setCurrentPage(0);
    }

    function previousClicked(e) {
        mainFlipView.previous();
    }

    function nextClicked(e) {
        mainFlipView.next();
    }

    function toggleDebuggingClicked(e) {
        settings.isDebugging = !settings.isDebugging;
        updateDebuggingButton();
    }

    function updateDebuggingButton() {
        var button = document.getElementById("toggleDebugging").winControl;
        if (settings.isDebugging) {
            button.label = "Disable Debugging";
        } else {
            button.label = "Enable Debugging";
        }
    }

    function openUriClicked(e) {
        if (settings.isDebugging) {
            debugger;
        }

        var link = SlideData.array[mainFlipView.currentPage].link;
        if (link) {

            var uri = new Windows.Foundation.Uri(link);

            // Launch the URI.
            Windows.System.Launcher.launchUriAsync(uri).done(
                function (success) {
                    if (success) {
                        WinJS.log && WinJS.log("URI " + uri.absoluteUri + " launched.", "sample", "status");
                    } else {

                        WinJS.log && WinJS.log("URI launch failed.", "sample", "error");
                    }
                });
        }
    }

    app.oncheckpoint = function (args) {
        settings.currentPage = mainFlipView.currentPage;
    };

    app.start();
})();
