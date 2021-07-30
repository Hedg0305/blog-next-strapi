import Link from 'next/link';

import styles from './styles.module.scss';

interface HeaderProps {
  navBar: {
    links: Link[];
    logo: {
      url: string;
    };
  };
}

type Link = {
  text: string;
  href: string;
  id: string;
};

const Header = ({ navBar }: HeaderProps) => {
  const apiUrl = process.env.STRAPI_API;
  console.log(navBar);
  const img = navBar.logo.url.replace('manuel', 'thumbnail_manuel');

  return (
    <nav className={styles.navBar}>
      <img src={`${apiUrl}${img}`} alt='' />
      <div>
        <ul>
          {navBar.links.map((link) => (
            <li key={link.id}>
              <Link href={link.href} key={link.id}>
                <a>{link.text}</a>
              </Link>
            </li>
          ))}
        </ul>

        <button>Get in touch</button>
      </div>
    </nav>
  );
};

export default Header;
