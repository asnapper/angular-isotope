import { NgModule } from '@angular/core';
import { AngularIsotope } from './isotope';
import { AngularIsotopeBrick } from './brick';

const DIRECTIVES = [AngularIsotope, AngularIsotopeBrick];

@NgModule({
    declarations: DIRECTIVES,
    exports: DIRECTIVES
})
export class IsotopeModule { }
