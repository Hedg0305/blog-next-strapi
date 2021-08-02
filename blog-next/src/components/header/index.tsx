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
};

const Header = ({ navBar }: HeaderProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API;
  const img = navBar.logo.url.replace('manuel', 'thumbnail_manuel');

  return (
    <nav className={styles.navBar}>
      <Link href='/'>
        <img src={`${apiUrl}${img}`} alt='' />
      </Link>
      <div>
        <ul>
          {navBar.links.map((link) => (
            <li key={link.text}>
              <Link href={`/category/${link.text.toLocaleLowerCase()}`}>
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
