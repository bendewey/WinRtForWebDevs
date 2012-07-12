// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var mainFlipView;

    WinJS.strictProcessing();

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                app.sessionState.currentPage = 0;
            }

            args.setPromise(WinJS.UI.processAll().then(function () {

                mainFlipView = document.getElementById("mainSlidesFlipView").winControl;
                mainFlipView.itemTemplate = placeholderRenderer;

                if (app.sessionState.currentPage) {
                    mainFlipView.currentPage = app.sessionState.currentPage;
                }

                setupAppBar();
            }));
        }
    });

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
                    element.insertAdjacentHTML("afterBegin", "<img class='fullScreenImage' src='" + item.data.image + "' alt='" + item.data.title + "' />");
                }
            }).done()
        };
    }

    // Command button functions
    function setupAppBar() {
        document.getElementById("previous").addEventListener("click", previousClicked, false);
        document.getElementById("next").addEventListener("click", nextClicked, false);
        document.getElementById("openUri").addEventListener("click", openUriClicked, false);
    }

    function previousClicked(e) {
        mainFlipView.previous();
    }

    function nextClicked(e) {
        mainFlipView.next();
    }

    function openUriClicked(e) {

        var uri = new Windows.Foundation.Uri("http://bing.com");

        // Launch the URI.
        Windows.System.Launcher.launchUriAsync(uri).done(
            function (success) {
                if (success) {
                    WinJS.log && WinJS.log("URI " + uri.absoluteUri + " launched.", "sample", "status");
                } else {

                    WinJS.log && WinJS.log("URI launch failed.", "sample", "error");
                }
            });


        w3c_slidy.stop_propagation(e);
        e.cancel = true;
        e.returnValue = false;
        return false;
    }

    app.oncheckpoint = function (args) {
        app.sessionState.currentPage = mainFlipView.currentPage;
    };

    app.start();
})();
