import { GetStaticPaths, GetStaticProps } from 'next';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { filterByTag, getNavBar } from '../../graphql/queries';

import Header from '../../components/header';

import styles from './styles.module.scss';
import Tag from '../../components/colorizeTag';

type Tag = {
  tag: string;
};

type Post = {
  title: string;
  intro: string;
  banner: {
    url: string;
  };
  tags: Tag[];
  published_at: string;
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
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API;

  const formateDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <Header navBar={navBar} />
      <div className={styles.container}>
        {posts.length ? (
          posts.map((post) => (
            <div className={styles.post}>
              <img src={`${apiUrl}${post.banner.url}`} alt='' />
              <div>
                <h3>{post.title}</h3>
                <p>{post.intro.substring(0, 200)}...</p>
                <time>{formateDate(post.published_at)}</time>
                {post.tags.map((tag) => (
                  <Tag tag={tag.tag} key={tag.tag} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <h1>Nenhum poste referente a essa categoria!</h1>
        )}
      </div>
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
      posts: data.blogPosts,
      navBar: navBar.data.navBar.nav,
    },
  };
};
