import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from '@tanstack/react-router'
import {
  faXmark,
  faBars,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { auth } from "@/lib/auth";
import { DarkModeToggle } from "./dark-mode-toggle";
import { ConnectButton } from "@/components/connect-button";
import { Section } from "@/components/section";
import { UserProfilePictureImage } from "./user-profile-picture";

const links = [
  { href: "/podcasts", label: "Podcasts" },
  { href: "/#features", label: "Features" },
];

export const Navbar = () => {
  const { user, status } = auth.hooks.useAuth()
  const [navbarClasses, setNavbarClasses] = useState('');
  const navbarRef = useRef<HTMLDivElement>(null)

  const onScroll = () => {
    const navbar = navbarRef.current
    if (!navbar) return

    if (window.scrollY > navbar.getBoundingClientRect().height) {
      setNavbarClasses('bg-white shadow-md fixed top-0 left-0')
    }
    else {
      setNavbarClasses('')
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Section.Container
      ref={navbarRef}
      className={`z-20 transition-all duration-300 ${navbarClasses}`}>
      <nav className="flex justify-between">
        <Link
          to="/"
          className="rounded-lg p-2 dark:border-2 dark:border-cyan-500"
        >
          <img src="/images/podfi.png" width={100} />
        </Link>
        <div className="flex gap-x-4 items-center">
          {links.map((link, index, array) => {
            if (index === array.length - 1) {
              return (
                <Link
                  to={link.href}
                  key={link.href}
                  className="hover:text-cyan-500"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                to={link.href}
                key={link.href}
                className="hover:text-cyan-500"
                activeProps={{
                  className: "text-sky-900 bg-cyan-100 px-1 pb-0.5 rounded"
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            {status === 'signed-in'
              ? (
                <Link
                  to={`/profile/${user.username}`}
                  className="flex items-center gap-x-1 mr-12 text-xl"
                >
                  <UserProfilePictureImage
                    user={user}
                  />
                  <span
                    className="text-black"
                  >
                    {user.username}
                  </span>
                </Link>
              )
              : (
                <ConnectButton />
              )}
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </Section.Container>
  );
};
