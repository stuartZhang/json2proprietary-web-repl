const selPayload = document.querySelector('form[name=query] select[name=req-payload]');
const btnSend = document.querySelector('form[name=query] button[name=send]');
const txtIden = document.querySelector('form[name=query] textarea[name=iden]');
const txtPayload = document.querySelector('form[name=query] textarea[name=payload]');
const txtRes = document.querySelector('textarea#res');
selPayload.addEventListener('change', () => {
  const script = document.querySelector(`script[type=${selPayload.value}]`);
  txtPayload.value = script.textContent;
});
btnSend.addEventListener('click', async () => {
  txtRes.value = 'Upcoming...';
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
  txtRes.value = JSON.stringify(res, null, 2);
});
selPayload.dispatchEvent(new Event('change'));
