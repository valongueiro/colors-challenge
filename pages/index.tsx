import type { NextPage } from "next";
import { useState, useEffect } from "react";
import type { APIResponse } from "../pages/api/index";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [colors, setColors] = useState<[] | APIResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    setIsLoading(true);
    const response = await fetch("/api");
    const data = await response.json();
    setColors(data);
    setIsLoading(false);
  };

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className={styles.swatches}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  if (!isLoading) {
    content = colors.map((color) => {
      return (
        <div key={color.cssColor} className={styles.swatches}>
          <div
            className={styles.swatch}
            style={{ backgroundColor: color.cssColor }}
          />
          <p>{color.cssColor}</p>
        </div>
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.flex}>{content}</div>
      <button className={styles.button} onClick={fetchColors}>
        Display New Colors
      </button>
    </div>
  );
};

export default Home;
