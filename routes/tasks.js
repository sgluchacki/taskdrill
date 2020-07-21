const router = require('express').Router();
const tasksCtrl = require('../controllers/tasks');

router.get('/', checkAuth, tasksCtrl.index);
router.get('/:id', checkAuth, tasksCtrl.indexSubCards);
router.post('/', checkAuth, tasksCtrl.create);
// router.post('/:id', checkAuth, tasksCtrl.createSubCard);  May not need this
router.put('/:id', checkAuth, tasksCtrl.update);
// router.put('/:parentID/:id', checkAuth, tasksCtrl.updateSubCards);   May not need this
router.delete('/:id', checkAuth, tasksCtrl.delete);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;