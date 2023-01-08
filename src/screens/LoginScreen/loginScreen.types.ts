export type ILoginScreenProps = {
  setAccessGranted: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ILoginFormStateTypes = {
  email: string;
  password: string;
};
