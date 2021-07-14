import React from 'react'

class Header extends React.PureComponent {
    render():React.ReactElement{
        return (
            <nav className="navbar bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/./">
                        FRONT
                    </a>
                </div>
            </nav>
        )
    }
}

export default Header