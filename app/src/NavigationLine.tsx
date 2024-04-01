import styles from "./NavigationLine.module.scss";

type Props = {
  page: number;
  handleNext: () => void;
  handlePrevious: () => void;
};

export function NavigationLine({ page, handleNext, handlePrevious }: Props) {
  return (
    <div className={styles.navigationContainer}>
      <button onClick={handlePrevious}>Previous</button>
      <span>Page {page}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
