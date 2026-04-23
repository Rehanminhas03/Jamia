export type NavLink = {
  href: "/" | "/about" | "/departments" | "/courses" | "/admissions" | "/news" | "/fatwa" | "/contact";
  labelKey:
    | "home"
    | "about"
    | "departments"
    | "courses"
    | "admissions"
    | "news"
    | "fatwa"
    | "contact";
};

export const navLinks: NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/departments", labelKey: "departments" },
  { href: "/courses", labelKey: "courses" },
  { href: "/admissions", labelKey: "admissions" },
  { href: "/news", labelKey: "news" },
  { href: "/fatwa", labelKey: "fatwa" },
  { href: "/contact", labelKey: "contact" },
];
