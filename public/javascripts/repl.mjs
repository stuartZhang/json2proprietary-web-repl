import JSONEditor from 'jsoneditor';
const selPayload = document.querySelector('form[name=query] select[name=req-payload]');
const btnSend = document.querySelector('form[name=query] button[name=send]');
const txtIden = document.querySelector('form[name=query] textarea[name=iden]');
const txtPayload = document.querySelector('form[name=query] textarea[name=payload]');
const divRes = document.querySelector('div#jsoneditor');
const jsonEditor = new JSONEditor(divRes, { // Reference: https://github.com/josdejong/jsoneditor
  'modes': ['tree', 'code']
});

selPayload.addEventListener('change', () => {
  const script = document.querySelector(`script[type=${selPayload.value}]`);
  txtPayload.value = script.textContent;
});
btnSend.addEventListener('click', async () => {
  jsonEditor.set({});
  const res = await fetch('/lbs-api-repl', {
    'method': 'POST',
    'headers': new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    'body': JSON.stringify({
      'iden': JSON.parse(txtIden.value),
      'payload': JSON.parse(txtPayload.value)
    })
  }).then(res => res.json());
  jsonEditor.set(res);
  jsonEditor.expandAll();
});
selPayload.dispatchEvent(new Event('change'));
