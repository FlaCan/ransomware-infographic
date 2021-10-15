const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

console.log(selectAll(".target"))
console.log(selectAll(".speech"))

const targetBarrierL1 = select("#target-barrier-1")
const targetBarrierL2 = select("#target-barrier-2")
const targetBarrierL3 = select("#target-barrier-3")
const targetBarrierL4 = select("#target-barrier-4")
const targetDropsL0 = select("#target-drops-0")
const targetAttackerL0 = select("#target-attacker-0")

/* Initial states ****************************************************************************************/


gsap.set(".barrier-line", {scaleY: 1, transformOrigin: "50% 50%"})
gsap.set(".barrier-plus", {scaleY: 0, transformOrigin: "50% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})


// all target visibility "hidden"" and opacity 0 by default, eccept for the following visibility "visible" and opacity (still) 0, to be targettable

gsap.set(
    [
    targetBarrierL1, 
    targetBarrierL2, 
    targetBarrierL3, 
    targetBarrierL4, 
    targetDropsL0, 
    targetAttackerL0, 
    "#target-user-1", 
    "#target-user-2-left", 
    "#target-user-2-right", 
    "#target-device-2", 
    "#target-device-3-left", 
    "#target-device-3-center", 
    "#target-device-3-right", 
    "#target-device-4"
    ], 
    {visibility: "visible"}
    )




/* Animations *********************************************************************************************/


/* Running */

gsap.fromTo(".drop", {y: -25}, {duration: 1, stagger:0.5, y: 0, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "<")
const pop = gsap.to(".countdown#countdown_backup-offline", {paused: true, autoAlpha:1, scale: 1.5, ease: "back"}, "<")




/* Speeches Animations*/


const speechAttacker0 = gsap.to("#speech-attacker-0", {autoAlpha:1, paused: true, delay: 1})
const speechDroppers0 = gsap.to("#speech-droppers-0", {autoAlpha:1, paused: true, delay: 1})
const speechMalware1 = gsap.to("#speech-malware-1", {autoAlpha:1, paused: true, delay: 1})
const speechCredentials1 = gsap.to("#speech-credentials-1", {autoAlpha:1, paused: true, delay: 1})
const speechData1 = gsap.to("#speech-data-1", {autoAlpha:1, paused: true, delay: 1})
const speechMalware1Left = gsap.to("#speech-malware-1-left", {autoAlpha:1, paused: true, delay: 1})
const speechMalware1Right = gsap.to("#speech-malware-1-right", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier1 = gsap.to("#speech-barrier-1", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier2 = gsap.to("#speech-barrier-2", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier3 = gsap.to("#speech-barrier-3", {autoAlpha:1, paused: true, delay: 1})
const speechBarrier4 = gsap.to("#speech-barrier-4", {autoAlpha:1, paused: true, delay: 1})
const speechUser1 = gsap.to("#speech-user-1", {autoAlpha:1, paused: true, delay: 1})
const speechUser2Left = gsap.to("#speech-user-2-left", {autoAlpha:1, paused: true, delay: 1})
const speechUser2Right = gsap.to("#speech-user-2-right", {autoAlpha:1, paused: true, delay: 1})
const speechDevice2 = gsap.to("#speech-device-2", {autoAlpha:1, paused: true, delay: 1})
const speechDevice3Center = gsap.to("#speech-device-3-center", {autoAlpha:1, paused: true, delay: 1})
const speechDevice3Right = gsap.to("#speech-device-3-right", {autoAlpha:1, paused: true, delay: 1})
const speechDevice3Left = gsap.to("#speech-device-3-left", {autoAlpha:1, paused: true, delay: 1})
const speechDevice4 = gsap.to("#speech-device-4", {autoAlpha:1, paused: true, delay: 1})



/* Barriers */

const barrierL1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g1 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g1 .barrier-plus", {scaleY: 1}, "<")
    .to(".slolen-g1", {autoAlpha: 1}, "<")
    .to(".malware-g0", {autoAlpha: 1}, "<")
    .to(".user-g1 .workstation", {fill: "#CC0000"}, "<")
    .to(".malware-g1", {autoAlpha: 1}, "<")
    .to("#target-malware-0", {visibility: "visible"}, "<")
    .to("#target-credentials-1", {visibility: "visible"}, "<")
    .to("#target-data-1", {visibility: "visible"}, "<")
    .to("#target-malware-1-left", {visibility: "visible"}, "<")
    .to("#target-malware-1-right", {visibility: "visible"}, "<")
    
const barrierL2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g2 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g2 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-g2", {autoAlpha: 1}, "<")
    .to(".device-g0", {fill: "#CC0000"}, "<")
    .to(".user-g2 .workstation", {fill: "#CC0000"}, "<")
    .to("#target-malware-2-center", {visibility: "visible"}, "<")
    .to("#target-malware-2-top-left", {visibility: "visible"}, "<")
    .to("#target-malware-2-top-right", {visibility: "visible"}, "<")
    .to("#target-malware-2-bottom-left", {visibility: "visible"}, "<")
    .to("#target-malware-2-bottom-right", {visibility: "visible"}, "<")

    
const barrierL3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g3 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g3 .barrier-plus", {scaleY: 1}, "<")
    .to(".stolen-g3", {autoAlpha: 1}, "<")
    .to(".malware-g3", {autoAlpha: 1}, "<" )
    .to(".device-g1", {fill: "#CC0000"}, "<")
    .to("#target-malware-3-right", {visibility: "visible"}, "<")
    .to("#target-malware-3-center-right", {visibility: "visible"}, "<")
    .to("#target-malware-3-center", {visibility: "visible"}, "<")
    .to("#target-malware-3-center-left", {visibility: "visible"}, "<")
    .to("#target-malware-3-left", {visibility: "visible"}, "<")
    .to("#target-data-2-left", {visibility: "visible"}, "<")
    .to("#target-data-2-right", {visibility: "visible"}, "<")
    
    
const barrierL4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g4 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g4 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-g4", {autoAlpha: 1}, "<" )
    .to(".device-g2", {fill: "#CC0000"}, "<")
    .to("#target-malware-4", {visibility: "visible"}, "<")
    

    
    

    

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


select("#target-user-1").addEventListener("mouseover", () =>{speechUser1.play()}, false)
select("#target-user-1").addEventListener("mouseleave", () =>{speechUser1.reverse()}, false)


select("#target-user-2-left").addEventListener("mouseover", () =>{speechUser2Left.play()}, false)
select("#target-user-2-left").addEventListener("mouseleave", () =>{speechUser2Left.reverse()}, false)


select("#target-user-2-right").addEventListener("mouseover", () =>{speechUser2Right.play()}, false)
select("#target-user-2-right").addEventListener("mouseleave", () =>{speechUser2Right.reverse()}, false)


select("#target-device-2").addEventListener("mouseover", () =>{speechDevice2.play()}, false)
select("#target-device-2").addEventListener("mouseleave", () =>{speechDevice2.reverse()}, false)


select("#target-device-3-center").addEventListener("mouseover", () =>{speechDevice3Center.play()}, false)
select("#target-device-3-center").addEventListener("mouseleave", () =>{speechDevice3Center.reverse()}, false)


select("#target-device-3-right").addEventListener("mouseover", () =>{speechDevice3Right.play()}, false)
select("#target-device-3-right").addEventListener("mouseleave", () =>{speechDevice3Right.reverse()}, false)


select("#target-device-3-left").addEventListener("mouseover", () =>{speechDevice3Left.play()}, false)
select("#target-device-3-left").addEventListener("mouseleave", () =>{speechDevice3Left.reverse()}, false)


select("#target-device-4").addEventListener("mouseover", () =>{speechDevice4.play()}, false)
select("#target-device-4").addEventListener("mouseleave", () =>{speechDevice4.reverse()}, false)





// only if relative barriers are open

select("#target-malware-0").addEventListener("mouseover", () =>{
    if (!barrierL1.reversed()) {
        speechMalware1.play()
    }
}, false)
select("#target-malware-0").addEventListener("mouseleave", () =>{
    speechMalware1.reverse()
}, false)



select("#target-credentials-1").addEventListener("mouseover", () =>{
    if (!barrierL1.reversed()) {
        speechCredentials1.play()
    }
}, false)
select("#target-credentials-1").addEventListener("mouseleave", () =>{
    speechCredentials1.reverse()
}, false)



select("#target-data-1").addEventListener("mouseover", () =>{
    if (!barrierL1.reversed()) {
        speechData1.play()
    }
}, false)
select("#target-data-1").addEventListener("mouseleave", () =>{
    speechData1.reverse()
}, false)



select("#target-malware-1-left").addEventListener("mouseover", () =>{
    if (!barrierL1.reversed()) {
        speechMalware1Left.play()
    }
}, false)
select("#target-malware-1-left").addEventListener("mouseleave", () =>{
    speechMalware1Left.reverse()
}, false)



select("#target-malware-1-right").addEventListener("mouseover", () =>{
    if (!barrierL1.reversed()) {
        speechMalware1Right.play()
    }
}, false)
select("#target-malware-1-right").addEventListener("mouseleave", () =>{
    speechMalware1Right.reverse()
}, false)
