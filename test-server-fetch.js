async function test() {
  console.log('Testing server connection to http://127.0.0.1:5173/ and http://localhost:5173/...');
  
  const start = Date.now();
  const res = await fetch('http://127.0.0.1:5173/');
  console.log('HTML Status:', res.status, 'Time:', Date.now() - start, 'ms');
  const text = await res.text();
  console.log('HTML includes root div:', text.includes('<div id="root"></div>'));
  
  // Find script and css src
  const jsMatch = text.match(/src="([^"]+\.js)"/);
  const cssMatch = text.match(/href="([^"]+\.css)"/);
  
  if (jsMatch) {
    const jsStart = Date.now();
    const jsRes = await fetch('http://127.0.0.1:5173' + jsMatch[1]);
    const jsText = await jsRes.text();
    console.log('JS Bundle Status:', jsRes.status, 'Size:', jsText.length, 'bytes. Time:', Date.now() - jsStart, 'ms');
  }
  
  if (cssMatch) {
    const cssStart = Date.now();
    const cssRes = await fetch('http://127.0.0.1:5173' + cssMatch[1]);
    const cssText = await cssRes.text();
    console.log('CSS Bundle Status:', cssRes.status, 'Size:', cssText.length, 'bytes. Time:', Date.now() - cssStart, 'ms');
  }

  // Also test localhost
  const lhStart = Date.now();
  const lhRes = await fetch('http://localhost:5173/');
  console.log('Localhost HTML Status:', lhRes.status, 'Time:', Date.now() - lhStart, 'ms');
}

test().catch(console.error);
