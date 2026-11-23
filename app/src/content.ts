export type Link = { label: string; href: string };

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  period: string;
  lead: string;
  challenge: string;
  response: string;
  testing: string;
  result: string;
  status: string;
  tools: string[];
  links: Link[];
};

export const featuredProjects: Project[] = [
  {
    id: 'vex', number: '01', title: 'VEX 654X', category: 'Autonomous navigation / competition', period: '2024–present',
    lead: 'Making a competition robot move with precision, repeatedly.',
    challenge: 'A route that looks correct on paper can miss its target when wheels slip, the pose estimate drifts, or the robot turns too sharply. Autonomous routines have to work within the time and space of a match.',
    response: 'As programming captain, I lead a three-person team and develop C++/PROS drivetrain code. PKLib combines LemLib-based odometry, 2D geometry, telemetry, and trapezoidal or triangular motion profiles. Monte Carlo localization and distance-sensor corrections are in development.',
    testing: 'Desktop tests help check geometry and motion profiles before field runs. Telemetry and competition practice expose differences between commanded and observed movement.',
    result: 'Team 654X won Tournament Champion awards at both GHOST’s Halloween Override and the Waskow Override Challenge in 2026.',
    status: 'Implemented: odometry, motion profiles, drivetrain control. In development: Monte Carlo localization and distance-sensor correction.',
    tools: ['C++', 'PROS', 'LemLib', 'Odometry', 'Motion control'],
    links: [
      { label: 'Public team code', href: 'https://github.com/PranavKandibanda/654XOverRide' },
      { label: 'GHOST awards', href: 'https://events.vex.com/robot-competitions/vex-robotics-competition/VE-V5-26-65564.html#awards' },
      { label: 'Waskow awards', href: 'https://events.vex.com/robot-competitions/vex-robotics-competition/VE-V5-26-66392.html#awards' },
    ],
  },
  {
    id: 'research', number: '02', title: 'NC State', category: 'Robotics research / navigation', period: 'Summer 2026',
    lead: 'Comparing navigation choices across changing environments.',
    challenge: 'A planner that succeeds in one simulated world may behave differently when goal distance, obstacle density, or the robot’s kinematic model changes.',
    response: 'Working with Professor Donggun Lee, I studied ROS 2 Nav2 planners and controllers across simulated environments and robot models. Gazebo and RViz let me inspect paths and robot behavior as conditions changed.',
    testing: 'The research compared planner and controller behavior across multiple simulated conditions. The diagram on this page illustrates that comparison method.',
    result: 'This work strengthened my approach to evaluating navigation algorithms through controlled comparisons.',
    status: 'Completed summer 2026 research experience.',
    tools: ['ROS 2', 'Nav2', 'Gazebo', 'RViz', 'Kinematic models'],
    links: [{ label: 'Professor Lee at NC State', href: 'https://mae.ncsu.edu/people/dlee48/' }],
  },
  {
    id: 'anthropilot', number: '03', title: 'AnthroPilot', category: 'Simulation engineering / internship', period: '2026–present',
    lead: 'Making simulated navigation easier to test and recover.',
    challenge: 'A robot can reach a goal in simulation yet leave the team with little insight into a failed run or a manual intervention. Navigation, sensors, and debugging tools have to work together.',
    response: 'I work on ROS 2 navigation nodes and sensor pipelines for TurtleBot3 workflows, using publisher, subscriber, and action-based communication. The public ROS package documents a recovery state machine that moves between idle, autonomous navigation, and manual teleoperation before resuming a goal.',
    testing: 'Gazebo, RViz, telemetry, and the documented launch and recovery flows support inspection of robot behavior. I collaborate with Dashboard, UI/UX, and Labeling Engine teams on integration.',
    result: 'The work connects simulation behavior with tools that help teams diagnose and improve autonomous systems.',
    status: 'Ongoing internship; navigation and recovery workflows in active development.',
    tools: ['ROS 2', 'Nav2', 'Gazebo', 'RViz', 'TurtleBot3', 'SLAM'],
    links: [{ label: 'Public ROS package', href: 'https://github.com/PranavKandibanda/anthropilot_ros' }],
  },
  {
    id: 'cargo', number: '04', title: 'Cargo robot', category: 'Embedded robotics / team project', period: '2026–present',
    lead: 'A mobile platform designed to follow a person while carrying a load.',
    challenge: 'Following someone requires a trustworthy position estimate, obstacle awareness, motor control, and safe power distribution on the same moving platform.',
    response: 'Our team built a custom mobile chassis and power-control system. The intended sensing stack combines a UWB wearable, Raspberry Pi control, LiDAR obstacle detection, and a motorized drivetrain.',
    testing: 'Chassis and power-control work is underway. UWB tracking, obstacle sensing, and autonomous following are still being integrated and tested.',
    result: 'The mobile chassis and power-control system provide a foundation for the next phase of sensing and following tests.',
    status: 'Chassis and power control built; autonomous following in development.',
    tools: ['Raspberry Pi', 'UWB', 'LiDAR', 'Motor control', 'Power distribution'],
    links: [],
  },
];

export const additionalProjects = [
  { title: 'Autonomous weed-removal robot', category: 'Embedded robotics', period: '2025–present', description: 'Custom CAD drivetrain with motor encoders, ESP32 and Arduino Mega control. LiDAR navigation and weed sensing remain in development.', href: 'https://github.com/PranavKandibanda/WeedRemovalRobot' },
  { title: 'Custom 65-key keyboard', category: 'PCB / product design', period: 'In progress', description: 'A custom RP2040-based keyboard PCB and planned 3D-printed chassis, developed as a hands-on KiCad and electronics project.', href: 'https://github.com/PranavKandibanda/65-Keyboard', image: '/media/keyboard-pcb-final.png' },
  { title: 'Robotic arm', category: 'Hardware / CAD', period: '2025', description: 'Servo-driven arm work documented through Fusion CAD, component research, and an ESP32/MG996R repository. An earlier three-axis Arduino Mega prototype informed the work.', href: 'https://blueprint.hackclub.com/projects/1258', image: '/media/arm-cad-1.webp' },
  { title: 'VexGoat', category: 'Robotics software', period: '2025–present', description: 'A VEX scoring and team-comparison website for scouting and competition analysis.', href: 'https://vexgoat.vercel.app/' },
  { title: 'Hourlytic', category: 'Civic software concept', period: 'Earlier work', description: 'An exploration of simpler volunteer-hour collection and validation for school organizations.', href: 'https://voluntrack-azure.vercel.app/login' },
];

export const experiences = [
  { organization: 'AnthroPilot', role: 'Simulation Engineering Intern', period: 'May 2026–present', detail: 'ROS 2 navigation and sensor pipelines, Gazebo simulation, telemetry, and cross-team integration.' },
  { organization: 'North Carolina State University', role: 'Student Researcher, Robotics Simulation', period: 'May–Aug 2026', detail: 'Compared Nav2 planners and controllers across environments, goal distances, obstacle densities, and robot models.' },
  { organization: 'VEX Robotics · Team 654X', role: 'Programming Captain', period: 'Aug 2024–present', detail: 'Lead a three-person programming team developing C++/PROS odometry and motion control.' },
  { organization: 'SkillsUSA', role: 'STEM Branch President; former Parliamentarian', period: '2025–present', detail: 'Coach peers and organize technical competition participation.', href: 'https://ltskillsusa.vercel.app/' },
  { organization: 'CyberPatriot', role: 'President; former Windows Captain', period: '2025–present', detail: 'Led training for more than 80 students; the school chapter qualified for the Platinum division.' },
  { organization: 'VT Seva', role: 'Website Director & Python Tutor', period: '2023–2025', detail: 'Built web experiences and taught Python. Tutoring raised approximately $3,000 over three summers.' },
  { organization: 'Code2College', role: 'Software Engineering Intern', period: '2026–present', detail: 'Completed advanced Python training and collaborative Jira and GitHub workflows.' },
  { organization: 'Roku App Design Challenge', role: 'App Developer', period: '2026–present', detail: 'Developing a BrightScript and SceneGraph application with an eight-person team.' },
];

export const recognition = [
  { title: 'Tournament Champion', context: 'GHOST’s Halloween Override · UT Austin', year: '31 Oct 2026', href: 'https://events.vex.com/robot-competitions/vex-robotics-competition/VE-V5-26-65564.html#awards' },
  { title: 'Tournament Champion', context: 'Waskow Override Challenge · Belton', year: '7 Nov 2026', href: 'https://events.vex.com/robot-competitions/vex-robotics-competition/VE-V5-26-66392.html#awards' },
  { title: 'CircuitPython Hackathon Winner', context: 'Cirrus Logic / NI Emerson', year: '2026' },
  { title: 'Platinum Semifinalist', context: 'CyberPatriot', year: '2024 & 2025' },
  { title: 'Second place, Computer Programming', context: 'SkillsUSA Regional Competition', year: '2024 & 2025' },
  { title: 'First place, IT Quiz Bowl', context: 'SkillsUSA Regional Competition', year: '2025 & 2026' },
  { title: 'National Merit Commended Scholar', context: '2027 National Merit Scholarship Program', year: '2026', href: 'https://meetings.boardbook.org/Public/DownloadAgenda/900?meeting=772709' },
];

export const contact = {
  email: 'kandibanda.pranav@gmail.com',
  github: 'https://github.com/PranavKandibanda',
  // Add a verified personal profile URL here when available; the prior site linked only to LinkedIn's homepage.
  linkedin: '',
  resume: '/resume.html',
};
