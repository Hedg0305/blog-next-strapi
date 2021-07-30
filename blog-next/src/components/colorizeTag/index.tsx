import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <Link href={`${tag.toLocaleLowerCase()}`}>
      <a
        className={
          tag === 'Games'
            ? styles.games
            : tag === 'Tech'
            ? styles.tech
            : tag === 'Trend'
            ? styles.trend
            : styles.fashion
        }
      >
        {tag}
      </a>
    </Link>
  );
};

export default Tag;
