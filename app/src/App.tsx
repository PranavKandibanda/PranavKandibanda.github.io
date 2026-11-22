import { useState } from 'react';
import { additionalProjects, contact, experiences, featuredProjects, recognition } from './content';
import type { Project } from './content';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research & experience', href: '#experience' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="masthead">
    <div className="masthead-inner">
      <a className="wordmark" href="#home" onClick={() => setOpen(false)} aria-label="Pranav Kandibanda, home">PK<span className="wordmark-rule" /> <span>Pranav Kandibanda</span></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(value => !value)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '×' : '+'}</span></button>
      <nav id="primary-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
        {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
    </div>
  </header>;
}

function SectionTitle({ label, title, intro, id }: { label: string; title: string; intro?: string; id?: string }) {
  return <div className="section-title"><span className="section-label">{label}</span><div><h2 id={id}>{title}</h2>{intro && <p>{intro}</p>}</div></div>;
}

function Hero() {
  return <section id="home" className="hero page-shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="overline">Electrical engineering / Robotics / Autonomous systems</p>
      <h1 id="hero-title">Pranav{' '}<br /><em>Kandibanda</em></h1>
      <div className="hero-bottom"><p>Building robots that can sense, localize, and navigate the world.</p><a className="underlined-link" href="#projects">Explore selected work</a></div>
    </div>
    <figure className="hero-image"><img src="/media/ghost-team-awards.jpg" alt="VEX students and mentors with their robots at the GHOST Halloween Override competition" fetchPriority="high" /><figcaption><span>Team 654X at GHOST’s Halloween Override</span><span>UT Austin · 2026</span></figcaption></figure>
    <div className="hero-edition" aria-hidden="true"><span>Portfolio</span><span>2026 / 27</span></div>
  </section>;
}

function Highlights() {
  return <section className="highlights page-shell" aria-label="Selected highlights">
    <span className="section-label">In brief / 2026</span>
    <div>
      <p><strong>Tournament champion</strong><span>VEX 654X at GHOST’s Halloween Override</span></p>
      <p><strong>Navigation research</strong><span>Student researcher at NC State</span></p>
      <p><strong>Simulation engineering</strong><span>Intern at AnthroPilot</span></p>
    </div>
  </section>;
}

function VexVisual() {
  return <figure className="project-figure vex-figure">
    <img src="/media/ghost-finals-robot.jpg" alt="Team 654X and other VEX competitors standing behind two competition robots after the finals at UT Austin" loading="lazy" />
    <figcaption><span>GHOST’s Halloween Override, UT Austin · October 31, 2026</span><span>Photograph supplied by Pranav</span></figcaption>
  </figure>;
}

function ResearchVisual() {
  return <figure className="project-figure diagram-figure">
    <svg viewBox="0 0 840 520" role="img" aria-label="Conceptual comparison of two navigation trajectories around obstacles in a simulated field">
      <defs><pattern id="research-grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="currentColor" strokeOpacity=".13" /></pattern></defs>
      <rect width="840" height="520" fill="url(#research-grid)" />
      <rect x="260" y="90" width="95" height="111" className="obstacle" /><rect x="450" y="280" width="132" height="83" className="obstacle" /><rect x="630" y="120" width="68" height="90" className="obstacle" />
      <path d="M78 414 C213 410 209 260 352 250 S459 445 615 403 S709 263 769 101" className="route-primary" />
      <path d="M78 414 C183 406 176 175 406 180 S492 248 601 230 S726 203 769 101" className="route-secondary" />
      <circle cx="78" cy="414" r="8" className="route-point" /><circle cx="769" cy="101" r="15" className="route-end" />
      <text x="77" y="452">START POSE</text><text x="699" y="74">GOAL POSE</text><text x="135" y="92">A / CANDIDATE PATH</text><text x="135" y="116">B / ALTERNATE PATH</text>
    </svg>
    <figcaption><span>Planner comparison method · conceptual diagram</span><span>No measured results shown</span></figcaption>
  </figure>;
}

function AnthropilotVisual() {
  return <figure className="project-figure diagram-figure ros-figure">
    <div className="ros-diagram" role="img" aria-label="Documented ROS navigation recovery flow: idle, navigating, teleoperation recovery, then resume navigation">
      <div className="ros-step"><span>01 / IDLE</span><strong>Goal received</strong></div>
      <div className="ros-connector" aria-hidden="true" />
      <div className="ros-step"><span>02 / NAVIGATING</span><strong>Nav2 action</strong></div>
      <div className="ros-connector" aria-hidden="true" />
      <div className="ros-step"><span>03 / RECOVERY</span><strong>Manual control</strong></div>
      <p>Resume the saved goal after teleoperation. Sensor data and telemetry make the transition inspectable.</p>
    </div>
    <figcaption><span>Recovery state machine documented in the public ROS package</span><span>System architecture</span></figcaption>
  </figure>;
}

function CargoVisual() {
  return <figure className="project-figure diagram-figure cargo-figure">
    <div className="cargo-diagram" role="img" aria-label="Intended cargo robot architecture: UWB wearable and LiDAR sensing connect through a controller to motor control">
      <div><span>01 / TRACK</span><strong>UWB wearable</strong><small>Relative position</small></div>
      <div><span>02 / SENSE</span><strong>LiDAR</strong><small>Obstacle detection</small></div>
      <div><span>03 / DECIDE</span><strong>Raspberry Pi</strong><small>Embedded control</small></div>
      <div><span>04 / MOVE</span><strong>Drivetrain</strong><small>Motors + power</small></div>
    </div>
    <figcaption><span>Intended sensing-to-motion system · integration in progress</span><span>Architecture study</span></figcaption>
  </figure>;
}

function ProjectVisual({ id }: { id: string }) {
  if (id === 'vex') return <VexVisual />;
  if (id === 'research') return <ResearchVisual />;
  if (id === 'anthropilot') return <AnthropilotVisual />;
  return <CargoVisual />;
}

function ProjectCaseStudy({ project }: { project: Project }) {
  return <article className={`case-study case-${project.id}`} id={project.id}>
    <div className="case-heading"><div className="case-meta"><span>{project.number} / {project.category}</span><span>{project.period}</span></div><div className="case-heading-grid"><h3>{project.title}</h3><p>{project.lead}</p></div></div>
    <ProjectVisual id={project.id} />
    <div className="case-body"><div className="case-intro"><span className="small-label">Engineering notes</span><p>{project.status}</p><div className="technology-line">{project.tools.join('  /  ')}</div></div><div className="case-notes"><div><h4>The challenge</h4><p>{project.challenge}</p></div><div><h4>What I built or studied</h4><p>{project.response}</p></div><div><h4>Testing</h4><p>{project.testing}</p></div><div><h4>Outcome</h4><p>{project.result}</p></div><div className="case-links">{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div></div></div>
  </article>;
}

function Projects() {
  return <section id="projects" className="projects-section page-shell" aria-labelledby="projects-title">
    <SectionTitle id="projects-title" label="01 / Selected work" title="The work, up close." intro="Software, research, and hardware projects—each shaped by a practical engineering question." />
    {featuredProjects.map(project => <ProjectCaseStudy key={project.id} project={project} />)}
    <div className="more-projects"><SectionTitle label="Project index" title="Other investigations." /><div className="project-index">{additionalProjects.map((project, index) => <article className="index-row" key={project.title}><span className="index-number">{String(index + 5).padStart(2, '0')}</span>{project.image && <img src={project.image} alt="Fusion CAD study of the robotic arm servo base" loading="lazy" />}<div><span className="small-label">{project.category} · {project.period}</span><h3>{project.title}</h3><p>{project.description}</p></div>{project.href && <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title}`}>View project</a>}</article>)}</div></div>
  </section>;
}

function Experience() {
  return <section id="experience" className="experience-section"><div className="page-shell"><SectionTitle label="02 / Research & experience" title="Built with other people." intro="Research, internship work, competition teams, and community organizations have each changed how I approach a technical problem." /><div className="experience-list">{experiences.map(item => <div className="experience-row" key={item.organization}><span className="experience-period">{item.period}</span><div><h3>{item.organization}</h3><span className="experience-role">{item.role}</span><p>{item.detail}</p></div></div>)}</div></div></section>;
}

function Recognition() {
  return <section id="recognition" className="recognition-section page-shell"><SectionTitle label="03 / Recognition" title="Selected recognition." /><div className="recognition-layout"><div className="award-list">{recognition.map(item => <div className="award-row" key={`${item.title}-${item.year}`}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.context}</p></div>{item.href && <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Source for ${item.title}`}>Source</a>}</div>)}</div><figure className="recognition-image"><img src="/media/ghost-team-awards.jpg" alt="VEX competitors and robots posing at the GHOST Halloween Override event" loading="lazy" /><figcaption>GHOST’s Halloween Override, UT Austin · photograph supplied by Pranav</figcaption></figure></div></section>;
}

function About() {
  return <section id="about" className="about-section"><div className="page-shell"><SectionTitle label="04 / About" title="Curiosity, made testable." /><div className="about-layout"><p className="about-lead">I’m drawn to the point where an idea meets a real robot: noisy measurements, imperfect motion, limited compute, and a team depending on the result.</p><div className="about-copy"><p>I’m an aspiring electrical and computer engineer at Lake Travis High School in Austin, graduating in 2027. I use competition robotics, research, internships, and independent builds to understand a system from circuits and mechanics to navigation software.</p><p>I learn by making a model, testing it, finding where it fails, and changing the next decision. The same habit shapes my teaching and service: through VT Seva Python tutoring, I helped raise approximately $3,000 over three summers. A $1,000 effort supported one year of education for three visually impaired students.</p><div className="about-facts"><div><span>Education</span><strong>Lake Travis High School · Class of 2027</strong></div><div><span>Current focus</span><strong>Autonomous navigation, embedded systems, motion control</strong></div><div><span>Location</span><strong>Austin, Texas</strong></div></div></div></div></div></section>;
}

function Contact() {
  return <footer id="contact" className="contact-section"><div className="page-shell"><span className="section-label">05 / Contact</span><h2>Let’s make something<br /><em>work in the world.</em></h2><p>Research, internship, and engineering conversations are welcome.</p><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a><div className="contact-links"><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>{contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}<a href={contact.resume}>Résumé</a></div><div className="footer-line"><span>Pranav Kandibanda © {new Date().getFullYear()}</span><a href="#home">Back to top</a></div></div></footer>;
}

export default function App() {
  return <><a className="skip-link" href="#projects">Skip to projects</a><Header /><main><Hero /><Highlights /><Projects /><Experience /><Recognition /><About /></main><Contact /></>;
}
