export interface Note {
  id: number;
  title: string;
  description: string;
  last_updated: string;
}

export interface newNote {
  id: number;
  title: string;
  description: string;
  last_updated: string;
  user_id: string;
}
[];

export interface hamburgerMenuItems {
  buttonName: string;
  buttonIcon: JSX.Element;
  buttonPath: string;
  buttonColor:
    | "foreground"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}