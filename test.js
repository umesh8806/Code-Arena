const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('https://wandbox.org/api/compile.json', {
      compiler: 'cpython-3.10.4',
      code: 'print("Hello Wandbox!")'
    });
    console.log('SUCCESS wandbox', res.data);
  } catch(e) {
    console.log('FAILED wandbox', e.response?.data || e.message);
  }
}
test();
