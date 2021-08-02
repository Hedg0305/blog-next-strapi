import { GetStaticPaths, GetStaticProps } from 'next';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { filterByTag, getNavBar } from '../../graphql/queries';
import Header from '../../components/header';

type Post = {
  title: string;
  intro: string;
  banner: {
    url: string;
  };
  tags: {
    tag: string;
  };
};

type Link = {
  text: string;
};

interface categoryProps {
  posts: Post[];
  navBar: {
    logo: {
      url;
    };
    links: Link[];
  };
}

const Category = ({ posts, navBar }: categoryProps) => {
  return (
    <>
      <Header navBar={navBar} />
    </>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: filterByTag,
    variables: {
      tag: slug,
    },
  });

  const navBar = await client.query({
    query: getNavBar,
  });

  return {
    props: {
      posts: data,
      navBar: navBar.data.navBar.nav,
    },
  };
};
