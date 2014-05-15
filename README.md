# asyncUpload

*Javascript asynchronous upload* in two steps:

- 1. Create a button using a div element:

```html
        <div id="upload-button"></div>
```

- 2. Call the asyncUpload method on it:

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

asyncUpload will search through your button data-* attributes and if it finds something that looks like an option, it will use it. Example:

```html
        <div id="upload-button" data-input-name="rofl" data-params='{"clown": "bozo"}'></div>
```