import {
    Server, Code, Shield, Database, Zap,
    Smartphone, Globe
} from 'lucide-react';
import { ServiceItem } from '../types';
import { Language } from './content';

export const SERVICES = (lang: Language): ServiceItem[] => {
    const isAr = lang === 'ar';
    return [
        {
            id: 's1',
            slug: 'erp-solutions',
            title: isAr ? 'حلول الـ ERP المتكاملة' : 'Integrated ERP Solutions',
            description: isAr ? 'تنفيذ أنظمة تخطيط الموارد (Odoo وغيرها) مع تخصيص كامل لدورة العمل.' : 'Implementation of Enterprise Resource Planning systems (Odoo & Custom) tailored to your workflow.',
            longDescription: isAr
                ? 'نحن متخصصون في تنفيذ أنظمة تخطيط موارد المؤسسات (ERP) التي تدمج جميع عملياتك التجارية في نظام واحد متكامل. من المحاسبة والمالية إلى إدارة المخازن والتصنيع، نقدم حلولاً مخصصة تناسب احتياجات عملك الفريدة. فريقنا من خبراء Odoo المعتمدين يضمن تنفيذاً سلساً وتدريباً شاملاً لفريقك.'
                : 'We specialize in implementing Enterprise Resource Planning (ERP) systems that integrate all your business processes into one unified platform. From Accounting & Finance to Inventory & Manufacturing, we deliver customized solutions tailored to your unique business needs. Our team of certified Odoo experts ensures smooth implementation and comprehensive training for your staff.',
            metaDescription: isAr
                ? 'حلول ERP متكاملة من CompuPlus - تنفيذ أنظمة Odoo للمحاسبة، المخازن، الموارد البشرية. خبرة +27 سنة.'
                : 'Integrated ERP Solutions by CompuPlus - Odoo implementation for Accounting, Inventory, HR. 27+ years experience.',
            icon: Database,
            category: 'software',
            features: isAr
                ? ['المحاسبة والمالية', 'إدارة المخازن والتصنيع', 'الموارد البشرية والرواتب', 'نقاط البيع (POS)']
                : ['Accounting & Finance', 'Inventory & Manufacturing', 'HR & Payroll Systems', 'Point of Sale (POS)']
        },
        {
            id: 's2',
            slug: 'custom-software',
            title: isAr ? 'تطوير البرمجيات الخاصة' : 'Custom Software & Apps',
            description: isAr ? 'تطبيقات الويب، سطح المكتب، والموبايل المصممة خصيصاً لاحتياجاتك.' : 'Tailor-made Web, Desktop, and Mobile Applications built for scale and performance.',
            longDescription: isAr
                ? 'نقوم بتطوير تطبيقات مخصصة بالكامل تلبي احتياجات عملك الفريدة. سواء كنت تحتاج تطبيق موبايل لعملائك، نظام سطح مكتب لإدارة عملياتك، أو منصة ويب متكاملة، فريقنا من المطورين المحترفين يستخدم أحدث التقنيات مثل Flutter و React و Node.js لبناء حلول قابلة للتوسع وعالية الأداء.'
                : 'We develop fully customized applications that meet your unique business needs. Whether you need a mobile app for your customers, a desktop system to manage your operations, or an integrated web platform, our team of professional developers uses the latest technologies like Flutter, React, and Node.js to build scalable, high-performance solutions.',
            metaDescription: isAr
                ? 'تطوير تطبيقات موبايل وويب مخصصة من CompuPlus - Flutter، React، Node.js. تطبيقات iOS و Android.'
                : 'Custom Mobile & Web App Development by CompuPlus - Flutter, React, Node.js. iOS & Android Apps.',
            icon: Smartphone,
            category: 'software',
            features: isAr
                ? ['تطبيقات iOS & Android', 'برامج سطح المكتب (Desktop)', 'مواقع الويب المتقدمة', 'لوحات تحكم مخصصة']
                : ['iOS & Android Apps (Flutter)', 'Desktop Applications', 'Advanced Web Platforms', 'Custom Dashboards']
        },
        {
            id: 's3',
            slug: 'networking-infrastructure',
            title: isAr ? 'الشبكات ومراكز البيانات' : 'Networking & Infrastructure',
            description: isAr ? 'حلول البنية التحتية، الفايبر أوبتكس، وتجهيز غرف السيرفرات.' : 'Structured Cabling, Fiber Optics, and full Data Center preparation.',
            longDescription: isAr
                ? 'نقدم حلول بنية تحتية متكاملة تشمل تمديد الكابلات المهيكلة، الألياف الضوئية، وتجهيز غرف السيرفرات بالكامل. فريقنا من المهندسين المعتمدين من Cisco و Mikrotik يضمن بناء شبكة موثوقة وآمنة وقابلة للتوسع. نحن نخدم البنوك، المستشفيات، المصانع، والشركات الكبرى منذ 1997.'
                : 'We provide comprehensive infrastructure solutions including structured cabling, fiber optics, and complete server room preparation. Our team of Cisco and Mikrotik certified engineers ensures building a reliable, secure, and scalable network. We have been serving banks, hospitals, factories, and large enterprises since 1997.',
            metaDescription: isAr
                ? 'حلول الشبكات والبنية التحتية من CompuPlus - تمديد كابلات، فايبر أوبتكس، Cisco، غرف سيرفرات.'
                : 'Networking & Infrastructure Solutions by CompuPlus - Structured Cabling, Fiber Optics, Cisco, Server Rooms.',
            icon: Server,
            category: 'network',
            features: isAr
                ? ['تمديد كابلات (Cabling)', 'ألياف ضوئية (Fiber Optics)', 'تجهيز غرف السيرفرات', 'شبكات Cisco & Mikrotik']
                : ['Structured Cabling', 'Fiber Optics Splicing', 'Server Room Setup', 'Cisco & Mikrotik Config']
        },
        {
            id: 's5',
            slug: 'security-systems',
            title: isAr ? 'الأنظمة الأمنية' : 'Security Systems',
            description: isAr ? 'كاميرات مراقبة IP ذكية، أنظمة التحكم في الدخول، وأنظمة إنذار الحريق.' : 'Advanced IP Surveillance, Access Control Systems, and integrated Fire Alarm systems.',
            longDescription: isAr
                ? 'نوفر أنظمة أمنية متكاملة تشمل كاميرات المراقبة IP بدقة 4K، أنظمة التحكم في الدخول (Access Control)، أجهزة البصمة والحضور، وأنظمة إنذار الحريق. نحن شركاء معتمدون لـ Hikvision و Dahua ونقدم حلولاً للمصانع، البنوك، المجمعات السكنية، والمؤسسات الحكومية.'
                : 'We provide integrated security systems including 4K IP surveillance cameras, Access Control systems, biometric attendance devices, and fire alarm systems. We are authorized partners of Hikvision and Dahua, offering solutions for factories, banks, residential complexes, and government institutions.',
            metaDescription: isAr
                ? 'أنظمة أمنية متكاملة من CompuPlus - كاميرات IP 4K، Access Control، أنظمة حريق. شريك Hikvision.'
                : 'Integrated Security Systems by CompuPlus - 4K IP Cameras, Access Control, Fire Alarms. Hikvision Partner.',
            icon: Shield,
            category: 'security',
            features: isAr
                ? ['كاميرات IP & 4K', 'التحكم في الدخول (Access Control)', 'أجهزة البصمة والحضور', 'أنظمة إنذار الحريق']
                : ['IP & 4K Surveillance', 'Access Control Gates', 'Biometric Attendance', 'Fire Alarm Integration']
        },
        {
            id: 's6',
            slug: 'cloud-hosting',
            title: isAr ? 'السحاب والاستضافة' : 'Cloud & Hosting',
            description: isAr ? 'خدمات استضافة المواقع، البريد الإلكتروني للشركات، والسيرفرات السحابية.' : 'Reliable Web Hosting, Corporate Email solutions, and Cloud Server Management.',
            longDescription: isAr
                ? 'نقدم خدمات استضافة سحابية موثوقة تشمل حجز النطاقات، استضافة المواقع على AWS و Azure، إيميلات الشركات الرسمية، والنسخ الاحتياطي التلقائي. نحن نضمن استقرار 99.9% ودعم فني على مدار الساعة لضمان استمرارية أعمالك.'
                : 'We offer reliable cloud hosting services including domain registration, website hosting on AWS & Azure, corporate email solutions, and automated backups. We guarantee 99.9% uptime and 24/7 technical support to ensure your business continuity.',
            metaDescription: isAr
                ? 'استضافة سحابية وخدمات Cloud من CompuPlus - AWS، Azure، إيميلات شركات، نطاقات.'
                : 'Cloud Hosting & Services by CompuPlus - AWS, Azure, Corporate Email, Domains.',
            icon: Globe,
            category: 'software',
            features: isAr
                ? ['حجز النطاقات (Domains)', 'استضافة سحابية (AWS)', 'إيميلات شركات رسمية', 'حماية ونسخ احتياطي']
                : ['Domain Registration', 'Cloud VPS (AWS/Azure)', 'Corporate Email', 'Backup & Security']
        },
        {
            id: 's4',
            slug: 'smart-automation',
            title: isAr ? 'البيوت الذكية (Smart Home)' : 'Smart Automation',
            description: isAr ? 'تحويل المقرات والمنازل إلى أنظمة ذكية يمكن التحكم بها عن بعد.' : 'Transforming HQs and homes into smart ecosystems controlled remotely.',
            longDescription: isAr
                ? 'نحول المنازل والمقرات إلى بيئات ذكية متكاملة. من أنظمة الإضاءة الذكية والتحكم الصوتي إلى أجهزة استشعار الحركة وترشيد الطاقة. نستخدم أحدث تقنيات IoT لربط جميع الأجهزة في نظام واحد يمكن التحكم فيه من الهاتف أو الصوت.'
                : 'We transform homes and headquarters into integrated smart environments. From smart lighting systems and voice control to motion sensors and energy saving. We use the latest IoT technologies to connect all devices in one system that can be controlled via phone or voice.',
            metaDescription: isAr
                ? 'أنظمة البيوت الذكية من CompuPlus - إضاءة ذكية، تحكم صوتي، IoT، ترشيد طاقة.'
                : 'Smart Home & Automation by CompuPlus - Smart Lighting, Voice Control, IoT, Energy Saving.',
            icon: Zap,
            category: 'network',
            features: isAr
                ? ['أنظمة الإضاءة الذكية', 'التحكم الصوتي', 'ترشيد الطاقة', 'أجهزة استشعار الحركة']
                : ['Smart Lighting Control', 'Voice Command Systems', 'Energy Saving', 'Motion Sensors']
        }
    ];
};

export const PROCESS = (lang: Language) => {
    const isAr = lang === 'ar';
    return [
        {
            title: isAr ? 'التحليل والتخطيط' : 'Audit & Analysis',
            description: isAr ? 'ندرس بنيتك التحتية الحالية ومتطلبات البرمجيات لنقدم خطة عمل متكاملة.' : 'We deep-dive into your current infrastructure and software needs to architect a master plan.',
        },
        {
            title: isAr ? 'تصميم الحلول' : 'Solution Architecture',
            description: isAr ? 'نصمم شبكتك ونحدد وحدات Odoo أو ميزات التطبيق المطلوبة بدقة.' : 'Designing the network topology and specifying exact Odoo modules or App features required.',
        },
        {
            title: isAr ? 'التنفيذ والتطوير' : 'Execution & Dev',
            description: isAr ? 'يقوم مهندسونا بتمديد الشبكات بينما يكتب المطورون الكود في توازي تام.' : 'Our engineers lay the cabling while developers write code in perfect parallel synchronization.',
        },
        {
            title: isAr ? 'الإطلاق والدعم' : 'Launch & Support',
            description: isAr ? 'نطلق النظام، وندرب موظفيك، ونقدم عقود صيانة لضمان الاستقرار.' : 'We deploy, train your staff, and provide SLA-backed support to ensure zero downtime.',
        },
    ];
};
