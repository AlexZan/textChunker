var chunks = [];
var reduction = 3/4;

function splitTextIntoChunks() {
    var text = document.getElementById('inputText').value;
    var tokenLimit = document.getElementById('tokenLimit').value * reduction;
    var words = text.split(' ');
    chunks = [];
    var currentChunk = "";

    for (var i = 0; i < words.length; i++) {
        if ((currentChunk + " " + words[i]).split(' ').length > tokenLimit) {
            var lastPeriodIndex = currentChunk.lastIndexOf('.');
            if (lastPeriodIndex !== -1) {
                chunks.push(currentChunk.slice(0, lastPeriodIndex + 1));
                currentChunk = currentChunk.slice(lastPeriodIndex + 1) + " " + words[i];
            } else {
                chunks.push(currentChunk);
                currentChunk = words[i];
            }
        } else {
            if (currentChunk === "") {
                currentChunk = words[i];
            } else {
                currentChunk += " " + words[i];
            }
        }
    }

    if (currentChunk !== "") {
        chunks.push(currentChunk);
    }

    var chunksDiv = document.getElementById('chunks');
    chunksDiv.innerHTML = '';

    for (var i = 0; i < chunks.length; i++) {
        var chunkButton = document.createElement('button');
        chunkButton.textContent = 'Copy Chunk ' + (i + 1);
        chunkButton.id = 'chunkButton' + i;
        chunkButton.className = 'btn btn-light mb-2';  // Apply Bootstrap classes
        chunkButton.onclick = (function(chunk, buttonId) {
            return function() {
                var textarea = document.createElement('textarea');
                textarea.textContent = chunk;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                document.getElementById(buttonId).classList.remove('btn-light'); // Remove the light color class
                document.getElementById(buttonId).classList.add('btn-info');  // Add info color
            }
        })(chunks[i], 'chunkButton' + i);

        var chunkSize = document.createElement('p');
        chunkSize.textContent = 'Estimated token count: ' + Math.round(chunks[i].split(' ').length / reduction);
        chunkSize.className = 'mb-3';  // Apply Bootstrap classes

        chunksDiv.appendChild(chunkButton);
        chunksDiv.appendChild(chunkSize);
    }
}
