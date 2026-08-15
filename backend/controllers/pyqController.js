const db = require('../config/db');

exports.getPYQ = (req, res) => {
    const { semester, exam, year, search } = req.query;

    let sql = 'SELECT * FROM pyq_papers WHERE 1=1';
    const params = [];

    if (semester && semester !== 'all') {
        sql += ' AND semester = ?';
        params.push(parseInt(semester));
    }

    if (exam && exam !== 'all') {
        sql += ' AND exam_type = ?';
        params.push(exam);
    }

    if (year && year !== 'all') {
        sql += ' AND year = ?';
        params.push(year);
    }

    if (search) {
        sql += ' AND (subject LIKE ? OR code LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY semester DESC, year DESC';

    const papers = db.queryAll(sql, params);

    res.json({
        success: true,
        papers: papers.map(p => ({
            id: p.id,
            sem: p.semester,
            subject: p.subject,
            code: p.code,
            year: p.year,
            exam: p.exam_type,
            file: p.file_name,
            hasFile: Boolean(p.file_name),
            downloads: p.downloads,
            popular: Boolean(p.popular)
        }))
    });
};
