const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

const targetClickL1 = select("#target-click-barrier-L1")
const targetClickL2 = select("#target-click-barrier-L2")
const targetClickL3 = select("#target-click-barrier-L3")
const targetClickL4 = select("#target-click-barrier-L4")

/* Initial states ****************************************************************************************/

gsap.set(".barrier-line", {scaleY: 1, transformOrigin: "0% 50%"})
gsap.set(".barrier-plus", {scaleY: 0, transformOrigin: "50% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})



/* Animations *********************************************************************************************/

const animDrop = gsap.to(".drop", {duration: 0.75, stagger:0.2, y: -25, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "+=0.25")
const animClock = gsap.to(".countdown#countdown_backup-offline", {paused: true, autoAlpha:1, scale: 1.5, ease: "back"}, "+=0.25")


/* Barriers */

const animBarrierL1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to("#barrier-L1 .barrier-line", {scaleX: 0}, "+=0.25")
    .to("#barrier-L1 .barrier-plus", {scaleY: 1}, "+=0.25")
    .to(".malware-L1", {autoAlpha: 1}, "+=0.25")
    .to(".slolen-L1", {autoAlpha: 1}, "+=0.25")
    .to(".user-L1 .workstation", {fill: "#CC0000"}, "+=0.25")
    .to(".malware-L1", {autoAlpha: 1}, "+=0.25")
    .to("#target-malware-L1", {visibility: "visible"}, "+=0.25")
    .to("#target-credentials-L1", {visibility: "visible"}, "+=0.25")
    .to("#target-data-L1", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L1-left", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L1-right", {visibility: "visible"}, "+=0.25")
    
const animBarrierL2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to("#barrier-L2 .barrier-line", {scaleX: 0}, "+=0.25")
    .to("#barrier-L2 .barrier-plus", {scaleY: 1}, "+=0.25")
    .to(".malware-L2", {autoAlpha: 1}, "+=0.25")
    .to(".device-L2", {fill: "#CC0000"}, "+=0.25")
    .to(".user-L2 .workstation", {fill: "#CC0000"}, "+=0.25")
    .to("#target-malware-L2-center", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L2-top-left", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L2-top-right", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L2-bottom-left", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L2-bottom-right", {visibility: "visible"}, "+=0.25")

    
const animBarrierL3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to("#barrier-L3 .barrier-line", {scaleX: 0}, "+=0.25")
    .to("#barrier-L3 .barrier-plus", {scaleY: 1}, "+=0.25")
    .to(".stolen-L3", {autoAlpha: 1}, "+=0.25")
    .to(".malware-L3", {autoAlpha: 1}, "+=0.25" )
    .to(".device-L3", {fill: "#CC0000"}, "+=0.25")
    .to("#target-malware-L3-right", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L3-center-right", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L3-center", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L3-center-left", {visibility: "visible"}, "+=0.25")
    .to("#target-malware-L3-left", {visibility: "visible"}, "+=0.25")
    .to("#target-data-L2-left", {visibility: "visible"}, "+=0.25")
    .to("#target-data-L2-right", {visibility: "visible"}, "+=0.25")
    
    
const animBarrierL4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to("#barrier-L4 .barrier-line", {scaleX: 0}, "+=0.25")
    .to("#barrier-L4 .barrier-plus", {scaleY: 1}, "+=0.25")
    .to(".malware-L4", {autoAlpha: 1}, "+=0.25" )
    .to(".device-L4", {fill: "#CC0000"}, "+=0.25")
    .to("#target-malware-L4", {visibility: "visible"}, "+=0.25")
    

/* Click Listeners **********************************************************************************************/




targetClickL1.addEventListener("click", () => {
    if (animBarrierL1.reversed()) {
        animDrop.pause()
        animBarrierL1.play() // sets self to false (open)
    } else {
        animDrop.play()
        animBarrierL1.reverse() // sets self to true (closed)
        animBarrierL2.reverse() // sets G2 to true (closed)
        animBarrierL3.reverse() // sets G3 to true (closed)
        animClock.reverse()
        animBarrierL4.reverse() // sets G4 to true (closed)
    }
}, false)

targetClickL2.addEventListener("click", () => {
    if (animBarrierL2.reversed()) {
        animDrop.pause()
        animBarrierL1.play(); //sets G1 to false (open)
        animBarrierL2.play() //sets self to false (open)
    } else {
        animBarrierL2.reverse() //sets self to true (closed)
        animBarrierL3.reverse() // sets G3 to true (closed)
        animClock.reverse()
        animBarrierL4.reverse() // sets G4 to true (closed)
    }
}, false)

targetClickL3.addEventListener("click", () => {
    if (animBarrierL3.reversed()) {
        animDrop.pause()
        animBarrierL1.play() //sets G1 to false (open)
        animBarrierL2.play() //sets G2 to false (open)
        animBarrierL3.play() //sets self to false (open)
        animClock.play()

    } else {
        animBarrierL3.reverse() // sets self to true (closed)
        animClock.reverse()
        animBarrierL4.reverse() // sets G4 to true (closed)                
    }
}, false)

targetClickL4.addEventListener("click", () => {
    if (animBarrierL4.reversed()) {
        animDrop.pause()
        animBarrierL1.play() //sets G1 to false (open)
        animBarrierL2.play() //sets G2 to false (open)
        animBarrierL3.play() //sets G3 to false (open)
        animClock.reverse()
        animBarrierL4.play() //sets self to false (open)
    } else {
        animClock.play()
        animBarrierL4.reverse() // sets self to true (closed)
    }
}, false)


/* Hover listeners - Rely on current html structure *********************************************************/
const ts = selectAll(".ts")

for (let i = 0; i < ts.length; i++) {
    let target = ts[i].firstElementChild
    let speech = ts[i].lastElementChild
    let anim = gsap.to(speech, {autoAlpha:1, paused: true, delay: 1})
    target.addEventListener("mouseover", () =>{anim.play()}, false)
    target.addEventListener("mouseleave", () =>{anim.reverse()}, false)
}