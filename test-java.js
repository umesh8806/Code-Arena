const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('https://wandbox.org/api/compile.json', {
      compiler: 'openjdk-jdk-21+35',
      code: 'class Main { public static void main(String[] args) { System.out.println("Hello Java"); } }'
    });
    console.log('SUCCESS', res.data);
  } catch(e) {
    console.log('FAILED', e.response?.data || e.message);
  }
}
test();
