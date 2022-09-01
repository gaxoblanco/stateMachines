import { createMachine, assign } from "xstate";
import {fetchCountries} from '../Utils/api';

const fillCountries = {
  initial: 'loading',
  states: {
    loading:{
    //invocamos un servicio
      invoke: {
        id: 'getCountries',
      //le damos un source - la funcion que vamos a llamar 
        src: ()=> fetchCountries,
      //La propiedad a llamar cuando el request finalice bien
        onDone:{
          target: 'success',
          actions: assign({
            countries: (context, event)=> event.data
          })
        },      
        //si sale mal
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request'
          })
        },

      }
    },
    success:{},
    failure: {
      on:{
        RETRY:{ target: 'loading'},
      }
    }
  }
}


const bookingMachine = createMachine({
  id: "buy place tickets",
  initial: "inicial",
  context: {
    passengers: [],
    selectedCountry: '',
    countries: [],
    error: ''
  },
  states: {
    inicial: {
      on:{
        START: {
          target:"search",
          //Acciones
          // actions: 'imprimirInicio',
        },
      }
    },
    search: {
      //Acciones de entrada y salida
      // entry: "imprimirEntrada",
      // exit: "imprimirSalida",
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({
            selectedCountry: (context, event)=> event.selectedCountry
          })
        },
        CANCEL: "inicial"
      },
    //incerto otra maquina dentro de la maquina principal
      ...fillCountries,
    }, 
    passengers: {
      on:{
        DONE: {
          target:"tickets",
        //para poder ejecutar DONE vamos a tener esta condicion
          cond: "moraThanOnePassenger"
        },
        CANCEL:{
          target: "inicial",
          actions: 'cleanContext',
        },
        ADD: {
        //llamando al estado en que estoy, me quedo en el lugar pero realizo la accion. 
          target:'passengers',
          actions: assign(
            (context, event) => context.passengers.push(event.newPassengers)
          )
        },
      }
    },
    tickets: {
    //transiciones con tiempo programado // transition con dilay
      after: {
        5000: {
          target: 'inicial',
          actions: 'cleanContext',
        }
      },
      on:{
        FINISH: "inicial",
      }
    },
  },
},
  { actions: {
    imprimirInicio: ()=> console.log('imprimir inicio'),
    imprimirEntrada: ()=> console.log('search-imprimirEntrada'),
    imprimirSalida: ()=> console.log('search-imprimirSalida'),
  },
  
    cleanContext: assign(
      (context, event) => (
        context.passengers = [], 
        context.selectedCountry = '')
    ),
  
    guards:{
      moraThanOnePassenger: (context)=>{
        //si tetornamos true se ejecuta
        return context.passengers.length > 0;
      }
    },

}
);

export {bookingMachine};