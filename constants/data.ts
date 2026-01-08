import { Clock, CheckCircle, Users, Award } from 'lucide-react';
import { TimelineEvent, ProjectItem } from '../types';
import { Language } from './content';

export const TIMELINE = (lang: Language): TimelineEvent[] => {
    const isAr = lang === 'ar';
    return [
        {
            year: '1997',
            title: isAr ? 'تأسيس CompuPlus' : 'CompuPlus Founded',
            description: isAr ? 'البداية القوية في مجال البنية التحتية، الهاردوير، وصيانة الشبكات.' : 'Strong beginning in IT Infrastructure, Hardware, and Network Maintenance.',
            type: 'hardware',
        },
        {
            year: '2015',
            title: isAr ? 'التوسع البرمجي' : 'Software Expansion',
            description: isAr ? 'إضافة قطاع تطوير البرمجيات وحلول Odoo ERP لخدمة قطاع الأعمال بشكل متكامل.' : 'Expanding into Software Solutions and Odoo ERP to serve the business sector comprehensively.',
            type: 'software',
        },
        {
            year: '2020',
            title: isAr ? 'عصر المشاريع الكبرى' : 'Mega Projects Era',
            description: isAr ? 'تنفيذ مشاريع ضخمة تدمج بين تجهيز السيرفرات وتشغيل الأنظمة البرمجية عليها.' : 'Executing large-scale projects combining Server Setup with Enterprise Software deployment.',
            type: 'fusion',
        },
        {
            year: '2024',
            title: isAr ? 'الريادة المتكاملة' : 'Integrated Leadership',
            description: isAr ? 'CompuPlus الآن تقدم حلولاً شاملة: من الكابلات إلى السحاب.' : 'CompuPlus now offers end-to-end solutions: From cables to the cloud.',
            type: 'fusion',
        },
    ];
};

export const PROJECTS: ProjectItem[] = [
    {
        id: 'p1',
        title: 'Manufacturing Odoo ERP',
        category: 'ERP System',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
        tags: ['Odoo 17', 'Manufacturing', 'Inventory'],
    },
    {
        id: 'p2',
        title: 'Food Delivery App',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
        tags: ['Flutter', 'iOS', 'Android'],
    },
    {
        id: 'p3',
        title: 'Bank Data Center',
        category: 'Infrastructure',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
        tags: ['Fiber Optics', 'Cisco', 'Cooling'],
    },
    {
        id: 'p4',
        title: 'E-Commerce Fashion Store',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        tags: ['WooCommerce', 'Payment Gateway'],
    },
    {
        id: 'p5',
        title: 'Smart City Surveillance',
        category: 'Security',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        tags: ['IP CCTV', 'AI Analytics', 'Control Room'],
    },
];

export const TESTIMONIALS = (lang: Language) => {
    const isAr = lang === 'ar';
    return [
        {
            id: 't1',
            text: isAr ? 'لقد قدمت CompuPlus حلاً مذهلاً دمج بين تجهيز غرفة السيرفرات لدينا ونظام إدارة المخازن. الاحترافية كانت في أعلى مستوياتها.' : 'CompuPlus provided an amazing solution that integrated our server room setup with our warehouse management system. Professionalism at its peak.',
            author: isAr ? 'أحمد المنشاوي' : 'Ahmed El-Menshawy',
            role: isAr ? 'مدير تقنية المعلومات، مجموعة الأمل' : 'IT Director, Al-Amal Group',
        },
        {
            id: 't2',
            text: isAr ? 'فريق البرمجيات لديهم عبقري. قاموا بتطوير تطبيق توصيل معقد جداً وربطه بنظام Odoo ERP الخاص بنا بسلاسة تامة.' : 'Their software team is genius. They developed a complex delivery app and seamlessly integrated it with our Odoo ERP.',
            author: isAr ? 'سارة كامل' : 'Sarah Kamel',
            role: isAr ? 'المدير التنفيذي، شركة فاست ديليفري' : 'CEO, Fast Delivery Co.',
        },
        {
            id: 't3',
            text: isAr ? 'لم نجد شركة أخرى تستطيع تمديد شبكة الفايبر لمصنعنا وفي نفس الوقت تثبيت نظام الحضور والانصراف الذكي بهذه الدقة.' : 'We couldn\'t find another company capable of laying fiber optics for our factory while installing a smart attendance system with such precision.',
            author: isAr ? 'م. حسن يوسف' : 'Eng. Hassan Youssef',
            role: isAr ? 'مدير المصنع، للصناعات الهندسية' : 'Factory Manager, Eng. Industries',
        }
    ];
};

export const STATS = (lang: Language) => {
    const isAr = lang === 'ar';
    return [
        { label: isAr ? 'سنوات الخبرة' : 'Years Experience', value: '27', suffix: '+', icon: Clock },
        { label: isAr ? 'مشروع ناجح' : 'Projects Done', value: '1200', suffix: '+', icon: CheckCircle },
        { label: isAr ? 'عميل دائم' : 'Happy Clients', value: '450', suffix: '+', icon: Users },
        { label: isAr ? 'خبير تقني' : 'Tech Experts', value: '50', suffix: '+', icon: Award },
    ];
};

export const PARTNERS = [
    { name: 'Odoo', category: 'ERP Partner', logo: '/partners/odoo.png' },
    { name: 'Cisco', category: 'Networking', logo: '/partners/cisco.png' },
    { name: 'Microsoft', category: 'Cloud', logo: '/partners/microsoft.png' },
    { name: 'Hikvision', category: 'Security', logo: '/partners/hikvision.png' },
    { name: 'Flutter', category: 'Mobile Dev', logo: '/partners/flutter.png' },
    { name: 'Dell', category: 'Servers', logo: '/partners/dell.png' },
];

export const CLIENTS = [
    { name: 'Al-Amal Group', category: 'Industrial', logo: '/clients/client1.png' },
    { name: 'Fast Delivery Co.', category: 'Logistics', logo: '/clients/client2.png' },
    { name: 'Eng. Industries', category: 'Manufacturing', logo: '/clients/client3.png' },
    { name: 'City Hospital', category: 'Healthcare', logo: '/clients/client4.png' },
    { name: 'Global Trading', category: 'Retail', logo: '/clients/client5.png' },
];

export const SOCIALS = [
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        url: 'https://wa.me/20222728010',
        icon: 'Smartphone',
        color: 'bg-green-500 hover:bg-green-600'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        url: 'https://facebook.com/compuplus',
        icon: 'Globe',
        color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/compuplus',
        icon: 'Users',
        color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/compuplus',
        icon: 'Camera',
        color: 'bg-pink-600 hover:bg-pink-700'
    }
];
