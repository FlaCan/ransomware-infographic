const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

/* Initial states */


gsap.set(".barrier-line", {scaleY: 1, transformOrigin: "50% 50%"})
gsap.set(".barrier-plus", {scaleY: 0, transformOrigin: "50% 50%"})
gsap.set("#countdown > path", {transformOrigin: "50% 50%"})






// all target visibility "hidden"" and opacity 0 by default, eccept for the following visibility "visible" and opacity (still) 0, to be targettable

gsap.set("#target-barrier-1", {visibility: "visible"})
gsap.set("#target-barrier-2", {visibility: "visible"})
gsap.set("#target-barrier-3", {visibility: "visible"})
gsap.set("#target-barrier-4", {visibility: "visible"})
gsap.set("#target-drops-0", {visibility: "visible"})
gsap.set("#target-attacker-0", {visibility: "visible"})
gsap.set("#target-user-1", {visibility: "visible"})
gsap.set("#target-user-2-left", {visibility: "visible"})
gsap.set("#target-user-2-right", {visibility: "visible"})
gsap.set("#target-device-2", {visibility: "visible"})
gsap.set("#target-device-3-left", {visibility: "visible"})
gsap.set("#target-device-3-center", {visibility: "visible"})
gsap.set("#target-device-3-right", {visibility: "visible"})
gsap.set("#target-device-4", {visibility: "visible"})





/* Animations *********************************************************************************************/


/* Running */

gsap.fromTo(".drop", {y: -25}, {duration: 1, stagger:0.5, y: 0, repeat: -1, yoyo: true})
gsap.to("#countdown > path", {duration: 2, rotate:360, repeat: -1, ease: "linear"}, "<")

/* Speeches */

const speechBarrier1Before = gsap.to("#speech-barrier-1-before", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier1After = gsap.to("#speech-barrier-1-after", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier2Before = gsap.to("#speech-barrier-2-before", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier2After = gsap.to("#speech-barrier-2-after", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier3Before = gsap.to("#speech-barrier-3-before", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier3After = gsap.to("#speech-barrier-3-after", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier4Before = gsap.to("#speech-barrier-4-before", {autoAlpha:1, paused: true, delay: 2})
const speechBarrier4After = gsap.to("#speech-barrier-4-after", {autoAlpha:1, paused: true, delay: 2})
const speechUser1Before = gsap.to("#speech-user-1-before", {autoAlpha:1, paused: true, delay: 2})
const speechUser1After = gsap.to("#speech-user-1-after", {autoAlpha:1, paused: true, delay: 2})
const speechUser2LeftBefore = gsap.to("#speech-user-2-left-before", {autoAlpha:1, paused: true, delay: 2})
const speechUser2LeftAfter = gsap.to("#speech-user-2-left-after", {autoAlpha:1, paused: true, delay: 2})
const speechUser2RightBefore = gsap.to("#speech-user-2-right-before", {autoAlpha:1, paused: true, delay: 2})
const speechUser2RightAfter = gsap.to("#speech-user-2-right-after", {autoAlpha:1, paused: true, delay: 2})
const speechAttacker0 = gsap.to("#speech-attacker-0", {autoAlpha:1, paused: true, delay: 2})
const speechDroppers0 = gsap.to("#speech-droppers-0", {autoAlpha:1, paused: true, delay: 2})
const speechMalware1 = gsap.to("#speech-malware-1", {autoAlpha:1, paused: true, delay: 2})
const speechCredentials1 = gsap.to("#speech-credentials-1", {autoAlpha:1, paused: true, delay: 2})
const speechData1 = gsap.to("#speech-data-1", {autoAlpha:1, paused: true, delay: 2})
const speechMalware1Left = gsap.to("#speech-malware-1-left", {autoAlpha:1, paused: true, delay: 2})
const speechMalware1Right = gsap.to("#speech-malware-1-right", {autoAlpha:1, paused: true, delay: 2})
const speechDevice2Before = gsap.to("#speech-device-2-before", {autoAlpha:1, paused: true, delay: 2})
const speechDevice2After = gsap.to("#speech-device-2-after", {autoAlpha:1, paused: true, delay: 2})
const speechDevice3CenterBefore = gsap.to("#speech-device-3-center-before", {autoAlpha:1, paused: true, delay: 2})
const speechDevice3CenterAfter = gsap.to("#speech-device-3-center-after", {autoAlpha:1, paused: true, delay: 2})
const speechDevice3RightBefore = gsap.to("#speech-device-3-right-before", {autoAlpha:1, paused: true, delay: 2})
const speechDevice3RightAfter = gsap.to("#speech-device-3-right-after", {autoAlpha:1, paused: true, delay: 2})
const speechDevice3LeftBefore = gsap.to("#speech-device-3-left-before", {autoAlpha:1, paused: true, delay: 2})
const speechDevice3LeftAfter = gsap.to("#speech-device-3-left-after", {autoAlpha:1, paused: true, delay: 2})
const speechDevice4Before = gsap.to("#speech-device-4-before", {autoAlpha:1, paused: true, delay: 2})
const speechDevice4After = gsap.to("#speech-device-4-after", {autoAlpha:1, paused: true, delay: 2})


/* Barriers */

const barrierG1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
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
    
const barrierG2 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
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

    
const barrierG3 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
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
    // only scale - the rotation keeps going in background
    .to(".countdown#countdown_backup-offline", {autoAlpha:1, scale: 1.5, ease: "back"}, "<")

const barrierG4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.25}})
    .to(".barrier-g4 .barrier-line", {scaleX: 0}, "<")
    .to(".barrier-g4 .barrier-plus", {scaleY: 1}, "<")
    .to(".malware-g4", {autoAlpha: 1}, "<" )
    .to(".device-g2", {fill: "#CC0000"}, "<")
    .to("#target-malware-4", {visibility: "visible"}, "<")

    

/* Click Listeners ********************************************************************************/

select("#target-barrier-1").addEventListener("click", () => {
    if (barrierG1.reversed()) {
        barrierG1.play() // sets self to false (open)
    } else {
        barrierG1.reverse() // sets self to true (closed)
        barrierG2.reverse() // sets G2 to true (closed)
        barrierG3.reverse() // sets G3 to true (closed)
        barrierG4.reverse() // sets G4 to true (closed)
    }
}, false)

select("#target-barrier-2").addEventListener("click", () => {
    if (barrierG2.reversed()) {
        barrierG1.play(); //sets G1 to false (open)
        barrierG2.play() //sets self to false (open)
    } else {
        barrierG2.reverse() //sets self to true (closed)
        barrierG3.reverse() // sets G3 to true (closed)
        barrierG4.reverse() // sets G4 to true (closed)
    }
}, false)

select("#target-barrier-3").addEventListener("click", () => {
    if (barrierG3.reversed()) {
        barrierG1.play() //sets G1 to false (open)
        barrierG2.play() //sets G2 to false (open)
        barrierG3.play() //sets self to false (open)

    } else {
        barrierG3.reverse() // sets self to true (closed)
        barrierG4.reverse() // sets G4 to true (closed)                
    }
}, false)

select("#target-barrier-4").addEventListener("click", () => {
    if (barrierG4.reversed()) {
        barrierG1.play() //sets G1 to false (open)
        barrierG2.play() //sets G2 to false (open)
        barrierG3.play() //sets G3 to false (open)
        barrierG4.play() //sets self to false (open)
    } else {
        barrierG4.reverse() // sets self to true (closed)
    }
}, false)


/* Hover Listeners *****************************************************************************************/

// with before and after states aka 2 bubble speech

select("#target-barrier-1").addEventListener("mouseover", () =>{
    if (barrierG1.reversed()) {
        speechBarrier1Before.play()
    } else {
        speechBarrier1After.play() 
    }
}, false)
select("#target-barrier-1").addEventListener("mouseleave", () =>{
    speechBarrier1Before.reverse() 
    speechBarrier1After.reverse() 
    
}, false)



select("#target-barrier-2").addEventListener("mouseover", () =>{
    if (barrierG2.reversed()) {
        speechBarrier2Before.play()
    } else {
        speechBarrier2After.play() 
    }
}, false)
select("#target-barrier-2").addEventListener("mouseleave", () =>{
    speechBarrier2Before.reverse() 
    speechBarrier2After.reverse() 
    
}, false)



select("#target-barrier-3").addEventListener("mouseover", () =>{
    if (barrierG3.reversed()) {
        speechBarrier3Before.play()
    } else {
        speechBarrier3After.play() 
    }
}, false)
select("#target-barrier-3").addEventListener("mouseleave", () =>{
    speechBarrier3Before.reverse() 
    speechBarrier3After.reverse() 
}, false)



select("#target-barrier-4").addEventListener("mouseover", () =>{
    if (barrierG4.reversed()) {
        speechBarrier4Before.play()
    } else {
        speechBarrier4After.play() 
    }
}, false)
select("#target-barrier-4").addEventListener("mouseleave", () =>{
    speechBarrier4Before.reverse() 
    speechBarrier4After.reverse() 
}, false) 



select("#target-user-1").addEventListener("mouseover", () =>{
    if (barrierG1.reversed()) {
        speechUser1Before.play()
    } else {
        speechUser1After.play()
    }
}, false)
select("#target-user-1").addEventListener("mouseleave", () =>{
    speechUser1Before.reverse()
    speechUser1After.reverse()
}, false)



select("#target-user-2-left").addEventListener("mouseover", () =>{
    if (barrierG2.reversed()) {
        speechUser2LeftBefore.play()
    } else {
        speechUser2LeftAfter.play()
    }
}, false)
select("#target-user-2-left").addEventListener("mouseleave", () =>{
    speechUser2LeftBefore.reverse()
    speechUser2LeftAfter.reverse()
}, false)



select("#target-user-2-right").addEventListener("mouseover", () =>{
    if (barrierG2.reversed()) {
        speechUser2RightBefore.play()
    } else {
        speechUser2RightAfter.play()
    }
}, false)
select("#target-user-2-right").addEventListener("mouseleave", () =>{
    speechUser2RightBefore.reverse()
    speechUser2RightAfter.reverse()
}, false)



select("#target-device-2").addEventListener("mouseover", () =>{
    if (barrierG2.reversed()) {
        speechDevice2Before.play()
    } else {
        speechDevice2After.play()
    }
}, false)
select("#target-device-2").addEventListener("mouseleave", () =>{
    speechDevice2Before.reverse()
    speechDevice2After.reverse()
}, false)



select("#target-device-3-center").addEventListener("mouseover", () =>{
    if (barrierG3.reversed()) {
        speechDevice3CenterBefore.play()
    } else {
        speechDevice3CenterAfter.play()
    }
}, false)
select("#target-device-3-center").addEventListener("mouseleave", () =>{
    speechDevice3CenterBefore.reverse()
    speechDevice3CenterAfter.reverse()
}, false)



select("#target-device-3-right").addEventListener("mouseover", () =>{
    if (barrierG3.reversed()) {
        speechDevice3RightBefore.play()
    } else {
        speechDevice3RightAfter.play()
    }
}, false)
select("#target-device-3-right").addEventListener("mouseleave", () =>{
    speechDevice3RightBefore.reverse()
    speechDevice3RightAfter.reverse()
}, false)



select("#target-device-3-left").addEventListener("mouseover", () =>{
    if (barrierG3.reversed()) {
        speechDevice3LeftBefore.play()
    } else {
        speechDevice3LeftAfter.play()
    }
}, false)
select("#target-device-3-left").addEventListener("mouseleave", () =>{
    speechDevice3LeftBefore.reverse()
    speechDevice3LeftAfter.reverse()
}, false)



select("#target-device-4").addEventListener("mouseover", () =>{
    if (barrierG2.reversed()) {
        speechDevice4Before.play()
    } else {
        speechDevice4After.play()
    }
}, false)
select("#target-device-4").addEventListener("mouseleave", () =>{
    speechDevice4Before.reverse()
    speechDevice4After.reverse()
}, false)




// without before and after states

select("#target-attacker-0").addEventListener("mouseover", () =>{
    speechAttacker0.play()
}, false)
select("#target-attacker-0").addEventListener("mouseleave", () =>{
    speechAttacker0.reverse()
}, false)



select("#target-drops-0").addEventListener("mouseover", () =>{
    speechDroppers0.play()
}, false)
select("#target-drops-0").addEventListener("mouseleave", () =>{
    speechDroppers0.reverse()
}, false)



select("#target-malware-0").addEventListener("mouseover", () =>{
    if (!barrierG1.reversed()) {
        speechMalware1.play()
    }
}, false)
select("#target-malware-0").addEventListener("mouseleave", () =>{
    speechMalware1.reverse()
}, false)



select("#target-credentials-1").addEventListener("mouseover", () =>{
    if (!barrierG1.reversed()) {
        speechCredentials1.play()
    }
}, false)
select("#target-credentials-1").addEventListener("mouseleave", () =>{
    speechCredentials1.reverse()
}, false)



select("#target-data-1").addEventListener("mouseover", () =>{
    if (!barrierG1.reversed()) {
        speechData1.play()
    }
}, false)
select("#target-data-1").addEventListener("mouseleave", () =>{
    speechData1.reverse()
}, false)



select("#target-malware-1-left").addEventListener("mouseover", () =>{
    if (!barrierG1.reversed()) {
        speechMalware1Left.play()
    }
}, false)
select("#target-malware-1-left").addEventListener("mouseleave", () =>{
    speechMalware1Left.reverse()
}, false)



select("#target-malware-1-right").addEventListener("mouseover", () =>{
    if (!barrierG1.reversed()) {
        speechMalware1Right.play()
    }
}, false)
select("#target-malware-1-right").addEventListener("mouseleave", () =>{
    speechMalware1Right.reverse()
}, false)
