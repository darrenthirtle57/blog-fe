// app/404.js

import Link from 'next/link';
import styles from './404.module.css'; // Optional, for styling

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
};

export default Custom404;
