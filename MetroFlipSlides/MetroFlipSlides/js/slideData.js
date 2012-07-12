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
        { type: "item", title: "Slide1", image: "/slides/Slide1.png" },
        { type: "item", title: "Slide2", image: "/slides/Slide2.png" },
        { type: "item", title: "Slide3", image: "/slides/Slide3.png" },
        { type: "item", title: "Slide4", image: "/slides/Slide4.png" },
        { type: "item", title: "Slide5", image: "/slides/Slide5.png" },
        { type: "item", title: "Slide6", image: "/slides/Slide6.png" },
        { type: "item", title: "Slide7", image: "/slides/Slide7.png" },
        { type: "item", title: "Slide8", image: "/slides/Slide8.png" },
        { type: "item", title: "Slide9", image: "/slides/Slide9.png" },
        { type: "item", title: "Slide10", image: "/slides/Slide10.png" },
        { type: "item", title: "Slide11", image: "/slides/Slide11.png" },
        { type: "item", title: "Slide12", image: "/slides/Slide12.png" },
        { type: "item", title: "Slide13", page: "/slides/Slide13/camera.html",  },
        { type: "item", title: "Slide14", image: "/slides/Slide14.png" },
        { type: "item", title: "Slide15", image: "/slides/Slide15.png" },
        { type: "item", title: "Slide16", image: "/slides/Slide16.png" },
        { type: "item", title: "Slide17", image: "/slides/Slide17.png" },
        { type: "item", title: "Slide18", image: "/slides/Slide18.png" },
        { type: "item", title: "Slide19", image: "/slides/Slide19.png" },
        { type: "item", title: "Slide20", image: "/slides/Slide20.png" },
        { type: "item", title: "Slide21", image: "/slides/Slide21.png" },
        { type: "item", title: "Slide22", image: "/slides/Slide22.png" },
        { type: "item", title: "Slide23", image: "/slides/Slide23.png" },
        { type: "item", title: "Slide24", image: "/slides/Slide24.png" },
        { type: "item", title: "Slide25", image: "/slides/Slide25.png" },
        { type: "item", title: "Slide26", image: "/slides/Slide26.png" },
        { type: "item", title: "Slide27", image: "/slides/Slide27.png" },
        { type: "item", title: "Slide28", image: "/slides/Slide28.png" },
        { type: "item", title: "Slide29", image: "/slides/Slide29.png" },
        { type: "item", title: "Slide30", image: "/slides/Slide30.png" },
        { type: "item", title: "Slide31", image: "/slides/Slide31.png" },
        { type: "item", title: "Slide32", image: "/slides/Slide32.png" },
        { type: "item", title: "Slide33", image: "/slides/Slide33.png" },
        { type: "item", title: "Slide34", image: "/slides/Slide34.png" },
        { type: "item", title: "Slide35", image: "/slides/Slide35.png" },
        { type: "item", title: "Slide36", image: "/slides/Slide36.png" },
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
