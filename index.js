function homeEnter() {
    const tl = gsap.timeline();
    gsap.from('#bottomNav', {
        y: 80,
        delay: .2,
    });
    gsap.from('.mainIMG', {
        y: 20,
        opacity: 0,
        delay: .4
    });
    tl.from('.pickerIMG', {
        duration: .4,
        y: 140,
        stagger: .1,
        delay: .4,
        ease: 'power1.out'
    });
    gsap.to('.middleNavContain', {
        opacity: 1,
    });
};

function onceIn() {
    gsap.from('#topNav', {
        y: -80,
    });
    gsap.from(data.next.container, {
        opacity: 0
    });
}

barba.init({
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0
            });
        },
        once(data) {
            return onceIn();
        }
    },
    {
        name: 'home-enter',
        from: {namespace: 'entrance'},
        to: {namespace: 'home'},
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0,
                zIndex: -1,
            });
        },
        enter(data) {
            return homeEnter();
        }
    },
    {
        name: 'about-enter',
        from: {namespace: 'home'},
        to: {namespace: 'about'},
        leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0
            });
        }
    }, 
    ],
    views: [{
        namespace: 'entrance',
        beforeEnter() {
            const enterButton = document.querySelector("#enter-button");
            const enterBG = document.querySelector("#enter-bg");
            const rotator = document.querySelector("#image-enter-bg");
            const images = ['home01.jpg', 'home02.jpg', 'home03.jpg', 'home04.jpg', 'home05.jpg'];
            let num = -1;

            const changeImage = function() {
                rotator.style.backgroundImage = 'url(./assets/home-images/' + images[++num] + ')';
                if (num === images.length-1) {
                    num = -1;
                }
            };

            enterButton.addEventListener("mouseover", function( event ) {
                enterBG.style.height = enterButton.offsetHeight+'px';
                enterBG.style.width = enterButton.offsetWidth+'px';
                changeImage();
            });
            enterButton.addEventListener("mouseleave", function( event ) {
                enterBG.style.height = "100vh";
                enterBG.style.width = "100vw";
            });
        },
    },
    {
        namespace:'home',
        beforeEnter() {
            const images = document.querySelectorAll('.pickerIMG');
            counter.innerHTML = '01 / ' + images.length;  
        },
        afterEnter(data) {
            const images = document.querySelectorAll('.pickerIMG');
            const mainImage = document.querySelector('.mainIMG');
            const counter = document.querySelector('#counter');
            const leftButton = document.querySelector('#leftButton');
            const rightButton = document.querySelector('#rightButton');
            const middleContainer = document.querySelector('.middleContainer');
            const mainIMGContain = document.querySelector('#mainIMGContain')
            const delta = 6;
            let startX;
            let startY;
            let index = 0;
            let upCard = index-1;
            let mouseOn;
            
            function indexInClass(collection, node) {
              for (var i = 0; i < collection.length; i++) {
                if (collection[i] === node)
                  return i;
              }
              return -1;
            }
            //All the bad stuff below was DYLAN JUDY GROSS
            rightButton.addEventListener('click', function( event ) {
                if(index == images.length-1) {
                    index = -1;
                }
                mainImage.src = images[++index].src;
                if(index == 0) {
                    upCard = images.length-1;
                } else {
                    upCard = index-1;
                }
                images[index].style.transform = 'translateY(-80px)';
                images[upCard].style.transform = 'translateY(0px)';
                counter.innerHTML = (index + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ' / ' + images.length;
            });
            
            leftButton.addEventListener('click', function( event ) {
                if(index == 0) {
                    index = images.length;
                }
                mainImage.src = images[--index].src;
                if(index == images.length-1) {
                    upCard = 0;
                } else {
                    upCard = index+1;
                }
                images[index].style.transform = 'translateY(-80px)';
                images[upCard].style.transform = 'translateY(0px)';
                counter.innerHTML = (index + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ' / ' + images.length;
            });
            
            document.onkeydown = function(event) {
                if(event.keyCode == 39){
                    if(index == images.length-1) {
                    index = -1;
                    }
                    mainImage.src = images[++index].src;
                    if(index == 0) {
                        upCard = images.length-1;
                    } else {
                        upCard = index-1;
                    }
                    images[index].style.transform = 'translateY(-80px)';
                    images[upCard].style.transform = 'translateY(0px)';
                    counter.innerHTML = (index + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ' / ' + images.length;
                }
                if(event.keyCode == 37){
                    if(index == 0) {
                    index = images.length;
                    }
                    mainImage.src = images[--index].src;
                    if(index == images.length-1) {
                        upCard = 0;
                    } else {
                        upCard = index+1;
                    }
                    images[index].style.transform = 'translateY(-80px)';
                    images[upCard].style.transform = 'translateY(0px)';
                    counter.innerHTML = (index + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ' / ' + images.length;
                }
            }

            middleContainer.addEventListener('mouseover', function(event) {
                mainIMGContain.style.transform = 'scale(1.5)';
                mouseOn = true;
            });
            
            middleContainer.addEventListener('mouseleave', function(event) {
                mainIMGContain.style.transform = 'scale(1)';
                mainIMGContain.style.left = 0;
                mainIMGContain.style.top = 0;
                mouseOn = false;
            });
            
            Number.prototype.map = function (in_min, in_max, out_min, out_max) {
              return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }
            
            document.addEventListener('mousemove', function(event) {
                const mouseX = event.pageX.map(0, 100, 0, 50) + 'px - 25vw';
                const mouseY = event.pageY.map(0, 100, 0, 50) + 'px - 25vh';
                if(mouseOn == true){
                    mainIMGContain.style.left = 'calc(' + mouseX + ')';
                    mainIMGContain.style.top = 'calc(' + mouseY + ')';    
                }
            });
            
            for (i = 0; i < images.length; i++) {
                if(images[i].src === mainImage.src) {
                    images[i].style.transform = 'translateY(-80px)'
                };
                images[i].addEventListener('mouseover', function( event ) {
                    this.style.transform = 'translateY(-80px)';
                });
                images[i].addEventListener('mouseleave', function( event ) {
                    if(this.src !== mainImage.src){
                        this.style.transform = 'translateY(0px)';
                    }
                });
                images[i].addEventListener('mousedown', function( event ) {
                    startX = event.pageX;
                    startY = event.pageY;
                });
                images[i].addEventListener('mouseup', function( event ) {
                    const diffX = Math.abs(event.pageX - startX);
                    const diffY = Math.abs(event.pageY - startY);

                    if (diffX < delta && diffY < delta) {
                        mainImage.src = this.src;
                        let imgLoc = indexInClass(images, this) + 1;
                        index = imgLoc-1;
                        counter.innerHTML = imgLoc.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ' / ' + images.length;
                        for (j = 0; j < images.length; j ++) {
                            if(images[j].src === mainImage.src) {
                                images[j].style.transform = 'translateY(-80px)'
                            }
                            if(images[j].src !== mainImage.src && images[j].style.transform === 'translateY(-80px)'){
                                images[j].style.transform = 'translateY(0px)'
                            }
                        }
                    }
                })
            }
            
            new ScrollBooster({
                viewport: document.querySelector('#bottomNav'),
                content: document.querySelector('#imageSelector'),
                scrollMode: 'transform',
                direction: 'horizontal',
            });
        },
    },
    {
        namespace: 'about',
        afterEnter(data) {
            const jack = document.querySelector('#jack');
            const rob = document.querySelector('#rob');
            const noah = document.querySelector('#noah');
            const jackText = document.querySelector('#jackText');
            const robText = document.querySelector('#robText');
            const noahText = document.querySelector('#noahText');
            const clipOpen = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            const clipClosed = 'polygon(25% 0%, 25% 0, 0 100%, 0% 100%)';
            
            jack.addEventListener('click', event => {
                if(robText.style.marginRight == '1px' || noahText.style.marginRight == '1px') {
                    gsap.to(jackText, {clipPath: clipOpen, marginRight: '1px', delay: 1});
                    gsap.to(robText, {clipPath: clipClosed, marginRight: '0px'});
                    gsap.to(noahText, {clipPath: clipClosed, marginRight: '0px'});
                } else {
                    gsap.to(jackText, {clipPath: clipOpen, marginRight: '1px'});
                }
            });
            rob.addEventListener('click', event => {
                if(jackText.style.marginRight == '1px' || noahText.style.marginRight == '1px') {
                    gsap.to(robText, {clipPath: clipOpen, marginRight: '1px', delay: 1});
                    gsap.to(jackText, {clipPath: clipClosed, marginRight: '0px'});
                    gsap.to(noahText, {clipPath: clipClosed, marginRight: '0px'});
                } else {
                    gsap.to(robText, {clipPath: clipOpen, marginRight: '1px'});
                }
            });
            noah.addEventListener('click', event => {
                if(robText.style.marginRight == '1px' || jackText.style.marginRight == '1px') {
                    gsap.to(noahText, {clipPath: clipOpen, marginRight: '1px', delay: 1});
                    gsap.to(robText, {clipPath: clipClosed, marginRight: '0px'});
                    gsap.to(jackText, {clipPath: clipClosed, marginRight: '0px'});
                } else {
                    gsap.to(noahText, {clipPath: clipOpen, marginRight: '1px'});
                }
            });
        }
    }]
});