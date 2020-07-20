const router = require('express').Router();
const tasksCtrl = require('../controllers/tasks');

router.get('/', tasksCtrl.index);
router.get('/:id', tasksCtrl.indexSubCards);
router.post('/', tasksCtrl.create);
// router.post('/:id', tasksCtrl.createSubCard);  May not need this
router.put('/:id', tasksCtrl.update);
// router.put('/:parentID/:id', tasksCtrl.updateSubCards);   May not need this
router.delete('/:id', tasksCtrl.delete);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;