import React from 'react'
import Link from 'next/link'

class Header extends React.PureComponent {
    render(): React.ReactElement {
        return (
            <nav className="navbar bg-primary">
                <div className="container-fluid">
                    <Link href="/./">
                        <a className="navbar-brand text-white" >
                            FRONT
                        </a>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Header