// Update this file as your work grows. The UI renders projects, experience,
// coursework, and contact details directly from these arrays.
export const portfolio = {
  profile: {
    name: "Arden Zeng",
    eyebrow: "Princeton University · Engineering Portfolio",
    headline: "Building at the boundary of hardware, light, and code.",
    introduction:
      "I’m a Princeton undergraduate focused on electrical and computer engineering. I’m especially interested in semiconductor devices, chip design, embedded systems, and software that makes physical experiments more precise.",
    availability: "Exploring engineering internships",
  },

  focusAreas: [
    {
      number: "01",
      title: "Semiconductors",
      text: "Device physics, materials, and optical characterization.",
    },
    {
      number: "02",
      title: "Hardware",
      text: "PCB design, prototyping, and system-level thinking.",
    },
    {
      number: "03",
      title: "Embedded + software",
      text: "Motor control and software for physical systems.",
    },
  ],

  projects: [
    {
      id: "optical-alignment",
      title: "Optical Alignment Automation",
      category: "Research",
      year: "Current",
      status: "Active research",
      summary:
        "Developing an approach to automate positioning in a laser-based semiconductor experiment using motorized motion and software control.",
      detail:
        "The work targets a repetitive manual alignment step: adjusting optics so the laser reaches the semiconductor sample. I’m exploring motor control and a software interface that can make positioning more repeatable and efficient.",
      context: "Quest Lab · Princeton University",
      tags: ["Python", "Motor control", "Optical characterization"],
      accent: "cyan",
    },
    {
      id: "macro-pad",
      title: "Custom Macro Pad",
      category: "Hardware",
      year: "In development",
      status: "Independent build",
      summary:
        "Designing a custom PCB and 3D-printed enclosure as an end-to-end hardware project.",
      detail:
        "This build is structured to develop the full prototype workflow: schematic capture, PCB layout, enclosure CAD, fabrication, assembly, and firmware integration. The project is presented as ongoing until the hardware is built and tested.",
      context: "Independent project",
      tags: ["Altium Designer", "PCB design", "CAD + 3D printing"],
      accent: "amber",
    },
  ],

  experience: [
    {
      period: "Current",
      role: "Undergraduate Researcher",
      organization: "Quest Lab · Princeton University",
      bullets: [
        "Working on automation for an optical setup used in semiconductor research.",
        "Developing skills in motor control, Python, and experimental hardware–software integration.",
      ],
    },
    {
      period: "Jun — Aug 2026",
      role: "Technology Instructor / Intern",
      organization: "Lavner Education · Cal Poly Pomona",
      bullets: [
        "Taught students through hands-on work with 3D printers, 3D design, and kinematics.",
        "Helped translate technical ideas into clear, approachable instruction.",
      ],
    },
  ],

  coursework: [
    {
      label: "Current",
      courses: ["ECE 206", "ECE 308"],
    },
    {
      label: "Foundation",
      courses: ["EGR 151", "EGR 152", "CHM 201"],
    },
  ],

  contact: [
    {
      label: "Email",
      value: "Add your preferred email",
      href: "",
    },
    {
      label: "LinkedIn",
      value: "Add your LinkedIn URL",
      href: "",
    },
    {
      label: "GitHub",
      value: "Add your GitHub URL",
      href: "",
    },
  ],
};
