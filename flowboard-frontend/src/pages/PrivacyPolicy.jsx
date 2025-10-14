import TncCard from "./components/TncCard";
function PrivacyPolicy(){
    const privacyTitles = [
        "Information We Collect",
        "How We Use Your Information",
        "Cookies and Tracking Technologies",
        "Data Storage and Security",
        "Data Sharing and Disclosure",
        "Your Rights and Choices",
        "Third-Party Services",
        "Data Retention",
        "Children’s Privacy",
        "Changes to This Privacy Policy",
        "Contact Us"
    ];

    const privacyContents = [
        `We collect the following types of information:  
        **1. Personal Information:** When you register or use FlowBoard, we may collect your name, email address, and other account-related details.  
        **2. Usage Data:** We automatically collect data such as your browser type, operating system, IP address, and activity logs for analytical and security purposes.  
        **3. Content Data:** When you create or share templates, projects, or files, that content may be stored on our servers for collaboration and access.`,

        `We use your information to:  
        - Provide, maintain, and improve our services.  
        - Manage your account and user authentication.  
        - Enable real-time collaboration features.  
        - Communicate with you about updates, security notices, and support requests.  
        - Monitor usage trends and enhance user experience.  
        We do **not** sell your personal information to third parties.`,

        `FlowBoard uses cookies and similar technologies to remember your preferences, manage sessions, and analyze site traffic. You can disable cookies in your browser settings, but some features of the platform may not function properly without them.`,

        `We store your data securely using encryption and access control measures to prevent unauthorized access, alteration, or disclosure.  
        However, no online service can guarantee absolute security, and you acknowledge that you use FlowBoard at your own risk.`,

        `We may share your information with:  
        - **Service Providers:** To help us operate and maintain the platform (e.g., hosting or analytics providers).  
        - **Legal Authorities:** When required by law, regulation, or court order.  
        - **Business Transfers:** In the event of a merger, acquisition, or restructuring, user data may be transferred under confidentiality agreements.`,

        `You have the right to:  
        - Access and review the personal data we hold about you.  
        - Request correction or deletion of your personal information.  
        - Withdraw consent for data processing (where applicable).  
        - Opt out of non-essential communications.  
        To exercise your rights, please contact us at **privacy@flowboard.com**.`,

        `FlowBoard may include links or integrations with third-party services (such as cloud storage, communication tools, or authentication providers).  
        We are not responsible for the privacy practices of those third parties. Please review their respective privacy policies before using their services.`,

        `We retain your data only for as long as necessary to provide our services, comply with legal obligations, and resolve disputes.  
        If you delete your account, your data will be permanently removed after a reasonable retention period unless required otherwise by law.`,

        `FlowBoard is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children.  
        If you believe a child has provided personal data to us, please contact us immediately so we can remove it.`,

        `We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.  
        The “Last Updated” date at the top of the page indicates when the most recent revision took place. Continued use of FlowBoard after updates constitutes acceptance of the revised policy.`,

        `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:  
            Email: privacy@flowboard.com  
            Address: FlowBoard, Manchester, United Kingdom`
    ];
    return (
        <div className="m-5">
            <div className="px-5">
                <h1 className="text-center text-3xl my-3 font-semibold">Privacy Policy</h1>
                <hr className="h-1 border-0 bg-gradient-to-r from-cyan-700 via-teal-500 to-cyan-700 animate-gradient-x rounded-full" />
                <p className="my-5"><b>Last Updated:</b> October 14, 2025</p>
                <p className="my-5">This Privacy Policy explains how <b>FlowBoard</b> (“we,” “our,” or “us”) collects, uses, and protects your personal information when you access or use our website, application, and related services. By using FlowBoard, you agree to the collection and use of information in accordance with this policy.</p>
                <p className="my-5">If you do not agree with any part of these Terms, you must not use our services.</p>
            </div>
            
            <div className="p-3">
                {privacyContents.map((content, idx)=> <TncCard key = {idx} idx = {idx+1} title = {privacyTitles[idx]} body = {content}/>)}
            </div>
        </div>
    )
}
export default PrivacyPolicy;