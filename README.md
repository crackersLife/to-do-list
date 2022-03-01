## Available Scripts

In the project directory, you can run:

Run npm install
I am sharing the module without node modules. Please run the command to install the required modules
Just in case, One possible change to run the test case:
In file: node_modules/react-scripts/config/webpack.config.js is to make babelrc: true instead of false
// @remove-on-eject-begin
                babelrc: true,


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Assumptions and Implementations:
1. Added delete task feature just in case a task is added by mistake
2. Added move to pending task just in case a task is marked as done by mistake
3. Elapsed task will always be on top, task later than and equal to current date can never move up from elapsed task
4. Task within 24 hours range are being represented as bold text
5. Moved text to separate language file for multi-lingual support for future, that can be done using i18next
6. Due to time crunch, I have only added two RTL test cases