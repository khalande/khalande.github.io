// TEMPLATE CONTENT: have these reviewed by a qualified lawyer before launch.
// Items in [square brackets] need your real details.

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface LegalDoc {
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}

const CONTACT = 'connect@bluenxt.com';

export const PRIVACY_POLICY: LegalDoc = {
  title: 'Privacy Policy',
  summary: 'How Bluenxt ConsulTech collects, uses and protects personal information when you use this website or contact us.',
  updated: '3 November 2026',
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who we are',
      paragraphs: [
        'This website is operated by Bluenxt ConsulTech ("Bluenxt", "we", "us"), [registered company name and number], with offices in the UAE, India and South Africa.',
        `If you have any questions about this policy or how we handle your information, contact us at ${CONTACT}.`,
      ],
    },
    {
      id: 'information-we-collect',
      heading: 'Information we collect',
      paragraphs: ['We collect only what we need to respond to you and run the site:'],
      points: [
        'Contact details you give us in forms: name, work email, company, role and your message.',
        'Newsletter and early-access sign-ups: your email address.',
        'Technical information sent by your browser, such as IP address, device type and pages visited, as recorded in standard server logs.',
      ],
    },
    {
      id: 'how-we-use-it',
      heading: 'How we use your information',
      paragraphs: ['We use your information to:'],
      points: [
        'Reply to enquiries and arrange discovery calls or demos.',
        'Send newsletters and updates you have asked for. You can unsubscribe at any time.',
        'Keep the website secure and working properly.',
        'Meet our legal and regulatory obligations.',
      ],
    },
    {
      id: 'legal-basis',
      heading: 'Legal basis and applicable laws',
      paragraphs: [
        'We process personal information on the basis of your consent, our legitimate interest in responding to business enquiries, or where we need to meet a legal obligation.',
        'Depending on where you are, your information is protected by laws including the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021), India’s Digital Personal Data Protection Act, 2023, South Africa’s Protection of Personal Information Act (POPIA), and the EU/UK GDPR where applicable.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Sharing your information',
      paragraphs: [
        'We do not sell your personal information. We share it only with service providers who help us operate, such as email, hosting, scheduling and form-handling providers (currently FormSubmit for form emails and Google Workspace for storing enquiries), under contracts that require them to protect it, or where the law requires us to.',
        'Some features link to third-party services, including Microsoft Bookings for scheduling and LinkedIn. Their own privacy policies apply when you use them.',
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      paragraphs: [
        'We keep enquiry information for as long as needed to respond and maintain our business relationship, and newsletter details until you unsubscribe. [Add your specific retention periods.]',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      paragraphs: ['Subject to applicable law, you can ask us to:'],
      points: [
        'Give you a copy of the personal information we hold about you.',
        'Correct or update it.',
        'Delete it, or restrict how we use it.',
        'Withdraw consent you have given, for example to marketing emails.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact and complaints',
      paragraphs: [
        `To exercise your rights or raise a concern, email ${CONTACT}. You also have the right to complain to the data protection authority in your country.`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDoc = {
  title: 'Terms of Service',
  summary: 'The terms that apply when you use the Bluenxt ConsulTech website.',
  updated: '3 November 2026',
  sections: [
    {
      id: 'acceptance',
      heading: 'Using this website',
      paragraphs: [
        'By using this website you agree to these terms. If you do not agree, please do not use the site.',
        'These terms cover the website only. Consulting engagements, platform subscriptions and Academy programmes are governed by their own agreements.',
      ],
    },
    {
      id: 'information',
      heading: 'Information on this site',
      paragraphs: [
        'Content on this site is for general information. It is not professional, legal or financial advice for your specific situation. Results described in case studies reflect particular engagements and are not a guarantee of future outcomes.',
        'We work to keep information accurate and up to date, but we do not guarantee that it is complete or current.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      paragraphs: [
        'The Bluenxt name and logo, the Workforce Operating Ecosystem™, platform names, frameworks, text and graphics on this site belong to Bluenxt or its licensors. You may view and share pages for personal or internal business use, but you may not copy, modify or republish content without our written permission.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      paragraphs: ['When using the site, you agree not to:'],
      points: [
        'Use it in any way that breaks the law or infringes others’ rights.',
        'Attempt to gain unauthorised access to the site or its systems.',
        'Send spam, malicious code or false information through our forms.',
      ],
    },
    {
      id: 'third-party-links',
      heading: 'Links to other websites',
      paragraphs: [
        'The site links to services we do not control, such as the Bluenxt Community, Microsoft Bookings and LinkedIn. We are not responsible for their content or practices.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, Bluenxt is not liable for any loss arising from your use of, or reliance on, this website. Nothing in these terms limits liability that cannot be limited by law.',
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of [jurisdiction], and the courts of [jurisdiction] have exclusive jurisdiction over any dispute.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes and contact',
      paragraphs: [
        `We may update these terms from time to time; the date at the top shows the latest version. Questions? Email ${CONTACT}.`,
      ],
    },
  ],
};

export const COOKIE_POLICY: LegalDoc = {
  title: 'Cookie Policy',
  summary: 'What cookies and similar technologies this website uses, and how you can control them.',
  updated: '3 November 2026',
  sections: [
    {
      id: 'what-are-cookies',
      heading: 'What cookies are',
      paragraphs: [
        'Cookies are small text files a website stores on your device. Similar technologies, such as local storage, work in the same way. They help sites work properly and can be used to understand how visitors use them.',
      ],
    },
    {
      id: 'cookies-we-use',
      heading: 'Cookies we use',
      paragraphs: [
        'This website currently uses only what is strictly necessary for it to work. It does not use advertising or tracking cookies.',
      ],
      points: [
        'Strictly necessary: needed for core functions such as security and loading pages. These cannot be switched off.',
        'Analytics: not currently in use. If we add an analytics tool, we will update this policy and ask for your consent where required.',
      ],
    },
    {
      id: 'third-party',
      heading: 'Third-party content',
      paragraphs: [
        'Some images on this site are served by Unsplash, and some links open third-party services such as Microsoft Bookings, LinkedIn and the Bluenxt Community. These services may set their own cookies when you use them, under their own policies.',
      ],
    },
    {
      id: 'control',
      heading: 'How to control cookies',
      paragraphs: [
        'You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the site from working.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      paragraphs: [`Questions about cookies? Email ${CONTACT}.`],
    },
  ],
};
