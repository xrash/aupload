# asyncUpload

Javascript *asynchronous* upload in two steps:

- Create a button using a div element:

```html
    <div id="upload-button"></div>
```

- Call the asyncUpload method on it:

```javascript
    $('#upload-button').asyncUpload({
        'inputName': 'file',
        'formAction': '/path/to/upload',
        'params': {'extra-parameter': 'any-value'},
        'multiple': false,
        'start': function() {
            alert('upload starting...');
        },
        'done': function(data) {
            alert('upload finished!');
        },
        'pollingInterval': 500
    });
```

### Profit!

# Inline options

**asyncUpload** will search through your button **data-*** attributes and if it finds something that looks like an option, it will be used. Example:

```html
    <div id="upload-button" data-input-name="rofl" data-params='{"clown": "bozo"}'></div>
```
# Callbacks

The **start** option is called right before sending the request to the server.
The **done** option is called right after the server sends it response, and it receives the server response.

# How it works

The plugin creates a hidden iframe and a hidden form inside your button. The form sends the file through the iframe, and because of that, it doesn't reload the page.
There is also a listener using *window.setInterval* that keeps listening to the iframe to check if it was loaded with the new content. The polling interval in milliseconds can be set through the **pollingInterval** option.
