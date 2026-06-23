import {
  SoftwareConsultingIcon,
  DigitalGovernmentIcon,
  AuditQaIcon,
  FeasibilityIcon,
  DataInfrastructureIcon,
  CybersecurityIcon,
  TendersIcon,
  SupervisionIcon,
  ExpertWitnessIcon,
  TrainingIcon,
  type ServiceIcon,
} from "./service-icons";

export type Service = {
  id: string;
  no: string;
  title: string;
  description: string;
  labelEn: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    id: "systems-consulting",
    no: "01",
    title: "استشارات تطوير الأنظمة والبرمجيات",
    description:
      "إرشاد فني مستقل في تصميم وبناء وتطوير الأنظمة والبرمجيات، من المعمارية إلى اختيار التقنيات وأفضل الممارسات الهندسية.",
    labelEn: "Software Consulting",
    icon: SoftwareConsultingIcon,
  },
  {
    id: "digital-transformation",
    no: "02",
    title: "التحول الرقمي والحكومة الإلكترونية",
    description:
      "تصميم وتنفيذ مشاريع التحول الرقمي وأنظمة الحكومة الإلكترونية بما يرفع كفاءة الخدمات العامة ويقربها من المواطن.",
    labelEn: "Digital Government",
    icon: DigitalGovernmentIcon,
  },
  {
    id: "audit-qa",
    no: "03",
    title: "تدقيق وفحص جودة وأمن الأنظمة",
    description:
      "تدقيق وفحص الأنظمة البرمجية والتأكد من جودتها وأمنها وفق معايير معتمدة، مع تقارير فنية دقيقة وقابلة للتنفيذ.",
    labelEn: "Audit & QA",
    icon: AuditQaIcon,
  },
  {
    id: "feasibility",
    no: "04",
    title: "دراسات الجدوى التقنية",
    description:
      "إعداد دراسات الجدوى التقنية للمشاريع الرقمية لتقييم المخاطر والكلفة والعائد قبل الاستثمار واتخاذ القرار.",
    labelEn: "Feasibility Studies",
    icon: FeasibilityIcon,
  },
  {
    id: "infrastructure",
    no: "05",
    title: "قواعد البيانات والشبكات والبنية التحتية",
    description:
      "استشارات في تصميم قواعد البيانات والشبكات والبنية التحتية التقنية لضمان الأداء والموثوقية وقابلية التوسّع.",
    labelEn: "Data & Infrastructure",
    icon: DataInfrastructureIcon,
  },
  {
    id: "cybersecurity",
    no: "06",
    title: "الأمن السيبراني وحماية المعلومات",
    description:
      "استشارات الأمن السيبراني وحماية المعلومات، من تقييم المخاطر إلى وضع السياسات والضوابط الدفاعية للمؤسسات.",
    labelEn: "Cybersecurity",
    icon: CybersecurityIcon,
  },
  {
    id: "tenders",
    no: "07",
    title: "المواصفات الفنية للمناقصات والعقود",
    description:
      "إعداد المواصفات الفنية للمناقصات والعقود التقنية بصياغة محايدة ودقيقة تحمي الجهة وتضمن جودة التوريد.",
    labelEn: "Tenders & Contracts",
    icon: TendersIcon,
  },
  {
    id: "supervision",
    no: "08",
    title: "الإشراف الفني على تنفيذ المشاريع",
    description:
      "الإشراف الفني على تنفيذ المشاريع البرمجية ومتابعة الالتزام بالمعايير والجداول الزمنية ومخرجات الجودة.",
    labelEn: "Project Supervision",
    icon: SupervisionIcon,
  },
  {
    id: "expert-witness",
    no: "09",
    title: "الخبرة الفنية للمحاكم والجهات الرسمية",
    description:
      "تقديم الخبرة الفنية للمحاكم والجهات الرسمية في القضايا التقنية، بتقارير حيادية موثّقة تستند إلى الأدلة.",
    labelEn: "Expert Witness",
    icon: ExpertWitnessIcon,
  },
  {
    id: "training",
    no: "10",
    title: "التدريب وبناء القدرات المهنية",
    description:
      "التدريب وبناء القدرات المهنية للمبرمجين والشركات عبر برامج معتمدة ترفع الكفاءة وفق المعايير الوطنية.",
    labelEn: "Training & Capacity",
    icon: TrainingIcon,
  },
];
