/* <ransomware-infographic>: the ransomware infographic as a web component, one source for its own page
   (ransomware.flaviocantanna.com) and for any page that shows it, such as Flavio's portfolio.

   Attributes:
   - theme="light" | "dark": the colours. Without it, the page's <html data-theme>, else the system's.
   - controls: shows the Home and theme buttons; controls="theme" shows the theme button only.
   - standalone: the piece is the whole page (its own site): the theme button remembers the choice and sets the
     page's <html data-theme>, and until a choice is made the theme follows the system. Without it, the theme
     button switches this piece only, as an app window would.
   - autoplay: plays the story on a loop (the barriers open one by one, each with its card, then close), only while
     on screen; with reduced motion it holds still on the last step. The piece is then a picture: no clicks.

   It needs GSAP: define(gsap) registers the element; it registers itself when the page has a global gsap.
   Fonts (Roboto 300 and 500) are loaded by the host page. */

const STYLE = `/* Palette - every colour on the page is named here; the rest of the file
   (and the SVG artwork in index.html) only ever refers to these names.

   Role tokens (--canvas, --panel, --panel-hover, --text, --machine-ink,
   --machine-grey, --encrypted-grey, --blue, --red, --cyan, --yellow,
   --orange) are redefined per theme below. Every role-token value is
   written as an explicit color-mix() against --ink or --white, even where
   the mix is a no-op (0% or 100%) - the point is a single scannable,
   directly-tweakable percentage per token rather than a mix of bare var()
   passthroughs and color-mix() calls. Light and dark are NOT a strict
   mirror of each other; --panel/--panel-hover/--text/--canvas are each
   picked deliberately per theme (see the theme blocks below) rather than
   derived from a shared formula. --panel/--panel-hover are shared by every
   interactive surface on the page (FAB icon-buttons and SVG hotspot
   triggers alike) so hover/focus reads the same everywhere. */

:host {
    /* the two bases: every neutral below is a tint of one or the other */
    --ink: #001;
    --white: #fff;

    /* brand hues, theme-independent - the theme blocks below mix these
       toward --white or --ink for the role tokens (--blue, --red, --cyan,
       --yellow, --orange) */
    --brand-blue: #07e;      /* healthy machines, barrier lines and buttons */
    --brand-red: #c00;       /* virus body, malware tails, encryption locks */
    --brand-cyan: #0cf;      /* links */
    --brand-yellow: #fc0;    /* stolen data/credential icons and trails, highlighted heading, gutter hover */
    --brand-orange: #f80;    /* dropper drops, virus detail, countdown clocks */

    /* percent of the app-shell's height the diagram occupies; the card gets
       the remainder. Drives .diagram-column/.infographic/.card-stack below. */
    --diagram-ratio: 80;
}

/* Light theme (default) - --canvas/--panel/--text/--panel-hover are chosen
   to match the FAB button's own states (see .icon-button below): --panel
   is the resting background for every interactive surface (FABs and SVG
   hotspot triggers alike), --panel-hover their shared hover/focus
   background, --text the FAB icon colour. --encrypted-grey sits at a fixed
   50% ink in both themes (its own mirror) rather than following any
   per-theme choice - the finale state isn't meant to lean light or dark,
   just uniformly dead. */
:host {
    --canvas: color-mix(in srgb, var(--ink) 10%, var(--white));         /* infographic background */
    --panel: color-mix(in srgb, var(--ink) 5%, var(--white));           /* card + FAB resting background */
    --panel-hover: color-mix(in srgb, var(--ink) 0%, var(--white));     /* FAB/trigger hover+focus background - lighter than resting */
    --text: color-mix(in srgb, var(--ink) 95%, var(--white));           /* text, headings, and FAB icon colour */

    --machine-ink: color-mix(in srgb, var(--ink) 100%, var(--white));   /* attacker laptop, drawn on the canvas */
    --machine-grey: color-mix(in srgb, var(--ink) 70%, var(--white));   /* the people at the machines */
    --encrypted-grey: color-mix(in srgb, var(--ink) 50%, var(--white));

    --blue: color-mix(in srgb, var(--brand-blue) 100%, var(--white));
    --red: color-mix(in srgb, var(--brand-red) 100%, var(--white));
    --cyan: color-mix(in srgb, var(--brand-cyan) 55%, var(--ink));      /* darkened for contrast on the light panel */
    --yellow: color-mix(in srgb, var(--brand-yellow) 100%, var(--white));
    --orange: color-mix(in srgb, var(--brand-orange) 100%, var(--white));
}

/* Dark theme - like the light block above, --panel/--panel-hover/--text are
   chosen to match the FAB button's own states rather than following a
   mirror formula from the light theme. */
:host([theme="dark"]) {
    --canvas: color-mix(in srgb, var(--ink) 95%, var(--white));
    --panel: color-mix(in srgb, var(--ink) 85%, var(--white));           /* FAB resting background */
    --panel-hover: color-mix(in srgb, var(--ink) 70%, var(--white));     /* FAB hover/focus background - lighter than resting */
    --text: color-mix(in srgb, var(--ink) 5%, var(--white));             /* text, headings, and FAB icon colour */

    --machine-ink: color-mix(in srgb, var(--ink) 0%, var(--white));
    --machine-grey: color-mix(in srgb, var(--ink) 30%, var(--white));
    --encrypted-grey: color-mix(in srgb, var(--ink) 50%, var(--white));

    --blue: color-mix(in srgb, var(--brand-blue) 75%, var(--white));    /* lightened for contrast on the dark canvas */
    --red: color-mix(in srgb, var(--brand-red) 75%, var(--white));
    --cyan: color-mix(in srgb, var(--brand-cyan) 100%, var(--white));   /* already bright enough on the dark panel */
    --yellow: color-mix(in srgb, var(--brand-yellow) 100%, var(--white));
    --orange: color-mix(in srgb, var(--brand-orange) 100%, var(--white));
}


/* Reset */

*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


/* Typography */

/* Root font-size scales fluidly with viewport width so the rest of the
   page's em-based sizing stays proportionate on narrow/mobile screens
   instead of overwhelming the fixed 20%-height band, and grows back
   toward 16px on wide desktops. Anchored 14px at 1100px, 16px at 1920px;
   flat beyond either end. */
:host {
    display: block;
    position: relative;
    overflow: hidden;
    font-size: clamp(14px, 11.317px + 0.244vw, 16px);
    background-color: var(--panel);
    color: var(--text);
    font-family: "Roboto", sans-serif;
}

h1, h2 {
    font-weight: 500;
    color: var(--text);
    margin-bottom: 0.75em;
    line-height: 1.25;
}

h1 {
    font-size: 1.75em;
}

/* card heading has its own fluid range (16-18px) rather than the em-based
   scaling above, using the same 1100px/1920px anchors as the root clamp */
h2 {
    font-size: clamp(16px, 13.317px + 0.244vw, 18px);
}

p {
    font-size: 1em;
    font-weight: 300;
    line-height: 1.75;
}

p.subtitle {
    font-size: 1.25em;
    line-height: 1.5;
}

a {
    color: var(--cyan);
    text-decoration: none;
}

/* Page layout: fixed-height app shell, one fixed ratio at every viewport
   size - the diagram permanently fills the top 80%, a content card the
   bottom 20% (see .card-stack below). There is no page-level scroll and no
   width-driven breakpoint; the same layout runs on desktop and touch. */

.app-shell {
    background-color: var(--canvas);
    height: 100%;
    overflow: hidden;
}

/* one column holding both the diagram and the card, split by height into
   .infographic (top) and .card-stack (bottom) below. */
.diagram-column {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.infographic {
    background-color: var(--canvas);
    flex: 0 0 calc(var(--diagram-ratio) * 1%);
    overflow: hidden;
    position: relative;
}

/* toolbar for icon controls (Home, theme toggle) - width is synced to the
   card-frame's own width by script.js (see the ResizeObserver in script.js),
   and left/right:0 + margin:auto centers that width the same way .card-frame
   centers itself in .card-stack below, so the toolbar and the card always
   land on the same horizontal box. space-between pins Home to the left edge
   and the theme toggle to the right, mirroring the card's own symmetry. */
.diagram-controls {
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 1rem;
    z-index: 5;
    display: flex;
    justify-content: space-between;
}

/* FABs (floating action buttons) - a rounded-rect surface matching the
   card's own background, raised off the canvas with elevation. Sized in
   rem (not px) so it stays fluid with the root clamp like the rest of the
   page's type scale; base 2.5rem/1.5rem glyph scaled up one third per the
   user's request. Contrast against the canvas comes purely from --panel
   being a deliberately different step than --canvas - no shadow or border
   crutch needed. */
.icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(2.5rem * 4 / 3);
    height: calc(2.5rem * 4 / 3);
    border: none;
    border-radius: 0.75rem;
    background-color: var(--panel);
    color: var(--text);
    cursor: pointer;
    transition: background-color 0.2s ease;
}

/* no default browser focus rectangle, ever - same convention as .trigger:focus;
   the state layer below is the only focus/hover affordance */
.icon-button:focus {
    outline: none;
}

/* hover and focus share one state: the FAB background steps to
   --panel-hover, always lighter than the resting --panel */
.icon-button:hover,
.icon-button:focus-visible {
    background-color: var(--panel-hover);
}

/* The buttons' icons: Material icons, filled and rounded, drawn (no icon font needed from the host page) */
.icon {
    width: calc(1.5rem * 4 / 3);
    height: calc(1.5rem * 4 / 3);
    fill: currentColor;
}

.infographic > svg {
    width: auto;
    height: 100%;
    max-width: 100%;
    display: block;
    margin: 0 auto;

    /* triggers paint before (under) the artwork, so the hover disc appears
       behind the icons; pointer events skip the artwork and land on the
       triggers below */
    pointer-events: none;
}

/* card-stack - a full-width band behind the card (see .card-frame below);
   its own background is what shows either side of the card. Sits a shade
   apart from the canvas above it, with a hairline seam marking the join. */
.card-stack {
    flex: 0 0 calc((100 - var(--diagram-ratio)) * 1%);
    background-color: var(--panel);
    border-top: 1px solid var(--canvas);
}

/* width is intentionally unset here - script.js syncs it inline to the
   SVG's rendered width via ResizeObserver, so the card is always exactly
   as wide as the diagram above it. */
.card-frame {
    position: relative;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
}

/* card-frame holds a double buffer of two full-size cards; script.js writes
   new content into whichever card is currently hidden below the band and
   slides it up over the visible one with GSAP (yPercent + z-index), so the
   new content visually covers the old rather than replacing it in place. */
.card {
    position: absolute;
    inset: 0;
    background-color: var(--panel);
    padding: 2rem;
    overflow-y: auto;
}

/* same fluid approach as the card heading above, 12-14px range */
.card-body {
    font-size: clamp(12px, 9.317px + 0.244vw, 14px);
    line-height: 1.55;
}

/* SVG artwork */

.barrier-line-muted, .malware, .countdown, .stolen, .lock {
    opacity: 0;
    visibility: hidden;
}

.countdown {
    fill: var(--orange);
}

.lancetta {
    fill: var(--white);
}

.barrier-line, .barrier-line-muted {
    stroke-width: 5;
    stroke-linecap: round;
}

.barrier-line {
    stroke: var(--blue);
}

.barrier-line-muted {
    stroke: var(--panel);
}

.barrier-button {
    fill: var(--blue);
}

.user {
    fill: var(--machine-grey);
}

/* cutout details drawn on top of the yellow data/credential icons - match
   the page background so they read as negative space, not a fixed colour */
.icon-detail {
    fill: var(--canvas);
}

.virus-body {
    fill: var(--red);
}

.virus-detail {
    fill: var(--orange);
}

/* the attacker's laptop, drawn on the canvas */
.machine-ink {
    fill: var(--machine-ink);
}

.lock-body {
    fill: var(--red);
}

.lock rect {
    fill: none;
    stroke: var(--red);
    stroke-width: 3;
    stroke-miterlimit: 10;
}

.device, .workstation {
    fill: var(--blue);
    transition: fill 0.2s;
}

/* machine states, toggled by the barrier timelines in script.js - the tint scale
   (70% ink = the users' grey, 30% = the encrypted grey) is spelled out in the palette.
   .encrypted is declared after .infected so the finale grey wins while both are set */
.infected {
    fill: var(--red);
}

.encrypted {
    fill: var(--encrypted-grey);
}


.trigger {
    cursor: pointer;
    visibility: hidden;
    pointer-events: auto;
}

/* hover on the shape, not the group, so only the icon under the cursor gets the disc.
   Same treatment as the FAB icon-buttons: invisible at rest, full opacity
   on hover/focus. Hover uses --panel-hover (the FAB's hover colour);
   focus/selection uses --panel (the FAB's resting colour) - see below. */
.trigger circle {
    fill: var(--panel);
    fill-opacity: 0; /* invisible but still hit-testable: fill must stay a paint, not 'none' */
    transition: fill-opacity 0.2s ease;
}

.trigger.on {
    visibility: visible;
}

.trigger circle:hover {
    fill: var(--panel-hover);
    fill-opacity: 1;
}

/* keyboard focus and persisted selection (script.js marks a trigger .lit
   when selected, or its paired heading is hovered) read as the FAB's
   normal (not hover) state - a persisted marker should look like a
   resting surface, not a momentary hover. Declared after :hover so it
   wins when a selected hotspot is also under the pointer. Full opacity on
   focus specifically because this is the only focus affordance: the
   default browser outline is suppressed below. */
.trigger:focus-visible circle,
.trigger.lit circle {
    fill: var(--panel);
    fill-opacity: 1;
}

/* ...but a focused/lit circle still lightens further when also hovered -
   the hover affordance never goes dead just because the hotspot is
   already selected. Higher specificity than both rules above. */
.trigger:focus-visible circle:hover,
.trigger.lit circle:hover {
    fill: var(--panel-hover);
}

/* no default browser focus rectangle, ever - clicking (not just keyboard
   focus) leaves the default outline behind unless :focus itself is
   suppressed, not just :focus-visible. The fill-opacity above is the only
   focus/selection affordance. */
.trigger:focus {
    outline: none;
}

.yellow {
    fill: var(--yellow);
}

/* shared gradient ramps (templates in the SVG defs) - the dropper drops fade in
   from transparent, the malware tails ease from the FAB's resting --panel
   tone into the red (so the tail's leading edge stays visibly distinct from
   whichever canvas tone is active, rather than dissolving into it); the
   eased mixes are fixed, so retinting either ramp is a one-variable change */
#drop-stops stop {
    stop-color: var(--orange);
}

#drop-stops stop:first-child {
    stop-opacity: 0;
}

#tail-stops stop:nth-child(1)  { stop-color: var(--panel); }
#tail-stops stop:nth-child(2)  { stop-color: color-mix(in srgb, var(--red) 1.6%, var(--panel)); }
#tail-stops stop:nth-child(3)  { stop-color: color-mix(in srgb, var(--red) 5.8%, var(--panel)); }
#tail-stops stop:nth-child(4)  { stop-color: color-mix(in srgb, var(--red) 13.1%, var(--panel)); }
#tail-stops stop:nth-child(5)  { stop-color: color-mix(in srgb, var(--red) 24.1%, var(--panel)); }
#tail-stops stop:nth-child(6)  { stop-color: color-mix(in srgb, var(--red) 37.7%, var(--panel)); }
#tail-stops stop:nth-child(7)  { stop-color: color-mix(in srgb, var(--red) 54.5%, var(--panel)); }
#tail-stops stop:nth-child(8)  { stop-color: color-mix(in srgb, var(--red) 74.9%, var(--panel)); }
#tail-stops stop:nth-child(9)  { stop-color: color-mix(in srgb, var(--red) 97.4%, var(--panel)); }
#tail-stops stop:nth-child(10) { stop-color: var(--red); }


/* tooltip following the cursor over SVG hotspots */

.tooltip {
    position: fixed;
    background-color: color-mix(in srgb, var(--ink) 85%, transparent);
    color: var(--white);
    font-size: 0.85rem;
    font-weight: 300;
    padding: 0.35em 0.9em;
    border-radius: 1em;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    z-index: 10;
}

.tooltip.visible {
    opacity: 1;
}

/* the hover tooltip only makes sense on real hover-capable pointers - on touch
   it would otherwise get stuck open after a tap */
@media not (hover: hover) {
    .tooltip {
        display: none;
    }
}



/* Without the controls attribute (embedded in another page) the Home and theme buttons are left out */
:host(:not([controls])) .diagram-controls {
    display: none;
}

/* Autoplay: the story plays itself on a loop, and the piece is a picture, not a control */
:host([autoplay]) .app-shell {
    pointer-events: none;
}
:host([autoplay]) .trigger {
    pointer-events: none;
}
:host([controls="theme"]) #home-button {
    visibility: hidden;
}
/* ...but its own controls stay usable */
:host([autoplay]) .diagram-controls {
    pointer-events: auto;
}
:host([autoplay]) .card {
    overflow: hidden;
}
`

const MARKUP = `<div id="intro-content" hidden>
        <h1>Ransomware: attack and defences</h1>
        <p>
          Ransomware is one of the most damaging attacks an organization can
          face. This interactive infographic follows one step by step - from the
          first malicious download to the assault on backups - and shows the
          four barriers of defence that can stop it along the way. Click or tap
          the diagram to explore each stage - hover first for a quick label -
          and click each barrier to see what happens when that defence is not in
          place.
        </p>
      </div>

      <div id="narrative-source" hidden>
        <!--1-->
        <div>
          <h2 class="target" data-target="attacker">Attacker</h2>
          <p>
            The attacker - often part of a larger criminal group - operates
            remotely. Their goal is to encrypt and steal the data of
            organizations and individuals. If they succeed, they demand a ransom
            (usually in crypto-currency):&nbsp;the target pays either to recover
            their data or to stop it being made public.
          </p>
        </div>

        <!--2-->
        <div>
          <h2 class="target" data-target="email-attachment">
            Droppers (e.g. email attachment)
          </h2>
          <p>
            A dropper is a small program built to install the ransomware
            payload once it reaches a target machine. Here, it arrives
            disguised as a legitimate attachment - an invoice, a résumé, a
            shipping notice - relying on the recipient to open it themselves,
            before installing the payload directly (single-stage) or fetching
            it from the attacker's infrastructure (two-stage).
          </p>
        </div>

        <!--2b-->
        <div>
          <h2 class="target" data-target="malicious-link">
            Droppers (e.g. malicious link)
          </h2>
          <p>
            A dropper is a small program built to install the ransomware
            payload once it reaches a target machine. Here, it's delivered
            via a link to a compromised or look-alike site rather than an
            attachment: visiting it silently pulls down the dropper, which
            then installs the payload directly or fetches it in a second
            stage.
          </p>
        </div>

        <!--2c-->
        <div>
          <h2 class="target" data-target="download-wrapper">
            Droppers (e.g. download wrapper)
          </h2>
          <p>
            A dropper is a small program built to install the ransomware
            payload once it reaches a target machine. Here, it hides inside a
            legitimate-looking download - a cracked application, a fake
            software update - so the malware installs alongside whatever the
            target thought they were getting.
          </p>
        </div>

        <!--3-->
        <div class="barrier">
          <h2 class="target" data-target="first-barrier">
            First protection barrier
          </h2>
          <p class="subtitle">
            At this stage, user education, inbound email inspection, URL
            filtering, and endpoint protection form the most effective barrier
            to an attack. Privileged endpoint management (PEM), built on
            zero-trust principles, adds another layer: users run without local
            admin rights by default, with privilege escalation granted per task,
            under policy - so a malicious download that slips through has far
            less power to install anything.
          </p>
        </div>

        <!--4-->
        <div>
          <h2 class="target" data-target="infection">Infection</h2>
          <p>
            The dropper has done its job and the ransomware payload executes on
            the first machine. It embeds itself so it survives a reboot,
            contacts the attackers' infrastructure for instructions, and starts
            scanning for credentials, data, and connected drives. The encryption
            everyone associates with ransomware comes much later - first, it
            needs to spread.
          </p>
        </div>

        <!--5-->
        <div>
          <h2 class="target" data-target="first-user">First user</h2>
          <p>
            The most common entry point to an attack is the people in the
            business. Even with good training, an attack can be sophisticated
            enough to fool anyone; some do not even need user action. Once the
            ransomware infects the workstation, it can lie in wait for more
            valuable content - sometimes for weeks or months - before the
            encryption begins.
          </p>
        </div>

        <!--6-->
        <div>
          <h2 class="target" data-target="credential-and-data-1">
            Credential and data exfiltration: user level
          </h2>
          <p>
            Once the workstation is infected, the ransomware quietly harvests
            the user’s credentials and data. The stolen credentials become
            gateways for the next stage of the attack, while valuable files -
            confidential or copyrighted information - are exfiltrated so the
            attackers can threaten to make them public.
          </p>
        </div>

        <!--7-->
        <div class="barrier">
          <h2 class="target" data-target="second-barrier">
            Second protection barrier
          </h2>
          <p class="subtitle">
            Once a workstation is compromised, containing the damage means
            limiting what that foothold can reach. Least privilege, MFA, and
            network segmentation stop one infected machine becoming a gateway to
            the business, while privileged access management (PAM) keeps admin
            credentials out of reach of any stolen account. Continuous
            monitoring for credential misuse and lateral movement catches an
            attacker before real damage occurs.
          </p>
        </div>

        <!--8-->
        <div>
          <h2 class="target" data-target="critical-jump">Critical jump</h2>
          <p>
            Armed with stolen credentials, the attacker moves beyond the first
            infected workstation. This is the critical jump from a single
            compromised machine to the wider network - probing for weakly
            protected accounts and systems that grant access to shared
            resources, servers, and eventually the infrastructure that runs the
            business.
          </p>
        </div>

        <!--9-->
        <div>
          <h2 class="target" data-target="non-human-identity">
            Non-human identity
          </h2>
          <p>
            A non-human identity holds the same kind of elevated rights as
            any privileged account - the power to reconfigure systems,
            disable defences, and reach resources most people never could -
            but without a person behind it: a service account running
            unattended automation, or increasingly an AI agent acting on its
            own initiative. Both often hold broad, long-lived permissions,
            with no one watching for unusual behaviour in real time.
          </p>
        </div>

        <!--9b-->
        <div>
          <h2 class="target" data-target="privileged-users">
            Privileged users
          </h2>
          <p>
            Privileged users hold elevated rights that let them reconfigure
            systems, disable defences, and reach resources most people never
            could - making their accounts some of the most valuable
            credentials on the network. IT administrators are the most
            obvious example, but the same standing access often extends to
            executives, developers, and anyone else granted elevated rights.
          </p>
        </div>

        <!--10-->
        <div>
          <h2 class="target" data-target="shared-drives">Shared drives</h2>
          <p>
            Shared network drives are a high-value target: they concentrate the
            files many people rely on into one place. Once reached, the attacker
            can encrypt or exfiltrate entire folders of shared documents in a
            single move, multiplying the damage far beyond what any one user's
            files would cause.
          </p>
        </div>

        <!--11-->
        <div>
          <h2 class="target" data-target="credential-and-data-2">
            Credential and data exfiltration: privileged level
          </h2>
          <p>
            With privileged access secured, the attacker's reach and reward both
            grow. Sensitive data - financial records, intellectual property,
            personal information - and higher-level credentials are now in
            scope, raising the stakes for the ransom demand and the threat of
            exposure.
          </p>
        </div>

        <!--12-->
        <div class="barrier">
          <h2 class="target" data-target="third-barrier">
            Third protection barrier
          </h2>
          <p class="subtitle">
            By this stage, the attacker holds privileged credentials and is
            moving through core infrastructure. The priority is limiting the
            blast radius: tiered administration, endpoint detection and response
            (EDR), and PAM together control who can reach domain controllers,
            hypervisors, and backups. Privileged process automation (PPA) closes
            the loop, running admin tasks as vaulted, automated processes so
            credentials never appear on a workstation for malware to harvest.
          </p>
        </div>

        <!--13-->
        <div>
          <h2 class="target" data-target="lateral-movement">
            Lateral movement
          </h2>
          <p>
            Using the credentials it has already stolen, the ransomware fans out
            across the network - probing servers, virtualization hosts, and
            domain infrastructure for the next weak point. Each new system it
            reaches becomes a further foothold, bringing the attacker closer to
            the infrastructure that keeps the business running.
          </p>
        </div>

        <!--14-->
        <div>
          <h2 class="target" data-target="domain-controller">
            Domain controller
          </h2>
          <p>
            The domain controller manages identity and access for the entire
            network. Compromising it hands the attacker the ability to create
            accounts, reset passwords, and grant themselves access to virtually
            anything - turning a single breach into control of the whole
            environment.
          </p>
        </div>

        <!--15-->
        <div>
          <h2 class="target" data-target="hypervisor">Hypervisor</h2>
          <p>
            Many organizations run their servers as virtual machines on a shared
            hypervisor. Gaining control of it lets the attacker access, encrypt,
            or destroy every virtual machine it hosts at once - an efficient way
            to cause maximum damage from a single compromise.
          </p>
        </div>

        <!--16-->
        <div>
          <h2 class="target" data-target="online-backups">Online backups</h2>
          <p>
            Backups are the safety net an organization relies on to recover
            without paying. If those backups are reachable from the network -
            and many are, for convenience - the attacker will target them
            directly, deleting or encrypting them to remove the victim's ability
            to restore data independently.
          </p>
        </div>

        <!--17-->
        <div>
          <h2 class="target" data-target="credential-and-data-3">
            Credential and data exfiltration: domain level
          </h2>
          <p>
            With domain-level access, the attacker can now harvest credentials
            and sensitive files across the whole organization, not just one
            department. This is where the incident stops being a
            single-workstation problem and becomes a full breach of the
            organization's identity and data.
          </p>
        </div>

        <!--18-->
        <div class="barrier">
          <h2 class="target" data-target="fourth-barrier">
            Fourth protection barrier
          </h2>
          <p class="subtitle">
            The last line of defence is making recovery possible even after
            everything else fails. That means immutable or air-gapped backups -
            the 3-2-1 principle of multiple copies, on different media, with one
            copy off-network - plus regularly tested restores and retention that
            outlasts an attacker who may have lurked for months. Get it right,
            and there's always a clean copy the attacker can never touch. Get it
            wrong, and the last door is already open.
          </p>
        </div>

        <!--19-->
        <div>
          <h2 class="target" data-target="final-encryption">
            Final encryption
          </h2>
          <p>
            Before triggering the final encryption, the ransomware makes one
            last sweep for any backup it can still reach - including ones
            assumed to be safe - removing the victim's remaining options for
            recovery. Then the payload fires on every machine it has reached:
            files are encrypted with strong cryptography, and a ransom note
            explains how to pay for a decryption key - or to stop the stolen
            data being published.
          </p>
        </div>

        <!--20-->
        <div>
          <h2 class="target" data-target="offline-backups">Offline backups</h2>
          <p>
            The offline backups are the last resource - the one copy the
            attacker cannot reach. They don't need to: for weeks, these media
            have archived data from systems already infected. The compromise
            rode in through the backup process itself, and the last clean copy
            has aged out of rotation. When the final encryption fires, nothing
            is left to restore - only the choice to pay the ransom, with no
            guarantees, or start over from nothing.
          </p>
        </div>
      </div>
      <!-- #narrative-source -->

      <div class="diagram-column">
        <div class="infographic">
          <div class="diagram-controls">
            <button
              id="home-button"
              class="icon-button"
              type="button"
              aria-label="Reset to start"
            >
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
            </button>
            <button
              id="theme-toggle"
              class="icon-button"
              type="button"
              aria-label="Switch to dark theme"
            >
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.01 3.05C6.51 3.54 3 7.36 3 12c0 4.97 4.03 9 9 9 4.63 0 8.45-3.5 8.95-8 .09-.79-.78-1.42-1.54-.95-.84.54-1.84.85-2.91.85-2.98 0-5.4-2.42-5.4-5.4 0-1.06.31-2.06.84-2.89.45-.67-.04-1.63-.93-1.56z" /></svg>
            </button>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="10 198.65 1580 2178"
          >
            <defs>
              <!-- shared gradient ramps: the per-drop/per-tail gradients keep only
                         their geometry and inherit these stops via href; the stop colours
                         themselves come from style.css -->
              <linearGradient id="drop-stops">
                <stop offset="0" />
                <stop offset="1" />
              </linearGradient>

              <linearGradient id="tail-stops">
                <stop offset="0" />
                <stop offset="0.2484" />
                <stop offset="0.3978" />
                <stop offset="0.521" />
                <stop offset="0.63" />
                <stop offset="0.7296" />
                <stop offset="0.8223" />
                <stop offset="0.9098" />
                <stop offset="0.991" />
                <stop offset="1" />
              </linearGradient>

              <symbol id="data">
                <path
                  class="yellow"
                  d="M36.6,11.4L18.4,29.6v37.8h42v-56H36.6z"
                />
                <path
                  class="icon-detail"
                  d="M36.6,17v12.6H24L36.6,17z M54.8,59H24v-4.2h30.8V59z M54.8,50.6H24v-4.2h30.8V50.6z M54.8,42.2H24V38h30.8 V42.2z"
                />
              </symbol>

              <symbol id="credentials">
                <path
                  class="yellow"
                  d="M68.9,18.4H9.8c-1.1,0-2,0.9-2,2v38.1c0,1.1,0.9,2,2,2h59.1c1.1,0,2-0.9,2-2V20.3 C70.9,19.2,70,18.4,68.9,18.4z"
                />
                <path
                  class="icon-detail"
                  d="M27.6,28.9c2.9,0,5.2,2.4,5.2,5.2c0,2.9-2.4,5.2-5.2,5.2c-2.9,0-5.2-2.4-5.2-5.2 C22.3,31.2,24.7,28.9,27.6,28.9z M38.1,49.9h-21v-2c0-3.9,7-5.9,10.5-5.9c3.5,0,10.5,2,10.5,5.9V49.9z M60.4,49.9H42v-3.9h18.4 V49.9z M60.4,41.3H42v-3.9h18.4V41.3z M60.4,32.8H42v-3.9h18.4V32.8z"
                />
              </symbol>

              <symbol id="virus">
                <path
                  class="virus-body"
                  d="M43.3,19.2c-0.9-0.5-1.8-0.9-2.7-1.2c-1.2-0.4-2.4-0.6-3.6-0.6c0.6-1.1,1-2.2,1.3-3.4c0.2-1,0.3-2,0.3-3 c0-4.3-2.1-8.4-5.5-10.9C33,0,32.8,0,32.7,0.1c-0.1,0.1-0.1,0.2,0,0.3c1.9,2,2.9,4.5,2.9,7.2c0,5.9-4.8,10.6-10.6,10.6 c-5.9,0-10.6-4.8-10.6-10.6c0-2.7,1-5.3,2.9-7.2c0.1-0.1,0.1-0.2,0-0.3C17.2,0,17,0,17,0c-3.5,2.5-5.5,6.6-5.5,10.9 c0,1,0.1,2,0.3,3c0.3,1.2,0.7,2.4,1.3,3.4c-1.2,0-2.5,0.2-3.6,0.6c-0.9,0.3-1.9,0.7-2.7,1.2C3,21.3,0.5,25.1,0,29.4 c0,0.1,0.1,0.2,0.2,0.2c0.1,0,0.2,0,0.3-0.2c0.8-2.6,2.5-4.7,4.8-6.1c2.5-1.4,5.3-1.8,8.1-1.1c2.7,0.7,5,2.5,6.4,4.9 c1.4,2.5,1.8,5.3,1.1,8.1c-0.7,2.7-2.5,5-4.9,6.4c-2.3,1.4-5.1,1.8-7.7,1.1c-0.1,0-0.2,0-0.3,0.1c0,0.1,0,0.2,0.1,0.3 c3.9,1.7,8.5,1.5,12.2-0.7c0.8-0.5,1.6-1.1,2.4-1.7c0.9-0.8,1.7-1.8,2.4-2.9c0.7,1.1,1.5,2,2.4,2.9c0,0,0,0,0,0 c0.7,0.6,1.5,1.2,2.3,1.7c2.1,1.2,4.4,1.8,6.8,1.8c1.8,0,3.7-0.4,5.4-1.1c0.1,0,0.2-0.2,0.1-0.3c0-0.1-0.2-0.2-0.3-0.1 c-2.6,0.6-5.4,0.2-7.7-1.1c-2.5-1.4-4.2-3.7-4.9-6.4c-0.7-2.7-0.4-5.6,1.1-8.1c2.9-5.1,9.4-6.8,14.5-3.9c2.3,1.3,4.1,3.5,4.8,6.1 c0,0.1,0.1,0.2,0.3,0.2c0.1,0,0.2-0.1,0.2-0.2C49.5,25.1,47,21.3,43.3,19.2"
                />
                <path
                  class="virus-detail"
                  d="M25,12.9c-2.8,0-5.4-1.4-7.1-3.6c0-0.1-0.1-0.1,0-0.2C17.9,9,18,9,18,8.9c2.2-1,4.5-1.6,7-1.6 s4.8,0.5,7,1.6C32,9,32.1,9,32.1,9.1c0,0.1,0,0.1,0,0.2C30.4,11.5,27.8,12.9,25,12.9 M15.7,37.1c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0 c0.1,0,0.1-0.1,0.1-0.1c1.2-2.6,1-5.5-0.4-8c-1.4-2.4-3.9-4-6.7-4.3c-0.1,0-0.1,0-0.2,0.1c0,0-0.1,0.1-0.1,0.2 C9.1,29.8,11.7,34.3,15.7,37.1 M34.3,29c-1.4,2.4-1.5,5.4-0.4,8c0,0.1,0.1,0.1,0.1,0.1c0,0,0,0,0.1,0c0,0,0.1,0,0.1,0 c4.1-2.8,6.6-7.2,7-12.1c0-0.1,0-0.1-0.1-0.2c0,0-0.1-0.1-0.2-0.1C38.2,25,35.7,26.6,34.3,29"
                />
              </symbol>

              <symbol id="lock">
                <path
                  class="lock-body"
                  d="M893.9,1119.4v-5c0-7.6-6.2-13.8-13.8-13.8s-13.8,6.2-13.8,13.8v5h-6.2v30h40v-30H893.9z M880.1,1140.7c-3.5,0-6.2-2.8-6.2-6.2s2.8-6.2,6.2-6.2s6.2,2.8,6.2,6.2S883.6,1140.7,880.1,1140.7z M886.4,1119.4h-12.5v-5 c0-3.4,2.8-6.2,6.2-6.2s6.2,2.8,6.2,6.2V1119.4z"
                />
              </symbol>
            </defs>

            <!-- Paint order (SVG z-order = document order, bottom to top):
                     layer-triggers   invisible hotspot circles; lowest so the white hover disc shows BEHIND the artwork
                     layer-barriers   barrier lines + buttons
                     layer-drops      dropper drops
                     layer-users      user/workstation icons
                     layer-devices    shared folder, domain controller, hypervisor, backups
                     layer-credentials dotted exfiltration trails + yellow data/credential icons
                     layer-malware    virus icons + gradient tails (paint over the devices they attack)
                     layer-countdowns encryption timers
                     layer-locks      encryption finale - revealed by animBarrier4 as the clocks hide; topmost
                     Note: the barrier-N class appears in two subtrees on purpose - the artwork group in
                     layer-barriers (GSAP animates its lines/buttons) and a wrapper around the barrier
                     trigger in layer-triggers (the click listeners select ".barrier-N .trigger"). -->
            <g>
              <!--triggers - trigger sorting depends on target (html headers) sorting - sort targets first and then resort triggers-->
              <g id="layer-triggers">
                <!--h4 attacker-->
                <g class="trigger on" data-target="attacker">
                  <circle cx="800" cy="367" r="117" />
                </g>

                <!--h4 droppers-->
                <g class="trigger on" data-target="email-attachment">
                  <circle cx="731" cy="600" r="73" />
                </g>
                <g class="trigger on" data-target="download-wrapper">
                  <circle cx="869" cy="600" r="73" />
                </g>
                <g class="trigger on" data-target="malicious-link">
                  <circle cx="800" cy="675" r="73" />
                </g>

                <!--h3 first protection barrier-->
                <g class="barrier-1">
                  <!-- further group necessary on barrier trigger -->
                  <g
                    id="trigger-barrier-1"
                    class="trigger on"
                    data-target="first-barrier"
                  >
                    <circle class="click-right" cx="800" cy="813" r="73" />
                    <circle class="click-left" cx="800" cy="813" r="73" />
                  </g>
                </g>

                <!--h4 infection-->
                <g class="trigger trigger-L1" data-target="infection">
                  <circle cx="800" cy="830" r="73" />
                </g>

                <!--h4 first user-->
                <g class="trigger on" data-target="first-user">
                  <circle cx="800" cy="1020" r="117" />
                </g>

                <!--h4 credential and data exfiltration -->
                <g
                  class="trigger trigger-L1"
                  data-target="credential-and-data-1"
                >
                  <circle cx="604" cy="939" r="42" />
                  <circle cx="539" cy="814" r="42" />
                </g>

                <!--h3 second protection barrier-->
                <g class="barrier-2">
                  <!-- further group necessary on barrier trigger -->
                  <g
                    id="trigger-barrier-2"
                    class="trigger on"
                    data-target="second-barrier"
                  >
                    <circle class="click-right" cx="800" cy="1225" r="73" />
                    <circle class="click-left" cx="800" cy="1225" r="73" />
                  </g>
                </g>

                <!--h4 critical jump-->
                <g class="trigger trigger-L2" data-target="critical-jump">
                  <circle cx="630" cy="1170" r="73" />
                  <circle cx="970" cy="1170" r="73" />
                  <circle cx="800" cy="1242" r="73" />
                  <circle cx="643" cy="1366" r="73" />
                  <circle cx="957" cy="1366" r="73" />
                </g>

                <!-- h4 shared drive -->
                <g class="trigger on" data-target="shared-drives">
                  <circle cx="800" cy="1475" r="117" />
                </g>

                <!-- h4 privileged users -->
                <g class="trigger on" data-target="privileged-users">
                  <circle cx="443" cy="1429" r="117" />
                </g>
                <g class="trigger on" data-target="non-human-identity">
                  <circle cx="1157" cy="1429" r="117" />
                </g>

                <!-- h4 more valuable data and credentials -->
                <g
                  class="trigger trigger-L2"
                  data-target="credential-and-data-2"
                >
                  <circle cx="380" cy="1088" r="42" />
                  <circle cx="390" cy="1224" r="42" />
                  <circle cx="1220" cy="1088" r="42" />
                  <circle cx="1210" cy="1224" r="42" />
                </g>

                <g class="barrier-3">
                  <!-- further group necessary on barrier trigger -->
                  <g
                    id="trigger-barrier-3"
                    class="trigger on"
                    data-target="third-barrier"
                  >
                    <circle class="click-right" cx="800" cy="1637" r="73" />
                    <circle class="click-left" cx="800" cy="1637" r="73" />
                  </g>
                </g>

                <g class="trigger trigger-L3" data-target="lateral-movement">
                  <circle cx="619" cy="1545" r="73" />
                  <circle cx="981" cy="1545" r="73" />
                  <circle cx="800" cy="1665" r="73" />
                  <circle cx="463" cy="1654" r="73" />
                  <circle cx="609" cy="1744" r="73" />
                  <circle cx="991" cy="1744" r="73" />
                  <circle cx="1137" cy="1654" r="73" />
                </g>

                <g class="trigger on" data-target="domain-controller">
                  <circle cx="444" cy="1856" r="117" />
                </g>

                <g class="trigger on" data-target="hypervisor">
                  <circle cx="1158" cy="1856" r="117" />
                </g>

                <g class="trigger on" data-target="online-backups">
                  <circle cx="800" cy="1856" r="117" />
                </g>

                <g
                  class="trigger trigger-L3"
                  data-target="credential-and-data-3"
                >
                  <circle cx="262" cy="1491" r="42" />
                  <circle cx="288" cy="1629" r="42" />
                  <circle cx="1338" cy="1491" r="42" />
                  <circle cx="1312" cy="1629" r="42" />
                </g>

                <g class="barrier-4">
                  <!-- further group necessary on barrier trigger -->
                  <g
                    id="trigger-barrier-4"
                    class="trigger on"
                    data-target="fourth-barrier"
                  >
                    <circle class="click-right" cx="800" cy="2049" r="73" />
                    <circle class="click-left" cx="800" cy="2049" r="73" />
                  </g>
                </g>

                <g class="trigger trigger-L4" data-target="final-encryption">
                  <circle cx="800" cy="2046" r="73" />
                </g>

                <g class="trigger on" data-target="offline-backups">
                  <circle cx="800" cy="2251" r="117" />
                </g>
              </g>
              <!--barriers-->
              <g id="layer-barriers">
                <g class="barrier-1">
                  <line
                    class="barrier-line-muted"
                    x1="130"
                    y1="813"
                    x2="1470"
                    y2="813"
                  />
                  <line
                    class="barrier-line line-right"
                    x1="810"
                    y1="813"
                    x2="1470"
                    y2="813"
                  />
                  <line
                    class="barrier-line line-left"
                    x1="130"
                    y1="813"
                    x2="790"
                    y2="813"
                  />
                  <path
                    class="barrier-button button-right"
                    d="M825,788h-22v50h22c13.8,0,25-11.2,25-25S838.8,788,825,788z"
                  />
                  <path
                    class="barrier-button button-left"
                    d="M797,788h-22c-13.8,0-25,11.2-25,25s11.2,25,25,25h22V788z"
                  />
                </g>

                <g class="barrier-2">
                  <line
                    class="barrier-line-muted"
                    x1="130"
                    y1="1225"
                    x2="1470"
                    y2="1225"
                  />
                  <line
                    class="barrier-line line-right"
                    x1="810"
                    y1="1225"
                    x2="1470"
                    y2="1225"
                  />
                  <line
                    class="barrier-line line-left"
                    x1="130"
                    y1="1225"
                    x2="790"
                    y2="1225"
                  />
                  <path
                    class="barrier-button button-right"
                    d="M825,1200h-22v50h22 c13.8,0,25-11.2,25-25S838.8,1200,825,1200z"
                  />
                  <path
                    class="barrier-button button-left"
                    d="M797,1200h-22c-13.8,0-25,11.2-25,25 s11.2,25,25,25h22V1200z"
                  />
                </g>

                <g class="barrier-3">
                  <line
                    class="barrier-line-muted"
                    x1="130"
                    y1="1637"
                    x2="1470"
                    y2="1637"
                  />
                  <line
                    class="barrier-line line-right"
                    x1="810"
                    y1="1637"
                    x2="1470"
                    y2="1637"
                  />
                  <line
                    class="barrier-line line-left"
                    x1="130"
                    y1="1637"
                    x2="790"
                    y2="1637"
                  />
                  <path
                    class="barrier-button button-right"
                    d="M825,1612h-22v50h22 c13.8,0,25-11.2,25-25S838.8,1612,825,1612z"
                  />
                  <path
                    class="barrier-button button-left"
                    d="M797,1612h-22c-13.8,0-25,11.2-25,25 s11.2,25,25,25h22V1612z"
                  />
                </g>

                <g class="barrier-4">
                  <line
                    class="barrier-line-muted"
                    x1="130"
                    y1="2049"
                    x2="1470"
                    y2="2049"
                  />
                  <line
                    class="barrier-line line-right"
                    x1="810"
                    y1="2049"
                    x2="1470"
                    y2="2049"
                  />
                  <line
                    class="barrier-line line-left"
                    x1="130"
                    y1="2049"
                    x2="790"
                    y2="2049"
                  />
                  <path
                    class="barrier-button button-right"
                    d="M825,2024h-22v50h22 c13.8,0,25-11.2,25-25S838.8,2024,825,2024z"
                  />
                  <path
                    class="barrier-button button-left"
                    d="M797,2024h-22c-13.8,0-25,11.2-25,25 s11.2,25,25,25h22V2024z"
                  />
                </g>
              </g>

              <!--drops-->
              <g id="layer-drops">
                <g class="drop">
                  <linearGradient
                    href="#drop-stops"
                    xlink:href="#drop-stops"
                    id="fill-drop-1"
                    gradientUnits="userSpaceOnUse"
                    x1="735.0285"
                    y1="526.5248"
                    x2="735.0285"
                    y2="670.5248"
                  />
                  <path
                    fill="url(#fill-drop-1)"
                    d="M769.2,623.1 c-0.1-0.3-30.5-93.3-30.6-93.6c-0.5-1.6-1.8-3-3.5-3s-3,1.3-3.5,3c-0.1,0.3-30.5,93.3-30.6,93.6c-1.2,3.6-1.9,7.4-1.9,11.4 c0,19.9,16.1,36,36,36c19.9,0,36-16.1,36-36C771,630.5,770.4,626.7,769.2,623.1z M747.2,645.4c0,5.5-4.5,10-10,10s-10-4.5-10-10 v-26.2c0-3.5,2.8-6.2,6.2-6.2s6.2,2.8,6.2,6.2v23.8h-3.8v-23.8c0-1.4-1.1-2.5-2.5-2.5s-2.5,1.1-2.5,2.5v26.2c0,3.4,2.8,6.2,6.2,6.2 s6.2-2.8,6.2-6.2v-31.2c0-5.5-4.5-10-10-10s-10,4.5-10,10v28.8h-3.8v-28.8c0-7.6,6.2-13.8,13.8-13.8s13.8,6.1,13.8,13.8V645.4z"
                  />
                </g>
                <g class="drop">
                  <linearGradient
                    href="#drop-stops"
                    xlink:href="#drop-stops"
                    id="fill-drop-3"
                    gradientUnits="userSpaceOnUse"
                    x1="872.0285"
                    y1="528.5248"
                    x2="872.0285"
                    y2="672.5248"
                  />
                  <path
                    fill="url(#fill-drop-3)"
                    d="M906.2,625.1c-0.1-0.3-30.5-93.3-30.6-93.6c-0.5-1.6-1.8-3-3.5-3s-3,1.3-3.5,3 c-0.1,0.3-30.5,93.3-30.6,93.6c-1.2,3.6-1.9,7.4-1.9,11.4c0,19.9,16.1,36,36,36c19.9,0,36-16.1,36-36 C908,632.5,907.4,628.7,906.2,625.1z M867,628.9v-15h2.5h5h2.5v15h10l-15,15l-15-15H867z M894.5,653.9h-5h-40v-5h5h35h5V653.9z"
                  />
                </g>
                <g class="drop">
                  <linearGradient
                    href="#drop-stops"
                    xlink:href="#drop-stops"
                    id="fill-drop-2"
                    gradientUnits="userSpaceOnUse"
                    x1="802.0285"
                    y1="602.5248"
                    x2="802.0285"
                    y2="746.5248"
                  />
                  <path
                    fill="url(#fill-drop-2)"
                    d="M836.2,699.1 c-0.1-0.3-30.5-93.3-30.6-93.6c-0.5-1.6-1.8-3-3.5-3s-3,1.3-3.5,3c-0.1,0.3-30.5,93.3-30.6,93.6c-1.2,3.6-1.9,7.4-1.9,11.4 c0,19.9,16.1,36,36,36c19.9,0,36-16.1,36-36C838,706.5,837.4,702.7,836.2,699.1z M797.6,727.8c-3.9,3.9-10.2,3.9-14.1,0 s-3.9-10.2,0-14.1l10.6-10.6c3.9-3.9,10.2-3.9,14.1,0c0.6,0.6,1.1,1.3,1.5,2l-3.8,3.8c-0.2-0.8-0.6-1.6-1.3-2.3 c-1.9-1.9-5.1-1.9-7.1,0L787,717.2c-1.9,1.9-1.9,5.1,0,7.1c1.9,1.9,5.1,1.9,7.1,0l2.5-2.5c2,0.8,4.2,1,6.4,0.7L797.6,727.8z M818.8,706.6l-10.6,10.6c-3.9,3.9-10.2,3.9-14.1,0c-0.6-0.6-1.1-1.3-1.5-2l3.8-3.8c0.2,0.8,0.6,1.6,1.3,2.3c1.9,1.9,5.1,1.9,7.1,0 l10.6-10.6c1.9-1.9,1.9-5.1,0-7.1c-1.9-1.9-5.1-1.9-7.1,0l-2.5,2.5c-2-0.8-4.2-1-6.4-0.7l5.3-5.3c3.9-3.9,10.2-3.9,14.1,0 S822.7,702.7,818.8,706.6z"
                  />
                </g>
              </g>

              <!--users-->
              <g id="layer-users">
                <g class="user-L0">
                  <path
                    class="user"
                    d="M728.1,386.9c0,0,0,0,0,44.1c0,0,0,0-20.2,0c0,0,0,0,0-20C707.9,401.1,716.1,393.1,728.1,386.9z M760.1,310 c0-22.1,17.9-40,40-40s40,17.9,40,40c0,22.1-17.9,40-40,40S760.1,332.1,760.1,310z M780.1,311c0,11,9,20,20,20s20-9,20-20H780.1z M872.1,388c0,44,0,44,0,44c19.8,0,19.8,0,19.8,0c0-20,0-20,0-20C891.9,402.3,883.7,394.3,872.1,388z"
                  />
                  <path
                    class="machine-ink"
                    d="M739.9,458h120v6h-120V458z M820.7,408.2l-2.1,10.6h-8.3v10.4h-5.2v-7.8h-2.6v7.8h-5.2v-7.8h-2.6v7.8h-5.2 v-10.4h-8.3l-2.1-10.6c0.1-11.4,9.4-20.6,20.8-20.6C811.2,387.6,820.5,396.8,820.7,408.2z M796.2,408.4l1.8-1.8l-9.2-9.2 c-2.8,2.8-4.6,6.7-4.6,11H796.2z M807.7,416.2l-7.8-7.8l-7.8,7.8H807.7z M815.5,408.4c0-4.3-1.7-8.2-4.6-11l-9.2,9.2l1.8,1.8H815.5 z M859.9,370v74c0,4.4-3.6,8-8,8h-104c-4.4,0-8-3.6-8-8v-74c0-4.4,3.6-8,8-8h104C856.3,362,859.9,365.6,859.9,370z M825.9,408.4 c0-14.3-11.7-26-26-26c-14.3,0-26,11.7-26,26l3.1,15.6h7.3v10.4h31.2V424h7.3l3-15.1L825.9,408.4z"
                  />
                </g>
                <g class="user-L1">
                  <path
                    class="user"
                    d="M800,921c-22.1,0-40,17.9-40,40c0,22.1,17.9,40,40,40s40-17.9,40-40 C840,938.9,822.1,921,800,921z M800,981c-11,0-20-9-20-20c0-11,9-20,20-20s20,9,20,20C820,972,811,981,800,981z M707.8,1064v20H728 v-44.1C716,1046.1,707.8,1054.1,707.8,1064z M872,1039.9v44.1h20.2v-20C892.2,1054.1,884,1046.1,872,1039.9z"
                  />
                  <path
                    class="workstation"
                    d="M852,1013H748c-4.4,0-8,3.6-8,8v74c0,4.4,3.6,8,8,8h104c4.4,0,8-3.6,8-8v-74 C860,1016.6,856.4,1013,852,1013z M830.3,1063.4h-7.9c-1.6,9.4-9,16.8-18.4,18.4v7.9h-7.5v-7.9c-9.4-1.6-16.8-9-18.4-18.4h-7.9 v-7.5h7.9c1.6-9.4,9-16.8,18.4-18.4v-7.9h7.5v7.9c9.4,1.6,16.8,9,18.4,18.4h7.9V1063.4z M740,1109h120v6H740V1109z M800.3,1044.7 c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15S808.6,1044.7,800.3,1044.7z M800.3,1067.2c-4.1,0-7.5-3.4-7.5-7.5 c0-4.1,3.4-7.5,7.5-7.5c4.1,0,7.5,3.4,7.5,7.5C807.8,1063.8,804.4,1067.2,800.3,1067.2z"
                  />
                </g>
                <g class="user-L2">
                  <path
                    class="user"
                    d="M444,1332c-22.1,0-40,17.9-40,40 c0,22.1,17.9,40,40,40s40-17.9,40-40C484,1349.9,466.1,1332,444,1332z M444,1392c-11,0-20-9-20-20c0-11,9-20,20-20s20,9,20,20 C464,1383,455,1392,444,1392z M351.8,1475v20H372v-44.1C360,1457.1,351.8,1465.1,351.8,1475z M516,1450.9v44.1h20.2v-20 C536.2,1465.1,528,1457.1,516,1450.9z"
                  />
                  <path
                    class="workstation"
                    d="M384,1520h120v6H384V1520z M504,1432v74c0,4.4-3.6,8-8,8H392c-4.4,0-8-3.6-8-8v-74c0-4.4,3.6-8,8-8 h104C500.4,1424,504,1427.6,504,1432z M457.9,1476.1l13.2-12.9l-18.3-2.7l-8.2-16.6l-8.2,16.6l-18.3,2.7l13.2,12.9l-3.1,18.2 l16.4-8.6l16.4,8.6L457.9,1476.1z"
                  />
                </g>
                <g class="user-L2">
                  <path
                    class="user"
                    d="M1194.1,1352h-69.8c-5.6,0-10.1,4-10.1,9v42c0,5,4.5,9,10.1,9h69.8c5.6,0,10.1-4,10.1-9v-42c0-5-4.5-9-10.1-9ZM1139.2,1393c-6.1,0-11-4.9-11-11s4.9-11,11-11,11,4.9,11,11-4.9,11-11,11ZM1179.2,1393c-6.1,0-11-4.9-11-11s4.9-11,11-11,11,4.9,11,11-4.9,11-11,11Z M1066,1475v20h20.2v-44.1C1074.2,1457.1,1066,1465.1,1066,1475z M1230.2,1450.9v44.1h20.2v-20C1250.5,1465.1,1242.2,1457.1,1230.2,1450.9z"
                  />
                  <path
                    class="workstation"
                    d="M1098.2,1520h120v6H1098.2V1520z M1218.2,1432v74c0,4.4-3.6,8-8,8H1106.2c-4.4,0-8-3.6-8-8v-74c0-4.4,3.6-8,8-8 h104C1214.6,1424,1218.2,1427.6,1218.2,1432z M1172.1,1476.1l13.2-12.9l-18.3-2.7l-8.2-16.6l-8.2,16.6l-18.3,2.7l13.2,12.9l-3.1,18.2 l16.4-8.6l16.4,8.6L1172.1,1476.1z"
                  />
                </g>
              </g>

              <!--devices-->
              <g id="layer-devices">
                <g class="device device-L2" id="shared-drives">
                  <path
                    d="M807.6,1495H860c8.2,0,15-6.8,15-15v-40c0-8.2-6.7-15-15-15h-50l-25-25h-45c-8.2,0-14.9,6.8-14.9,15 l-0.1,65c0,8.2,6.7,15,15,15h52.5h1.4v12.9c-7.2,2.1-12.9,7.9-15,15.1h-52.3c-0.9,0-1.6,0.7-1.6,1.6v8.7c0,0.9,0.7,1.6,1.6,1.6 h52.3c2.6,9.2,11.1,16,21.1,16c10.1,0,18.5-6.8,21.1-16h52c0.9,0,1.6-0.7,1.6-1.6v-8.7c0-0.9-0.7-1.6-1.6-1.6h-52 c-2.1-7.4-7.9-13.2-15.3-15.2V1495H807.6z M810.1,1527.3c1.1,6.8-4.7,12.7-11.5,11.6c-4.1-0.7-7.5-4-8.2-8.2 c-1.1-6.8,4.7-12.7,11.5-11.6C806,1519.8,809.4,1523.2,810.1,1527.3z"
                  />
                </g>
                <g class="device device-L3" id="domain-controller">
                  <path
                    d="M448,1886.4l19.6-4.9l1.2-2.1c-1.2-3.4-1.9-7-1.9-10.7c0-17.2,14-31.2,31.3-31.2 c16.4,0,29.8,12.6,31.1,28.7l0.6-0.1l7.8-1.9c3.7-0.9,6.3-4.3,6.3-8.1v-37c0-3.8-2.6-7.2-6.3-8.1l-89.6-22.4 c-2.7-0.7-5.4-0.7-8.1,0l-89.6,22.4c-3.7,0.9-6.3,4.3-6.3,8.1v37c0,3.8,2.6,7.2,6.3,8.1l7.8,1.9l81.8,20.5 C442.6,1887.1,445.4,1887.1,448,1886.4z M444,1796l80.2,20.1l-80.2,20.1l-80.2-20.1L444,1796z M364.3,1852 c-4.3,0-7.8-4.7-7.8-10.4c0-5.8,3.5-10.4,7.8-10.4c4.3,0,7.8,4.7,7.8,10.4C372.1,1847.4,368.6,1852,364.3,1852z M529.4,1908.3 c-1.4,0-2.8,0.3-4.1,0.7l-17.1-29.7c2.8-2.7,4.6-6.4,4.6-10.6c0-8.1-6.5-14.6-14.6-14.6c-8.1,0-14.6,6.5-14.6,14.6 c0,4.2,1.8,7.9,4.6,10.6l-17.1,29.7c-1.3-0.4-2.7-0.7-4.1-0.7c-8.1,0-14.6,6.5-14.6,14.6c0,8.1,6.5,14.6,14.6,14.6 c7.3,0,13.4-5.4,14.4-12.5H515c1,7.1,7,12.5,14.4,12.5c8.1,0,14.6-6.5,14.6-14.6C544,1914.8,537.5,1908.3,529.4,1908.3 M498.2,1883.3c0.9,0,1.7-0.1,2.6-0.3l17.6,30.5c-0.8,1-1.5,2-2,3.1H480c-0.5-1.1-1.2-2.2-2-3.1l17.6-30.5 C496.4,1883.2,497.3,1883.3,498.2,1883.3"
                  />
                </g>
                <g class="device device-L3" id="online-backups">
                  <path
                    d="M770,1868.6c0,5.2-4.2,9.4-9.4,9.4c-5.2,0-9.4-4.2-9.4-9.4s4.2-9.4,9.4-9.4 C765.8,1859.2,770,1863.5,770,1868.6z M833.8,1848c-8.3,0-15,6.7-15,15s6.7,15,15,15c8.3,0,15-6.7,15-15S842,1848,833.8,1848z M890,1818v90c0,8.3-6.7,15-15,15H725c-8.3,0-15-6.7-15-15v-90c0-8.3,6.7-15,15-15h150C883.3,1803,890,1809.7,890,1818z M863.8,1863c0-16.6-13.4-30-30-30c-16.6,0-30,13.4-30,30c0,5.5,1.6,10.6,4.2,15h-24.8c1.2-2.9,1.9-6,1.9-9.4 c0-13.5-10.9-24.4-24.4-24.4c-13.5,0-24.4,10.9-24.4,24.4c0,13.5,10.9,24.4,24.4,24.4h73.1C850.3,1893,863.8,1879.6,863.8,1863z"
                  />
                </g>
                <g class="device device-L3" id="hypervisor">
                  <path
                    d="M1078.2,1802.7L1078.2,1802.7l80-20l80,20l0,0l-80,20L1078.2,1802.7z M1158.2,1917.7l-80-20v25 l80,20l80-20v-25L1158.2,1917.7z M1158.2,1877.7l-80-20v25l80,20l80-20v-25L1158.2,1877.7z M1158.2,1862.7l80-20v-25l-80,20 l-80-20v25L1158.2,1862.7z"
                  />
                </g>
                <g class="device device-L4" id="offline-backups">
                  <path
                    d="M886,2266.6l-25.9-64.7c-5.5-13.7-18.6-22.6-33.4-22.6h-53.4c-14.8,0-27.9,8.9-33.4,22.6 l-25.9,64.7c-2.6,6.6-4,13.6-4,20.7c0,19.9,16.1,36,36,36h108c19.9,0,36-16.1,36-36C890,2280.1,888.7,2273.2,886,2266.6z M854,2305.3H746c-9.9,0-18-8.1-18-18s8.1-18,18-18h108c9.9,0,18,8.1,18,18S863.9,2305.3,854,2305.3z M863,2287.2 c0,6.2-5,11.2-11.2,11.2s-11.2-5-11.2-11.2s5-11.2,11.2-11.2S863,2281,863,2287.2z M818,2287.3c0,5-4,9-9,9h-58.5c-5,0-9-4-9-9 s4-9,9-9H809C814,2278.3,818,2282.3,818,2287.3z"
                  />
                </g>
              </g>

              <!--credentials-->
              <g id="layer-credentials">
                <g class="stolen stolen-L1">
                  <g>
                    <g>
                      <g>
                        <circle
                          class="yellow"
                          cx="591.78"
                          cy="566.58"
                          r="2.93"
                        />
                        <circle
                          class="yellow"
                          cx="580.64"
                          cy="582.9"
                          r="2.89"
                        />
                        <circle
                          class="yellow"
                          cx="570.56"
                          cy="600.07"
                          r="2.85"
                        />
                        <circle
                          class="yellow"
                          cx="561.6"
                          cy="618.03"
                          r="2.81"
                        />
                        <circle
                          class="yellow"
                          cx="553.79"
                          cy="636.73"
                          r="2.78"
                        />
                        <circle
                          class="yellow"
                          cx="547.21"
                          cy="656.1"
                          r="2.74"
                        />
                        <circle
                          class="yellow"
                          cx="541.89"
                          cy="676.11"
                          r="2.7"
                        />
                        <circle
                          class="yellow"
                          cx="537.89"
                          cy="696.68"
                          r="2.67"
                        />
                        <circle
                          class="yellow"
                          cx="535.27"
                          cy="717.76"
                          r="2.63"
                        />
                        <circle
                          class="yellow"
                          cx="534.07"
                          cy="739.3"
                          r="2.59"
                        />
                        <circle
                          class="yellow"
                          cx="534.36"
                          cy="761.29"
                          r="2.56"
                        />
                        <circle class="yellow" cx="536.15" cy="783" r="2.52" />
                        <circle
                          class="yellow"
                          cx="539.4"
                          cy="804.22"
                          r="2.48"
                        />
                        <circle
                          class="yellow"
                          cx="544.04"
                          cy="824.89"
                          r="2.44"
                        />
                        <circle
                          class="yellow"
                          cx="550.02"
                          cy="844.95"
                          r="2.41"
                        />
                        <circle
                          class="yellow"
                          cx="557.29"
                          cy="864.34"
                          r="2.37"
                        />
                        <circle
                          class="yellow"
                          cx="565.79"
                          cy="882.99"
                          r="2.33"
                        />
                        <circle
                          class="yellow"
                          cx="575.46"
                          cy="900.86"
                          r="2.3"
                        />
                        <circle
                          class="yellow"
                          cx="586.26"
                          cy="917.87"
                          r="2.26"
                        />
                        <circle
                          class="yellow"
                          cx="598.12"
                          cy="933.98"
                          r="2.22"
                        />
                        <circle class="yellow" cx="611" cy="949.11" r="2.19" />
                        <circle
                          class="yellow"
                          cx="624.83"
                          cy="963.22"
                          r="2.15"
                        />
                        <circle
                          class="yellow"
                          cx="639.56"
                          cy="976.24"
                          r="2.11"
                        />
                        <circle
                          class="yellow"
                          cx="655.14"
                          cy="988.11"
                          r="2.07"
                        />
                        <circle
                          class="yellow"
                          cx="671.5"
                          cy="998.77"
                          r="2.04"
                        />
                        <circle class="yellow" cx="688.61" cy="1008.17" r="2" />
                      </g>
                      <path
                        class="yellow"
                        d="M617.03,536.73c-3.34,8.45-6.4,19.92-6.53,28.61l-7.16-13.37l-14.06-5.7 C597.9,545.22,608.98,540.96,617.03,536.73z"
                      />
                    </g>
                    <g>
                      <use xlink:href="#data" x="565" y="900"></use>
                      <use xlink:href="#credentials" x="500" y="775"></use>
                    </g>
                  </g>
                </g>

                <g class="stolen stolen-L2">
                  <g>
                    <g>
                      <g>
                        <circle class="yellow" cx="400.97" cy="1296" r="2" />
                        <circle
                          class="yellow"
                          cx="397.05"
                          cy="1276.5"
                          r="2.02"
                        />
                        <circle
                          class="yellow"
                          cx="393.5"
                          cy="1256.73"
                          r="2.05"
                        />
                        <circle
                          class="yellow"
                          cx="390.34"
                          cy="1236.73"
                          r="2.07"
                        />
                        <circle
                          class="yellow"
                          cx="387.57"
                          cy="1216.48"
                          r="2.1"
                        />
                        <circle
                          class="yellow"
                          cx="385.2"
                          cy="1196.02"
                          r="2.12"
                        />
                        <circle
                          class="yellow"
                          cx="383.24"
                          cy="1175.33"
                          r="2.14"
                        />
                        <circle
                          class="yellow"
                          cx="381.69"
                          cy="1154.44"
                          r="2.17"
                        />
                        <circle
                          class="yellow"
                          cx="380.56"
                          cy="1133.36"
                          r="2.19"
                        />
                        <circle
                          class="yellow"
                          cx="379.86"
                          cy="1112.1"
                          r="2.21"
                        />
                        <circle
                          class="yellow"
                          cx="379.59"
                          cy="1090.66"
                          r="2.24"
                        />
                        <circle
                          class="yellow"
                          cx="379.81"
                          cy="1066.54"
                          r="2.26"
                        />
                        <circle
                          class="yellow"
                          cx="380.59"
                          cy="1042.29"
                          r="2.29"
                        />
                        <circle
                          class="yellow"
                          cx="381.92"
                          cy="1018.28"
                          r="2.31"
                        />
                        <circle
                          class="yellow"
                          cx="383.8"
                          cy="994.52"
                          r="2.33"
                        />
                        <circle
                          class="yellow"
                          cx="386.21"
                          cy="971.03"
                          r="2.36"
                        />
                        <circle
                          class="yellow"
                          cx="389.15"
                          cy="947.82"
                          r="2.38"
                        />
                        <circle class="yellow" cx="392.6" cy="924.92" r="2.4" />
                        <circle
                          class="yellow"
                          cx="396.56"
                          cy="902.33"
                          r="2.43"
                        />
                        <circle class="yellow" cx="401" cy="880.08" r="2.45" />
                        <circle
                          class="yellow"
                          cx="405.94"
                          cy="858.17"
                          r="2.48"
                        />
                        <circle
                          class="yellow"
                          cx="411.35"
                          cy="836.63"
                          r="2.5"
                        />
                        <circle
                          class="yellow"
                          cx="417.22"
                          cy="815.46"
                          r="2.52"
                        />
                        <circle
                          class="yellow"
                          cx="423.55"
                          cy="794.69"
                          r="2.55"
                        />
                        <circle
                          class="yellow"
                          cx="430.32"
                          cy="774.32"
                          r="2.57"
                        />
                        <circle
                          class="yellow"
                          cx="437.53"
                          cy="754.38"
                          r="2.6"
                        />
                        <circle
                          class="yellow"
                          cx="445.16"
                          cy="734.89"
                          r="2.62"
                        />
                        <circle
                          class="yellow"
                          cx="453.21"
                          cy="715.84"
                          r="2.64"
                        />
                        <circle
                          class="yellow"
                          cx="461.66"
                          cy="697.27"
                          r="2.67"
                        />
                        <circle
                          class="yellow"
                          cx="470.51"
                          cy="679.19"
                          r="2.69"
                        />
                        <circle
                          class="yellow"
                          cx="479.74"
                          cy="661.61"
                          r="2.71"
                        />
                        <circle
                          class="yellow"
                          cx="489.35"
                          cy="644.54"
                          r="2.74"
                        />
                        <circle
                          class="yellow"
                          cx="499.33"
                          cy="628.01"
                          r="2.76"
                        />
                        <circle
                          class="yellow"
                          cx="509.66"
                          cy="612.03"
                          r="2.79"
                        />
                        <circle
                          class="yellow"
                          cx="520.34"
                          cy="596.61"
                          r="2.81"
                        />
                        <circle
                          class="yellow"
                          cx="531.35"
                          cy="581.78"
                          r="2.83"
                        />
                        <circle
                          class="yellow"
                          cx="542.69"
                          cy="567.53"
                          r="2.86"
                        />
                        <circle
                          class="yellow"
                          cx="554.34"
                          cy="553.9"
                          r="2.88"
                        />
                        <circle class="yellow" cx="566.31" cy="540.9" r="2.9" />
                        <circle
                          class="yellow"
                          cx="578.57"
                          cy="528.53"
                          r="2.93"
                        />
                        <circle
                          class="yellow"
                          cx="591.11"
                          cy="516.83"
                          r="2.95"
                        />
                      </g>
                      <path
                        class="yellow"
                        d="M617.03,495.45c-4.67,7.79-9.55,18.61-11.1,27.17l-4.89-14.36l-12.94-7.91
                                    C596.78,500.71,608.4,498.31,617.03,495.45z"
                      />
                    </g>

                    <g>
                      <use xlink:href="#credentials" x="340" y="1049"></use>
                      <use xlink:href="#data" x="350" y="1185"></use>
                    </g>
                  </g>
                  <g>
                    <g>
                      <g>
                        <circle class="yellow" cx="1199.03" cy="1296" r="2" />
                        <circle
                          class="yellow"
                          cx="1202.95"
                          cy="1276.5"
                          r="2.02"
                        />
                        <circle
                          class="yellow"
                          cx="1206.5"
                          cy="1256.73"
                          r="2.05"
                        />
                        <circle
                          class="yellow"
                          cx="1209.66"
                          cy="1236.73"
                          r="2.07"
                        />
                        <circle
                          class="yellow"
                          cx="1212.43"
                          cy="1216.48"
                          r="2.1"
                        />
                        <circle
                          class="yellow"
                          cx="1214.8"
                          cy="1196.02"
                          r="2.12"
                        />
                        <circle
                          class="yellow"
                          cx="1216.76"
                          cy="1175.33"
                          r="2.14"
                        />
                        <circle
                          class="yellow"
                          cx="1218.31"
                          cy="1154.44"
                          r="2.17"
                        />
                        <circle
                          class="yellow"
                          cx="1219.44"
                          cy="1133.36"
                          r="2.19"
                        />
                        <circle
                          class="yellow"
                          cx="1220.14"
                          cy="1112.1"
                          r="2.21"
                        />
                        <circle
                          class="yellow"
                          cx="1220.41"
                          cy="1090.66"
                          r="2.24"
                        />
                        <circle
                          class="yellow"
                          cx="1220.19"
                          cy="1066.54"
                          r="2.26"
                        />
                        <circle
                          class="yellow"
                          cx="1219.41"
                          cy="1042.29"
                          r="2.29"
                        />
                        <circle
                          class="yellow"
                          cx="1218.08"
                          cy="1018.28"
                          r="2.31"
                        />
                        <circle
                          class="yellow"
                          cx="1216.2"
                          cy="994.52"
                          r="2.33"
                        />
                        <circle
                          class="yellow"
                          cx="1213.79"
                          cy="971.03"
                          r="2.36"
                        />
                        <circle
                          class="yellow"
                          cx="1210.85"
                          cy="947.82"
                          r="2.38"
                        />
                        <circle
                          class="yellow"
                          cx="1207.4"
                          cy="924.92"
                          r="2.4"
                        />
                        <circle
                          class="yellow"
                          cx="1203.44"
                          cy="902.33"
                          r="2.43"
                        />
                        <circle class="yellow" cx="1199" cy="880.08" r="2.45" />
                        <circle
                          class="yellow"
                          cx="1194.06"
                          cy="858.17"
                          r="2.48"
                        />
                        <circle
                          class="yellow"
                          cx="1188.65"
                          cy="836.63"
                          r="2.5"
                        />
                        <circle
                          class="yellow"
                          cx="1182.78"
                          cy="815.46"
                          r="2.52"
                        />
                        <circle
                          class="yellow"
                          cx="1176.45"
                          cy="794.69"
                          r="2.55"
                        />
                        <circle
                          class="yellow"
                          cx="1169.68"
                          cy="774.32"
                          r="2.57"
                        />
                        <circle
                          class="yellow"
                          cx="1162.47"
                          cy="754.38"
                          r="2.6"
                        />
                        <circle
                          class="yellow"
                          cx="1154.84"
                          cy="734.89"
                          r="2.62"
                        />
                        <circle
                          class="yellow"
                          cx="1146.79"
                          cy="715.84"
                          r="2.64"
                        />
                        <circle
                          class="yellow"
                          cx="1138.34"
                          cy="697.27"
                          r="2.67"
                        />
                        <circle
                          class="yellow"
                          cx="1129.49"
                          cy="679.19"
                          r="2.69"
                        />
                        <circle
                          class="yellow"
                          cx="1120.26"
                          cy="661.61"
                          r="2.71"
                        />
                        <circle
                          class="yellow"
                          cx="1110.65"
                          cy="644.54"
                          r="2.74"
                        />
                        <circle
                          class="yellow"
                          cx="1100.67"
                          cy="628.01"
                          r="2.76"
                        />
                        <circle
                          class="yellow"
                          cx="1090.34"
                          cy="612.03"
                          r="2.79"
                        />
                        <circle
                          class="yellow"
                          cx="1079.66"
                          cy="596.61"
                          r="2.81"
                        />
                        <circle
                          class="yellow"
                          cx="1068.65"
                          cy="581.78"
                          r="2.83"
                        />
                        <circle
                          class="yellow"
                          cx="1057.31"
                          cy="567.53"
                          r="2.86"
                        />
                        <circle
                          class="yellow"
                          cx="1045.66"
                          cy="553.9"
                          r="2.88"
                        />
                        <circle
                          class="yellow"
                          cx="1033.69"
                          cy="540.9"
                          r="2.9"
                        />
                        <circle
                          class="yellow"
                          cx="1021.43"
                          cy="528.53"
                          r="2.93"
                        />
                        <circle
                          class="yellow"
                          cx="1008.89"
                          cy="516.83"
                          r="2.95"
                        />
                      </g>
                      <path
                        class="yellow"
                        d="M982.97,495.45c4.67,7.79,9.55,18.61,11.1,27.17l4.89-14.36l12.94-7.91 C1003.22,500.71,991.6,498.31,982.97,495.45z"
                      />
                    </g>
                    <g>
                      <use xlink:href="#credentials" x="1180" y="1049"></use>
                      <use xlink:href="#data" x="1170" y="1185"></use>
                    </g>
                  </g>
                </g>

                <g class="stolen stolen-L3">
                  <g>
                    <g>
                      <g>
                        <circle class="yellow" cx="325.44" cy="1755.63" r="2" />
                        <circle
                          class="yellow"
                          cx="318.94"
                          cy="1736.81"
                          r="2.02"
                        />
                        <circle
                          class="yellow"
                          cx="312.71"
                          cy="1717.72"
                          r="2.03"
                        />
                        <circle
                          class="yellow"
                          cx="306.75"
                          cy="1698.36"
                          r="2.05"
                        />
                        <circle
                          class="yellow"
                          cx="301.08"
                          cy="1678.73"
                          r="2.06"
                        />
                        <circle
                          class="yellow"
                          cx="295.68"
                          cy="1658.85"
                          r="2.08"
                        />
                        <circle
                          class="yellow"
                          cx="290.57"
                          cy="1638.71"
                          r="2.09"
                        />
                        <circle
                          class="yellow"
                          cx="285.75"
                          cy="1618.33"
                          r="2.11"
                        />
                        <circle
                          class="yellow"
                          cx="281.23"
                          cy="1597.72"
                          r="2.12"
                        />
                        <circle class="yellow" cx="277" cy="1576.87" r="2.14" />
                        <circle
                          class="yellow"
                          cx="273.08"
                          cy="1555.8"
                          r="2.15"
                        />
                        <circle
                          class="yellow"
                          cx="269.46"
                          cy="1534.52"
                          r="2.17"
                        />
                        <circle
                          class="yellow"
                          cx="266.16"
                          cy="1513.03"
                          r="2.18"
                        />
                        <circle
                          class="yellow"
                          cx="263.17"
                          cy="1491.34"
                          r="2.2"
                        />
                        <circle
                          class="yellow"
                          cx="260.5"
                          cy="1469.45"
                          r="2.21"
                        />
                        <circle
                          class="yellow"
                          cx="258.16"
                          cy="1447.37"
                          r="2.23"
                        />
                        <circle
                          class="yellow"
                          cx="256.14"
                          cy="1425.11"
                          r="2.24"
                        />
                        <circle
                          class="yellow"
                          cx="254.46"
                          cy="1402.68"
                          r="2.26"
                        />
                        <circle
                          class="yellow"
                          cx="253.12"
                          cy="1380.09"
                          r="2.27"
                        />
                        <circle
                          class="yellow"
                          cx="252.12"
                          cy="1357.33"
                          r="2.29"
                        />
                        <circle
                          class="yellow"
                          cx="251.46"
                          cy="1334.42"
                          r="2.3"
                        />
                        <circle
                          class="yellow"
                          cx="251.15"
                          cy="1311.36"
                          r="2.32"
                        />
                        <circle
                          class="yellow"
                          cx="251.22"
                          cy="1286.22"
                          r="2.33"
                        />
                        <circle
                          class="yellow"
                          cx="251.73"
                          cy="1260.06"
                          r="2.35"
                        />
                        <circle
                          class="yellow"
                          cx="252.7"
                          cy="1234.09"
                          r="2.36"
                        />
                        <circle
                          class="yellow"
                          cx="254.11"
                          cy="1208.33"
                          r="2.38"
                        />
                        <circle
                          class="yellow"
                          cx="255.96"
                          cy="1182.78"
                          r="2.39"
                        />
                        <circle
                          class="yellow"
                          cx="258.23"
                          cy="1157.45"
                          r="2.41"
                        />
                        <circle
                          class="yellow"
                          cx="260.94"
                          cy="1132.36"
                          r="2.42"
                        />
                        <circle
                          class="yellow"
                          cx="264.06"
                          cy="1107.51"
                          r="2.44"
                        />
                        <circle
                          class="yellow"
                          cx="267.6"
                          cy="1082.92"
                          r="2.45"
                        />
                        <circle
                          class="yellow"
                          cx="271.54"
                          cy="1058.59"
                          r="2.47"
                        />
                        <circle
                          class="yellow"
                          cx="275.88"
                          cy="1034.54"
                          r="2.48"
                        />
                        <circle
                          class="yellow"
                          cx="280.61"
                          cy="1010.77"
                          r="2.5"
                        />
                        <circle
                          class="yellow"
                          cx="285.74"
                          cy="987.3"
                          r="2.52"
                        />
                        <circle
                          class="yellow"
                          cx="291.24"
                          cy="964.14"
                          r="2.53"
                        />
                        <circle
                          class="yellow"
                          cx="297.12"
                          cy="941.29"
                          r="2.55"
                        />
                        <circle
                          class="yellow"
                          cx="303.37"
                          cy="918.77"
                          r="2.56"
                        />
                        <circle
                          class="yellow"
                          cx="309.98"
                          cy="896.59"
                          r="2.58"
                        />
                        <circle
                          class="yellow"
                          cx="316.95"
                          cy="874.75"
                          r="2.59"
                        />
                        <circle
                          class="yellow"
                          cx="324.27"
                          cy="853.27"
                          r="2.61"
                        />
                        <circle
                          class="yellow"
                          cx="331.93"
                          cy="832.15"
                          r="2.62"
                        />
                        <circle
                          class="yellow"
                          cx="339.93"
                          cy="811.42"
                          r="2.64"
                        />
                        <circle
                          class="yellow"
                          cx="348.26"
                          cy="791.07"
                          r="2.65"
                        />
                        <circle
                          class="yellow"
                          cx="356.92"
                          cy="771.12"
                          r="2.67"
                        />
                        <circle
                          class="yellow"
                          cx="365.89"
                          cy="751.58"
                          r="2.68"
                        />
                        <circle
                          class="yellow"
                          cx="375.18"
                          cy="732.46"
                          r="2.7"
                        />
                        <circle
                          class="yellow"
                          cx="384.78"
                          cy="713.77"
                          r="2.71"
                        />
                        <circle
                          class="yellow"
                          cx="394.67"
                          cy="695.51"
                          r="2.73"
                        />
                        <circle
                          class="yellow"
                          cx="404.86"
                          cy="677.71"
                          r="2.74"
                        />
                        <circle
                          class="yellow"
                          cx="415.34"
                          cy="660.36"
                          r="2.76"
                        />
                        <circle
                          class="yellow"
                          cx="426.1"
                          cy="643.49"
                          r="2.77"
                        />
                        <circle
                          class="yellow"
                          cx="437.13"
                          cy="627.09"
                          r="2.79"
                        />
                        <circle
                          class="yellow"
                          cx="448.43"
                          cy="611.19"
                          r="2.8"
                        />
                        <circle class="yellow" cx="460" cy="595.79" r="2.82" />
                        <circle
                          class="yellow"
                          cx="471.82"
                          cy="580.89"
                          r="2.83"
                        />
                        <circle
                          class="yellow"
                          cx="483.89"
                          cy="566.52"
                          r="2.85"
                        />
                        <circle
                          class="yellow"
                          cx="496.21"
                          cy="552.68"
                          r="2.86"
                        />
                        <circle
                          class="yellow"
                          cx="508.77"
                          cy="539.38"
                          r="2.88"
                        />
                        <circle
                          class="yellow"
                          cx="521.55"
                          cy="526.64"
                          r="2.89"
                        />
                        <circle
                          class="yellow"
                          cx="534.57"
                          cy="514.45"
                          r="2.91"
                        />
                        <circle
                          class="yellow"
                          cx="547.8"
                          cy="502.84"
                          r="2.92"
                        />
                        <circle
                          class="yellow"
                          cx="561.24"
                          cy="491.81"
                          r="2.94"
                        />
                        <circle
                          class="yellow"
                          cx="574.89"
                          cy="481.37"
                          r="2.95"
                        />
                        <circle
                          class="yellow"
                          cx="588.75"
                          cy="471.54"
                          r="2.97"
                        />
                      </g>
                      <path
                        class="yellow"
                        d="M617.03,453.73c-5.62,7.14-11.83,17.25-14.44,25.54l-3.03-14.87l-11.84-9.48 C596.28,456.38,608.11,455.47,617.03,453.73z"
                      />
                    </g>
                    <g>
                      <use xlink:href="#credentials" x="220" y="1452"></use>
                      <use xlink:href="#data" x="245" y="1590"></use>
                    </g>
                  </g>
                  <g>
                    <g>
                      <g>
                        <circle
                          class="yellow"
                          cx="1274.56"
                          cy="1755.63"
                          r="2"
                        />
                        <circle
                          class="yellow"
                          cx="1281.06"
                          cy="1736.81"
                          r="2.02"
                        />
                        <circle
                          class="yellow"
                          cx="1287.29"
                          cy="1717.72"
                          r="2.03"
                        />
                        <circle
                          class="yellow"
                          cx="1293.25"
                          cy="1698.36"
                          r="2.05"
                        />
                        <circle
                          class="yellow"
                          cx="1298.92"
                          cy="1678.73"
                          r="2.06"
                        />
                        <circle
                          class="yellow"
                          cx="1304.32"
                          cy="1658.85"
                          r="2.08"
                        />
                        <circle
                          class="yellow"
                          cx="1309.43"
                          cy="1638.71"
                          r="2.09"
                        />
                        <circle
                          class="yellow"
                          cx="1314.25"
                          cy="1618.33"
                          r="2.11"
                        />
                        <circle
                          class="yellow"
                          cx="1318.77"
                          cy="1597.72"
                          r="2.12"
                        />
                        <circle
                          class="yellow"
                          cx="1323"
                          cy="1576.87"
                          r="2.14"
                        />
                        <circle
                          class="yellow"
                          cx="1326.92"
                          cy="1555.8"
                          r="2.15"
                        />
                        <circle
                          class="yellow"
                          cx="1330.54"
                          cy="1534.52"
                          r="2.17"
                        />
                        <circle
                          class="yellow"
                          cx="1333.84"
                          cy="1513.03"
                          r="2.18"
                        />
                        <circle
                          class="yellow"
                          cx="1336.83"
                          cy="1491.34"
                          r="2.2"
                        />
                        <circle
                          class="yellow"
                          cx="1339.5"
                          cy="1469.45"
                          r="2.21"
                        />
                        <circle
                          class="yellow"
                          cx="1341.84"
                          cy="1447.37"
                          r="2.23"
                        />
                        <circle
                          class="yellow"
                          cx="1343.86"
                          cy="1425.11"
                          r="2.24"
                        />
                        <circle
                          class="yellow"
                          cx="1345.54"
                          cy="1402.68"
                          r="2.26"
                        />
                        <circle
                          class="yellow"
                          cx="1346.88"
                          cy="1380.09"
                          r="2.27"
                        />
                        <circle
                          class="yellow"
                          cx="1347.88"
                          cy="1357.33"
                          r="2.29"
                        />
                        <circle
                          class="yellow"
                          cx="1348.54"
                          cy="1334.42"
                          r="2.3"
                        />
                        <circle
                          class="yellow"
                          cx="1348.85"
                          cy="1311.36"
                          r="2.32"
                        />
                        <circle
                          class="yellow"
                          cx="1348.78"
                          cy="1286.22"
                          r="2.33"
                        />
                        <circle
                          class="yellow"
                          cx="1348.27"
                          cy="1260.06"
                          r="2.35"
                        />
                        <circle
                          class="yellow"
                          cx="1347.3"
                          cy="1234.09"
                          r="2.36"
                        />
                        <circle
                          class="yellow"
                          cx="1345.89"
                          cy="1208.33"
                          r="2.38"
                        />
                        <circle
                          class="yellow"
                          cx="1344.04"
                          cy="1182.78"
                          r="2.39"
                        />
                        <circle
                          class="yellow"
                          cx="1341.77"
                          cy="1157.45"
                          r="2.41"
                        />
                        <circle
                          class="yellow"
                          cx="1339.06"
                          cy="1132.36"
                          r="2.42"
                        />
                        <circle
                          class="yellow"
                          cx="1335.94"
                          cy="1107.51"
                          r="2.44"
                        />
                        <circle
                          class="yellow"
                          cx="1332.4"
                          cy="1082.92"
                          r="2.45"
                        />
                        <circle
                          class="yellow"
                          cx="1328.46"
                          cy="1058.59"
                          r="2.47"
                        />
                        <circle
                          class="yellow"
                          cx="1324.12"
                          cy="1034.54"
                          r="2.48"
                        />
                        <circle
                          class="yellow"
                          cx="1319.39"
                          cy="1010.77"
                          r="2.5"
                        />
                        <circle
                          class="yellow"
                          cx="1314.26"
                          cy="987.3"
                          r="2.52"
                        />
                        <circle
                          class="yellow"
                          cx="1308.76"
                          cy="964.14"
                          r="2.53"
                        />
                        <circle
                          class="yellow"
                          cx="1302.88"
                          cy="941.29"
                          r="2.55"
                        />
                        <circle
                          class="yellow"
                          cx="1296.63"
                          cy="918.77"
                          r="2.56"
                        />
                        <circle
                          class="yellow"
                          cx="1290.02"
                          cy="896.59"
                          r="2.58"
                        />
                        <circle
                          class="yellow"
                          cx="1283.05"
                          cy="874.75"
                          r="2.59"
                        />
                        <circle
                          class="yellow"
                          cx="1275.73"
                          cy="853.27"
                          r="2.61"
                        />
                        <circle
                          class="yellow"
                          cx="1268.07"
                          cy="832.15"
                          r="2.62"
                        />
                        <circle
                          class="yellow"
                          cx="1260.07"
                          cy="811.42"
                          r="2.64"
                        />
                        <circle
                          class="yellow"
                          cx="1251.74"
                          cy="791.07"
                          r="2.65"
                        />
                        <circle
                          class="yellow"
                          cx="1243.08"
                          cy="771.12"
                          r="2.67"
                        />
                        <circle
                          class="yellow"
                          cx="1234.11"
                          cy="751.58"
                          r="2.68"
                        />
                        <circle
                          class="yellow"
                          cx="1224.82"
                          cy="732.46"
                          r="2.7"
                        />
                        <circle
                          class="yellow"
                          cx="1215.22"
                          cy="713.77"
                          r="2.71"
                        />
                        <circle
                          class="yellow"
                          cx="1205.33"
                          cy="695.51"
                          r="2.73"
                        />
                        <circle
                          class="yellow"
                          cx="1195.14"
                          cy="677.71"
                          r="2.74"
                        />
                        <circle
                          class="yellow"
                          cx="1184.66"
                          cy="660.36"
                          r="2.76"
                        />
                        <circle
                          class="yellow"
                          cx="1173.9"
                          cy="643.49"
                          r="2.77"
                        />
                        <circle
                          class="yellow"
                          cx="1162.87"
                          cy="627.09"
                          r="2.79"
                        />
                        <circle
                          class="yellow"
                          cx="1151.57"
                          cy="611.19"
                          r="2.8"
                        />
                        <circle class="yellow" cx="1140" cy="595.79" r="2.82" />
                        <circle
                          class="yellow"
                          cx="1128.18"
                          cy="580.89"
                          r="2.83"
                        />
                        <circle
                          class="yellow"
                          cx="1116.11"
                          cy="566.52"
                          r="2.85"
                        />
                        <circle
                          class="yellow"
                          cx="1103.79"
                          cy="552.68"
                          r="2.86"
                        />
                        <circle
                          class="yellow"
                          cx="1091.23"
                          cy="539.38"
                          r="2.88"
                        />
                        <circle
                          class="yellow"
                          cx="1078.45"
                          cy="526.64"
                          r="2.89"
                        />
                        <circle
                          class="yellow"
                          cx="1065.43"
                          cy="514.45"
                          r="2.91"
                        />
                        <circle
                          class="yellow"
                          cx="1052.2"
                          cy="502.84"
                          r="2.92"
                        />
                        <circle
                          class="yellow"
                          cx="1038.76"
                          cy="491.81"
                          r="2.94"
                        />
                        <circle
                          class="yellow"
                          cx="1025.11"
                          cy="481.37"
                          r="2.95"
                        />
                        <circle
                          class="yellow"
                          cx="1011.25"
                          cy="471.54"
                          r="2.97"
                        />
                      </g>
                      <path
                        class="yellow"
                        d="M982.97,453.73c5.62,7.14,11.83,17.25,14.44,25.54l3.03-14.87l11.84-9.48 C1003.72,456.38,991.89,455.47,982.97,453.73z"
                      />
                    </g>
                    <g>
                      <use xlink:href="#credentials" x="1295" y="1452"></use>
                      <use xlink:href="#data" x="1268" y="1590"></use>
                    </g>
                  </g>
                </g>
              </g>

              <!--malware-->
              <g id="layer-malware">
                <g class="malware malware-L1">
                  <g id="malware-1">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-1"
                      gradientUnits="userSpaceOnUse"
                      x1="800"
                      y1="890.5135"
                      x2="800"
                      y2="773.6385"
                    />
                    <path
                      fill="url(#tail-1)"
                      d="M825.6,854.9 c-0.1-0.2-25.1-80.6-25.1-80.8c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5c0,0.2-25,80.6-25.1,80.8c-0.9,2.7-1.4,5.6-1.4,8.6 c0,14.9,12.1,27,27,27s27-12.1,27-27C827,860.5,826.5,857.6,825.6,854.9z"
                    />
                    <use xlink:href="#virus" x="775" y="840"></use>
                  </g>
                </g>

                <g class="malware malware-L2">
                  <g id="malware-2">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-2"
                      gradientUnits="userSpaceOnUse"
                      x1="1592.3638"
                      y1="-273.0219"
                      x2="1705.6549"
                      y2="-314.2565"
                      gradientTransform="matrix(0.1464 -0.9892 -0.9892 -0.1464 93.0778 2750.1321)"
                    />
                    <path
                      fill="url(#tail-2)"
                      d="M588.4,1171.6 c18.5-26.2,48.1-45.7,80-49.1c17.2-1.8,8.7,1,2.3,5.8c-12.3,9.4-22.9,21.3-29.5,35.5c-3.1,6.8-5.5,13.9-6.8,21.2 c-1.1,13.8-4,25.4-18.9,30.7C588.3,1224,569.9,1192.2,588.4,1171.6z"
                    />
                    <use xlink:href="#virus" x="581" y="1167"></use>
                  </g>
                  <g id="malware-3">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-3"
                      gradientUnits="userSpaceOnUse"
                      x1="1592.3638"
                      y1="-273.0219"
                      x2="1705.6549"
                      y2="-314.2565"
                      gradientTransform="matrix(-0.1464 -0.9892 0.9892 -0.1464 1506.9222 2750.1321)"
                    />
                    <path
                      fill="url(#tail-3)"
                      d="M1011.6,1171.6 c-18.5-26.2-48.1-45.7-80-49.1c-17.2-1.8-8.7,1-2.3,5.8c12.3,9.4,22.9,21.3,29.5,35.5c3.1,6.8,5.5,13.9,6.8,21.2 c1.1,13.8,4,25.4,18.9,30.7C1011.7,1224,1030.1,1192.2,1011.6,1171.6z"
                    />
                    <use xlink:href="#virus" x="968" y="1167"></use>
                  </g>
                  <g id="malware-4">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-4"
                      gradientUnits="userSpaceOnUse"
                      x1="800"
                      y1="1300.0302"
                      x2="800"
                      y2="1183.1552"
                    />
                    <path
                      fill="url(#tail-4)"
                      d="M825.6,1264.5 c-0.1-0.2-25.1-80.6-25.1-80.8c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5c0,0.2-25,80.6-25.1,80.8c-0.9,2.7-1.4,5.6-1.4,8.6 c0,14.9,12.1,27,27,27s27-12.1,27-27C827,1270,826.5,1267.1,825.6,1264.5z"
                    />
                    <use xlink:href="#virus" x="775" y="1250"></use>
                  </g>
                  <g id="malware-5">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-5"
                      gradientUnits="userSpaceOnUse"
                      x1="1434.0609"
                      y1="-343.6102"
                      x2="1547.3521"
                      y2="-384.8448"
                      gradientTransform="matrix(0.6944 -0.7196 -0.7196 -0.6944 -659.0195 2186.3442)"
                    />
                    <path
                      fill="url(#tail-5)"
                      d="M602.8,1353.2 c30.3-10.6,65.7-9.2,93.6,6.6c15,8.5,6.5,5.9-1.5,6.1c-15.4,0.5-31,4-44.7,11.7c-6.5,3.7-12.5,8.1-17.9,13.3 c-9,10.6-18.1,18.3-33.2,14C572.2,1395.8,575.8,1359.2,602.8,1353.2z"
                    />
                    <use xlink:href="#virus" x="581" y="1356"></use>
                  </g>
                  <g id="malware-6">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-6"
                      gradientUnits="userSpaceOnUse"
                      x1="1434.0609"
                      y1="-343.6102"
                      x2="1547.3521"
                      y2="-384.8448"
                      gradientTransform="matrix(-0.6944 -0.7196 0.7196 -0.6944 2259.0195 2186.3442)"
                    />
                    <path
                      fill="url(#tail-6)"
                      d="M997.2,1353.2 c-30.3-10.6-65.7-9.2-93.6,6.6c-15,8.5-6.5,5.9,1.5,6.1c15.4,0.5,31,4,44.7,11.7c6.5,3.7,12.5,8.1,17.9,13.3 c9,10.6,18.1,18.3,33.2,14C1027.8,1395.8,1024.2,1359.2,997.2,1353.2z"
                    />
                    <use xlink:href="#virus" x="968" y="1356"></use>
                  </g>
                </g>

                <g class="malware malware-L3">
                  <g id="malware-7">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-7"
                      gradientUnits="userSpaceOnUse"
                      x1="1549.3492"
                      y1="-713.5541"
                      x2="1662.6404"
                      y2="-754.7887"
                      gradientTransform="matrix(-0.222 -0.9751 0.9751 -0.222 1696.7693 2939.053)"
                    />
                    <path
                      fill="url(#tail-7)"
                      d="M661.7,1542.9 c-20.5-24.7-51.4-41.9-83.5-42.8c-17.3-0.5-8.6,1.6-1.9,6c13,8.4,24.5,19.5,32.2,33.1c3.6,6.5,6.5,13.4,8.4,20.6 c2.2,13.7,6,25,21.2,29.2C665.8,1595.2,681.7,1562,661.7,1542.9z"
                    />
                    <use xlink:href="#virus" x="620" y="1540"></use>
                  </g>

                  <g id="malware-8">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-8"
                      gradientUnits="userSpaceOnUse"
                      x1="1549.3492"
                      y1="-713.5541"
                      x2="1662.6404"
                      y2="-754.7887"
                      gradientTransform="matrix(0.222 -0.9751 -0.9751 -0.222 -96.7692 2939.053)"
                    />
                    <path
                      fill="url(#tail-8)"
                      d="M938.3,1542.9 c20.5-24.7,51.4-41.9,83.5-42.8c17.3-0.5,8.6,1.6,1.9,6c-13,8.4-24.5,19.5-32.2,33.1c-3.6,6.5-6.5,13.4-8.4,20.6 c-2.2,13.7-6,25-21.2,29.2C934.2,1595.2,918.3,1562,938.3,1542.9z"
                    />
                    <use xlink:href="#virus" x="930" y="1540"></use>
                  </g>
                  <g id="malware-9">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-9"
                      gradientUnits="userSpaceOnUse"
                      x1="800"
                      y1="1719.5468"
                      x2="800"
                      y2="1602.6718"
                    />
                    <path
                      fill="url(#tail-9)"
                      d="M825.6,1684 c-0.1-0.2-25.1-80.6-25.1-80.8c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5c0,0.2-25,80.6-25.1,80.8c-0.9,2.7-1.4,5.6-1.4,8.6 c0,14.9,12.1,27,27,27s27-12.1,27-27C827,1689.5,826.5,1686.7,825.6,1684z"
                    />
                    <use xlink:href="#virus" x="775" y="1670"></use>
                  </g>

                  <g id="malware-10">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-10"
                      gradientUnits="userSpaceOnUse"
                      x1="1164.2388"
                      y1="-886.8447"
                      x2="1277.5299"
                      y2="-928.0793"
                      gradientTransform="matrix(0.7706 -0.6373 0.6373 0.7706 110.3023 3136.1028)"
                    />
                    <path
                      fill="url(#tail-10)"
                      d="M483.5,1695.1 c12.9-29.4,14.2-64.8,0.6-93.9c-7.3-15.6-5.3-7-6.2,1c-1.6,15.3-6.4,30.7-15.1,43.6c-4.2,6.2-9.1,11.9-14.7,16.8 c-11.2,8.1-19.7,16.6-16.5,32.1C438.7,1722.3,475.4,1721.5,483.5,1695.1z"
                    />
                    <use xlink:href="#virus" x="432" y="1665"></use>
                  </g>

                  <g id="malware-11">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-11"
                      gradientUnits="userSpaceOnUse"
                      x1="1409.5068"
                      y1="-848.1269"
                      x2="1522.798"
                      y2="-889.3615"
                      gradientTransform="matrix(-0.6944 -0.7196 0.7196 -0.6944 2257.0195 2186.3442)"
                    />
                    <path
                      fill="url(#tail-11)"
                      d="M649.2,1721.2 c-30.3-10.6-65.7-9.2-93.6,6.6c-15,8.5-6.5,5.9,1.5,6.1c15.4,0.5,31,4,44.7,11.7c6.5,3.7,12.5,8.1,17.9,13.3 c9,10.6,18.1,18.3,33.2,14C679.8,1763.8,676.2,1727.2,649.2,1721.2z"
                    />
                    <use xlink:href="#virus" x="620" y="1724"></use>
                  </g>

                  <g id="malware-12">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-12"
                      gradientUnits="userSpaceOnUse"
                      x1="1409.5068"
                      y1="-848.1269"
                      x2="1522.798"
                      y2="-889.3615"
                      gradientTransform="matrix(0.6944 -0.7196 -0.7196 -0.6944 -657.0195 2186.3442)"
                    />
                    <path
                      fill="url(#tail-12)"
                      d="M950.8,1721.2 c30.3-10.6,65.7-9.2,93.6,6.6c15,8.5,6.5,5.9-1.5,6.1c-15.4,0.5-31,4-44.7,11.7c-6.5,3.7-12.5,8.1-17.9,13.3 c-9,10.6-18.1,18.3-33.2,14C920.2,1763.8,923.8,1727.2,950.8,1721.2z"
                    />
                    <use xlink:href="#virus" x="930" y="1724"></use>
                  </g>

                  <g id="malware-13">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-13"
                      gradientUnits="userSpaceOnUse"
                      x1="1164.2388"
                      y1="-886.8447"
                      x2="1277.5299"
                      y2="-928.0793"
                      gradientTransform="matrix(-0.7706 -0.6373 -0.6373 0.7706 1487.2822 3136.1028)"
                    />
                    <path
                      fill="url(#tail-13)"
                      d="M1114.1,1695.1 c-12.9-29.4-14.2-64.8-0.6-93.9c7.3-15.6,5.3-7,6.2,1c1.6,15.3,6.4,30.7,15.1,43.6c4.2,6.2,9.1,11.9,14.7,16.8 c11.2,8.1,19.7,16.6,16.5,32.1C1158.9,1722.3,1122.1,1721.5,1114.1,1695.1z"
                    />
                    <use xlink:href="#virus" x="1115" y="1665"></use>
                  </g>
                </g>

                <g class="malware malware-L4">
                  <g id="malware-14">
                    <linearGradient
                      href="#tail-stops"
                      xlink:href="#tail-stops"
                      id="tail-14"
                      gradientUnits="userSpaceOnUse"
                      x1="800"
                      y1="2094.0632"
                      x2="800"
                      y2="1977.1884"
                    />
                    <path
                      fill="url(#tail-14)"
                      d="M825.6,2058.5 c-0.1-0.2-25.1-80.6-25.1-80.8c0-0.3-0.2-0.5-0.5-0.5c-0.3,0-0.5,0.2-0.5,0.5c0,0.2-25,80.6-25.1,80.8c-0.9,2.7-1.4,5.6-1.4,8.6 c0,14.9,12.1,27,27,27s27-12.1,27-27C827,2064.1,826.5,2061.2,825.6,2058.5z"
                    />
                    <use xlink:href="#virus" x="775" y="2045"></use>
                  </g>
                </g>
              </g>
            </g>

            <!--countdown-->
            <g id="layer-countdowns">
              <g id="countdown-1" class="countdown">
                <rect x="871.5" y="1102" width="15" height="6" />
                <circle cx="879" cy="1131" r="20" />
                <path
                  class="lancetta"
                  d="M882,1131c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1131z"
                />
              </g>

              <g id="countdown-2" class="countdown">
                <rect x="515.5" y="1513" width="15" height="6" />
                <circle cx="523" cy="1542" r="20" />
                <path
                  class="lancetta"
                  d="M526,1542c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1542z"
                />
              </g>

              <g id="countdown-3" class="countdown">
                <rect x="887.6" y="1538" width="15" height="6" />
                <circle cx="895.1" cy="1567" r="20" />
                <path
                  class="lancetta"
                  d="M898.1,1567c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1567z"
                />
              </g>

              <g id="countdown-4" class="countdown">
                <rect x="1229.5" y="1513" width="15" height="6" />
                <circle cx="1237" cy="1542" r="20" />
                <path
                  class="lancetta"
                  d="M1240,1542c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1542z"
                />
              </g>

              <g id="countdown-5" class="countdown">
                <rect x="556.5" y="1924" width="15" height="6" />
                <circle cx="564" cy="1953" r="20" />
                <path
                  class="lancetta"
                  d="M567,1953c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1953z"
                />
              </g>

              <g id="countdown-6" class="countdown">
                <rect x="902.5" y="1910" width="15" height="6" />
                <circle cx="910" cy="1939" r="20" />
                <path
                  class="lancetta"
                  d="M913,1939c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1939z"
                />
              </g>

              <g id="countdown-7" class="countdown">
                <rect x="1250.5" y="1929" width="15" height="6" />
                <circle cx="1258" cy="1958" r="20" />
                <path
                  class="lancetta"
                  d="M1261,1958c0,1.7-1.3,3-3,3s-3-1.3-3-3l0,0v-12h6V1958z"
                />
              </g>
            </g>

            <!--locks-->
            <g id="layer-locks">
              <g class="lock" id="lock-user-top">
                <rect x="733.1" y="1005.3" width="134" height="116" />
                <use xlink:href="#lock" x="0" y="0"></use>
              </g>
              <g class="lock" id="lock-user-left">
                <rect x="377.9" y="1417" width="134" height="116" />
                <use xlink:href="#lock" x="-356" y="412"></use>
              </g>
              <g class="lock" id="lock-user-right">
                <rect x="1090.9" y="1417" width="134" height="116" />
                <use xlink:href="#lock" x="356" y="412"></use>
              </g>
              <g class="lock" id="lock-shared-drive">
                <rect x="718.5" y="1392" width="163" height="166" />
                <use xlink:href="#lock" x="13" y="435"></use>
              </g>
              <g class="lock" id="lock-domain-controller">
                <rect x="336.5" y="1780.7" width="215" height="164" />
                <use xlink:href="#lock" x="-315" y="824"></use>
              </g>
              <g class="lock" id="lock-hypervisor">
                <rect x="1069.2" y="1777.2" width="178" height="171" />
                <use xlink:href="#lock" x="380" y="826"></use>
              </g>
              <g class="lock" id="lock-online-backups">
                <use xlink:href="#lock" x="31" y="813"></use>
                <rect x="703" y="1795.5" width="194" height="135" />
              </g>
              <g class="lock" id="lock-offline-backups">
                <use xlink:href="#lock" x="30" y="1210"></use>
                <rect x="703" y="2172" width="194" height="160" />
              </g>
            </g>
          </svg>
        </div>

        <div class="card-stack" aria-live="polite">
          <div class="card-frame">
            <div class="card" id="card-a">
              <h2 class="card-heading"></h2>
              <p class="card-body"></p>
            </div>
            <div class="card" id="card-b">
              <h2 class="card-heading"></h2>
              <p class="card-body"></p>
            </div>
          </div>
        </div>
      </div>
      <!-- .diagram-column -->`

export function define(gsap) {
    if (customElements.get("ransomware-infographic")) return

    class RansomwareInfographic extends HTMLElement {
        static observedAttributes = ["autoplay"]

        connectedCallback() {
            if (this.shadowRoot) return
            const root = this.attachShadow({ mode: "open" })
            root.innerHTML = `<style>${STYLE}</style><div class="app-shell">${MARKUP}</div>`
            const shell = root.querySelector(".app-shell")
            if (!this.hasAttribute("theme")) {
                const page = document.documentElement.dataset.theme
                this.setAttribute("theme", page || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))
            }
            this.ctx = gsap.context(() => this.build(shell), shell)
        }

        disconnectedCallback() {
            this.ctx?.revert()
            this.cleanup?.forEach((f) => f())
        }

        attributeChangedCallback() {
            if (this.ctx) this.syncAutoplay?.()
        }

        build(shell) {
            const host = this
            const cleanup = (this.cleanup = [])
            const select = (el) => shell.querySelector(el)
            const selectAll = (el) => shell.querySelectorAll(el)
            
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
            
            gsap.to(".lancetta", {
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
            
            /* opening barrier N pauses the drop animation and plays barriers 1..N;
               closing it reverses barriers N..4. Only closing barrier 1 resumes the
               drop animation, since that's the only click that can fully reset the
               diagram back to its pristine, all-closed state. */
            const barrierAnims = [animBarrier1, animBarrier2, animBarrier3, animBarrier4]
            
            barrierAnims.forEach((anim, i) => {
                selectAll(`.barrier-${i + 1} .trigger`).forEach((item) => {
                    item.addEventListener("click", () => {
                        if (anim.reversed()) {
                            animDrop.pause()
                            barrierAnims.slice(0, i + 1).forEach((a) => a.play())
                        } else {
                            if (i === 0) animDrop.play()
                            barrierAnims.slice(i).forEach((a) => a.reverse())
                        }
                    })
                })
            })
            
            
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
            
            /* used both for the "currently selected hotspot" state and (below) as a
               hover affordance */
            function setTriggerActive(trigger, on) {
                trigger.classList.toggle("lit", on)
                trigger.setAttribute("aria-pressed", String(on))
            }
            
            /* short hover-only label - stays a compliant WAI-ARIA tooltip (one phrase,
               non-interactive) precisely because the full text lives in the card below
               instead. Real hover devices only, so it can't get stuck open after a tap. */
            
            const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
            
            const tooltip = document.createElement("div")
            tooltip.className = "tooltip"
            shell.appendChild(tooltip)
            
            /* card-frame's (and diagram-controls') width tracks the diagram's actual
               rendered width (see .card-frame and .diagram-controls in style.css) so the
               card - and the icon toolbar above it - stay flush with the diagram's outer
               edges at any viewport size, without a duplicated CSS formula. */
            
            const svgEl = select(".infographic > svg")
            const cardFrame = select(".card-frame")
            const diagramControls = select(".diagram-controls")
            
            const sizer = new ResizeObserver(() => {
                const scale = host.getBoundingClientRect().width / host.offsetWidth || 1 // a scaled host: back to its own pixels
                const width = `${svgEl.getBoundingClientRect().width / scale}px`
                cardFrame.style.width = width
                diagramControls.style.width = width
            })
            sizer.observe(svgEl)
            cleanup.push(() => sizer.disconnect())
            
            /* card-stack - a double buffer of two full-size cards in the fixed bottom
               20% band (see .card-stack in style.css). Selecting a hotspot writes into
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
            const introHeading = intro.querySelector("h1").textContent
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
            
                trigger.setAttribute("tabindex", host.hasAttribute("autoplay") ? "-1" : "0") // playing by itself, the diagram is not a control
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
            
            /* Home button - resets the diagram to its pristine state: reverses any open
               barriers (same effect as closing barrier 1), clears the selected hotspot,
               and slides the intro card back in. */
            const homeButton = select("#home-button")
            homeButton.addEventListener("click", () => {
                if (!animBarrier1.reversed()) {
                    animDrop.play()
                    barrierAnims.forEach((anim) => anim.reverse())
                }
                if (activeKey) {
                    setTriggerActive(triggerByKey.get(activeKey), false)
                    activeKey = null
                }
                showCard(introHeading, introBody)
            })
            
            /* Theme toggle: switches this piece's theme; on its own page (standalone) it also remembers the choice and
               keeps the page's <html data-theme> in step, and until a choice is made the theme follows the system live. */
            const themeToggle = select("#theme-toggle")
            const themeToggleIcon = themeToggle.querySelector(".icon path")
            const SUN = "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
            const MOON = "M11.01 3.05C6.51 3.54 3 7.36 3 12c0 4.97 4.03 9 9 9 4.63 0 8.45-3.5 8.95-8 .09-.79-.78-1.42-1.54-.95-.84.54-1.84.85-2.91.85-2.98 0-5.4-2.42-5.4-5.4 0-1.06.31-2.06.84-2.89.45-.67-.04-1.63-.93-1.56z"
            
            function syncThemeToggle(theme) {
                themeToggleIcon.setAttribute("d", theme === "dark" ? SUN : MOON)
                themeToggle.setAttribute(
                    "aria-label",
                    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
                )
            }
            
            function setTheme(theme) {
                host.setAttribute("theme", theme)
                if (host.hasAttribute("standalone")) document.documentElement.dataset.theme = theme
                syncThemeToggle(theme)
            }
            
            syncThemeToggle(host.getAttribute("theme"))
            
            themeToggle.addEventListener("click", () => {
                const next = host.getAttribute("theme") === "dark" ? "light" : "dark"
                if (host.hasAttribute("standalone")) try { localStorage.setItem("theme", next) } catch {}
                setTheme(next)
            })
            
            const systemDark = matchMedia("(prefers-color-scheme: dark)")
            const followSystem = (e) => {
                if (!host.hasAttribute("standalone")) return
                try { if (localStorage.getItem("theme")) return } catch {}
                setTheme(e.matches ? "dark" : "light")
            }
            systemDark.addEventListener("change", followSystem)
            cleanup.push(() => systemDark.removeEventListener("change", followSystem))
            
            /* Autoplay ******************************************************************************************************
               The story on a loop: the intro, then each barrier opens with its card, the finale, then back home. It runs only
               while the piece is on screen; with reduced motion it holds still on the finale. */
            const story = [
                { key: null, hold: 3 },
                { key: "first-barrier", open: 0, hold: 4 },
                { key: "second-barrier", open: 1, hold: 4 },
                { key: "third-barrier", open: 2, hold: 4 },
                { key: "fourth-barrier", open: 3, hold: 2 },
                { key: "final-encryption", hold: 4 },
            ]
            let step = 0
            let timer = null
            let onScreen = false
            const still = matchMedia("(prefers-reduced-motion: reduce)")
            
            function goHome() {
                animDrop.play()
                barrierAnims.forEach((anim) => anim.reverse())
                if (activeKey) setTriggerActive(triggerByKey.get(activeKey), false)
                activeKey = null
                showCard(introHeading, introBody)
            }
            
            function playStep() {
                const s = story[step]
                if (s.key === null) goHome()
                else {
                    selectHotspot(triggerByKey.get(s.key))
                    if (s.open !== undefined) {
                        animDrop.pause()
                        barrierAnims.slice(0, s.open + 1).forEach((a) => a.play())
                    }
                }
                step = (step + 1) % story.length
                timer = gsap.delayedCall(s.hold, playStep)
            }
            
            function holdFinale() {
                animDrop.pause()
                barrierAnims.forEach((a) => a.progress(1).pause())
                selectHotspot(triggerByKey.get("final-encryption"))
            }
            
            const watcher = new IntersectionObserver(([entry]) => {
                onScreen = entry.isIntersecting
                host.syncAutoplay()
            })
            cleanup.push(() => watcher.disconnect())
            
            host.syncAutoplay = () => {
                timer?.kill()
                timer = null
                if (!host.hasAttribute("autoplay")) return
                if (still.matches) return holdFinale()
                if (onScreen) playStep()
            }
            watcher.observe(host)
            
        }
    }

    customElements.define("ransomware-infographic", RansomwareInfographic)
}

if (typeof window !== "undefined" && window.gsap) define(window.gsap)
