import { gql } from '@apollo/client';

export const getNavBar = gql`
  query {
    navBar {
      nav {
        links {
          text
        }
        logo {
          url
          formats
        }
      }
    }
  }
`;

export const getHomePage = gql`
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

export const filterByTag = gql`
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

export const filterByTitle = gql`
  query filterByTitle($title: String!) {
    blogPosts(where: { title_contains: $title }) {
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

export const createAccount = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
