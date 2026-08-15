const db = require('../config/db');

exports.getSchedule = (req, res) => {
    const { day, group } = req.query;
    let sql = 'SELECT * FROM schedule WHERE 1=1';
    const params = [];

    if (day) {
        sql += ' AND day_of_week = ?';
        params.push(day);
    }

    if (group && group !== 'All') {
        sql += ' AND (group_id = ? OR group_id = "All")';
        params.push(group);
    }

    sql += ' ORDER BY period_num ASC';

    const items = db.queryAll(sql, params);

    // Group by day if no specific day requested
    if (!day) {
        const grouped = {
            Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: []
        };
        for (const item of items) {
            if (!grouped[item.day_of_week]) grouped[item.day_of_week] = [];
            grouped[item.day_of_week].push({
                startPeriod: item.period_num,
                time: `${item.start_time} – ${item.end_time}`,
                code: item.code,
                subject: item.subject,
                room: item.room,
                prof: item.prof_name,
                type: item.type,
                duration: item.duration,
                color: item.color
            });
        }
        return res.json({ success: true, scheduleByDay: grouped });
    }

    const formatted = items.map(item => ({
        startPeriod: item.period_num,
        time: `${item.start_time} – ${item.end_time}`,
        code: item.code,
        subject: item.subject,
        room: item.room,
        prof: item.prof_name,
        type: item.type,
        duration: item.duration,
        color: item.color
    }));

    res.json({ success: true, day, schedule: formatted });
};

exports.getTodaysClasses = (req, res) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];
    const queryDay = today === 'Sun' ? 'Mon' : today;

    const items = db.queryAll(
        'SELECT * FROM schedule WHERE day_of_week = ? ORDER BY period_num ASC',
        [queryDay]
    );

    const classes = items.map(item => ({
        time: item.start_time,
        subject: item.subject,
        room: item.room,
        prof: item.prof_name
    }));

    res.json({ success: true, day: queryDay, classes });
};
