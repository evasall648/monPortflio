// Déclarations de types globaux

// Pour les fichiers CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Pour les fichiers SCSS modules
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
