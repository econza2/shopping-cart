import NavigationBar from "./NavigationBar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <h1>This Is The Home Page</h1>
      <NavigationBar type={"home"} />
      <div className={styles.wordings}>
        Home Page To Our Marvelous Shopping Platform
      </div>
    </>
  );
}
