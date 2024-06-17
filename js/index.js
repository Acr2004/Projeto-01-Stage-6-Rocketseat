import Router from './router.js';

const router = new Router();
router.add('/', '/pages/home.html', '../assets/home.png');
router.add('/universo', '/pages/universo.html', '../assets/universo.png');
router.add('/exploracao', '/pages/exploracao.html', '../assets/exploracao.png');
router.add(404, '/pages/404.html', '../assets/home.png');

router.handle();
window.onpopstate = () => router.handle();
window.route = () => router.route();