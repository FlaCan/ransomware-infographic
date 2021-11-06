const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)



/* Initial states ****************************************************************************************/


gsap.set(".line-left", {transformOrigin: "0% 50%"})
gsap.set(".line-right", {transformOrigin: "100% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})



/* Animations *********************************************************************************************/

const animDrop = gsap.to(".drop", {duration: 0.75, stagger:0.2, y: -25, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "<")
const animClock = gsap.to(".countdown#countdown_backup-offline", {paused: true, autoAlpha:1, scale: 1.5, ease: "back"}, "<")


function animBarrier(el) {
    const tl = gsap.timeline()
    .to(el + " .line-left", {scaleX: 0}, "<")
    .to(el + " .line-right", {scaleX: 0}, "<")
    .to(el + " .button-left", {x: -600}, "<")
    .to(el + " .button-right", {x: 600}, "<")
    .to(el + " .click-left", {x: -600}, "<")
    .to(el + " .click-right", {x: 600}, "<")
    .to(el + " .barrier-line-muted", {autoAlpha: 1}, "<")
    return tl
}

/* Barriers */

const animBarrierL1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier("#barrier-L1"))
    .to(".malware-L1", {autoAlpha: 1}, "+=0.1")
    .to(".slolen-L1", {autoAlpha: 1}, "<")
    .to(".user-L1 .workstation", {fill: "#CC0000"}, "<")
    .to(".malware-L1", {autoAlpha: 1}, "<")
    // .to("#target-credentials-L1", {visibility: "visible"}, "<")
    // .to("#target-data-L1", {visibility: "visible"}, "<")

    

const animBarrierL2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier("#barrier-L2"))
    .to(".malware-L2", {autoAlpha: 1}, "+=0.1")
    .to(".slolen-L2", {autoAlpha: 1}, "<")
    .to(".malware-L2", {autoAlpha: 1}, "<")
    .to(".device-L2", {fill: "#CC0000"}, "<")
    .to(".user-L2 .workstation", {fill: "#CC0000"}, "<")


    
const animBarrierL3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier("#barrier-L3"))
    .to(".malware-L3", {autoAlpha: 1}, "+=0.1" )
    .to(".stolen-L3", {autoAlpha: 1}, "<")    
    .to(".device-L3", {fill: "#CC0000"}, "<")
    .to(".malware-L3", {autoAlpha: 1}, "<")
    // .to("#target-data-L2-left", {visibility: "visible"}, "<")
    // .to("#target-data-L2-right", {visibility: "visible"}, "<")
    
    
const animBarrierL4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier("#barrier-L4"))
    .to(".malware-L4", {autoAlpha: 1}, "+=0.1" )
    .to(".device-L4", {fill: "#CC0000"}, "<")
    .to(".malware-L4", {autoAlpha: 1}, "<")
    

/* Click Listeners **********************************************************************************************/


const clicksL1 = selectAll("#barrier-L1 .click")
const clicksL2 = selectAll("#barrier-L2 .click")
const clicksL3 = selectAll("#barrier-L3 .click")
const clicksL4 = selectAll("#barrier-L4 .click")

clicksL1.forEach(item => {

    item.addEventListener("click", () => {
        if (animBarrierL1.reversed()) {
            animDrop.pause()
            animBarrierL1.play() 
        } else {
            animDrop.play()
            animBarrierL1.reverse() 
            animBarrierL2.reverse() 
            animBarrierL3.reverse() 
            animBarrierL4.reverse() 
            animClock.reverse()
        }
    }, false)
    
});


clicksL2.forEach(item => {
    
    item.addEventListener("click", () => {
        if (animBarrierL2.reversed()) {
            animDrop.pause()
            animBarrierL1.play()
            animBarrierL2.play()
        } else {
            animBarrierL2.reverse()
            animBarrierL3.reverse()
            animBarrierL4.reverse()
            animClock.reverse()
        }
    }, false)

});


clicksL3.forEach(item => {

    item.addEventListener("click", () => {
        if (animBarrierL3.reversed()) {
            animDrop.pause()
            animBarrierL1.play()
            animBarrierL2.play()
            animBarrierL3.play()
            animClock.play()
    
        } else {
            animBarrierL3.reverse()
            animBarrierL4.reverse()
            animClock.reverse()
        }
    }, false)

});


clicksL4.forEach(item => {

    item.addEventListener("click", () => {
        if (animBarrierL4.reversed()) {
            animDrop.pause()
            animBarrierL1.play()
            animBarrierL2.play()
            animBarrierL3.play()
            animBarrierL4.play()
            animClock.reverse()
        } else {
            animBarrierL4.reverse()
            animClock.play()
        }
    }, false)
    
});



/* Hover listeners - hover and seepch number must match *********************************************************/
const hover = selectAll(".hover")
const speech = selectAll(".speech")

for (let i = 0; i < hover.length; i++) {
    let anim = gsap.to(speech[i], {autoAlpha:1, paused: true, delay: 1})
    hover[i].addEventListener("mouseover", () =>{anim.play()}, false)
    hover[i].addEventListener("mouseleave", () =>{anim.reverse()}, false)
}

