export interface Note {
  id: string;
  title: string;
  description: string;
  last_updated: string;
}

export interface hamburgerMenuItems {
  buttonName: string;
  buttonIcon: JSX.Element;
  buttonPath: string;
  classAttributes: string;
}
