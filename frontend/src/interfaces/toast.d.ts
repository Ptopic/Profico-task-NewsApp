export interface IToastPayload {
   title: string | JSX.Element;
   description?: string | JSX.Element;
   id?: string;
   disabledClose?: boolean;
   Icon?: JSX.Element;
   autoClose?: false | undefined;
}
