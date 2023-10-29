import { fireEvent, screen } from '@testing-library/dom';

export const randomClick = (id: string) => {
  const parent = screen.getByTestId(id);
  const rnd = Math.floor(parent.children.length * Math.random());
  fireEvent.click(parent.children[rnd]);
};
