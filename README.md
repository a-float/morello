# Morello
A todo app created using React with MaterialUI

Features:
- drag and drop to move tasks between the columns
- theme customization
- tags customization
- multiple todo sheets

### Theme preview
![morello img](https://user-images.githubusercontent.com/59033082/159799189-c48f30d9-c1d1-4af7-9c3c-aa3b54695045.jpg)

### Usage:  
`npm start` to run the app

### TODOs
- [ ] changing tags does not cause rerender of TagContext Consumers. Probably because of TagManager
- [ ] move TagManager and SheetManager logic to CustomHooks?
- [ ] split rendering and logic of TaskDisplay component
