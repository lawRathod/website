var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: false
});

typewriter.typeString('Hello World!')
    .pauseFor(2500)
    .deleteAll()
    .typeString('I am Prateek...')
    .pauseFor(3000)
    .deleteChars(10)
    .typeString('Law.')
    .pauseFor(2500)
    .start();
