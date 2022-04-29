window.designerConfig = {
    componentVersion: 'latest',
    init: function(Expo) {
	motionWidget.init();
	motionWidget.init();
	motionWidget.init();
        Expo.setTempValue("activeMapTab", false);
    },


    // COMPONENT CONFIG: Designer can change the props values depending on their requirements

    events: [
        {
            name: "ctaLogo",
            type: 'click',
            callback: function(Expo, event) {
                Expo.designerAPI.firePixel("ctaLogo", [{"eventName":"clickLive"  ]); // missed curly
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
		
		motionWidget.reset();
		
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
,/* GalleryExterior */
{
    name: "hybridGallery", // Do not change this value
    props: {
        preventRender: true,
        placeholderId: "hybridGallery_placeholder1",
        slides: [
            // array["image-url | videoid", "image-url | videoid", ...]
            // array[
            //     object{ // one of the options should be provided - imageUrl, videoId or contentId
            //         imageUrl: "image-url",
            //         videoId: "videoid"
            //         contentId: "hybridGallery_contentN",
            //         loop: false | true | 1 .. N,
            //         overlay: { // if provided then one of the options should be also providen - contentId or contentHtml
            //             contentId: "hybridGallery_slide1_overlay",
            //             contentHtml: "<div style='line-height:60px; background:#ff0000; color:#ffffff; ' data-event='onCtaClick'>Learn More</div>",
            //             style: "right:20px; bottom:60px; ",
            //         },
            //      },
            //      ...
            // ]
            {
                imageUrl: "images/slide_01.jpg",
                overlay: {
                    contentHtml: "<div style='width:100%; color:#ffffff; text-align:center; '>Slide:1</div>",
                    style: "left:10px; top:unset; bottom:10px; ",
                }
            },
            {
                videoId: "video3",
                loop: 1,
                overlay: {
                    contentHtml: "<div style='width:100%; color:#ffffff; text-align:center; '>Slide:2</div>",
                    style: "left:10px; top:unset; bottom:10px; ",
                }
            },
            {
                imageUrl: "images/slide_02.jpg",
                overlay: {
                    contentHtml: "<div style='width:100%; color:#ffffff; text-align:center; '>Slide:3</div>",
                    style: "left:10px; top:unset; bottom:10px; ",
                }
            },
            {
                imageUrl: "images/slide_03.jpg",
                overlay: {
                    contentHtml: "<div style='width:100%; color:#ffffff; text-align:center; '>Slide:5</div>",
                    style: "left:10px; top:unset; bottom:10px; ",
                }
            }
        ],
        // thumbs: [ // url-template | array["url1", "url2", ...]
        //     "images/video1.jpg",
        //     "images/video2.jpg",
        //     "images/video3.jpg",
        //     "images/video4.jpg",
        //     "images/video5.jpg"
        // ],
        imageFit: "cover", // cover | contain | unset | auto | initial
        videoFit: "cover", // cover | contain | none | fill | scale-down
        controlsPlacement: "br", // tl | tr | bl | br
        dotNavigation: true, // true | false // enable/disable dots/thumbs navigation
        arrowNavigation: false, // true | false // enable/disable side arrows navigation
        swipeNavigation: "auto", // "auto" | true | false // enable/disable mouse/touch swipe navigation
        transitionStyle: "chain", // chain | push | overlay | crossfade | fade
        transitionDuration: 1, // transition time (sec)
        loopSlides: true,
        autoPlay: 3, // time (sec) to start autoplay
        resumeAutoPlay: 10, // time (sec) to resume autoplay after stop
        videoFreeze: 1, // time (sec) to freeze last video frame before switch to next slide
        dotsPosition: "bottom", // top | bottom
        dotsOverflow: "fade", // fade | scale
        // dotsStyle: "", // css values
        // dotStyle: {
        //     normal: "", // css values
        //     hover: "", // css values
        //     active: "", // css values
        // },
        dotsGap: "10px", // width value
        dotOutlineNormal: "1px solid #FFFFFF", // css border value
        dotOutlineActive: "2px solid #FFFFFF", // css border value
        dotSize: "10px", // {size} | {width, height}
        dotShape: "circle", // rectangle | circle
        dotThumbFit: "cover", // cover | contain | unset | auto | initial
        arrowsPosition: "center", // center | top | bottom
        arrowsMargin: "0px", // css margin value
        // arrowStyle: {
        //     normal: "", // css values
        //     hover: "", // css values
        //     disabled: "", // css values
        // },
        arrowSize: "44px 80px", // {size} | {width, height}
        arrowColor: "#FFFFFF", // css color
        arrowBackgroundColor: "rgba(0, 0, 0, 0.25)", // css color
        // arrowImageLeft: "", // url
        // arrowImageRight: "images/arrow_next.png", // url
        // arrowImageFit: "contain", // cover | contain | unset | auto | initial
        // arrowsCustomize: {
        //     container: "left:10px; top:10px; width:100px; height:80px;",
        //     left: "width:80px; height:100%;",
        //     right: "width:80px; height:100%;",
        // },
        progressStyle: {
            time: "#4B63DE", // css color
            full: "rgba(75, 99, 222, 0.25)", // css color
        },
    },
    events: {
        onSlideClick: function(Expo, event) {
            // this = Expo.designerAPI.hybridGallery.get("hybridGallery_placeholder1") // self context
            switch(event.slide) {
                case 1:
                    Expo.designerAPI.firePixel("AboutGallery_Slide1_Click",[{"eventName":"clickLive"}]);
                    Expo.designerAPI.openUrl("https://covid-19.vdx.tv", "AboutGallery_Slide1_Click");
                    this.pause();
                    break;
                case 2:
                    Expo.designerAPI.firePixel("AboutGallery_Slide2_Click",[{"eventName":"intLive"}]);
                    this.playPause();
                    break;
                case 3:
                    Expo.designerAPI.firePixel("AboutGallery_Slide3_Click",[{"eventName":"clickLive"}]);
                    Expo.designerAPI.openUrl("https://vdx.tv/resources/case-studies", "AboutGallery_Slide3_Click");
                    this.pause();
                    break;
                case 4:
                    Expo.designerAPI.firePixel("AboutGallery_Slide4_Click",[{"eventName":"intLive"}]);
                    Expo.designerAPI.openUrl("https://vdx.tv/about", "AboutGallery_Slide5_Click");
                    this.playPause();
                    break;
            }
        },
        onSlideChange: function(Expo, event) {
            Expo.trigger('slide' + event.slideTo, false);
        },
        onDotClick: function(Expo, event) {
        },
        onLeftArrowClick: function(Expo) {
        },
        onRightArrowClick: function(Expo) {
        }
    }
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
,{
    name: "containerGallery",
    props: {
        preventRender: true,
        placeholderId: "tabs_content1_3", // containerGallery_placeholder1
        slides: [
            { placeholderId: "containerGallery_slide1_1" },
            { placeholderId: "scrollbar_placeholder" },
            { placeholderId: "imageGallery_placeholder2" },
            { placeholderId: "containerGallery_slide1_4" },
            { placeholderId: "containerGallery_slide1_5" },
            { placeholderId: "containerGallery_slide1_6" },
            { placeholderId: "containerGallery_slide1_7" },
        ],
        thumbs: "images/container_thumbs_{x}.png",
        dotNavigation: true,
        arrowNavigation: true,
        swipeNavigation: false,
        transitionStyle: "push",
        transitionDuration: 1,
        loopSlides: true,
        autoPlay: 0,
        resumeAutoPlay: 3,
        dotsPosition: "top",
        dotsOverflow: "scale",
        dotOutlineNormal: "1px solid #0084FF",
        dotOutlineActive: "2px solid #0084FF",
        dotSize: "40px",
        dotShape: "circle",
        dotThumbSize: "cover",
        arrowsMargin: "0 8px",
        arrowSize: "44px 80px",
        arrowColor: "#000",
        arrowStyle: {
            "normal": "opacity:0.5; background-color:rgba(128, 128, 128, 0.1); ",
            "hover": "opacity:1; ",
            "disabled": "opacity:0.1; ",
        },
    },
    events: {
        onSlideChange: function(Expo, event) {
            switch(event.slideFrom) {
                case 7:
                    Expo.designerAPI.pause();
                    break;
            }
            switch(event.slideTo) {
                case 1:
                    Expo.designerAPI.firePixel("containerGallery_Map", [{"eventName":"intLive", "multi":true}]);
                    if (!Expo.getTempValue("activeMapTab")) {
                        Expo.setTempValue("activeMapTab", true);
                        if (Expo.designerAPI.getDynamicData().rawData || Expo.designerAPI.getDynamicData().rawData === null) {
                            var mapDefault = document.querySelector('div[data-expo-event="EXPOEVENT_mapDefault"]');
                            mapDefault.style.zIndex = -1;
                        }
                        map.generateMap({mapID: "mapA", dynamicData: Expo.designerAPI.getDynamicData().rawData, localData: "assets/map_default.json", defaultImageURL: "images/map_default.jpg", noDataImage: "images/map_no_data.jpg"});
                    }
                    break;
                case 2:
                    Expo.designerAPI.firePixel("containerGallery_Scrollbar", [{"eventName":"intLive", "multi":true}]);
                    Expo.designerAPI.components.get("scrollbar_placeholder").render(true);
                    break;
                case 3:
                    Expo.designerAPI.firePixel("containerGallery_ImageGallery", [{"eventName":"intLive", "multi":true}]);
                    Expo.designerAPI.components.get("imageGallery_placeholder2").render(true);
                    break;
                case 4:
                    Expo.designerAPI.firePixel("containerGallery_ComparisonSlider", [{"eventName":"intLive", "multi":true}]);
                    Expo.designerAPI.components.get("comparisonSlide").render(true);
                    break;
                case 5:
                    Expo.designerAPI.firePixel("containerGallery_ThreeSixtyView", [{"eventName":"intLive", "multi":true}]);
                    Expo.designerAPI.components.get("threesixtyViewWithHotspots_1").render(true);
                    break;
                case 6:
                    Expo.designerAPI.firePixel("containerGallery_Tabs", [{"eventName":"intLive", "multi":true}]);
                    Expo.designerAPI.components.get("tabs_placeholder2").render(true);
                    break;
                case 7:
                    Expo.designerAPI.firePixel("containerGallery_HybridGallery", [{"eventName":"intLive", "multi":true}]);
                    Expo.designerAPI.components.get("hybridGallery_placeholder1").render(true);
                    break;
            }
        },
        onDotClick: function(Expo, event) {
        },
        onLeftArrowClick: function(Expo) {
        },
        onRightArrowClick: function(Expo) {
        },
    },
}
]}

//***********************animation related code start here************************************//
const motionWidget = {
	arrVal:[],
	arrValCls:[],
	intId:null,

	init:function(){
		
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_0",anims:[{effect:"fadeInUp_0", duration:500, delay:100, distance:100}], loop:2})
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_1",anims:[{effect:"fadeInUp_1", duration:500, delay:100, distance:100}], loop:1})
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_2",anims:[{effect:"fadeInUp_2", duration:500, delay:100, distance:100}], loop:1})
		
		motionWidget.arrValCls = [...motionWidget.arrVal];
		motionWidget.addEl();
		EU.EventManager.add("VDX_Mainunit_Shown", function() {
			motionWidget.intId = setInterval(motionWidget.ctrlVAnim, 50);
		})
	},

	reset:function() {
		clearInterval(motionWidget.intId);
		motionWidget.intId = null;
		motionWidget.addEl();
	},
	
	insideScreen:function(el) {
	    var rect     = el.getBoundingClientRect(),
			vWidth   = window.innerWidth || document.documentElement.clientWidth,
			vHeight  = window.innerHeight || document.documentElement.clientHeight;
		return rect.top>=61 && rect.bottom<=vHeight && rect.left>=0 && rect.right<=vWidth;
	},
	
	outsideScreen:function(el) {
		var rect     = el.getBoundingClientRect(),
			vWidth   = window.innerWidth || document.documentElement.clientWidth,
			vHeight  = window.innerHeight || document.documentElement.clientHeight;

		return rect.top>=vHeight || rect.bottom<=60 || rect.left>=vWidth || rect.right<=0;
	},

	ctrlVAnim:function(){
		for(var j=0; j<motionWidget.arrVal.length; j++) {
			var obj = motionWidget.arrVal[j];
			if(!obj.item){ return; }

			if(motionWidget.insideScreen(obj.item)){
				obj.title.indexOf("vid")===-1?motionWidget.animateCSS(obj, obj.loop, 0):motionWidget.animationEnd(obj);
				motionWidget.arrVal.splice(j, 1);
			}
		}
	},

	animationEnd:function(obj, loop){
		clearInterval(obj.intId);
		obj.intId = setInterval(function(){
			if(motionWidget.outsideScreen(obj.item)){
				obj.title = obj.title.replace("vid", "");
				if(obj.item.className.search('zoom') !== -1 || obj.item.className.search('fade') !== -1 || obj.item.className.search('slide') !== -1 || obj.item.className.search('bounce') !== -1)
					obj.item.style.opacity = 0;

				obj.item.className = obj.item.className.replace(/\b\animate_\S+\b/g, '');
				motionWidget.arrVal.push(obj);
				clearInterval(obj.intId);
			}
		}, 60);
	},
	
	animateCSS:function(obj, loop, index) {
		obj.item.className = obj.item.className.replace(/\b\animate_\S+\b/g, '');
		obj.item.style.setProperty('animation-delay', obj.anims[index].delay+'ms');
		obj.item.style.setProperty('-webkit-animation-delay', obj.anims[index].delay+'ms');
		obj.item.style.setProperty('--animate-duration', obj.anims[index].duration+'ms');
		
		if(obj.anims.length==1 && obj.loop>1){
			setTimeout(function(){
				obj.item.classList.add('animate__animated', 'animate__'+obj.anims[index].effect);
				if(obj.item.className.search('zoom') !== -1 || obj.item.className.search('slide') !== -1 || obj.item.className.search('fade') !== -1 || obj.item.className.search('bounce') !== -1) 
					obj.item.style.opacity = 1;
			}, 0);
		}else{
			obj.item.classList.add('animate__animated', 'animate__'+obj.anims[index].effect);
			if(obj.item.className.search('zoom') !== -1 || obj.item.className.search('slide') !== -1 || obj.item.className.search('fade') !== -1 || obj.item.className.search('bounce') !== -1) 
				obj.item.style.opacity = 1;
		}
		
		function handleAnimationEnd() {
			obj.item.removeEventListener('animationend', handleAnimationEnd); 
            index<(obj.anims.length-1)?motionWidget.animateCSS(obj, loop, index+1):loop>1?motionWidget.animateCSS(obj, loop-1, 0):motionWidget.animationEnd(obj, loop);
		}

		obj.item.addEventListener('animationend', handleAnimationEnd);
	},

	addEl:function(val){
		let arr = [...motionWidget.arrValCls];
		for(let j=0; j<arr.length; j++){
			let obj = arr[j];

			if(obj.item === null){
				obj.item = document.querySelector('div[title$="'+obj.title+'"]') || document.querySelector('div[comp-id$="'+obj.title+'"]');
				obj.item === null && arr.splice(j, 1);
			}

			
			if(obj.item !== null) {
				obj.item.setAttribute('title', obj.item.getAttribute('title').replace(obj.title, ''));
				if(obj.title.indexOf('vid')===-1){
					if(obj.anims[0].effect.search('zoom') !== -1 || obj.anims[0].effect.search('fade') !== -1 || obj.anims[0].effect.search('slide') !== -1 || obj.anims[0].effect.search('bounce') !== -1)
						obj.item.style.opacity = 0;
				}

				obj.item.className = obj.item.className.replace(/\b\animate_\S+\b/g, '');
			}
		}
		
		motionWidget.arrVal = arr;
	}
}
//***********************animation related code end here************************************//