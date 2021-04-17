import { Injectable } from '@angular/core';
import { Color } from '../../models/view/color.enum';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private opacity: number = 0.4;
  constructor() {}

  getColorSet(colorSet: Color[]): any {
    let colors: any[] = [];
    colorSet.forEach((color: string) => {
      const formattedColor: string = `rgba(${color},${this.opacity})`;
      colors.push({
        borderColor: formattedColor,
        backgroundColor: formattedColor,
      });
    });
    console.log(colors);
    return colors;
  }
}
