//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');
//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //Metodo que resta el presupuesto
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSPan = document.querySelector('span#restante');

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSPan.innerHTML = `${cantidad}`;

    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));
        document.querySelector('.primario').insertBefore(divMensaje,formulario);
        
        formulario.reset();

        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
        },3000);
    }

    agregarGastoListado(nombre, cantidad){
        const gastoListado = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between aling-items-centar';
        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;
        gastoListado.appendChild(li);

    }

    restarPresupuesto(cantidad){
        const restante = document.querySelector('span#restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `
            ${presupuestoRestanteUsuario}
        `;

        this.comprobarPresupuesto();
    }

    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
    
        if( (presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ( (presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }

}


//Event Listeners
document.addEventListener('DOMContentLoaded',function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const nombreGasto = document.getElementById('gasto').value;
    const cantidadGasto =  document.getElementById('cantidad').value;

    const ui = new Interfaz();

    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMensaje('Hubo un error','error');
    }else{
        ui.imprimirMensaje('Correcto','correcto');
        ui.agregarGastoListado(nombreGasto,cantidadGasto);
        ui.restarPresupuesto(cantidadGasto);
    }
});