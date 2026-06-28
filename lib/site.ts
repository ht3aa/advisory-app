export const site = {
  nameAr: "المكتب الاستشاري",
  nameEn: "Advisory Office",
  org: "نقابة المبرمجين العراقيين",
  orgEn: "Iraqi Programmers Syndicate",
  domain: "syndicate.iq",
  email: "advisory@syndicate.iq",
  phone: "+964 7XX XXX XXXX",
  city: "بغداد · العراق",
  est: "تأسس 2026",
  tagline: "الجهة المهنية للبرمجيات في العراق",
  description:
    "الجهة المهنية للبرمجيات في العراق. استشارات تطوير الأنظمة، التحول الرقمي والحكومة الإلكترونية، تدقيق الجودة والأمن السيبراني، الخبرة الفنية والتدريب وبناء القدرات.",
  findDeveloper: {
    url: "https://find-developer.iq/",
    domain: "find-developer.iq",
    nameAr: "ابحث عن مطوّر",
    nameEn: "Find Developer",
  },
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "الخدمات", href: "#services" },
  { label: "من نحن", href: "#about" },
  { label: "منهجيتنا", href: "#process" },
  { label: "القطاعات", href: "#sectors" },
  { label: "الأسئلة الشائعة", href: "#faq" },
];
