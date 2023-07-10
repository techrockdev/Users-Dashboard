import { FiBell } from "react-icons/fi";
import { Profile } from "../../../Global/Profile/Profile";

interface NameProps {
  name: string | JSX.Element;
}

export const UserDetail: React.FC<NameProps> = ({ name }) => {
  return (
    <div className="flex items-center space-x-5">
      <FiBell className="text-2xl" />
      <Profile name={name} />
    </div>
  );
};
