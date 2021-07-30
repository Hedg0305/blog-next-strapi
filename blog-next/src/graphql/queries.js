import { gql } from '@apollo/client';

export { getHomePosts, getHomePage, getHeader, getNavbar };

const getHomePosts = gql`
  query {
    blogPosts {
      ... on BlogPost {
        title
        intro
        published_at
        tags {
          ... on Tags {
            tag
          }
        }
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
          __typename
          blog_post {
            title
            intro
            published_at
            tags {
              ... on Tags {
                tag
              }
            }
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

const getNavbar = gql`
  query {
    homePage {
      navBar {
        links {
          ... on ComponentSharedLink {
            text
            text
          }
        }
      }
    }
  }
`;
