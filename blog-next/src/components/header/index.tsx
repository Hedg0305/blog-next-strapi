import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './styles.module.scss';
import { useState } from 'react';
import Image from 'next/image';

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
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleParam = (setValue) => (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { q: query },
    });
  };

  return (
    <nav className={styles.navBar}>
      <Link href='/'>
        <a>
          <Image src={`${apiUrl}${img}`} alt='Logo' width={350} height={200} />
        </a>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          id='title'
          value={query}
          onChange={handleParam(setQuery)}
          placeholder='Search'
        />
        <button type='submit'>Search</button>
      </form>

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
