import { gql } from '@apollo/client';

export { getHomePosts, getHomePage, getHeader };

const getHomePosts = gql`
  query {
    blogPosts {
      ... on BlogPost {
        title
        intro
        published_at
        banner {
          url
        }
      }
    }
  }
`;

const getHomePage = gql`
  query {
    homePage {
      navBar {
        links {
          ... on ComponentSharedLink {
            text
            href
            id
          }
        }
        logo {
          ... on UploadFile {
            url
          }
        }
      }
      content {
        ... on ComponentHomeBanner {
          blog_post {
            title
            intro
            created_at
            banner {
              ... on UploadFile {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const getHeader = gql`
  query {
    homePage {
      navBar {
        links {
          ... on ComponentSharedLink {
            text
            href
          }
        }
        logo {
          ... on UploadFile {
            url
          }
        }
      }
    }
  }
`;
