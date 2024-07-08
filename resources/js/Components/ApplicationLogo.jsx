import GspHeader from '../../../public/assets/GSP-header-no-background.png'

export default function ApplicationLogo(props) {
    return (
        <img className={props.className} src={GspHeader}></img>
    );
}
