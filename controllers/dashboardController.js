const Transaction = require("../models/Transaction");

// GET DASHBOARD SUMMARY
exports.getDashboard = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    let balance = 0;

    transactions.forEach((txn) => {
      if (txn.type === "credit") balance += txn.amount;
      if (txn.type === "debit") balance -= txn.amount;
    });

    res.status(200).json({
      username: req.user.username,
      role: req.user.role,
      balance,
      totalTransactions: transactions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TRANSACTION HISTORY
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const user = req.user; // from protect middleware

    res.status(200).json({
      success: true,
      name: user.name,
      role: user.role,
      balance: user.balance,
      profileImage: user.profileImage || null,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard error" });
  }
};

