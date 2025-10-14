import TncCard from "./components/TncCard";
import './styles/tnc.css'

function TermsConditions(){
    const termsTitles = [
        "Acceptance of Terms",
        "Use of the Platform",
        "Account Responsibility",
        "User-Generated Content",
        "Intellectual Property",
        "Availability and Maintenance",
        "Limitation of Liability",
        "Termination",
        "Privacy",
        "Governing Law",
        "Contact"
    ];
    const termsContents = [
        `By registering for, accessing, or using FlowBoard, you agree to be legally bound by these Terms, our Privacy Policy, and any other policies or guidelines posted on the Site. We may update these Terms at any time, and continued use of the platform constitutes acceptance of any changes.`,

        `FlowBoard allows users to collaborate in real time by creating, editing, and sharing templates, presentations, database schemas, and other project content. You agree to use the platform only for lawful purposes and in accordance with these Terms. You must not:
        - Use the platform for any unlawful or fraudulent activity.
        - Upload or share content that is offensive, defamatory, or infringes upon others’ rights.
        - Attempt to gain unauthorized access to the platform or interfere with its operation.
        - Reverse engineer, copy, or resell any part of the service without permission.`,

        `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect any unauthorized use, you must notify us immediately. We reserve the right to suspend or terminate accounts that violate these Terms or misuse the platform.`,

        `Users may create and share content (“User Content”) on FlowBoard. By posting or sharing content, you grant FlowBoard a non-exclusive, worldwide, royalty-free license to host, display, and distribute your content solely for the purpose of operating and improving the platform. You retain all ownership rights to your content. FlowBoard does not claim ownership of user-created material. However, you agree not to upload content that:
        - Violates copyright, trademark, or intellectual property laws.
        - Contains harmful code, malware, or phishing links.
        - Harasses, discriminates, or threatens others.`,

        `All intellectual property rights related to FlowBoard, including trademarks, logos, and software, are owned by FlowBoard or its licensors. You may not reproduce, distribute, or create derivative works from any part of the service without prior written consent.`,

        `We strive to ensure continuous access to the platform but do not guarantee uninterrupted or error-free service. We may temporarily suspend access for maintenance, updates, or security reasons without prior notice.`,

        `FlowBoard and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to data loss, downtime, or unauthorized access. Your use of the platform is at your own risk.`,

        `We reserve the right to suspend or permanently terminate access to the Site for:
        - Violation of these Terms
        - Misuse of the service
        - Legal or security concerns
        Upon termination, your right to use the platform will immediately cease, though your stored data may remain available for download for a limited time.`,

        `Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and protect your personal data.`,

        `These Terms are governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.`,

        `If you have any questions or concerns regarding these Terms, please contact us at:
        support@flowboard.com`
    ]
    return(
        <div className="m-5">
            <div className="px-5">
                <h1 className="text-center text-3xl my-3 font-semibold">Terms and Conditions</h1>
                <hr className="h-1 border-0 bg-gradient-to-r from-cyan-700 via-teal-500 to-cyan-700 animate-gradient-x rounded-full" />
                <p className="my-5"><b>Last Updated:</b> October 14, 2025</p>
                <p className="my-5">Welcome to <b>FlowBoard</b> (“the Site”, “we”, “our”, “us”). By accessing or using FlowBoard, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using the platform.</p>
                <p className="my-5">If you do not agree with any part of these Terms, you must not use our services.</p>
            </div>
            
            <div className="p-3">
                {termsContents.map((content, idx)=> <TncCard key = {idx} idx = {idx+1} title = {termsTitles[idx]} body = {content}/>)}
            </div>
        </div>
        
    )
}
export default TermsConditions;