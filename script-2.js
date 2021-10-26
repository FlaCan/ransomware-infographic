const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)



/* Initial states ****************************************************************************************/

gsap.set(".barrier-line", {scaleY: 1, transformOrigin: "0% 50%"})
gsap.set(".barrier-plus", {scaleY: 0, transformOrigin: "50% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})



/* Animations *********************************************************************************************/

const animDrop = gsap.to(".drop", {duration: 0.75, stagger:0.2, y: -25, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "+=0")
const animClock = gsap.to(".countdown#countdown_backup-offline", {paused: true, autoAlpha:1, scale: 1.5, ease: "back"}, "+=0")


/* Barriers */

const anim = gsap.timeline({paused: true, defaults:{duration:0.25}})

    .add("L0")

        .to("#barrier-L1 .barrier-line", {scaleX: 0}, "+=0")
        .to("#barrier-L1 .barrier-plus", {scaleY: 1}, "+=0")
        //.to("#barrier-button-L1", {x: -600}, "+=0")
        .to(".malware-L1", {autoAlpha: 1}, "+=0")
        .to(".slolen-L1", {autoAlpha: 1}, "+=0")
        .to(".user-L1 .workstation", {fill: "#CC0000"}, "+=0")
        .to(".malware-L1", {autoAlpha: 1}, "+=0")
        .to("#target-malware-L1", {visibility: "visible"}, "+=0")
        .to("#target-credentials-L1", {visibility: "visible"}, "+=0")
        .to("#target-data-L1", {visibility: "visible"}, "+=0")
        .to("#target-malware-L1-left", {visibility: "visible"}, "+=0")
        .to("#target-malware-L1-right", {visibility: "visible"}, "+=0")

    .add("L1")
        
        .to("#barrier-L2 .barrier-line", {scaleX: 0}, "+=0")
        .to("#barrier-L2 .barrier-plus", {scaleY: 1}, "+=0")
        //.to("#barrier-button-L2", {x: -600}, "+=0")
        .to(".malware-L2", {autoAlpha: 1}, "+=0")
        .to(".device-L2", {fill: "#CC0000"}, "+=0")
        .to(".user-L2 .workstation", {fill: "#CC0000"}, "+=0")
        .to("#target-malware-L2-center", {visibility: "visible"}, "+=0")
        .to("#target-malware-L2-top-left", {visibility: "visible"}, "+=0")
        .to("#target-malware-L2-top-right", {visibility: "visible"}, "+=0")
        .to("#target-malware-L2-bottom-left", {visibility: "visible"}, "+=0")
        .to("#target-malware-L2-bottom-right", {visibility: "visible"}, "+=0")

    .add("L2")
    
        .to("#barrier-L3 .barrier-line", {scaleX: 0}, "+=0")
        .to("#barrier-L3 .barrier-plus", {scaleY: 1}, "+=0")
        //.to("#barrier-button-L3", {x: -600}, "+=0")
        .to(".stolen-L3", {autoAlpha: 1}, "+=0")
        .to(".malware-L3", {autoAlpha: 1}, "+=0" )
        .to(".device-L3", {fill: "#CC0000"}, "+=0")
        .to("#target-malware-L3-right", {visibility: "visible"}, "+=0")
        .to("#target-malware-L3-center-right", {visibility: "visible"}, "+=0")
        .to("#target-malware-L3-center", {visibility: "visible"}, "+=0")
        .to("#target-malware-L3-center-left", {visibility: "visible"}, "+=0")
        .to("#target-malware-L3-left", {visibility: "visible"}, "+=0")
        .to("#target-data-L2-left", {visibility: "visible"}, "+=0")
        .to("#target-data-L2-right", {visibility: "visible"}, "+=0")
    
    
    .add("L3")
        
        .to("#barrier-L4 .barrier-line", {scaleX: 0}, "+=0")
        .to("#barrier-L4 .barrier-plus", {scaleY: 1}, "+=0")
        //.to("#barrier-button-L4", {x: -600}, "+=0")
        .to(".malware-L4", {autoAlpha: 1}, "+=0" )
        .to(".device-L4", {fill: "#CC0000"}, "+=0")
        .to("#target-malware-L4", {visibility: "visible"}, "+=0")


    .add("L4")
    

/* Click Listeners **********************************************************************************************/

const targetClickBarrierL1 = select("#target-click-barrier-L1")
const targetClickBarrierL2 = select("#target-click-barrier-L2")
const targetClickBarrierL3 = select("#target-click-barrier-L3")
const targetClickBarrierL4 = select("#target-click-barrier-L4")


let notClicked = true

targetClickBarrierL1.addEventListener("click", (e) => {
    
    if (notClicked) {

        anim.tweenTo("L1") 

    } else {

        anim.tweenTo("L0", {duration: 0}) 
    }

   notClicked = !notClicked

}, false)

targetClickBarrierL2.addEventListener("click", () => {

    if (notClicked) {

        anim.tweenTo("L2") 

    } else {

        anim.tweenTo("L0") 
    }

   notClicked = !notClicked

}, false)

targetClickBarrierL3.addEventListener("click", () => {

    if (notClicked) {

        anim.tweenTo("L3") 

    } else {

        anim.tweenTo("L0") 
    }

   notClicked = !notClicked

}, false)

targetClickBarrierL4.addEventListener("click", () => {

    if (notClicked) {

        anim.tweenTo("L4") 

    } else {

        anim.tweenTo("L0") 
    }

   notClicked = !notClicked

}, false)


/* Hover listeners - Rely on current html structure *********************************************************/
const ts = selectAll(".ts")

// for (let i = 0; i < ts.length; i++) {
//     let target = ts[i].firstElementChild
//     let speech = ts[i].lastElementChild
//     let anim = gsap.to(speech, {autoAlpha:1, paused: true, delay: 1})
//     target.addEventListener("mouseover", () =>{anim.play()}, false)
//     target.addEventListener("mouseleave", () =>{anim.reverse()}, false)
// }