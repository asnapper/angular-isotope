# [Masonry](https://github.com/desandro/masonry) module for Angular2

[![npm version](https://badge.fury.io/js/angular2-isotope.svg)](https://www.npmjs.com/package/angular2-isotope)

> angular2-isotope is in development and **not ready for production use**.
> Feel free to install and try it out, but depend on it at your own risk.

## Installation

`npm install angular2-isotope --save`

If you're using SystemJS add `angular2-isotope` and `masonry-layout` to your configuration:
```json
packages: {
  "angular2-isotope": { "defaultExtension": "js", "main": "index" }
},
map: {
  "angular2-isotope": "node_modules/angular2-isotope",
  "isotope-layout": "node_modules/isotope-layout/dist/isotope.pkgd.js"
}
```

## Usage

Import `IsotopeModule` into your app's modules:

``` typescript
import { IsotopeModule } from 'angular2-isotope';

@NgModule({
  imports: [
    IsotopeModule
  ]
})
```

```typescript
 @Component({
   selector: 'my-component',
   template: `
     <isotope>
       <isotope-brick class="brick" *ngFor="let brick of bricks">{{brick.title}}</masonry-brick>
     </isotope>
     `,
     styles: [`
       .brick { width: 200px; }
     `]
 })
 class MyComponent {
   bricks = [
     {title: 'Brick 1'},
     {title: 'Brick 2'},
     {title: 'Brick 3'},
     {title: 'Brick 4'},
     {title: 'Brick 5'},
     {title: 'Brick 6'}
   ]
 }
 ```

## Configuration

### Options
Read about Masonry options here: http://masonry.desandro.com/options.html

The `options`-attribute takes an object with the following properties:
* itemSelector: string;
* columnWidth: number | string;
* gutter: number;
* percentPosition: boolean;
* stamp: string;
* fitWidth: boolean;
* originLeft: boolean;
* originTop: boolean;
* containerStyle: string;
* transitionDuration: string;
* resize: boolean;
* initLayout: boolean;

#### Examples

Inline object:
```html
<isotope [options]="{ transitionDuration: '0.8s' }"></isotope>
```

From parent component:
```javascript
import { IsotopeOptions } from 'angular2-isotope';

public myOptions: IsotopeOptions = {
  transitionDuration: '0.8s'
};
```
```html
<isotope [options]="myOptions"></isotope>
```

### imagesLoaded
>**NOTE:** Will throw error if global `imagesLoaded` not available.

Delay adding brick until all images in brick are loaded.
To activate imagesLoaded set `useImagesLoaded` to `true`.
```html
<isotope [useImagesLoaded]="true"></isotope>
```
index.html:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.1/imagesloaded.pkgd.min.js"></script>
```

## Events
### layoutComplete: `EventEmitter<any[]>`
Triggered after a layout and all positioning transitions have completed.
>http://masonry.desandro.com/events.html#layoutcomplete

### removeComplete: `EventEmitter<any[]>`
Triggered after an item element has been removed.
>http://masonry.desandro.com/events.html#removecomplete

### Examples
```html
<isotope (layoutComplete)="doStuff($event)" (removeComplete)="doOtherStuff($event)"></isotope>
```
