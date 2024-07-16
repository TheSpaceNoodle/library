import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function (_, res) {
  res.redirect('/catalog');
});

export default router;
