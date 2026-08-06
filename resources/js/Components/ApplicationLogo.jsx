import GspHeader from '../../../public/assets/GSP-header-no-background.png';

export default function ApplicationLogo({ className = '' }) {
    return (
        <img
            src={GspHeader}
            className={className}
            alt="Granite State Penguins"
        />
    );
}
