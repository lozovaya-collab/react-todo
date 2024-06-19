import type { IPropsPopup } from "./types";
import './Popup.scss';

const Popup = (props: IPropsPopup) => {
    return (
        <div className="popup">
            <div className="popup_wrapper">
                <h3 className="popup_title">{ props.children }</h3>
                <div className="popup_content">{ props.content }</div>
                <div className="popup_actions">{ props.actions }</div>
            </div>
        </div>
    )
}

export { Popup };