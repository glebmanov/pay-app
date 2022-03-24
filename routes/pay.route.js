const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Payment = require('../models/Payment');

const router = Router();

router.post(
  '/pay',
  [
    check('CardNumber').isLength({ min: 16, max: 16 }),
    check('ExpDate').matches('(0[1-9]|1[0-2])[/](19|20)[0-9]{2}'),
    check('Cvv').isLength({ min: 3, max: 3 }),
    check('Amount').isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          messege: 'Incorrect data',
        });
      }

      const { CardNumber, ExpDate, Cvv, Amount } = req.body;

      const payment = new Payment({
        CardNumber,
        ExpDate,
        Cvv,
        Amount,
      });

      await payment.save();

      res.status(200).json({ Amount, RequestId: payment._id });
    } catch (e) {
      res.status(500).json({ e });
    }
  }
);

module.exports = router;
