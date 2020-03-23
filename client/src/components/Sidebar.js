import React, {useState} from 'react';
import RandomColor from './RandomColor';
import Navigation from './Navigation';

function Sidebar() {
    const [active, setActive] = useState(false);

    return (
        <aside className={active ? 'sidebar active' : 'sidebar'}>
            <span className={active ? 'sidebar-toggle icon-close' : 'sidebar-toggle icon-nav'}
                  onClick={() => setActive(!active)}/>
            <RandomColor/>
            <Navigation/>
        </aside>
    );
}

export default Sidebar;
