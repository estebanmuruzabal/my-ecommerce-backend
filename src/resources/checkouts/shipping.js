/**
 * Imports
 */
import {Checkout} from './models';

/**
 * Return the available shipping options for given checkout
 */
function getShippingOptions(checkout) {

    let options = [];

    if (new Checkout(checkout).getSubTotal() <= 150) {
        options.push({
            value: 'standard',
            name: {
                en: 'Corréo Argentino, 2 to 3 workdays after shipping',
                es: 'Corréo Argentino, 2 a 3 dias hábiles después de envío'
            },
            price: 3.40,
            vat: 23,
            currency: 'ARS'
        });
    } else {
        options.push({
            value: 'free',
            name: {
                en: 'Free! Corréo Argentino, 2 to 3 workdays after shipping',
                es: 'Gratis! Corréo Argentino, 2 a 3 dias hábiles después de envío'
            },
            price: 0,
            vat: 23,
            currency: 'ARS'
        });
    }

    return options;
}

/**
 * Exports
 */
export {getShippingOptions};
