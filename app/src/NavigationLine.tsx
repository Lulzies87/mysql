type Props = {
  page: number;
  totalPages: number;
  handleNext: () => void;
  handlePrevious: () => void;
};

export function NavigationLine({ page, totalPages, handleNext, handlePrevious }: Props) {
  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <span>Page {page} / {totalPages}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
