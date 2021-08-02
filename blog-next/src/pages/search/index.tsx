import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetServerSideProps } from 'next';
import React from 'react';
import Tag from '../../components/colorizeTag';
import Header from '../../components/header';
import { filterByTitle, getNavBar } from '../../graphql/queries';
import Image from 'next/image';

import styles from './styles.module.scss';

type Tag = {
  tag: string;
};

type Post = {
  title: string;
  intro: string;
  published_at: string;
  tags: Tag[];
  banner: {
    url: string;
  };
};

type Link = {
  text: string;
};

interface SearchProps {
  navBar: {
    links: Link[];
    logo: {
      url: string;
    };
  };
  posts: Post[];
}

const Search = ({ navBar, posts }: SearchProps) => {
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
      <main className={styles.container}>
        {posts.length ? (
          posts.map((post) => (
            <div className={styles.post} key={post.title}>
              <Image
                src={`${apiUrl}${post.banner.url}`}
                alt=''
                width={500}
                height={500}
              />
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
          <h1>Nenhum poste com este título!</h1>
        )}
      </main>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: getNavBar,
  });

  const postsData = await client.query({
    query: filterByTitle,
    variables: {
      title: query.q,
    },
  });

  return {
    props: {
      navBar: data.navBar.nav,
      posts: postsData.data.blogPosts,
    },
  };
};
