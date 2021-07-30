import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';

import { getHeader } from '../../graphql/queries';

interface HeaderProps {
  navBar: {
    links: Link[];
    logo: {
      url: string;
    };
  };
}

type Link = {
  link: string;
};

const Header = ({ navBar }: HeaderProps) => {
  const apiUrl = process.env.STRAPI_API;
  console.log(navBar);
  const img = navBar.logo.url.replace('manuel', 'thumbnail_manuel');
  console.log(`${apiUrl}${img}`);

  return (
    <nav>
      <img src={`${apiUrl}${img}`} alt='' />
    </nav>
  );
};

export default Header;
