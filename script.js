const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

console.log(selectAll(".target"))
console.log(selectAll(".speech"))

const targetBarrierL1 = select("#target-barrier-L1")
const targetBarrierL2 = select("#target-barrier-L2")
const targetBarrierL3 = select("#target-barrier-L3")
const targetBarrierL4 = select("#target-barrier-L4")
const targetDropsL0 = select("#target-drops-L0")
const targetAttackerL0 = select("#target-user-L0")
const targetUserL1 = select("#target-user-L1")
const targetUserL2Left = select("#target-user-L2-left")

/* Initial states ****************************************************************************************/

gsap.set(".barrier-line", {scaleY: 1, transformOrigin: "50% 50%"})
gsap.set(".barrier-plus", {scaleY: 0, transformOrigin: "50% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})
gsap.fromTo(".drop", {y: -25}, {duration: 1, stagger:0.5, y: 0, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "<")

gsap.set(".speech", {autoAlpha: 0})
// Target visibility "hidden"" and opacity "0" by default, therefore not reachable and speech cant't play...
gsap.set(".target", {autoAlpha: 0.5})
// ...eccept for the following 
gsap.set(".target.target-on", {visibility: "visible"})



/* Animations *********************************************************************************************/


const pop = gsap.to(".countdown#countdown_backup-offline", {paused: true, autoAlpha:1, scale: 1.5, ease: "back"}, "<")



/* Speeches Animations*/

const speechAttacker0 = gsap.to("#speech-user-L0", {autoAlpha:1, paused: true, delay: 1})
const speechDroppers0 = gsap.to("#speech-drops-L0", {autoAlpha:1, paused: true, delay: 1})
const speechMalware1 = gsap.to("#speech-malware-L1", {autoAlpha:1, paused: true, delay: 1})
const speechCredentials1 = gsap.to("#speech-credentials-L1", {autoAlpha:1, paused: true, delay: 1})
const speechData1 = gsap.to("#speech-data-L1", {autoAlpha:1, paused: true, delay: 1})
const speechMalware1Left = gsap.to("#speech-malware-L1-left", {autoAlpha:1, paused: true, delay: 1})
const speechMalware1Right = gsap.to("#speech-malware-L1-right", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier1 = gsap.to("#speech-barrier-L1", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier2 = gsap.to("#speech-barrier-L2", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier3 = gsap.to("#speech-barrier-L3", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier4 = gsap.to("#speech-barrier-L4", {autoAlpha:1, paused: true, delay: 1})
const speechUser1 = gsap.to("#speech-user-1", {autoAlpha:1, paused: true, delay: 1})
const speechUser2Left = gsap.to("#speech-user-L2-left", {autoAlpha:1, paused: true, delay: 1})
const speechUser2Right = gsap.to("#speech-user-L2-right", {autoAlpha:1, paused: true, delay: 1})
const speechDevice2 = gsap.to("#speech-device-L2", {autoAlpha:1, paused: true, delay: 1})
const speechDevice3Center = gsap.to("#speech-device-L3-center", {autoAlpha:1, paused: true, delay: 1})
const speechDevice3Right = gsap.to("#speech-device-L3-right", {autoAlpha:1, paused: true, delay: 1})
const speechDevice3Left = gsap.to("#speech-device-L3-left", {autoAlpha:1, paused: true, delay: 1})
const speechDevice4 = gsap.to("#speech-device-L4", {autoAlpha:1, paused: true, delay: 1})


/* Hover Listeners *****************************************************************************************/

targetBarrierL1.addEventListener("mouseover", () =>{speechBarrier1.play()}, false)
targetBarrierL1.addEventListener("mouseleave", () =>{speechBarrier1.reverse()}, false)

targetBarrierL2.addEventListener("mouseover", () =>{speechBarrier2.play()}, false)
targetBarrierL2.addEventListener("mouseleave", () =>{speechBarrier2.reverse()}, false)

targetBarrierL3.addEventListener("mouseover", () =>{speechBarrier3.play()}, false)
targetBarrierL3.addEventListener("mouseleave", () =>{speechBarrier3.reverse()}, false)

targetBarrierL4.addEventListener("mouseover", () =>{speechBarrier4.play()}, false)
targetBarrierL4.addEventListener("mouseleave", () =>{speechBarrier4.reverse()}, false) 

targetDropsL0.addEventListener("mouseover", () =>{speechDroppers0.play()}, false)
targetDropsL0.addEventListener("mouseleave", () =>{speechDroppers0.reverse()}, false)

targetAttackerL0.addEventListener("mouseover", () =>{speechAttacker0.play()}, false)
targetAttackerL0.addEventListener("mouseleave", () =>{speechAttacker0.reverse()}, false)

targetUserL1.addEventListener("mouseover", () =>{speechUser1.play()}, false)
targetUserL1.addEventListener("mouseleave", () =>{speechUser1.reverse()}, false)


targetUserL2Left.addEventListener("mouseover", () =>{speechUser2Left.play()}, false)
targetUserL2Left.addEventListener("mouseleave", () =>{speechUser2Left.reverse()}, false)


select("#target-user-L2-right").addEventListener("mouseover", () =>{speechUser2Right.play()}, false)
select("#target-user-L2-right").addEventListener("mouseleave", () =>{speechUser2Right.reverse()}, false)


select("#target-device-L2").addEventListener("mouseover", () =>{speechDevice2.play()}, false)
select("#target-device-L2").addEventListener("mouseleave", () =>{speechDevice2.reverse()}, false)


select("#target-device-L3-center").addEventListener("mouseover", () =>{speechDevice3Center.play()}, false)
select("#target-device-L3-center").addEventListener("mouseleave", () =>{speechDevice3Center.reverse()}, false)


select("#target-device-L3-right").addEventListener("mouseover", () =>{speechDevice3Right.play()}, false)
select("#target-device-L3-right").addEventListener("mouseleave", () =>{speechDevice3Right.reverse()}, false)


select("#target-device-L3-left").addEventListener("mouseover", () =>{speechDevice3Left.play()}, false)
select("#target-device-L3-left").addEventListener("mouseleave", () =>{speechDevice3Left.reverse()}, false)


select("#target-device-L4").addEventListener("mouseover", () =>{speechDevice4.play()}, false)
select("#target-device-L4").addEventListener("mouseleave", () =>{speechDevice4.reverse()}, false)


select("#target-malware-L1").addEventListener("mouseover", () =>{speechMalware1.play()}, false)
select("#target-malware-L1").addEventListener("mouseleave", () =>{speechMalware1.reverse()}, false)


select("#target-credentials-L1").addEventListener("mouseover", () =>{speechCredentials1.play()}, false)
select("#target-credentials-L1").addEventListener("mouseleave", () =>{speechCredentials1.reverse()}, false)


select("#target-data-L1").addEventListener("mouseover", () =>{speechData1.play()}, false)
select("#target-data-L1").addEventListener("mouseleave", () =>{speechData1.reverse()}, false)


select("#target-malware-L1-left").addEventListener("mouseover", () =>{speechMalware1Left.play()}, false)
select("#target-malware-L1-left").addEventListener("mouseleave", () =>{speechMalware1Left.reverse()}, false)


select("#target-malware-L1-right").addEventListener("mouseover", () =>{speechMalware1Right.play()}, false)
select("#target-malware-L1-right").addEventListener("mouseleave", () =>{speechMalware1Right.reverse()}, false)



/* Barriers */

const barrierL1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g1 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g1 .barrier-plus", {scaleY: 1}, "<")
    .to(".slolen-g1", {autoAlpha: 1}, "<")
    .to(".malware-g0", {autoAlpha: 1}, "<")
    .to(".user-g1 .workstation", {fill: "#CC0000"}, "<")
    .to(".malware-g1", {autoAlpha: 1}, "<")
    // targets become visible therefore reachable and speech can play
    .to("#target-malware-L1", {visibility: "visible"}, "<")
    .to("#target-credentials-L1", {visibility: "visible"}, "<")
    .to("#target-data-L1", {visibility: "visible"}, "<")
    .to("#target-malware-L1-left", {visibility: "visible"}, "<")
    .to("#target-malware-L1-right", {visibility: "visible"}, "<")
    
const barrierL2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g2 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g2 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-g2", {autoAlpha: 1}, "<")
    .to(".device-g0", {fill: "#CC0000"}, "<")
    .to(".user-g2 .workstation", {fill: "#CC0000"}, "<")
    .to("#target-malware-L2-center", {visibility: "visible"}, "<")
    .to("#target-malware-L2-top-left", {visibility: "visible"}, "<")
    .to("#target-malware-L2-top-right", {visibility: "visible"}, "<")
    .to("#target-malware-L2-bottom-left", {visibility: "visible"}, "<")
    .to("#target-malware-L2-bottom-right", {visibility: "visible"}, "<")

    
const barrierL3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g3 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g3 .barrier-plus", {scaleY: 1}, "<")
    .to(".stolen-g3", {autoAlpha: 1}, "<")
    .to(".malware-g3", {autoAlpha: 1}, "<" )
    .to(".device-g1", {fill: "#CC0000"}, "<")
    .to("#target-malware-L3-right", {visibility: "visible"}, "<")
    .to("#target-malware-L3-center-right", {visibility: "visible"}, "<")
    .to("#target-malware-L3-center", {visibility: "visible"}, "<")
    .to("#target-malware-L3-center-left", {visibility: "visible"}, "<")
    .to("#target-malware-L3-left", {visibility: "visible"}, "<")
    .to("#target-data-L2-left", {visibility: "visible"}, "<")
    .to("#target-data-L2-right", {visibility: "visible"}, "<")
    
    
const barrierL4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g4 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g4 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-g4", {autoAlpha: 1}, "<" )
    .to(".device-g2", {fill: "#CC0000"}, "<")
    .to("#target-malware-L4", {visibility: "visible"}, "<")
    

/* Click Listeners ********************************************************************************/

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


