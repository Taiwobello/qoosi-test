export interface Country {
  flag: {
    svg: string;
    png: string;
    alt: string;
  };
  cca2: string;
  cca3: string;
  altSpellings: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  name: {
    official: string;
    nativeName: Object;
  };
}
