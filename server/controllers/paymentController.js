const Payment = require('../models/paymentModel');

const createPayment = async (req, res) => {
  try {
    const { group, from, to, amount} = req.body;

    const newPayment = new Payment({ group, from, to, amount});
    await newPayment.save(newPayment);

    res.status(200).json({
      success: true,
      message: newPayment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createPayment };