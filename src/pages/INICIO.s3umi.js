// masterPage.js
import wixWindow from 'wix-window';

$w.onReady(() => {
  $w('#html1').onMessage((event) => {
    const { action, selector } = event.data;
    if (action === 'requestRect' && selector) {
      // 1) select the Wix element by its ID
      const $target = $w(selector);                 // :contentReference[oaicite:1]{index=1}
      // 2) wait for it to render
      $target.rendered.then(() => {
        // 3) get its position via the $w API
        // Wix doesn’t give you getBoundingClientRect(), but you can get the element’s
        // position & size through the Wix window API:
        wixWindow.getBoundingRect()
          .then(winInfo => {
            // combine winInfo.document (scroll, etc.) with your element’s top/left
            // * or * simply move the iframe relative to the window
            $w('#html1').postMessage({
              action: 'deliverRect',
              rect: {
                top: $target.top,
                left: $target.left,
                width: $target.width,
                height: $target.height
              }
            });
          });
      });
    }
  });

  // Kick off the tour
  $w('#html1').postMessage({ action: 'guide', selector: '#button1' });
  $w('#html1').postMessage({ action: 'speak', text: 'Click here to start!' });
});
