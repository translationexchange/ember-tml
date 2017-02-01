export function translate() {
  return (
    window.tml && 
    window.tml.translate.apply(this, arguments)
  );
}

export function translateLabel() {
  return (
    window.tml && 
    window.tml.translateLabel.apply(this, arguments)
  );
}
    
export function tr()  {
  return translate.apply(this, arguments);
}

export function trl() {
  return translateLabel.apply(this, arguments);
}


export default {translate, translateLabel, tr, trl};