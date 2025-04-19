import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navigation">
            <NavLink 
                to="/today" 
                className={({ isActive }) => isActive ? 'navigation__link navigation__link_active' : 'navigation__link'}
            >
                Today
            </NavLink>
            <NavLink 
                to="/calendar" 
                className={({ isActive }) => isActive ? 'navigation__link navigation__link_active' : 'navigation__link'}
            >
                Calendar
            </NavLink>
        </nav>
    );
}

export default Navigation;