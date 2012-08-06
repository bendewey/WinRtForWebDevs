//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    // This is an array that will be used to drive the FlipView in several
    // scenarios. The array contains objects with the following attributes:
    //
    //      type - There are two types that are used:
    //
    //              item -
    //                     The type for simple items.  It informs the custom
    //                     renderer that their is a title and picture that needs
    //                     to be rendered.
    //
    //              contentsArray -
    //                     This is used for creating a table of contents.  It
    //                     informs the renderer that an array of data is present
    //                     for use in constructing the Table of Contents.
    //
    //      title - The title of a photo to be displayed.
    //
    //      picture - The location of the photo to be displayed.
    var array = [
        { type: "item", title: "Slide1", image: "/slides/Slide1.png", link: "https://github.com/bendewey/WinRtForWebDevs" },
        { type: "item", title: "Slide2", image: "/slides/Slide2.png" },
        { type: "item", title: "Slide3", image: "/slides/Slide3.png" },
        { type: "item", title: "Slide4", image: "/slides/Slide4.png" },
        { type: "item", title: "Slide5", image: "/slides/Slide5.png" },
        { type: "item", title: "Slide6", image: "/slides/Slide6.png" },
        { type: "item", title: "Slide7", image: "/slides/Slide7.png", link: "http://windows.microsoft.com" },
        { type: "item", title: "Slide8", image: "/slides/Slide8.png" },
        { type: "item", title: "Slide9", image: "/slides/Slide9.png" },
        { type: "item", title: "Slide10", image: "/slides/Slide10.png", link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh780660.aspx" },
        { type: "item", title: "Slide11", image: "/slides/Slide11.png" },
        { type: "item", title: "Slide12", image: "/slides/Slide12.png" },
        { type: "item", title: "Slide13", image: "/slides/Slide13.png" },
        { type: "item", title: "Slide14", page: "/slides/Slide14/camera.html", link: "http://code.msdn.microsoft.com/windowsapps/CameraCaptureUI-Sample-845a53ac" },
        { type: "item", title: "Slide15", page: "/slides/Slide15/gps.html" },
        //{ type: "item", title: "Slide16", image: "/slides/Slide16.png" },
        { type: "item", title: "Slide17", page: "/slides/Slide17/accelerometer.html" },
        { type: "item", title: "Slide19", image: "/slides/Slide18.png" },
        { type: "item", title: "Slide19", image: "/slides/Slide19.png", link: "http://www.bendewey.com/WinrtForWebDevs/Slide19.aspx" },
        { type: "item", title: "Slide20", page: "/slides/Slide20/fileOpenPicker.html" },
        { type: "item", title: "Slide19", image: "/slides/Slide21.png", link: "http://www.bendewey.com/WinrtForWebDevs/Slide21.aspx" },
        { type: "item", title: "Slide20", page: "/slides/Slide22/fileSavePicker.html" },
        { type: "item", title: "Slide23", page: "/slides/Slide23/folderPicker.html" },
        { type: "item", title: "Slide24", page: "/slides/Slide24/contactPicker.html" },
        { type: "item", title: "Slide25", image: "/slides/Slide25.png" },
        { type: "item", title: "Slide26", image: "/slides/Slide26.png" },
        { type: "item", title: "Slide27", image: "/slides/Slide27.png" },
        { type: "item", title: "Slide28", image: "/slides/Slide28.png", link: "http://www.bendewey.com/WinrtForWebDevs/Slide28.aspx" },
        { type: "item", title: "Slide29", page: "/slides/Slide29/search.html" },
        { type: "item", title: "Slide30", page: "/slides/Slide30/shareUri.html", link: "http://www.bing.com/images/search?q=Sailing" },
        { type: "item", title: "Slide31", page: "/slides/Slide31/shareBitmap.html" },
        { type: "item", title: "Slide32", page: "/slides/Slide32/tiles.html" },
        { type: "item", title: "Slide33", image: "/slides/Slide33.png" },
        { type: "item", title: "Slide34", page: "/slides/Slide34/settings.html" },
        { type: "item", title: "Slide35", page: "/slides/Slide35/html-hybrid.html" },
        { type: "item", title: "Slide36", page: "/slides/Slide36/win-hybrid.html" },
        { type: "item", title: "Slide37", image: "/slides/Slide37.png" },
        { type: "item", title: "Slide38", image: "/slides/Slide38.png" },
        { type: "item", title: "Slide39", image: "/slides/Slide39.png" },
        { type: "item", title: "Slide40", image: "/slides/Slide40.png" },
        { type: "item", title: "Slide41", image: "/slides/Slide41.png" },
        { type: "item", title: "Slide42", image: "/slides/Slide42.png" }
    ];
    var bindingList = new WinJS.Binding.List(array);

    WinJS.Namespace.define("SlideData", {
        bindingList: bindingList,
        array: array
    });

    var e = SlideData.bindingList.dataSource;
})();
