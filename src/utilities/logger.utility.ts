const colorLogFactory = (color: string) => {
  return (...args: any) => {
    let str = '%c';
    args.forEach((arg: any) => {
      str += `${arg}`;
    });
    console.log(str, `color:${color};font-size:16px`);
  }
}

export const logInRed = colorLogFactory('tomato');
export const logInGreen = colorLogFactory('chartreuse');
export const logInPink = colorLogFactory('fuchsia');
export const logInYellow = colorLogFactory('yellow');
export const logInBlue = colorLogFactory('aqua');