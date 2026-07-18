const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

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
       travel 26.5 further than the buttons to end up centered on the half they highlight.
       Both distances carry the same +60 the barrier lines themselves were extended by
       (x1/x2 in index.html), so the buttons still land exactly on the longer lines' ends. */
    .to(`${el} .button-left`, {x: -660}, "<")
    .to(`${el} .click-left`, {x: -686.5}, "<")
    .to(`${el} .button-right`, {x: 660}, "<")
    .to(`${el} .click-right`, {x: 686.5}, "<")
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

 
const animBarrier2 = gsap.timeline({paused: true, reversed: true, stagger: 0.1, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-2"))
    .to(".trigger-L2", {visibility: "visible"}, "<")
    .to(".malware-L2", {autoAlpha: 1}, "<")
    .to(".stolen-L2", {autoAlpha: 1}, "<")
    .to("#countdown-2", {autoAlpha: 1}, "<")
    .to("#countdown-3", {autoAlpha: 1}, "<")
    .to("#countdown-4", {autoAlpha: 1}, "<")

    
const animBarrier3 = gsap.timeline({paused: true, reversed: true, defaults: {duration:0.2}})
    .add(animBarrier(".barrier-3"))
    .to(".trigger-L3", {visibility: "visible"}, "<")
    .to(".malware-L3", {autoAlpha: 1}, "<" )
    .to(".stolen-L3", {autoAlpha: 1}, "<")
    .to("#countdown-5", {autoAlpha: 1}, "<")
    .to("#countdown-6", {autoAlpha: 1}, "<")
    .to("#countdown-7", {autoAlpha: 1}, "<")
    
    
/* the finale: the waiting clocks give way to locks - the encryption has fired.
   The countdowns are hidden via their layer group (not per element) because
   animBarrier1-3 own the individual clocks' autoAlpha; two timelines tweening
   the same property would fight on reversal. The locks have no other owner,
   but must be tweened per element: each .lock carries its own visibility:hidden,
   which a parent group's autoAlpha cannot override. */
const animBarrier4 = gsap.timeline({paused: true, reversed: true, defaults:{duration:0.2}})
    .add(animBarrier(".barrier-4"))
    .to(".trigger-L4", {visibility: "visible"}, "<")
    .to(".malware-L4", {autoAlpha: 1}, "<" )
    .to("#layer-countdowns", {autoAlpha: 0}, "<")
    .to(".lock", {autoAlpha: 1}, "<")


/* Machine colours ******************************************************************************************
   Colours are CSS state classes (style.css), not tweens: each barrier toggles .infected
   on its own level's machines, and the finale toggles .encrypted on all of them. No two
   timelines ever animate the same fill, so barriers can open and close in any order
   without fighting over colours; the fade itself is the CSS fill transition. Machines
   turn red as their barrier opens and heal once it has fully closed. */

function classToggle(selector, className) {
    const els = selectAll(selector)
    return (on) => els.forEach((el) => el.classList.toggle(className, on))
}

const colourToggles = [
    [animBarrier1, [classToggle(".user-L1 .workstation", "infected")]],
    [animBarrier2, [classToggle(".device-L2, .user-L2 .workstation", "infected")]],
    [animBarrier3, [classToggle(".device-L3", "infected")]],
    [animBarrier4, [classToggle(".device-L4", "infected"), classToggle(".workstation, .device", "encrypted")]],
]

colourToggles.forEach(([timeline, toggles]) => {
    timeline.eventCallback("onStart", () => toggles.forEach((toggle) => toggle(true)))
    timeline.eventCallback("onReverseComplete", () => toggles.forEach((toggle) => toggle(false)))
})
    

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
   with the stolen <use> at the same center and mark it .lit while hovered
   (the halo colour itself lives in style.css) */

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
    circle.addEventListener("mouseenter", () => icon.el.classList.add("lit"))
    circle.addEventListener("mouseleave", () => icon.el.classList.remove("lit"))
})

const triggerByKey = new Map()
triggerEls.forEach((trigger) => {
    const key = trigger.dataset.target
    if (!key) {
        console.warn("Trigger element missing data-target attribute:", trigger)
        return
    }
    if (!targetByKey.has(key)) {
        console.warn(`No target found for trigger with data-target="${key}":`, trigger)
        return
    }
    triggerByKey.set(key, trigger)
})

/* lights a trigger's own circles plus every icon they refer to - used both
   for the "currently selected hotspot" state and (below) as a hover affordance */
function setTriggerActive(trigger, on) {
    trigger.classList.toggle("lit", on)
    trigger.setAttribute("aria-pressed", String(on))
    trigger.querySelectorAll("circle").forEach((circle) => {
        const icon = iconByCircle.get(circle)
        if (icon) icon.classList.toggle("lit", on)
    })
}

/* short hover-only label - stays a compliant WAI-ARIA tooltip (one phrase,
   non-interactive) precisely because the full text lives in the card below
   instead. Real hover devices only, so it can't get stuck open after a tap. */

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches

const tooltip = document.createElement("div")
tooltip.id = "tooltip"
document.body.appendChild(tooltip)

/* card-stack - a double buffer of two full-size cards in the fixed bottom
   25% band (see .card-stack in style.css). Selecting a hotspot writes into
   whichever card is currently hidden below the band and slides it up over
   the visible one; the two swap roles every time so there's no per-click
   DOM churn. */

const cardEls = [select("#card-a"), select("#card-b")]
let topCard = 0
let activeKey = null

function showCard(heading, body) {
    const incoming = cardEls[1 - topCard]
    incoming.querySelector(".card-heading").textContent = heading
    incoming.querySelector(".card-body").textContent = body
    gsap.set(incoming, { zIndex: 2, yPercent: 100 })
    gsap.set(cardEls[topCard], { zIndex: 1 })
    gsap.to(incoming, { yPercent: 0, duration: 0.45, ease: "power2.out" })
    topCard = 1 - topCard
}

const intro = select("#intro-content")
const introHeading = intro.querySelector("h2").textContent
const introBody = intro.querySelector("p").textContent
cardEls[0].querySelector(".card-heading").textContent = introHeading
cardEls[0].querySelector(".card-body").textContent = introBody
gsap.set(cardEls[0], { zIndex: 2, yPercent: 0 })
gsap.set(cardEls[1], { zIndex: 1, yPercent: 100 })

function selectHotspot(trigger) {
    const key = trigger.dataset.target
    if (activeKey === key) return // no-op on repeat click - the barrier's own
                                   // click listener still toggles its animation
    const prevTrigger = activeKey && triggerByKey.get(activeKey)
    if (prevTrigger) setTriggerActive(prevTrigger, false)
    setTriggerActive(trigger, true)
    activeKey = key
    const target = targetByKey.get(key)
    showCard(target.textContent, target.nextElementSibling?.textContent ?? "")
}

triggerEls.forEach((trigger) => {
    const key = trigger.dataset.target
    const target = targetByKey.get(key)
    if (!target) return // already warned above

    trigger.setAttribute("tabindex", "0")
    trigger.setAttribute("role", "button")
    trigger.setAttribute("aria-label", target.textContent)
    trigger.setAttribute("aria-pressed", "false")

    trigger.addEventListener("click", () => selectHotspot(trigger))
    trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            selectHotspot(trigger)
        }
    })

    trigger.addEventListener("mouseenter", () => {
        if (!canHover) return
        tooltip.textContent = target.textContent
        tooltip.classList.add("visible")
    })

    trigger.addEventListener("mousemove", (e) => {
        if (!canHover) return
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
})

/* clicking away from every hotspot clears the current selection - clicks
   inside the card itself (reading, scrolling) don't count as "away" */
document.addEventListener("click", (e) => {
    if (!activeKey) return
    if (e.target.closest(".trigger") || e.target.closest(".card-stack")) return
    setTriggerActive(triggerByKey.get(activeKey), false)
    activeKey = null
    showCard(introHeading, introBody)
})