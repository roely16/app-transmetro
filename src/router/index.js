import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import CuentaActivada from '../views/CuentaActivada'
import Menu from '../views/Menu'
import Reportes from '../views/Reportes'

import Auditorias from '../views/Auditorias'
import DetalleAuditoria from '../views/DetalleAuditoria'

import Usuarios from '../views/Usuarios'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro
    },
    {
        path: '/activar_cuenta/:id',
        name: 'activar_cuenta',
        component: CuentaActivada
    },
    {
			path: '/home',
			name: 'home',
			component: Home,
      children: [
        {
					path: '/home/menu/',
					name: 'menu',
					component: Menu
        },
        {
					path: '/home/reportes',
					name: 'reportes',
					component: Reportes,
					meta: {label: 'Reportes'}
        },
        {
					path: '/home/auditorias',
					name: 'auditorias',
					component: Auditorias,
					meta: {label: 'Auditorias'}
        },
        {
					path: '/home/usuarios',
					name: 'usuarios',
					component: Usuarios,
					meta: {label: 'Usuarios'}
        },
        {
					path: '/home/auditorias/detalle/:id',
					name: 'detalle_auditoria',
					component: DetalleAuditoria,
					meta: {label: 'Detalle de Auditoria'}
        },
      ]
    }
]

const router = new VueRouter({
	routes
})

// Validar las rutas
router.beforeEach((to, from, next) => {

	let usuario = JSON.parse(localStorage.getItem('usuario-auditoria-transporte'))

	if (to.name != 'login') {
		
		// Validar que exista localStorage
		if (usuario == null) {
			return next({ name: 'login' })
		}
	}

	if (to.name == 'login') {
		
		// Validar que no exista localStorage
		if (usuario != null) {
			return next({ name: 'menu' })
		}
	}

	next()

})

export default router
