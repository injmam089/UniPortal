const http = require('http');

function makeRequest(path, method = 'GET', body = null, token = null) {
    return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', reject);
        if (payload) req.write(payload);
        req.end();
    });
}

async function runTests() {
    console.log('🧪 Starting API Verification Suite...\n');
    let passed = 0;
    let failed = 0;

    async function test(name, fn) {
        try {
            await fn();
            console.log(`  ✅ PASS: ${name}`);
            passed++;
        } catch (err) {
            console.error(`  ❌ FAIL: ${name} ->`, err.message);
            failed++;
        }
    }

    // 1. Health check
    await test('GET /api/health', async () => {
        const res = await makeRequest('/api/health');
        if (res.status !== 200 || res.body.status !== 'online') throw new Error(`Status: ${res.status}`);
    });

    // 2. Auth login
    let token = null;
    await test('POST /api/auth/login (student1 / password123)', async () => {
        const res = await makeRequest('/api/auth/login', 'POST', { username: 'student1', password: 'password123' });
        if (res.status !== 200 || !res.body.token) throw new Error(`Failed to login: ${JSON.stringify(res.body)}`);
        token = res.body.token;
    });

    // 3. Student Profile
    await test('GET /api/student/profile', async () => {
        const res = await makeRequest('/api/student/profile', 'GET', null, token);
        if (res.status !== 200 || res.body.student.student_id !== 'STU-2400103912') {
            throw new Error(`Invalid student data: ${JSON.stringify(res.body)}`);
        }
    });

    // 4. Schedule
    await test('GET /api/schedule', async () => {
        const res = await makeRequest('/api/schedule');
        if (res.status !== 200 || !res.body.scheduleByDay.Mon) throw new Error('Schedule missing Mon');
    });

    // 5. Results
    await test('GET /api/results/5', async () => {
        const res = await makeRequest('/api/results/5');
        if (res.status !== 200 || res.body.subjects.length === 0) throw new Error('Results empty');
    });

    // 6. Fees Overview
    await test('GET /api/fees', async () => {
        const res = await makeRequest('/api/fees');
        if (res.status !== 200 || typeof res.body.summary.total !== 'number' || typeof res.body.summary.pending !== 'number') {
            throw new Error(`Fee summary mismatch: ${JSON.stringify(res.body.summary)}`);
        }
    });

    // 7. Quizzes
    await test('GET /api/quizzes', async () => {
        const res = await makeRequest('/api/quizzes');
        if (res.status !== 200 || res.body.quizzes.length === 0) throw new Error('No quizzes');
    });

    // 8. Assignments
    await test('GET /api/assignments', async () => {
        const res = await makeRequest('/api/assignments');
        if (res.status !== 200 || res.body.assignments.length === 0) throw new Error('No assignments');
    });

    // 9. PYQ
    await test('GET /api/pyq', async () => {
        const res = await makeRequest('/api/pyq');
        if (res.status !== 200 || res.body.papers.length === 0) throw new Error('No PYQ papers');
    });

    // 10. Dashboard
    await test('GET /api/dashboard', async () => {
        const res = await makeRequest('/api/dashboard');
        if (res.status !== 200 || !res.body.stats) throw new Error('Dashboard stats missing');
    });

    console.log(`\n====================================================`);
    console.log(`🎉 Test Suite Complete: ${passed} passed, ${failed} failed.`);
    console.log(`====================================================\n`);

    if (failed > 0) process.exit(1);
}

runTests().catch(err => {
    console.error('Fatal test error:', err);
    process.exit(1);
});
