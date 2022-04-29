window.designerConfig = {
    componentVersion: 'latest',
    init: function(Expo) {
	motionWidget.init();
        Expo.setTempValue("activeMapTab", false);
    },


    // COMPONENT CONFIG: Designer can change the props values depending on their requirements

    events: [
        {
            name: "ctaLogo",
            type: 'click',
            callback: function(Expo, event) {
                Expo.designerAPI.firePixel("ctaLogo", [{"eventName":"clickLive"}]);
                Expo.designerAPI.openUrl("http://exponential.com","ctaLogo");
                Expo.designerAPI.pause();
            }
        }
    ],


    // framework callbacks >>>

    callbacks: {
        mainUnitCloseCallback: function(callback, defaultVideoId) {
            this.designerAPI.tabs.get("tabs_placeholder1").reset();
            this.designerAPI.switchPlayerInTab(defaultVideoId);
            arrowPlaylist.resetCarousel();
            
		motionWidget.reset();
		callback(); // dont remove this
        },

        videoEndedEvent: function(videoId, eventObj) {
            if (videoId == 'video1') {
            } else if (videoId == 'video2') {
            } else if (videoId == 'video3') {
            }
        },
    },


    // components code will start from here >>>

    components: [
        {
            name: "arrowPlaylist",
            props: {
                totalVideo: 2,
                autoPlay: true,
                arrowOpacity: 0.3,
                hideArrowTime: 3000
            },
            events: {
                videoCarouselEndEvent: function(Expo) {
                    Expo.designerAPI.pause();
                    Expo.designerAPI.tabs.get("tabs_placeholder1").showTab(2);
                },
                videoCarouselNext: function(Expo) {
                    Expo.designerAPI.firePixel("btnPlaylistNext", [{"eventName":"intLive", "multi":true}]);
                },
                videoCarouselPrev: function(Expo) {
                    Expo.designerAPI.firePixel("btnPlaylistPrevious", [{"eventName":"intLive", "multi":true}]);
                }
            }
        }

        ,{
    name: "map",
    props: {
        maps: {
            mapA: {
                mapID: "mapDefault",
                pinType: ["stores"],
                pinValue: ["pin0"],
                twoFingersEnabled: true,
                common: {
                    zoomLevel: 12,
                    zoomControl: false,
                    attributionControl: false
                },
                pin0: [{
                    pop: {
                        popupWidth: 250,
                        popupHeight: 180,
                        marginFromTop: .004,
                        iconAnchor: [12, 35],
                        minPopupWidth: 100,
                        popupAnchor: [0, -35],
                        tooltip: "visible", // visible | hidden
                        showCloseBtn: true,
                        openPopByDefault: true,
                        msgString: "<div id=\"contentPopup\" align=\"center\" style=\"width:100%; height:100%;\"> tokenContentMap.label <br/> tokenContentMap.address, tokenContentMap.city, <br/> tokenContentMap.state tokenContentMap.zip <br/> tokenContentMap.phone <br/> <img id=\"popUpCount\" style=\"margin-top:5px; cursor:pointer;\" s"+"rc=\"images/map_popupCtaBtn.png\" alt=\"\" height=\"21\" width=\"70\" name=\"pin0\" onclick=\"window.parent.map.popUpCTA(this)\"></div>",
                        popupCTA: {
                            defaultURL: "//exponential.com",
                            pixelID: "popUpCTAClick",
                            popUpCTAClick: function (Expo, event) {
                                Expo.designerAPI.firePixel("Map_popUpCTAClick", [{"eventName":"clickLive"}]);
                                Expo.designerAPI.pause();
                            }
                        }
                    },
                    iconSize: "24x35",
                    icon: "images/map_pin1.png",
                    center: true,
                    pinEvents: {
                        rollover: function(Expo, mapObject, event) {},
                        rollout: function(Expo, mapObject, event) {},
                        click: function(Expo, mapObject, event) {}
                    },
                }],
            },
        },
    },
},{
    name: "scrollbar",
    props: {
        preventRender: true,
        placeholderId: "scrollbar_placeholder",
        contentId: "scrollbar_content",
        direction: "vertical",
        customScroll: true,
        customScrollAlwaysShow: false,
        customScrollTheme: "dark",
    },
    events: {
        onScrolled: function(Expo) {
            Expo.designerAPI.firePixel("Scrollbar_scrolled", [{"eventName":"intLive", "multi":false}]);
        },
        // onScrollStart: function(Expo) {
            //Expo.designerAPI.firePixel("Scrollbar_scrollStart", [{"eventName":"intLive", "multi":true}]);
        // },
        // onScrollEnd: function(Expo) {
            //Expo.designerAPI.firePixel("Scrollbar_scrollEnd", [{"eventName":"intLive", "multi":true}]);
        // },
    },
}

    ]
}