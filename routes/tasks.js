const router = require('express').Router();
const tasksCtrl = require('../controllers/tasks');

router.get('/', tasksCtrl.index);
router.post('/', tasksCtrl.create);
router.put('/:id', tasksCtrl.update);
router.delete('/:id', tasksCtrl.delete);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;