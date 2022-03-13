import React from "react";
import styles from "../../styles/Nav.module.css";

export default function Nav({ user }) {
  return (
    <div className={styles.nav}>
      <div className={styles.title}>Edvora</div>
      <div className={styles.details}>
        <div className={styles.name}>{user ? user.name : ""}</div>
        <div className={styles.avatar}>
          <img src={user ? user.url : ""} alt={"user avatar"} />
        </div>
      </div>
    </div>
  );
}
