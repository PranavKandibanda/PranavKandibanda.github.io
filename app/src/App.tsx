import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AutonomyScene = lazy(() => import('./components/AutonomyScene'));
const ConceptModel = lazy(() => import('./components/ConceptModel'));

type BoundaryProps = { children: ReactNode; fallback: ReactNode };
type BoundaryState = { failed: boolean };

class SceneBoundary extends Component<BoundaryProps, BoundaryState> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.warn('3D visualization unavailable', error, info.componentStack); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function useVisualCapability() {
  const [capability, setCapability] = useState({ webgl: false, reduced: true, lowQuality: true });
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const evaluate = () => {
      let webgl = false;
      try {
        const canvas = document.createElement('canvas');
        webgl = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
      } catch { /* The static map remains available. */ }
      const lowQuality = window.innerWidth < 720 || (navigator.hardwareConcurrency || 4) <= 4;
      setCapability({ webgl, reduced: media.matches, lowQuality });
    };
    evaluate();
    media.addEventListener('change', evaluate);
    window.addEventListener('resize', evaluate);
    return () => { media.removeEventListener('change', evaluate); window.removeEventListener('resize', evaluate); };
  }, []);
  return capability;
}

const chapters = [
  { number: '00', id: 'intro', eyebrow: 'Autonomous systems / an introduction', title: <>Engineering<br /><em>Intelligence</em><br />Into Motion.</>, description: 'I’m Pranav Kandibanda — a ROS 2 simulation intern, NC State robotics researcher, and VEX programming captain building across sensing, controls, and embedded systems.', annotation: 'A robot becomes autonomous through a continuous loop of observing, estimating, deciding, and acting.' },
  { number: '01', id: 'perception', eyebrow: 'Observe the world', title: <>Perception begins<br />with a <em>measurement.</em></>, description: 'LiDAR and other sensors turn physical surroundings into data a robot can use. Every return is evidence, with limits and noise.', annotation: 'Illustrative LiDAR rays reveal nearby geometry. They are a conceptual visualization, not recorded sensor data.' },
  { number: '02', id: 'localization', eyebrow: 'Estimate position', title: <>Where am I,<br /><em>really?</em></>, description: 'Wheel motion predicts a pose. Sensor observations correct it. A particle cloud makes the uncertainty visible as the estimate converges.', annotation: 'Conceptual Monte Carlo Localization: hypotheses narrow as observations agree with the map.' },
  { number: '03', id: 'planning', eyebrow: 'Choose a route', title: <>A path is an<br /><em>engineering decision.</em></>, description: 'A planner weighs possible routes around obstacles. The selected trajectory becomes a goal for the controller, subject to new information.', annotation: 'Candidate paths and a selected route are illustrative; no project algorithm is running here.' },
  { number: '04', id: 'control', eyebrow: 'Turn decisions into motion', title: <>Motion has<br /><em>constraints.</em></>, description: 'Acceleration, turning, and deceleration must respect the robot’s mechanics. Good control connects a path on a screen to reliable physical movement.', annotation: 'The robot follows a smoothed conceptual path. Explore the real engineering work below.' },
];

function StaticMap({ label = 'Illustrative autonomy model' }: { label?: string }) {
  return <div className="static-map" role="img" aria-label="Illustrative overhead map showing a robot navigating around obstacles along a curved route">
    <div className="static-map-grid" />
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="274" y="110" width="128" height="97" rx="7" />
      <rect x="504" y="242" width="110" height="142" rx="7" />
      <rect x="166" y="383" width="115" height="95" rx="7" />
      <path className="static-route" d="M104 475 C183 455 255 324 355 328 S468 440 550 404 S648 245 714 147" />
      <circle className="static-start" cx="104" cy="475" r="12" />
      <circle className="static-end" cx="714" cy="147" r="16" />
      <g className="static-robot" transform="translate(355 328) rotate(-25)"><rect x="-31" y="-38" width="62" height="76" rx="9" /><rect x="-40" y="-23" width="9" height="46" rx="3" /><rect x="31" y="-23" width="9" height="46" rx="3" /><circle cx="0" cy="-10" r="11" /></g>
      <text x="92" y="510">START</text><text x="674" y="118">GOAL</text>
    </svg>
    <span className="visual-label">{label}</span>
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Pranav Kandibanda, back to top"><span className="brand-mark">PK<span>.</span></span><span className="brand-descriptor">ENGINEERING<br />PORTFOLIO</span></a>
    <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '×' : '＋'}</span></button>
    <nav id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label="Primary navigation" onClick={() => setOpen(false)}>
      <a href="#work">Work</a><a href="#experience">Experience</a><a href="#impact">Impact</a><a href="#about">About</a><a href="#contact">Contact</a><a className="nav-resume" href="/resume.html">Résumé <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const capability = useVisualCapability();
  const threeD = capability.webgl && !capability.reduced;
  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current, start: 'top top', end: 'bottom top',
      onUpdate: self => { progress.current = self.progress * .23; },
      onToggle: self => setActive(self.isActive),
    });
    return () => trigger.kill();
  }, []);
  return <section className="autonomy-story" id="top" ref={ref} aria-label="Pranav Kandibanda engineering portfolio introduction">
    <div className="story-visual" onPointerMove={event => { pointer.current = { x: (event.clientX / window.innerWidth - .5) * 2, y: (event.clientY / window.innerHeight - .5) * 2 }; }}>
      {threeD ? <SceneBoundary fallback={<StaticMap />}><Suspense fallback={<StaticMap />}><AutonomyScene progress={progress} pointer={pointer} active={active} lowQuality={capability.lowQuality} /></Suspense></SceneBoundary> : <StaticMap />}
      <div className="scene-caption"><span className="scene-caption-index">FIG. 01 / AUTONOMOUS NAVIGATION</span><span>{capability.reduced ? 'Reduced motion view' : threeD ? 'Illustrative 3D simulation' : 'Illustrative navigation map'}</span></div>
    </div>
    <div className="story-content">
      <div className="chapter chapter-0"><div className="chapter-copy"><span className="eyebrow"><b>PRANAV KANDIBANDA</b> ELECTRICAL + COMPUTER ENGINEERING</span><h1 className="hero-title">{chapters[0].title}</h1><p>{chapters[0].description}</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a><a className="text-link" href="#about">About me <span aria-hidden="true">↗</span></a></div></div><div className="hero-proof"><span>ROS 2 SIMULATION INTERN</span><span>NC STATE ROBOTICS RESEARCH</span><span>8TH / TEXAS VEX STATE</span></div></div>
    </div>
  </section>;
}

function SectionHead({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: ReactNode; intro?: string }) {
  return <div className="section-head"><div className="section-kicker"><span>{index}</span><span>{eyebrow}</span></div><div><h2>{title}</h2>{intro && <p>{intro}</p>}</div></div>;
}

function Pipeline() {
  return <div className="pipeline" aria-label="ROS 2 navigation pipeline: sensor data to localization, Nav2 planning, controller, robot, and telemetry">
    {['SENSOR DATA', 'LOCALIZATION', 'NAV2 PLANNER', 'CONTROLLER', 'ROBOT'].map((label, i) => <div className="pipeline-node" key={label}><span>{String(i + 1).padStart(2, '0')}</span><strong>{label}</strong></div>)}
    <div className="pipeline-feedback">↖ TELEMETRY + DEBUGGING FEEDBACK</div>
  </div>;
}

function Trajectory() {
  const [mode, setMode] = useState<'route' | 'profile' | 'estimate'>('route');
  return <div className="trajectory-module">
    <div className="module-top"><div><span className="module-kicker">INTERACTIVE ENGINEERING STUDY</span><h3>Motion under constraints.</h3></div><div className="segmented" role="group" aria-label="Choose motion control visualization"><button className={mode === 'route' ? 'selected' : ''} onClick={() => setMode('route')}>Route</button><button className={mode === 'profile' ? 'selected' : ''} onClick={() => setMode('profile')}>Profile</button><button className={mode === 'estimate' ? 'selected' : ''} onClick={() => setMode('estimate')}>Estimate</button></div></div>
    <svg className="trajectory-svg" viewBox="0 0 780 360" role="img" aria-label={mode === 'route' ? 'Illustrative robot route around a field obstacle' : mode === 'profile' ? 'Illustrative trapezoidal velocity and triangular acceleration profiles' : 'Illustrative desired versus estimated robot position'}>
      <defs><pattern id="plot-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#354349" strokeWidth="1" /></pattern></defs>
      <rect width="780" height="360" fill="url(#plot-grid)" />
      {mode === 'route' && <><rect x="310" y="100" width="145" height="120" rx="6" fill="#354449" stroke="#63777a" /><text x="330" y="167">OBSTACLE</text><path d="M85 290 C170 270 205 202 266 252 C315 293 448 304 520 240 S630 93 700 77" fill="none" stroke="#df8155" strokeWidth="5" /><circle cx="85" cy="290" r="10" fill="#e1ded3" /><circle cx="700" cy="77" r="15" fill="none" stroke="#df8155" strokeWidth="3" /><text x="80" y="320">START</text><text x="678" y="52">GOAL</text><path d="M85 290 Q355 10 700 77" fill="none" stroke="#78918f" strokeDasharray="6 7" strokeWidth="2" /><text x="230" y="83">ALTERNATIVE</text></>}
      {mode === 'profile' && <><path d="M70 290 H720 M70 290 V53" fill="none" stroke="#9dada9" strokeWidth="2" /><path d="M70 290 L258 105 H480 L680 290" fill="none" stroke="#df8155" strokeWidth="5" /><path d="M70 233 H258 M258 233 H480 M480 233 H680" fill="none" stroke="#a8c7c0" strokeDasharray="8 6" strokeWidth="3" /><text x="115" y="76">ACCELERATE</text><text x="316" y="76">CRUISE</text><text x="548" y="76">DECELERATE</text><text x="620" y="325">TIME →</text><text x="75" y="325">0</text><text x="90" y="110">VELOCITY</text></>}
      {mode === 'estimate' && <><path d="M75 284 C215 282 292 158 385 160 S532 238 702 71" fill="none" stroke="#df8155" strokeWidth="4" /><path d="M75 284 C220 284 290 168 387 175 S528 224 694 84" fill="none" stroke="#a8c7c0" strokeDasharray="8 6" strokeWidth="4" /><circle cx="385" cy="160" r="22" fill="none" stroke="#df8155" /><circle cx="387" cy="175" r="40" fill="none" stroke="#a8c7c0" strokeDasharray="4 4" /><text x="84" y="56">DESIRED POSE</text><text x="84" y="86">ESTIMATED POSE + UNCERTAINTY</text><line x1="68" y1="51" x2="75" y2="51" stroke="#df8155" strokeWidth="4" /><line x1="68" y1="81" x2="75" y2="81" stroke="#a8c7c0" strokeWidth="4" /></>}
    </svg>
    <div className="module-foot"><span>FIG. 02 / {mode.toUpperCase()}</span><p>{mode === 'route' ? 'A route has to respect field geometry and drivetrain behavior.' : mode === 'profile' ? 'A trapezoidal profile limits acceleration and gives the robot time to slow for the target.' : 'Odometry estimates movement; sensor feedback can reduce drift and uncertainty.'}</p></div>
  </div>;
}

function ResearchPlot() {
  const [density, setDensity] = useState(1);
  return <div className="research-plot"><div className="research-controls"><span className="module-kicker">ILLUSTRATIVE TRAJECTORY COMPARISON</span><label htmlFor="density">Obstacle density <strong>{['LOW', 'MEDIUM', 'HIGH'][density]}</strong></label><input id="density" type="range" min="0" max="2" step="1" value={density} onChange={event => setDensity(Number(event.target.value))} /></div><svg viewBox="0 0 700 330" role="img" aria-label={`Illustrative comparison of two path planning routes at ${['low', 'medium', 'high'][density]} obstacle density`}><defs><pattern id="research-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#354349" /></pattern></defs><rect width="700" height="330" fill="url(#research-grid)" /><rect x="260" y="105" width="75" height="75" fill="#526368" /><rect x="470" y="185" width="72" height="67" fill="#526368" />{density > 0 && <rect x="375" y="55" width="67" height="54" fill="#526368" />}{density > 1 && <><rect x="143" y="200" width="68" height="61" fill="#526368" /><rect x="572" y="75" width="56" height="69" fill="#526368" /></>}<path d={density === 0 ? 'M60 275 C230 272 390 236 646 58' : density === 1 ? 'M60 275 C205 276 202 83 350 219 S505 178 646 58' : 'M60 275 C124 271 122 139 226 148 S350 250 450 267 S570 197 646 58'} fill="none" stroke="#df8155" strokeWidth="4" /><path d={density === 0 ? 'M60 275 Q350 90 646 58' : density === 1 ? 'M60 275 Q190 130 340 221 T646 58' : 'M60 275 Q101 80 226 148 Q343 63 450 267 T646 58'} fill="none" stroke="#9ebdb8" strokeWidth="2" strokeDasharray="7 7" /><circle cx="60" cy="275" r="9" fill="#dedbd1" /><circle cx="646" cy="58" r="13" fill="none" stroke="#df8155" strokeWidth="3" /></svg><div className="plot-legend"><span><i /> Candidate A</span><span><i /> Candidate B</span><p>Conceptual comparison only. No benchmark results are implied.</p></div></div>;
}

function LazyModel({ kind }: { kind: 'vex' | 'cargo' | 'weed' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const capability = useVisualCapability();
  useEffect(() => { if (!ref.current) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { rootMargin: '200px' }); observer.observe(ref.current); return () => observer.disconnect(); }, []);
  const fallback = <div className={`model-fallback model-${kind}`} role="img" aria-label={`Illustrative ${kind} robot concept`}><div className="model-fallback-robot"><span /><span /><span /><span /></div></div>;
  return <div className="model-frame" ref={ref}>{visible && capability.webgl && !capability.reduced ? <SceneBoundary fallback={fallback}><Suspense fallback={fallback}><ConceptModel kind={kind} lowQuality={capability.lowQuality} /></Suspense></SceneBoundary> : fallback}<div className="model-notation"><span>ILLUSTRATIVE CONCEPT MODEL</span><span>{capability.webgl && !capability.reduced ? 'DRAG TO INSPECT ↗' : 'STATIC VIEW'}</span></div></div>;
}

function Work() {
  return <section id="work" className="section work-section"><div className="section-shell"><SectionHead index="01 / 05" eyebrow="SELECTED ENGINEERING" title={<>From simulation<br />to <em>physical systems.</em></>} intro="Selected work from internships, research, competition, and hands-on builds. Each case study shows my contribution and the project’s current state." />
    <article className="feature-project anthropilot"><div className="feature-meta"><span>01 / PROFESSIONAL WORK</span><span>2026—PRESENT</span></div><div className="feature-grid"><div className="feature-copy"><p className="project-role">Simulation Engineering Intern · AnthroPilot</p><h3>Making autonomous navigation testable.</h3><p className="project-lead">ROS 2 navigation, sensor pipelines, and Gazebo simulations connect robot behavior with the tools teams use to inspect it.</p><div className="project-detail"><span>THE WORK</span><p>I develop publisher, subscriber, and action based communication for simulated and physical TurtleBot3 workflows; integrate navigation and controllers; and improve telemetry and debugging with Dashboard, UI/UX, and Labeling Engine collaborators.</p></div><div className="project-detail"><span>ENGINEERING DECISION</span><p>Reliable recovery matters as much as a successful route. The public ROS repository documents a teleoperation recovery state machine that pauses and resumes navigation around manual intervention.</p></div><div className="tag-row"><span>ROS 2</span><span>Nav2</span><span>Gazebo</span><span>TurtleBot3</span></div><a className="arrow-link" href="https://github.com/PranavKandibanda/anthropilot_ros" target="_blank" rel="noopener noreferrer">Explore public ROS work <span aria-hidden="true">↗</span></a></div><div className="feature-visual"><div className="visual-top"><span>SIMULATION / SYSTEM VIEW</span><span>01 — 05</span></div><StaticMap label="Conceptual navigation scene · not project footage" /><Pipeline /><div className="visual-bottom"><span>01 SENSOR INPUT</span><span>02 NAVIGATION</span><span>03 TELEMETRY</span></div></div></div></article>
    <article className="feature-project vex-project"><div className="feature-meta"><span>02 / MOTION CONTROL</span><span>2024—PRESENT</span></div><div className="feature-grid"><div className="feature-copy"><p className="project-role">VEX Robotics · Team 654X / PKLib</p><h3>Software that makes movement repeatable.</h3><p className="project-lead">I lead a three person programming team and build motion control tools in C++ and PROS, from odometry and geometry to drivetrain behavior and telemetry.</p><div className="project-detail"><span>TECHNICAL DEPTH</span><p>PKLib combines LemLib based odometry with custom drivetrain control, desktop testing, and trapezoidal and triangular motion profiles. Monte Carlo Localization is an ongoing development effort.</p></div><div className="project-detail"><span>TEAM RESULT</span><p>Team 654X finished eighth at the Texas State Championship. My role includes programming leadership and coaching.</p></div><div className="tag-row"><span>C++</span><span>PROS</span><span>Odometry</span><span>Motion profiles</span></div><a className="arrow-link" href="https://github.com/PranavKandibanda/654XOverRide" target="_blank" rel="noopener noreferrer">View public VEX team code <span aria-hidden="true">↗</span></a></div><div className="feature-visual"><LazyModel kind="vex" /><div className="coordinate-caption"><span>POSE: x, y, θ</span><span>DESIRED ↔ ESTIMATED</span></div></div></div><Trajectory /></article>
    <div className="project-pair"><article className="project-panel"><div className="feature-meta"><span>03 / TEAM ROBOTICS</span><span>IN DEVELOPMENT</span></div><LazyModel kind="cargo" /><div className="panel-copy"><p className="project-role">Autonomous Human Following Cargo Robot</p><h3>Moving the load, following the person.</h3><p>A team built mobile chassis and power control system for a cargo robot. The intended behavior uses Raspberry Pi control, UWB wearable tracking, and LiDAR obstacle sensing to follow a person safely. Sensing and autonomous navigation remain in integration.</p><div className="system-steps"><span>WEARABLE / UWB</span><span>POSITION ESTIMATE</span><span>MOTOR CONTROL</span></div><div className="tag-row"><span>Raspberry Pi</span><span>UWB</span><span>LiDAR</span><span>Power distribution</span></div></div></article><article className="project-panel"><div className="feature-meta"><span>04 / EMBEDDED SYSTEMS</span><span>IN DEVELOPMENT</span></div><LazyModel kind="weed" /><div className="panel-copy"><p className="project-role">Autonomous Weed Removal Robot</p><h3>Practical autonomy for agriculture.</h3><p>I built a custom CAD drivetrain around motors and encoders and connected ESP32 and Arduino Mega control. LiDAR navigation and weed sensing are still being developed. The goal is affordable, practical field automation.</p><div className="system-steps"><span>SENSE</span><span>LOCALIZE</span><span>ACT</span></div><div className="tag-row"><span>ESP32</span><span>Arduino Mega</span><span>Encoders</span><span>CAD</span></div><a className="arrow-link" href="https://github.com/PranavKandibanda/WeedRemovalRobot" target="_blank" rel="noopener noreferrer">View project repository <span aria-hidden="true">↗</span></a></div></article></div>
    <article className="feature-project research-project"><div className="feature-meta"><span>05 / RESEARCH</span><span>SUMMER 2026</span></div><div className="feature-grid"><div className="feature-copy"><p className="project-role">North Carolina State University · Student Researcher</p><h3>Studying how navigation choices change performance.</h3><p className="project-lead">I investigated ROS 2 planners and controllers across simulated environments and robot models, looking at algorithmic efficiency as goal distance and obstacle density change.</p><div className="project-detail"><span>METHOD</span><p>Nav2, Gazebo, and RViz provided a way to compare trajectories and controller behavior. The visualization shown here is illustrative; it does not display unpublished benchmark results.</p></div><div className="tag-row"><span>ROS 2</span><span>Nav2</span><span>Gazebo</span><span>RViz</span></div></div><ResearchPlot /></div></article>
  </div></section>;
}

function AutonomyBreakdown() {
  const [selected, setSelected] = useState(0);
  const links = [
    'AnthroPilot sensor pipelines and the cargo robot’s LiDAR integration connect measurement to decisions.',
    'PKLib odometry estimates pose; Monte Carlo Localization is a current development direction.',
    'AnthroPilot and NC State research examine Nav2 planning across simulated environments.',
    'VEX motion profiles and drivetrain code turn planned movement into repeatable physical behavior.',
  ];
  return <section className="autonomy-breakdown" aria-labelledby="systems-heading"><div className="section-shell"><div className="breakdown-intro"><span className="eyebrow">THE ENGINEERING THREAD</span><h2 id="systems-heading">One system.<br /><em>Four decisions.</em></h2><p>These ideas connect my projects. Select a system to see where it appears in the work above.</p></div><div className="breakdown-body"><div className="breakdown-tabs" role="tablist" aria-label="Autonomous system concepts">{chapters.slice(1).map((item, index) => <button key={item.id} role="tab" type="button" aria-selected={selected === index} aria-controls="system-panel" id={`system-tab-${index}`} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)}><span>{item.number}</span>{['Perception', 'Localization', 'Planning', 'Control'][index]}<span aria-hidden="true">↗</span></button>)}</div><div id="system-panel" className="breakdown-panel" role="tabpanel" aria-labelledby={`system-tab-${selected}`}><div className="breakdown-visual"><StaticMap label={`Conceptual ${['perception', 'localization', 'planning', 'control'][selected]} visualization`} /></div><div className="breakdown-caption"><span>{chapters[selected + 1].eyebrow}</span><h3>{['Perception', 'Localization', 'Path planning', 'Motion control'][selected]}</h3><p>{links[selected]}</p><small>Illustrative visualization · not project footage or measured data.</small></div></div></div></div></section>;
}

function Experience() {
  return <section id="experience" className="section experience-section"><div className="section-shell"><SectionHead index="02 / 05" eyebrow="EXPERIENCE" title={<>Building across<br /><em>disciplines.</em></>} intro="Robotics research, simulation engineering, application development, and team software work inform one another." /><div className="experience-list">
    <div className="experience-row"><span>01</span><div><h3>Simulation Engineering Intern</h3><p>AnthroPilot · ROS 2 navigation, sensor pipelines, Gazebo, telemetry, cross team integration.</p></div><time>2026—PRESENT</time></div>
    <div className="experience-row"><span>02</span><div><h3>Student Researcher, Robotics Simulation</h3><p>North Carolina State University · Nav2 planner and controller analysis in simulated environments.</p></div><time>SUMMER 2026</time></div>
    <div className="experience-row"><span>03</span><div><h3>Software Engineering Intern</h3><p>Code2College · advanced Python training and collaborative workflows with Jira and GitHub.</p></div><time>2026—PRESENT</time></div>
    <div className="experience-row"><span>04</span><div><h3>App Developer</h3><p>Roku App Design Challenge · BrightScript and SceneGraph development with an eight person team.</p></div><time>2026—PRESENT</time></div>
  </div></div></section>;
}

function Capabilities() {
  const groups = [
    { label: 'AUTONOMY + SIMULATION', items: 'ROS 2 / Nav2 / Gazebo / RViz / localization / path planning' },
    { label: 'CONTROL + COMPUTATION', items: 'C++ / Python / PROS / odometry / motion profiles / telemetry' },
    { label: 'ELECTRONICS + HARDWARE', items: 'ESP32 / Raspberry Pi / Arduino Mega / encoders / LiDAR / UWB' },
    { label: 'DESIGN + COLLABORATION', items: 'Fusion 360 / mechanical integration / technical leadership / GitHub' },
  ];
  return <section className="capabilities-section"><div className="section-shell"><div className="capabilities-head"><span className="eyebrow">ENGINEERING TOOLKIT</span><h2>Across the full<br /><em>autonomy stack.</em></h2></div><div className="capabilities-list">{groups.map(group => <div key={group.label}><span>{group.label}</span><p>{group.items}</p></div>)}</div></div></section>;
}

function Impact() {
  return <section id="impact" className="section impact-section"><div className="section-shell"><SectionHead index="03 / 05" eyebrow="LEADERSHIP + IMPACT" title={<>Engineering is<br /><em>a team sport.</em></>} intro="I care about the people who build systems with me and the communities those systems can serve." /><div className="impact-grid"><div className="impact-primary"><span className="impact-number">03</span><span className="impact-number-label">PROGRAMMERS LED<br />ON VEX TEAM 654X</span><p>Programming captain: coaching teammates while developing the code that supports competition robots.</p></div><div className="impact-stories"><div><span>CYBERPATRIOT</span><h3>President, former Windows Captain</h3><p>Led training for 80+ students; the school chapter qualified for the Platinum division.</p></div><div><span>SKILLSUSA</span><h3>STEM Branch President, former Parliamentarian</h3><p>Coached peers and helped grow participation in technical competitions.</p></div><div><span>VT SEVA</span><h3>Python tutoring with a purpose</h3><p>Approximately $3,000 raised over three summers. A $1,000 fundraising effort supported one year of education for three visually impaired students. I also worked on the organization’s website.</p></div><div><span>BEE CAVE ARTS FOUNDATION</span><h3>Service through creative work</h3><p>Volunteered to support arts programming and portfolios for older community members.</p></div></div></div></div></section>;
}

function About() {
  return <section id="about" className="section about-section"><div className="section-shell"><SectionHead index="04 / 05" eyebrow="ABOUT" title={<>Curiosity, made<br /><em>testable.</em></>} /><div className="about-grid"><p className="about-statement">I’m drawn to the moment when an idea has to survive the real world: noisy sensors, imperfect motion, limited compute, and a team counting on the result.</p><div className="about-aside"><p>I’m an aspiring electrical and computer engineer at Lake Travis High School. I use robotics competitions, research, internships, and independent projects to understand systems all the way from circuits and mechanics to navigation software.</p><p>My approach is to model, build, measure, debug, and make the next decision with better evidence.</p><div className="about-facts"><span>BASED IN<br /><strong>AUSTIN, TEXAS</strong></span><span>EDUCATION<br /><strong>LAKE TRAVIS HIGH SCHOOL · 2027</strong></span></div><a className="arrow-link" href="/resume.html">View résumé <span aria-hidden="true">↗</span></a></div></div></div></section>;
}

function Contact() {
  return <footer id="contact" className="contact-section"><div className="section-shell"><div className="section-kicker"><span>05 / 05</span><span>CONTACT</span></div><p className="contact-prelude">Research, internship, and collaboration conversations are welcome.</p><h2>Let’s build what<br /><em>moves next.</em></h2><div className="contact-actions"><a className="button button-primary" href="mailto:kandibanda.pranav@gmail.com">Get in touch <span aria-hidden="true">↗</span></a><a className="button button-outline" href="https://github.com/PranavKandibanda" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PRANAV KANDIBANDA</span><span>ENGINEERING INTELLIGENCE INTO MOTION</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#work">Skip to projects</a><Header /><main><Hero /><Work /><AutonomyBreakdown /><Experience /><Capabilities /><Impact /><About /></main><Contact /></>;
}
