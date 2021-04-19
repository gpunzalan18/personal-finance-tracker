import { Injectable } from '@angular/core';
import { Color } from '../../models/color.enum';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private opacity: number = 0.4;

  getColorSet(colorSet: Color[]): any {
    let colors: any[] = [];
    colorSet.forEach((color: string) => {
      const formattedColor: string = `rgba(${color},${this.opacity})`;
      colors.push({
        borderColor: formattedColor,
        backgroundColor: formattedColor,
      });
    });
    return colors;
  }
}
