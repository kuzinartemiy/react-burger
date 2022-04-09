import { ReactNode } from 'react';

export interface IModalProps {
  children: ReactNode;
  extCloseModal?: () => void;
}
