//TYPE DEFINITION

interface Category {
  id: string;
  label: string;
}

export const categories: Category[] = [
    { id: 'all', label: 'All' },
    { id: 'basic', label: 'Basic' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'trails', label: 'Trails' },
  ];