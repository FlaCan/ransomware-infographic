const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)


Split({
    columnGutters: [{
        track: 1,
        element: select('.gutter'),
    }],
})

function setDragSymbolPosition () {
    let gradSymbol = select("#drag-symbol")    
    let dragSymbolPosition = window.innerHeight * 0.5 - 12
    gradSymbol.style.position = "sticky"
    gradSymbol.style.top = dragSymbolPosition + "px"
}

setDragSymbolPosition()

/* Initial states ****************************************************************************************/

gsap.set(".line-left", {
    transformOrigin: "0% 50%"
})

gsap.set(".line-right", {
    transformOrigin: "100% 50%"
})

gsap.set(".lancetta", {
    transformOrigin: "3 12"
})

gsap.set("#layer-users, #layer-devices", {
    filter: "grayscale(0)" // explicit start value so the finale's filter tween doesn't jump
})

/* Animations *********************************************************************************************/

const animDrop = gsap.to(".drop", {
    duration: 0.75, 
    stagger:0.2, 
    y: -25, 
    repeat: -1, 
    yoyo: true
})

const animClock = gsap.to(".lancetta", {
    duration: 5, 
    rotate:360, 
    repeat: -1, 
    ease: "linear",
}, "<")



function animBarrier(el) {
    const tl = gsap.timeline()
    .to(`${el} .line-left, ${el} .line-right`, {scaleX: 0}, "<")
    /* the click circles sit at cx=800, the closed button's center; each half-pill's own
       center is 26.5 off (left half spans x750-797, right half x803-850), so the circles
       travel 26.5 further than the buttons to end up centered on the half they highlight */
    .to(`${el} .button-left`, {x: -600}, "<")
    .to(`${el} .click-left`, {x: -626.5}, "<")
    .to(`${el} .button-right`, {x: 600}, "<")
    .to(`${el} .click-right`, {x: 626.5}, "<")
    .to(el + " .barrier-line-muted", {autoAlpha: 1}, "<")
    return tl
}

/* Barriers */

const animBarrier1 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-1"))
    .to(".trigger-L1", {visibility: "visible"}, "<") // all triggers that appear when first barrier is clicked
    .to(".malware-L1", {autoAlpha: 1}, "<")
    .to(".stolen-L1", {autoAlpha: 1}, "<")
    .to("#countdown-1", {autoAlpha: 1}, "<")
    .to(".user-L1 .workstation", {fill: "#CC0000"}, "<")

 
const animBarrier2 = gsap.timeline({paused: true, reversed: true, stagger: 0.1, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-2"))
    .to(".trigger-L2", {visibility: "visible"}, "<")
    .to(".malware-L2", {autoAlpha: 1}, "<")
    .to(".stolen-L2", {autoAlpha: 1}, "<")
    .to(".device-L2", {fill: "#CC0000"}, "<")
    .to("#countdown-2", {autoAlpha: 1}, "<")
    .to("#countdown-3", {autoAlpha: 1}, "<")
    .to("#countdown-4", {autoAlpha: 1}, "<")
    .to(".user-L2 .workstation", {fill: "#CC0000"}, "<")

    
const animBarrier3 = gsap.timeline({paused: true, reversed: true, defaults: {duration:0.2}})
    .add(animBarrier(".barrier-3"))
    .to(".trigger-L3", {visibility: "visible"}, "<")
    .to(".malware-L3", {autoAlpha: 1}, "<" )
    .to(".stolen-L3", {autoAlpha: 1}, "<")    
    .to(".device-L3", {fill: "#CC0000"}, "<")
    .to("#countdown-5", {autoAlpha: 1}, "<")
    .to("#countdown-6", {autoAlpha: 1}, "<")
    .to("#countdown-7", {autoAlpha: 1}, "<")
    
    
/* the finale: the waiting clocks give way to locks - the encryption has fired.
   The countdowns are hidden via their layer group (not per element) because
   animBarrier1-3 own the individual clocks' autoAlpha; two timelines tweening
   the same property would fight on reversal. The locks have no other owner,
   but must be tweened per element: each .lock carries its own visibility:hidden,
   which a parent group's autoAlpha cannot override. The gray-out works the same
   way as the clocks: a filter on the user/device layer groups, because the
   individual fills are owned by animBarrier1-3. */
const animBarrier4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-4"))
    .to(".trigger-L4", {visibility: "visible"}, "<")
    .to(".malware-L4", {autoAlpha: 1}, "<" )
    .to(".device-L4", {fill: "#CC0000"}, "<")
    .to("#layer-countdowns", {autoAlpha: 0}, "<")
    .to(".lock", {autoAlpha: 1}, "<")
    .to("#layer-users, #layer-devices", {filter: "grayscale(1)"}, "<")
    

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
        } else {
            animBarrier3.reverse()
            animBarrier4.reverse()
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
        } else {
            animBarrier4.reverse()
        }
    }, false)
    
});


/* trigger listeners - trigger and target are paired via data-target key, not DOM order *****************************/


const triggerEls = selectAll(".trigger")
const targetEls = selectAll(".target")

const targetByKey = new Map()
targetEls.forEach((el) => {
    const key = el.dataset.target
    if (!key) {
        console.warn("Target element missing data-target attribute:", el)
        return
    }
    if (targetByKey.has(key)) {
        console.warn(`Duplicate data-target="${key}" on target elements:`, targetByKey.get(key), el)
        return
    }
    targetByKey.set(key, el)
})

if (triggerEls.length !== targetEls.length) {
    console.warn(`Trigger/target count mismatch: ${triggerEls.length} triggers vs ${targetEls.length} targets. Check data-target attributes in index.html.`)
}

/* yellow icon halo - the #data/#credentials symbols carry an .icon-backdrop circle
   (radius 39.4, centered at +39.4/+39.4 in the symbol); pair each trigger circle
   with the stolen <use> at the same center and whiten the backdrop while hovered */

const stolenIcons = Array.from(selectAll(".stolen use")).map((el) => ({
    el,
    cx: Number(el.getAttribute("x")) + 39.4,
    cy: Number(el.getAttribute("y")) + 39.4,
}))

const iconByCircle = new Map()

selectAll(".trigger circle").forEach((circle) => {
    const cx = Number(circle.getAttribute("cx"))
    const cy = Number(circle.getAttribute("cy"))
    const icon = stolenIcons.find((i) => Math.hypot(i.cx - cx, i.cy - cy) < 6)
    if (!icon) return
    iconByCircle.set(circle, icon.el)
    circle.addEventListener("mouseenter", () => icon.el.style.setProperty("--halo", "#fff"))
    circle.addEventListener("mouseleave", () => icon.el.style.removeProperty("--halo"))
})

const tooltip = document.createElement("div")
tooltip.id = "tooltip"
document.body.appendChild(tooltip)

triggerEls.forEach((trigger) => {
    const key = trigger.dataset.target
    if (!key) {
        console.warn("Trigger element missing data-target attribute:", trigger)
        return
    }
    const target = targetByKey.get(key)
    if (!target) {
        console.warn(`No target found for trigger with data-target="${key}":`, trigger)
        return
    }

    trigger.addEventListener("mouseenter", () => {
        tooltip.textContent = target.textContent
        tooltip.classList.add("visible")
    })

    trigger.addEventListener("mousemove", (e) => {
        // flip to the other side of the cursor when the tooltip would leave the viewport
        let x = e.clientX + 16
        let y = e.clientY + 16
        if (x + tooltip.offsetWidth > window.innerWidth) {
            x = e.clientX - 16 - tooltip.offsetWidth
        }
        if (y + tooltip.offsetHeight > window.innerHeight) {
            y = e.clientY - 16 - tooltip.offsetHeight
        }
        tooltip.style.left = x + "px"
        tooltip.style.top = y + "px"
    })

    trigger.addEventListener("mouseleave", () => {
        tooltip.classList.remove("visible")
    })

    /* hovering the heading lights every icon it refers to (discs + yellow halos) */
    target.addEventListener("mouseenter", () => {
        trigger.classList.add("lit")
        trigger.querySelectorAll("circle").forEach((circle) => {
            const icon = iconByCircle.get(circle)
            if (icon) icon.style.setProperty("--halo", "#fff")
        })
    })

    target.addEventListener("mouseleave", () => {
        trigger.classList.remove("lit")
        trigger.querySelectorAll("circle").forEach((circle) => {
            const icon = iconByCircle.get(circle)
            if (icon) icon.style.removeProperty("--halo")
        })
    })

    trigger.addEventListener("click", () => {
        targetEls.forEach((el) => el.classList.remove("highlight"))
        target.classList.add("highlight")
        let measure = target.getBoundingClientRect().y
        window.scrollBy({
            top: measure - window.innerHeight * 0.25,
            left: 0,
            behavior: 'smooth'
          });
      });
})