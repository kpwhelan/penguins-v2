import GspHeader from '../../../public/assets/gsp-logo-navbar-480w@2x.png';

export default function ApplicationLogo({ className = '' }) {
    return (
        <img
            src={GspHeader}
            className={className}
            alt="Granite State Penguins"
            width="240"
            height="139"
        />
    );
}
