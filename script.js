gsap.registerPlugin(ScrollToPlugin);
const select = (el) => select(el)
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

const animBarrier1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-1"))
    .to(".malware-L1", {autoAlpha: 1}, "+=0.1")
    .to(".slolen-L1", {autoAlpha: 1}, "<")
    .to(".user-L1 .workstation", {fill: "#CC0000"}, "<")
    .to(".malware-L1", {autoAlpha: 1}, "<")
    .to("#trigger-credential-1", {visibility: "visible"}, "<")
    .to("#trigger-malware-1", {visibility: "visible"}, "<")
    .to("#trigger-malware-2", {visibility: "visible"}, "<")

    

const animBarrier2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-2"))
    .to(".malware-L2", {autoAlpha: 1}, "+=0.1")
    .to(".slolen-L2", {autoAlpha: 1}, "<")
    .to(".malware-L2", {autoAlpha: 1}, "<")
    .to(".device-L2", {fill: "#CC0000"}, "<")
    .to(".user-L2 .workstation", {fill: "#CC0000"}, "<")


    
const animBarrier3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-3"))
    .to(".malware-L3", {autoAlpha: 1}, "+=0.1" )
    .to(".stolen-L3", {autoAlpha: 1}, "<")    
    .to(".device-L3", {fill: "#CC0000"}, "<")
    .to(".malware-L3", {autoAlpha: 1}, "<")
    
    
const animBarrier4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-4"))
    .to(".malware-L4", {autoAlpha: 1}, "+=0.1" )
    .to(".device-L4", {fill: "#CC0000"}, "<")
    .to(".malware-L4", {autoAlpha: 1}, "<")
    

/* Click Listeners **********************************************************************************************/


const clicksL1 = selectAll(".barrier-1 .trigger")
const clicksL2 = selectAll(".barrier-2 .trigger")
const clicksL3 = selectAll(".barrier-3 .trigger")
const clicksL4 = selectAll(".barrier-4 .trigger")

clicksL1.forEach(item => {

    item.addEventListener("click", () => {
        if (animBarrier1.reversed()) {
            animDrop.pause()
            animBarrier1.play() 
        } else {
            animDrop.play()
            animBarrier1.reverse() 
            animBarrier2.reverse() 
            animBarrier3.reverse() 
            animBarrier4.reverse() 
            animClock.reverse()
        }
    }, false)
    
});


clicksL2.forEach(item => {
    
    item.addEventListener("click", () => {
        if (animBarrier2.reversed()) {
            animDrop.pause()
            animBarrier1.play()
            animBarrier2.play()
        } else {
            animBarrier2.reverse()
            animBarrier3.reverse()
            animBarrier4.reverse()
            animClock.reverse()
        }
    }, false)

});


clicksL3.forEach(item => {

    item.addEventListener("click", () => {
        if (animBarrier3.reversed()) {
            animDrop.pause()
            animBarrier1.play()
            animBarrier2.play()
            animBarrier3.play()
            animClock.play()
    
        } else {
            animBarrier3.reverse()
            animBarrier4.reverse()
            animClock.reverse()
        }
    }, false)

});


clicksL4.forEach(item => {

    item.addEventListener("click", () => {
        if (animBarrier4.reversed()) {
            animDrop.pause()
            animBarrier1.play()
            animBarrier2.play()
            animBarrier3.play()
            animBarrier4.play()
            animClock.reverse()
        } else {
            animBarrier4.reverse()
            animClock.play()
        }
    }, false)
    
});



/* trigger listeners - trigger and speech number must match *********************************************************/
const trigger = document.querySelectorAll(".trigger")
// const speech = selectAll(".speech")

// for (let i = 0; i < trigger.length; i++) {
//     let anim = gsap.to(speech[i], {autoAlpha:1, paused: true, delay: 1})
//     trigger[i].addEventListener("mouseover", () =>{anim.play()}, false)
//     trigger[i].addEventListener("mouseleave", () =>{anim.reverse()}, false)
// }

const target = document.querySelectorAll(".target")

for (let i = 0; i < trigger.length; i++) {
    trigger[i].addEventListener("click", () => {
        target[i].classList.add("highlight")
        for (let j = 0; j < trigger.length; j++) {
            if (trigger[i] !== trigger[j]) {
                target[j].classList.remove("highlight")
            }
        }
        let measure = target[i].getBoundingClientRect().y
        window.scrollBy({
            top: measure - 35,
            left: 0,
            behavior: 'smooth'
          });
      });
    }