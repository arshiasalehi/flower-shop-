import { Button } from './Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-4">
      <Button variant="secondary" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <p className="text-sm text-ink/70">
        Page {page} of {totalPages}
      </p>
      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};
