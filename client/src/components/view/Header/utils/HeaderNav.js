import React, { useState } from 'react';
import UserCP from "./UserCP";

const HeaderNav = (props) => {
    const { history, id, auth } = props
    
    // * Inidicator for click actions.
    const [isActive, ifActive] = useState(false);
    const isFocused = () => isActive !== true ? ifActive(true) : ifActive(false);

    return (
        <>
            <div className="header__nav">
                <span>
                    Welcome{!auth ? `, Guest` : `back, user: ${id}`}
                </span>
                <UserCP isFocused={isFocused} isActive={isActive} history={history} />
            </div>

            <div
                className={isActive === true ? "dropdown-overlay open" : "dropdown-overlay"}
                onClick={isFocused}
            />
        </>
    )
}

export { HeaderNav as default }