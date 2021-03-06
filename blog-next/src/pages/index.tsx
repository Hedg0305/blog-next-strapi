import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';
import Tag from '../components/colorizeTag';
import Header from '../components/header';
import Image from 'next/image';

import { getHomePage } from '../graphql/queries';

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
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API;

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

  console.log(homePageLayout.banner.blog_post.banner.url);

  return (
    <>
      <Header navBar={homePageLayout.navBar} />
      <main className={styles.container}>
        <section className={styles.banner}>
          <Image
            src={`${homePageLayout.banner.blog_post.banner.url}`}
            alt=''
            width={750}
            height={500}
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
              <Image
                src={`${post.banner.url}`}
                alt=''
                width={700}
                height={500}
              />
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <Tag tag={tag.tag} key={tag.tag} />
                ))}
              </div>
              <h3>{post.title}</h3>
              <p>{post.intro.substring(0, 200)}...</p>
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
    uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: getHomePage,
  });

  const banner = data.homePage.content.filter(
    (item) => item.__typename === 'ComponentHomeBanner'
  )[0];

  const homePageLayout = {
    navBar: data.navBar.nav,
    banner,
  };

  return {
    props: {
      posts: data.blogPosts,
      homePageLayout,
    },
    revalidate: 20,
  };
};
