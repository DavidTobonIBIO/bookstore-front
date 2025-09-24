import Link from 'next/link'

export default function Navbar() {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Authors", href: "/authors" },
        { name: "Books", href: "/books" }
    ];

    return (
        <div>
            <nav>
                {
                    navItems.map((item, index) => (
                        <Link className="px-3 font-bold hover:text-gray-300" href={item.href} key={index}>
                            {item.name}
                        </Link>
                    ))
                }
            </nav>
        </div>
    );
};