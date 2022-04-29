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

//***********************animation related code start here************************************//
const motionWidget = {
	arrVal:[],
	arrValCls:[],
	intId:null,

	init:function(){
		
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_0",anims:[{effect:"fadeInUp_0", duration:500, delay:100, distance:100}], loop:1})
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_1",anims:[{effect:"fadeInUp_1", duration:500, delay:100, distance:100}], loop:1})
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_2",anims:[{effect:"fadeInUp_2", duration:500, delay:100, distance:100}], loop:1})
		motionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"anim_3",anims:[{effect:"fadeInUp_3", duration:500, delay:100, distance:100}], loop:1})
		
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