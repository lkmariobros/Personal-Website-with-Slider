import type { NavItem } from './types';

export const SECTION_WIDTH = 64; // Width in pixels for collapsed sections

export const SECTIONS: NavItem[] = [
  {
    name: "Projects",
    content: "Discover our portfolio of groundbreaking projects that push the boundaries of technology and design. From web applications to immersive experiences, each project demonstrates our commitment to excellence and innovation.",
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Services",
    content: "Transform your vision into reality with our comprehensive suite of digital solutions. Our services span web development, UI/UX design, and digital transformation consulting, all tailored to elevate your digital presence.",
    color: "from-purple-600 to-purple-700"
  },
  {
    name: "About",
    content: "We're a team of passionate creators, developers, and innovators dedicated to crafting exceptional digital experiences. With years of expertise, we're here to help you navigate the digital landscape and achieve your goals.",
    color: "from-purple-700 to-purple-800"
  },
  {
    name: "Contact",
    content: "Ready to start your journey? Our team is here to discuss your goals and how we can help bring your vision to life. Whether you have a specific project in mind or need guidance, we're just a message away.",
    color: "from-purple-800 to-purple-900"
  }
];