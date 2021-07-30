import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';
import Header from '../components/header';

import { getHomePosts, getHomePage } from '../graphql/queries';

import styles from '../styles/Home.module.css';

type Post = {
  title: string;
  intro: string;
  published_at: string;
  banner: {
    url: string;
  };
};

type Link = {
  link: string;
};

interface IndexProps {
  posts: Post[];
  homePageLayout: {
    navBar: {
      links: Link[];
      logo: {
        url: string;
      };
    };
    banner: {
      blog_post: Post;
    };
  };
}

export default function Home({ posts, homePageLayout }: IndexProps) {
  const apiUrl = process.env.STRAPI_API;

  return (
    <>
      <Header navBar={homePageLayout.navBar} />
      <h1>Hello world</h1>

      {posts.map((post) => (
        <div>
          <h1>{post.title}</h1>
          <p>{post.intro}</p>
          <p>{post.banner.url}</p>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL,
    cache: new InMemoryCache(),
  });

  const blogPostsData = await client.query({
    query: getHomePosts,
  });

  const homePageData = await client.query({
    query: getHomePage,
  });

  const homePageLayout = {
    navBar: homePageData.data.homePage.navBar,
    banner: homePageData.data.homePage.content[0], // banner
  };

  return {
    props: {
      posts: blogPostsData.data.blogPosts,
      homePageLayout,
    },
  };
};
