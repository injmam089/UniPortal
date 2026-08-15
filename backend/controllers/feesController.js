const db = require('../config/db');

exports.getFeeOverview = (req, res) => {
    const studentId = req.user?.studentId || 1;

    const breakdown = db.queryAll('SELECT * FROM fees WHERE student_id = ?', [studentId]);
    const history = db.queryAll('SELECT * FROM payments WHERE student_id = ? ORDER BY payment_date DESC', [studentId]);

    const totalFees = breakdown.reduce((sum, f) => sum + f.amount, 0);
    const paidFees = breakdown.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
    const pendingFees = breakdown.filter(f => f.status !== 'Paid').reduce((sum, f) => sum + f.amount, 0);
    const percentPaid = totalFees > 0 ? ((paidFees / totalFees) * 100).toFixed(1) : 0;

    res.json({
        success: true,
        summary: {
            total: totalFees,
            paid: paidFees,
            pending: pendingFees,
            percentage: parseFloat(percentPaid)
        },
        breakdown: breakdown.map(b => ({
            component: b.component,
            amount: b.amount,
            status: b.status,
            dueDate: b.due_date
        })),
        history: history.map(h => ({
            txnId: h.txn_id,
            desc: h.description,
            amount: h.amount,
            status: h.status,
            date: h.payment_date,
            method: h.method
        }))
    });
};

exports.makePayment = (req, res) => {
    const studentId = req.user?.studentId || 1;
    const { amount = 19000, description = 'Online Tuition / Pending Fees Settlement', method = 'Card' } = req.body;

    const txnId = `TXN-${Date.now().toString().slice(-8)}`;
    const today = new Date().toISOString().split('T')[0];

    // Record new payment transaction
    db.run(
        `INSERT INTO payments (student_id, txn_id, description, amount, status, payment_date, method)
         VALUES (?, ?, ?, ?, 'Paid', ?, ?)`,
        [studentId, txnId, description, amount, today, method]
    );

    // Update pending fee components to Paid
    db.run(
        `UPDATE fees SET status = 'Paid' WHERE student_id = ? AND status != 'Paid'`,
        [studentId]
    );

    // Log user activity
    const student = db.queryOne('SELECT user_id FROM students WHERE id = ?', [studentId]);
    if (student) {
        db.run(
            `INSERT INTO activity_logs (user_id, text, time_text, color) VALUES (?, ?, 'Just now', '#4ade80')`,
            [student.user_id, `Paid ₹${amount.toLocaleString('en-IN')} towards Pending Fees (${txnId})`]
        );
    }

    res.json({
        success: true,
        message: 'Payment processed successfully',
        transaction: {
            txnId,
            amount,
            date: today,
            status: 'Paid'
        }
    });
};
