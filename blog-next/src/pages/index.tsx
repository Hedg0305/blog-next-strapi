import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';
import Tag from '../components/colorizeTag';
import Header from '../components/header';

import { getHomePosts, getHomePage } from '../graphql/queries';

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
  href: string;
  id: string;
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

  const formateDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formattedBannerDate = formateDate(
    homePageLayout.banner.blog_post.published_at
  );

  return (
    <>
      <Header navBar={homePageLayout.navBar} />
      <main className={styles.container}>
        <section className={styles.banner}>
          <img
            src={`${apiUrl}${homePageLayout.banner.blog_post.banner.url}`}
            alt=''
          />
          <div className={styles.postInfo}>
            <div className={styles.tags}>
              {homePageLayout.banner.blog_post.tags.map((tag) => (
                <Tag tag={tag.tag} key={tag.tag} />
              ))}
            </div>

            <h3>{homePageLayout.banner.blog_post.title}</h3>

            <p>{homePageLayout.banner.blog_post.intro}</p>
            <time>{formattedBannerDate}</time>
          </div>
        </section>

        <section className={styles.posts}>
          {posts.map((post) => (
            <div className={styles.post} key={post.title}>
              <img src={`${apiUrl}${post.banner.url}`} alt='' />
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <Tag tag={tag.tag} key={tag.tag} />
                ))}
              </div>
              <h3>{post.title}</h3>
              <p>{post.intro}</p>
              <time>{formateDate(post.published_at)}</time>
            </div>
          ))}
        </section>
      </main>
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

  const banner: Post = homePageData.data.homePage.content.filter(
    (item) => item.__typename === 'ComponentHomeBanner'
  )[0];

  const homePageLayout = {
    navBar: homePageData.data.homePage.navBar,
    banner,
  };

  return {
    props: {
      posts: blogPostsData.data.blogPosts,
      homePageLayout,
    },
  };
};
