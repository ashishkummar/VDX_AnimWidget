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

        
    ]
}
 