import { Component, OnInit } from '@angular/core';
import StandardColors from './colors.json'
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-color-management',
  templateUrl: './color-management.component.html',
  styleUrls: ['./color-management.component.styl']
})
export class ColorManagementComponent implements OnInit {
  colorsObj;
  colors;
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getData()
    this.setData()
  }

  getData(){
    // Get project colors from API
    let projectColors = this.projectService.getColors();
    // If not found use default colors
    if(projectColors){
      this.colors = Object.assign({},projectColors)
    }else{
      this.colors = Object.assign({},StandardColors)
      this.projectService.setColors(this.colors)
    }
  }

  updateData(){
    // Store existing color in backend for future use
    this.projectService.setColors(this.colors)
  }

  updateColor(name:string, value){
    this.colors[name.replace(" ", '').toLowerCase()] = value;
    this.setData()
    this.updateData()
  }

  setData() {
    this.colorsObj = {
      "1. Main": {
        Neutrals: [
          {
            name: 'Neutrals',
            color: '#24282b',
            textColor: '#fff'
          },
          {
            name: 'Neutrals Dark',
            color: '#000',
            textColor: '#fff'
          },
          {
            name: 'Neutrals Medium',
            color: '#A2A5A8',
            textColor: '#fff'
          },
          {
            name: 'Neutrals Light',
            color: '#EAEEF1',
            textColor: '#000'
          }
        ]
        ,
        Primary: [
          {
            name: 'Primary',
            color: this.colors.primary,
            textColor: '#fff',
            isEditable: true
          },
          {
            name: 'Primary Dark',
            color: this.darken(this.colors.primary, 40),
            textColor: '#fff'
          },
          {
            name: 'Primary Medium',
            color: this.lighten(this.colors.primary, 30),
            textColor: '#fff'
          },
          {
            name: 'Primary Light',
            color: this.lighten(this.colors.primary, 70),
            textColor: '#000'
          }
        ]
        ,
        Secondary: [
          {
            name: 'Secondary',
            color: this.colors.secondary,
            textColor: '#fff',
            isEditable: true
          },
          {
            name: 'Secondary Dark',
            color: this.darken(this.colors.secondary, 40),
            textColor: '#fff'
          },
          {
            name: 'Secondary Medium',
            color: this.lighten(this.colors.secondary, 30),
            textColor: '#fff'
          },
          {
            name: 'Secondary Light',
            color: this.lighten(this.colors.secondary, 70),
            textColor: '#000'
          }
        ]

      },
      "2. Tertiary": {
        Tertiary1: [
          {
            name: 'Tertiary 1',
            color: this.colors.tertiary1,
            textColor: '#fff',
            isEditable: true
          },
          {
            name: 'Tertiary 1 Dark',
            color: this.darken(this.colors.tertiary1, 40),
            textColor: '#fff'
          },
          {
            name: 'Tertiary 1 Medium',
            color: this.lighten(this.colors.tertiary1, 30),
            textColor: '#fff'
          },
          {
            name: 'Tertiary 1 Light',
            color: this.lighten(this.colors.tertiary1, 70),
            textColor: '#000'
          }
        ]
        ,
        Tertiary2: [
          {
            name: 'Tertiary 2',
            color: this.colors.tertiary2,
            textColor: '#fff',
            isEditable: true
          },
          {
            name: 'Tertiary 2 Dark',
            color: this.darken(this.colors.tertiary2, 40),
            textColor: '#fff'
          },
          {
            name: 'Tertiary 2 Medium',
            color: this.lighten(this.colors.tertiary2, 30),
            textColor: '#fff'
          },
          {
            name: 'Tertiary 2 Light',
            color: this.lighten(this.colors.tertiary2, 70),
            textColor: '#000'
          }
        ]
        ,
        Tertiary3: [
          {
            name: 'Tertiary 3',
            color: this.colors.tertiary3,
            textColor: '#fff',
            isEditable: true
          },
          {
            name: 'Tertiary 3 Dark',
            color: this.darken(this.colors.tertiary3, 40),
            textColor: '#fff'
          },
          {
            name: 'Tertiary 3 Medium',
            color: this.lighten(this.colors.tertiary3, 30),
            textColor: '#fff'
          },
          {
            name: 'Tertiary 3 Light',
            color: this.lighten(this.colors.tertiary3, 70),
            textColor: '#000'
          }
        ]

      },
      "3. Other-Defaults": {
        default: [
          {
            name: 'Default Danger',
            color: this.colors.error,
            textColor: '#fff'
          },
          {
            name: 'Default Success',
            color: this.colors.success,
            textColor: '#fff'
          },
          {
            name: 'Default Warning',
            color: this.colors.warning,
            textColor: '#000'
          },
          {
            name: 'Default Primary',
            color: this.colors.note,
            textColor: '#fff'
          }
        ]
      }
    }
  }


  LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

  }
  lighten(col, amt): string {
    return this.LightenDarkenColor(col, amt)
  }
  darken(col, amt): string {
    return this.LightenDarkenColor(col, -1*amt)
  }

}
