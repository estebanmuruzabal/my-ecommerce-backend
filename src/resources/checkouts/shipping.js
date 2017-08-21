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
            value: 'free-pickup',
            name: {
                en: 'To take pick-up in our shop',
                es: 'A retirar en nuestro local'
            },
            price: 0,
            vat: 0,
            currency: 'ARS'
        },
        {
          value: 'zona-1',
          name: {
            en: 'Shipping to address in Zone 1',
            es: 'Envio a domicilio en Zona 1'
          },
          price: 25.00,
          vat: 0,
          currency: 'ARS'
        },
        {
            value: 'zona-2',
            name: {
              en: 'Shipping to address in Zone 2',
              es: 'Envio a domicilio en Zona 2'
            },
            price: 35.00,
            vat: 0,
            currency: 'ARS'
        },
        {
            value: 'zona-3',
            name: {
              en: 'Shipping to address in Zone 3',
              es: 'Envio a domicilio en Zona 3'
            },
            price: 45.00,
            vat: 0,
            currency: 'ARS'
        }
      );
    } else {
        options.push({
          value: 'free-pickup',
          name: {
              en: 'A retirar en nuestro local, calle Guemes 765.',
              es: 'A retirar en nuestro local, calle Guemes 765.'
          },
          price: 0,
          vat: 0,
          currency: 'ARS'
        },
        {
          value: 'zona-1-free',
          name: {
              en: 'Envio gratis dentro del casco centrico.',
              es: 'Envio gratis dentro del casco centrico.'
          },
          price: 0,
          vat: 0,
          currency: 'ARS'
        },
        {
            value: 'zona-2',
            name: {
              en: 'Shipping to address in Zone 2',
              es: 'Envio a domicilio en Zona 2'
            },
            price: 35.00,
            vat: 0,
            currency: 'ARS'
        },
        {
            value: 'zona-3',
            name: {
              en: 'Shipping to address in Zone 3',
              es: 'Envio a domicilio en Zona 3'
            },
            price: 45.00,
            vat: 0,
            currency: 'ARS'
        }
      );
    }

    return options;
}

/**
 * Exports
 */
export {getShippingOptions};
