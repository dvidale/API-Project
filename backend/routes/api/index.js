const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js')


const { restoreUser } = require('../../utils/auth.js');


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/reviews', reviewsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/bookings', bookingsRouter);

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get( '/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
//   }
// );

//*Save this route for testing CSRF setup!!!
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'DemoUser'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

module.exports = router;