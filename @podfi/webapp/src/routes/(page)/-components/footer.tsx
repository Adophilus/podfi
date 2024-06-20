import { Link } from "@tanstack/react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const links = [
  { href: "#features", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
]

export const Footer = () =>
  <footer className="px-10 xl:px-24 pb-8 bg-[#06507F] text-white text-sm font-roboto">
    <div className="flex flex-col items-center gap-y-20 text-center py-20 lg:text-left lg:flex-row lg:justify-between lg:gap-x-6 lg:items-start lg:py-28">
      {/* branding */}
      <div className="flex flex-col items-center lg:items-start max-w-[365px] gap-y-8">
        <Link to="/">
          <img src="/images/podfi.png" width={150} height={100} />
        </Link>
        <p>
          Come join our network of creators and listeners, come share our vision to revolutionize how creators and listeners are incentivized
        </p>
        {/* socials */}
        <div className="flex gap-x-4">
          <Link to="#">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
          <Link to="#">
            <FontAwesomeIcon
              icon={faTwitter}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
          <Link to="#">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
          <Link to="#">
            <FontAwesomeIcon
              icon={faInstagram}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
        </div>
      </div>
      {/* quick links */}
      <div>
        <h2 className="font-bold text-lg mb-10">Quick link</h2>
        <ul className="flex flex-col gap-y-6">
          {links.map((link) => (
            <li key={link.label}>
              <Link to={link.href} className="hover:text-cyan-500">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* contact */}
      <div>
        <h2 className="font-bold text-lg mb-10">Contact</h2>
        <ul className="flex flex-col items-center lg:items-start gap-y-6">
          <li>
            <Link to="#" className="flex hover:text-cyan-500">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 mr-2" />
              <p>mail.podfi@gmail.com</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <hr className="h-px bg-white w-full border-0" />
  </footer>
