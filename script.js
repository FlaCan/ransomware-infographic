const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)



/* Initial states ****************************************************************************************/

gsap.set(".barrier-line", {scaleY: 1, transformOrigin: "50% 50%"})
gsap.set(".barrier-plus", {scaleY: 0, transformOrigin: "50% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})
gsap.set(".speech", {autoAlpha: 0}) // Target visibility "hidden"" and opacity "0" by default, not reachable therefore speech cant't play...
gsap.set(".target-hover", {autoAlpha: 0, cursor: "help"}) // ...eccept for the following 
gsap.set(".target-hover.on", {visibility: "visible"})



/* Animations *********************************************************************************************/

gsap.fromTo(".drop", {y: -25}, {duration: 1, stagger:0.5, y: 0, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "<")
const pop = gsap.to(".countdown#countdown_backup-offline", {paused: true, autoAlpha:1, scale: 1.5, ease: "back"}, "<")


/* Barriers */

const barrierL1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-L1 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-L1 .barrier-plus", {scaleY: 1}, "<")
    .to(".slolen-L1", {autoAlpha: 1}, "<")
    .to(".malware-L1", {autoAlpha: 1}, "<")
    .to(".user-L1 .workstation", {fill: "#CC0000"}, "<")
    .to(".malware-L1", {autoAlpha: 1}, "<")
    .to("#target-malware-L1", {visibility: "visible"}, "<")
    .to("#target-credentials-L1", {visibility: "visible"}, "<")
    .to("#target-data-L1", {visibility: "visible"}, "<")
    .to("#target-malware-L1-left", {visibility: "visible"}, "<")
    .to("#target-malware-L1-right", {visibility: "visible"}, "<")
    
const barrierL2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-L2 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-L2 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-L2", {autoAlpha: 1}, "<")
    .to(".device-g0", {fill: "#CC0000"}, "<")
    .to(".user-L2 .workstation", {fill: "#CC0000"}, "<")
    .to("#target-malware-L2-center", {visibility: "visible"}, "<")
    .to("#target-malware-L2-top-left", {visibility: "visible"}, "<")
    .to("#target-malware-L2-top-right", {visibility: "visible"}, "<")
    .to("#target-malware-L2-bottom-left", {visibility: "visible"}, "<")
    .to("#target-malware-L2-bottom-right", {visibility: "visible"}, "<")

    
const barrierL3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-L3 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-L3 .barrier-plus", {scaleY: 1}, "<")
    .to(".stolen-L3", {autoAlpha: 1}, "<")
    .to(".malware-L3", {autoAlpha: 1}, "<" )
    .to(".device-g1", {fill: "#CC0000"}, "<")
    .to("#target-malware-L3-right", {visibility: "visible"}, "<")
    .to("#target-malware-L3-center-right", {visibility: "visible"}, "<")
    .to("#target-malware-L3-center", {visibility: "visible"}, "<")
    .to("#target-malware-L3-center-left", {visibility: "visible"}, "<")
    .to("#target-malware-L3-left", {visibility: "visible"}, "<")
    .to("#target-data-L2-left", {visibility: "visible"}, "<")
    .to("#target-data-L2-right", {visibility: "visible"}, "<")
    
    
const barrierL4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-L4 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-L4 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-L4", {autoAlpha: 1}, "<" )
    .to(".device-g2", {fill: "#CC0000"}, "<")
    .to("#target-malware-L4", {visibility: "visible"}, "<")
    

/* Click Listeners **********************************************************************************************/

const targetBarrierL1 = select("#target-barrier-L1")
const targetBarrierL2 = select("#target-barrier-L2")
const targetBarrierL3 = select("#target-barrier-L3")
const targetBarrierL4 = select("#target-barrier-L4")


targetBarrierL1.addEventListener("click", () => {
    if (barrierL1.reversed()) {
        barrierL1.play() // sets self to false (open)
    } else {
        barrierL1.reverse() // sets self to true (closed)
        barrierL2.reverse() // sets G2 to true (closed)
        barrierL3.reverse() // sets G3 to true (closed)
        pop.reverse()
        barrierL4.reverse() // sets G4 to true (closed)
    }
}, false)

targetBarrierL2.addEventListener("click", () => {
    if (barrierL2.reversed()) {
        barrierL1.play(); //sets G1 to false (open)
        barrierL2.play() //sets self to false (open)
    } else {
        barrierL2.reverse() //sets self to true (closed)
        barrierL3.reverse() // sets G3 to true (closed)
        pop.reverse()
        barrierL4.reverse() // sets G4 to true (closed)
    }
}, false)

targetBarrierL3.addEventListener("click", () => {
    if (barrierL3.reversed()) {
        barrierL1.play() //sets G1 to false (open)
        barrierL2.play() //sets G2 to false (open)
        barrierL3.play() //sets self to false (open)
        pop.play()

    } else {
        barrierL3.reverse() // sets self to true (closed)
        pop.reverse()
        barrierL4.reverse() // sets G4 to true (closed)                
    }
}, false)

targetBarrierL4.addEventListener("click", () => {
    if (barrierL4.reversed()) {
        barrierL1.play() //sets G1 to false (open)
        barrierL2.play() //sets G2 to false (open)
        barrierL3.play() //sets G3 to false (open)
        pop.reverse()
        barrierL4.play() //sets self to false (open)
    } else {
        pop.play()
        barrierL4.reverse() // sets self to true (closed)
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