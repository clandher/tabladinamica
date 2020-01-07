import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl, FormArray, FormControlName, FormControlDirective } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'calculos';

	public autosForm: any;



	public elements = [
		{
			name: "Auto1",
			price: 50000,
		},
		{
			name: "Auto2",
			price: 80000,
		}
	]


	get autos() { return this.autosForm.get('autos') as FormArray; }
	get discountSum() { return this.autosForm.get('discountSum') as AbstractControl; }
	get finalPriceSum() { return this.autosForm.get('finalPriceSum') as AbstractControl; }

	constructor(private formBuilder: FormBuilder) {
		// se buildea el formulario
		this.autosForm = this.formBuilder.group({
			autos: this.formBuilder.array(
				this.elements.map((LO_QUE_TU_QUIERAs) => this.createAutoElement(LO_QUE_TU_QUIERAs))
			),
			discountSum: [0],
			finalPriceSum: [0]
		});
	}

	public onAutosFormSubmit() {
		console.log('onAutosFormSubmit', this.autosForm.value);
	}

	public createAutoElement(element): FormGroup {
		const temporalForm = this.formBuilder.group({
			name: [element.name],
			price: [element.price],
			discount: [],
			finalPrice: [element.price],
		});

		const name = temporalForm.get('name');
		const price = temporalForm.get('price');
		const discount = temporalForm.get('discount');
		const finalPrice = temporalForm.get('finalPrice');

		discount.valueChanges.subscribe(result => {
			console.log('discount.valueChanges')

			finalPrice.setValue(price.value - discount.value);

			let _discountSum = 0;
			let _finalPriceSum = 0;
			const ctrl = <FormArray>this.autosForm.controls['autos'];
			ctrl.controls.forEach(x => {
				// get the itemmt value and need to parse the input to number
				let xdiscount = parseInt(x.get('discount').value)
				let xfinalPrice = parseInt(x.get('finalPrice').value)
				_discountSum += isNaN (xdiscount) ? 0 : xdiscount
				_finalPriceSum +=  isNaN (xfinalPrice) ? 0 : xfinalPrice
			});

			this.discountSum.setValue(_discountSum)
			this.finalPriceSum.setValue(_finalPriceSum)
		});

		return temporalForm;
	}

	// public gDiscountSum(){
	// 	for (const iterator of object) {

	// 	}
	// }
}
