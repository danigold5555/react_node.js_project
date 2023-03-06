import Header from "../Header/Header"
import NavigationBar from "../Navbar/NavigationBar"
import ValidateToken from "../ValidateToken/ValidateToken"

function Layout() {
    return (
        <section className="layout">
            <header>
                <Header />
            </header>
            <nav>
                <NavigationBar/>
            </nav>
            <main>
            <ValidateToken/>
            </main>
        </section>
    )
}

export default Layout