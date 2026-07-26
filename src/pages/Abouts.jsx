import React from 'react';
import styles from './Abouts.module.scss';

const Abouts = () => (
  <section id="about" className={styles.about}>
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src="/profile.jpg" alt="Profile" className={styles.profileImage} />
      </div>
      <div className={styles.text}>
        <h2>About Me</h2>
        <p>Hello! I am a software engineer with a passion for building great products...</p>
        <p>I specialize in full-stack development, 3D configurators, and scalable web applications.</p>
      </div>
    </div>
  </section>
);

export default Abouts;