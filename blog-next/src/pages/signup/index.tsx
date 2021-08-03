import { ApolloClient, InMemoryCache, useMutation } from '@apollo/client';
import { GetStaticProps } from 'next';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../../components/header';
import { createAccount, getNavBar } from '../../graphql/queries';

import styles from './styles.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: string;
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
}
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL,
  cache: new InMemoryCache(),
});

const SignUp = ({ navBar }: SearchProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    username,
    email,
    password,
  }) => {
    console.log(username, email, password);

    try {
      const { data, errors } = await client.mutate({
        mutation: createAccount,
        variables: {
          username,
          email,
          password,
        },
      });
      console.log(errors);
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <Header navBar={navBar} />
      <main className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Please, fill the form:</h4>

          <label htmlFor='username'>Name:</label>
          <input id='username' {...register('username', { required: true })} />
          {errors.username && <span>This field is required</span>}

          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            {...register('email', { required: true })}
          />
          {errors.email && <span>This field is required</span>}

          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            {...register('password', { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <button type='submit'>Sign in!</button>
        </form>
      </main>
    </>
  );
};

export default SignUp;

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: getNavBar,
  });

  return {
    props: {
      navBar: data.navBar.nav,
    },
  };
};
