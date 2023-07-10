export interface UserBalanceProps {
  balanceVisible: boolean;
  balance: number;
  toggleBalanceVisibility: () => void;
  handleOpenModal: () => void;
  showConfirmation: boolean;
  handleCloseModal: () => void;
  handleConfirmModal: () => void;
  inputAmount: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  notification: string;
  userId: string;
}
