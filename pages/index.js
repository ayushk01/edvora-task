import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Nav from "../components/Nav/Nav";
import Rides from "../components/Rides/Rides";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [rides, setRides] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const rides = await axios.get("https://assessment.api.vweb.app/rides");
      const user = await axios.get("https://assessment.api.vweb.app/user");

      setRides(rides.data);
      setUser(user.data);
    } catch (err) {
      alert("An error occured!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Edvora Task</title>
        <meta name="description" content="Edvora task completed by ayushk01" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading ? (
        <div>Loading</div>
      ) : (
        <main className={styles.main}>
          <Nav user={user} />
          <Rides rides={rides} user={user} />
        </main>
      )}

      <footer className={styles.footer}></footer>
    </div>
  );
}
