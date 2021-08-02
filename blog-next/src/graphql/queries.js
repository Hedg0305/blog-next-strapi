import { gql } from '@apollo/client';

export { getHomePage, getNavBar, filterByTag };

const getNavBar = gql`
  query {
    navBar {
      nav {
        links {
          text
        }
        logo {
          url
        }
      }
    }
  }
`;

const getHomePage = gql`
  query {
    navBar {
      nav {
        links {
          text
        }
        logo {
          url
        }
      }
    }
    homePage {
      content {
        ... on ComponentHomeBanner {
          blog_post {
            title
            intro
            published_at
            banner {
              url
            }
            tags {
              tag
            }
          }
        }
      }
    }
    blogPosts(limit: 10) {
      title
      intro
      published_at
      banner {
        url
      }
      tags {
        tag
      }
    }
  }
`;

const filterByTag = gql`
  query filterByTag($tag: String!) {
    blogPosts(where: { tags: { tag_contains: $tag } }) {
      title
      intro
      published_at
      banner {
        url
      }
      tags {
        tag
      }
    }
  }
`;
