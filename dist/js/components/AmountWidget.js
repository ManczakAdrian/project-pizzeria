import { settings, select } from "./settings.js";
import Product from "./components/Product.js";
import Cart from "./components/Cart.js";
import AmountWidget from "./components/AmountWidget.js";
import CartProduct from "./Components/CartProduct.js";
import utils from "../utils.js";




class AmountWidget {
    constructor(element) {
      const thisWidget = this;
      thisWidget.getElements(element);
      if (thisWidget.input.value) {

        thisWidget.setValue(thisWidget.input.value);
      }
      else {
        thisWidget.setValue(settings.amountWidget.defaultValue);
      }
      thisWidget.initActions(element);

      //console.log('AmountWidget:', thisWidget);
      //console.log('constructor arguments:', element);

    }
    getElements(element) {
      const thisWidget = this;

      thisWidget.element = element;
      thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
      thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
      thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
    }
    setValue(value) {
      const thisWidget = this;
      const newValue = parseInt(value);


      if (thisWidget.value !== newValue && !isNaN(newValue) && newValue >= settings.amountWidget.defaultMin &&
        newValue <= settings.amountWidget.defaultMax) {
        thisWidget.value = newValue;

      }
      thisWidget.input.value = thisWidget.value;
      this.announce();
    }

    initActions() {
      const thisWidget = this;
      thisWidget.input.addEventListener('change', function (event) {
        event.preventDefault();
        thisWidget.setValue(thisWidget.input.value);

      });

      thisWidget.linkDecrease.addEventListener('click', function (event) {
        event.preventDefault();
        thisWidget.setValue(thisWidget.value - 1);

      });

      thisWidget.linkIncrease.addEventListener('click', function (event) {
        event.preventDefault();
        thisWidget.setValue(thisWidget.value + 1);

      });
    }

    announce() {
      const thisWidget = this;
      const event = new CustomEvent('updated', {
        bubbles: true
      });
      thisWidget.element.dispatchEvent(event);
    }
  }
  export default AmountWidget;